import db from "../model.js"; // Import MySQL connection

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
        JOIN users u ON e.user = u._id
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
    const interval = dateRange === "Weekly" ? "7 DAY" : "30 DAY";
  
    let query = "";
    let values = [];
  
    if (userRole === "STUDENT") {
      query = `
        SELECT c.name AS name, 
               COUNT(a._id) AS count
        FROM attempts a
        JOIN quizzes q ON q._id = a.quiz
        JOIN courses c ON c._id = q.course
        WHERE a.user = ? AND a.submissionTime >= DATE_SUB(CURDATE(), INTERVAL ${interval})
        GROUP BY c._id;
      `;
      values = [userId];
    } else if (userRole === "FACULTY") {
      query = `
        SELECT s.name AS name, 
               COUNT(a._id) AS count
        FROM attempts a
        JOIN students s ON a.user = s._id
        AND a.submissionTime >= DATE_SUB(CURDATE(), INTERVAL ${interval})
        GROUP BY s._id;
      `;
      values = [userId];
    }
  
    const [rows] = await db.query(query, values);
    return rows;
}

export async function getCommunicationData(userId) {
    const query = `
      SELECT 
        CONCAT(u.firstName, ' ', u.lastName) AS name,
        u.role AS role,
        t.count AS count
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