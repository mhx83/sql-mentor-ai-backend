import db from "../model.js"; // Import MySQL connection
import axios from "axios";

export async function getStudentGrades(userId, courseId) {
	const query = `
        SELECT 
            q.name AS name,
            CASE 
                WHEN q.points = 0 THEN 0
                ELSE ROUND((COALESCE(a.max_score, 0) / q.points * 100), 2)
            END AS grade,
            CASE 
                WHEN a.max_score IS NULL THEN 'missing'
                ELSE 'submitted'
            END AS type
        FROM quizzes q
        LEFT JOIN (
            SELECT quiz, MAX(score) AS max_score
            FROM attempts
            WHERE user = ?
            GROUP BY quiz
        ) a ON q._id = a.quiz
        WHERE q.course = ?
        ORDER BY q._id;
    `;
	const values = [userId, courseId];
	const [rows] = await db.query(query, values);
	return rows;
}

export async function getFacultyGrades(courseId) {
	const query = `
        SELECT 
            CONCAT(u.firstName, ' ', u.lastName) AS name,
            COALESCE(
                ROUND(AVG(
                    CASE 
                    WHEN q.points = 0 THEN 0 
                    ELSE (t.max_score / q.points * 100)
                    END
                ), 2), 
            0) AS grade,
            'submitted' AS type
        FROM enrollments e
        JOIN users u ON e.user = u._id AND u.role = "STUDENT"
        LEFT JOIN (
            SELECT user, quiz, MAX(score) AS max_score
            FROM attempts
            GROUP BY user, quiz
        ) t ON e.user = t.user
        LEFT JOIN quizzes q ON t.quiz = q._id AND q.course = ?
        WHERE e.course = ?
        GROUP BY u.firstName, u.lastName
        ORDER BY name;
    `;
	// courseId is used twice in the query.
	const values = [courseId, courseId];
	const [rows] = await db.query(query, values);
	return rows;
}

export async function fetchActivityData(userId, userRole, dateRange, countType) {
  // Determine the interval based on the dateRange parameter.
  const interval = dateRange === "Weekly" ? "7 DAY" : "30 DAY";

  let query = "";
  let values = [];

  if (userRole === "STUDENT") {
    if (countType === "TotalAttempts") {
      // Count all attempts for each course the student is enrolled in.
      query = `
        SELECT c.name AS name, 
               COUNT(a._id) AS count
        FROM attempts a
        JOIN quizzes q ON q._id = a.quiz
        JOIN courses c ON c._id = q.course
        WHERE a.user = ? 
          AND a.submissionTime >= DATE_SUB(CURDATE(), INTERVAL ${interval})
        GROUP BY c._id
        ORDER BY name;
      `;
    } else if (countType === "CompletedQuizzes") {
      // Count distinct quizzes attempted (i.e. completed) by the student for each course.
      query = `
        SELECT c.name AS name,
               COUNT(DISTINCT a.quiz) AS count
        FROM attempts a
        JOIN quizzes q ON q._id = a.quiz
        JOIN courses c ON c._id = q.course
        WHERE a.user = ? 
          AND a.submissionTime >= DATE_SUB(CURDATE(), INTERVAL ${interval})
        GROUP BY c._id
        ORDER BY name;
      `;
    }
    values = [userId];
  } else if (userRole === "FACULTY") {
    if (countType === "TotalAttempts") {
      // Count all attempts for each student.
      query = `
        SELECT CONCAT(u.firstName, ' ', u.lastName) AS name, 
               COUNT(a._id) AS count
        FROM attempts a
        JOIN users u ON a.user = u._id
        WHERE a.submissionTime >= DATE_SUB(CURDATE(), INTERVAL ${interval})
        GROUP BY u._id
        ORDER BY name;
      `;
    } else if (countType === "CompletedQuizzes") {
      // Count distinct quizzes attempted by each student.
      query = `
        SELECT CONCAT(u.firstName, ' ', u.lastName) AS name,
               COUNT(DISTINCT a.quiz) AS count
        FROM attempts a
        JOIN users u ON a.user = u._id
        WHERE a.submissionTime >= DATE_SUB(CURDATE(), INTERVAL ${interval})
        GROUP BY u._id
        ORDER BY name;
      `;
    }
    // In the FACULTY branch, we don't filter by the faculty's userId,
    // so no values need to be passed.
    values = [];
  }

  const [rows] = await db.query(query, values);
  return rows;
}

export async function getCommunicationData(userId) {
	const query = `
      SELECT 
        CONCAT(u.firstName, ' ', u.lastName) AS name,
        t.count AS count,
        u.role AS role
      FROM (
        SELECT
          CASE WHEN sender_id = ? THEN receiver_id ELSE sender_id END AS other_user,
          COUNT(*) AS count
        FROM messages
        WHERE sender_id = ? OR receiver_id = ?
        GROUP BY other_user
      ) AS t
      JOIN users u ON u._id = t.other_user
      ORDER BY t.count DESC;
    `;
	const values = [userId, userId, userId];
	const [rows] = await db.query(query, values);
	return rows;
}

export async function getAIResponse(userId, inputText) {
  if (!inputText) {
    throw new Error("Input text is required.");
  }

  // Step 1: Generate SQL using GPT
  const sqlPrompt = `
    You are an expert SQL generator. Based on the following database schema, convert the given natural language input into a valid, readable SQL query.

    Schema:
    - users(_id, username, password, firstName, lastName, email, dob, role)
    - courses(_id, name, number, description)
    - enrollments(_id, course, user, status)
    - quizzes(_id, name, course, instruction, num_of_questions, quiz_type, points, assignment_group, difficulty)
    - questions(_id, type, quiz, description, points, possible_answers, correct_answer)
    - attempts(_id, user, quiz, attemptCount, score, submissionTime)
    - answers(attempt_id, question_id, user_answer)
    - messages(_id, sender_id, receiver_id, subject, content, sendTime)

    Your task:
    - Use only the tables and columns specified above.
    - Use JOINs where needed to include relevant information.
    - Use meaningful column aliases with human-friendly labels (e.g., "Student Name", "Email", "Course Title").
    - Concatenate firstName and lastName as full names if needed.
    - If the query is about the current user (e.g. contains "my", "me", or "I"), filter using the provided user ID.
    - To accurately reflect the user's best performance, we consider only the highest score of all attempts per quiz for that user
    - Return only the SQL query, without any explanations.

    User Input: "${inputText}"
    Current userID: "${userId}"
  `.trim();

  try {
    // 🔧 Step 1: Let GPT generate the SQL
    const sqlRes = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: sqlPrompt },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    let aiSQL = sqlRes.data.choices[0].message.content.trim();

    // 🧹 Remove markdown ```sql blocks
    if (aiSQL.startsWith("```sql")) {
      aiSQL = aiSQL.replace(/```sql|```/g, "").trim();
    }

    console.log("Generated SQL:", aiSQL);

    // 🧪 Step 2: Execute the SQL
    const [rows] = await db.query(aiSQL);

    // 📘 Step 3: Ask GPT to convert raw result to a natural language answer
    const naturalLangPrompt = `
      You are a helpful assistant that summarizes SQL query results into natural, friendly user-facing answers.

      Original Question: "${inputText}"
      Raw Result (JSON): ${JSON.stringify(rows, null, 2)}

      Please return a clear and concise response. Avoid using JSON formatting.
      If the result is empty, say so clearly.
    `.trim();

    const explainRes = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: naturalLangPrompt },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const answer = explainRes.data.choices[0].message.content.trim();
    return answer;
  } catch (error) {
    console.error("Error in getAIResponse:", error.response?.data || error.message);
    throw new Error("Failed to fetch AI response.");
  }
}
