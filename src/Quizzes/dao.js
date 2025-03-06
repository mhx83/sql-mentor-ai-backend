import db from "../model.js"

export async function findQuizzesForCourse(courseId) {
    const [rows] = await db.query("SELECT * FROM quizzes WHERE course = ?", [courseId]);
    return rows;
}

export async function findPublishedQuizzes(courseId) {
    const [rows] = await db.query(
      "SELECT * FROM quizzes WHERE course = ? AND publish_status = 'published'",
      [courseId]
    );
    return rows;
}

export async function getQuiz(quizId) {
    const [rows] = await db.query("SELECT * FROM quizzes WHERE _id = ?", [quizId]);
    return rows.length > 0 ? rows[0] : null;
}

const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toISOString().split("T")[0]; // Converts to 'YYYY-MM-DD'
};

export async function createQuiz(quiz) {
    const { name, course, instruction, quiz_type } = quiz;
    const [result] = await db.query(
      `INSERT INTO quizzes (name, course, instruction, quiz_type) 
         VALUES (?, ?, ?, ?)`,
      [name, course, instruction, quiz_type]
    );
    return { _id: result.insertId, ...quiz };  // Replacing `id` with `_id`
}

export async function deleteQuiz(quizId) {
    await db.query("DELETE FROM quizzes WHERE _id = ?", [quizId]);
}

export async function updateQuiz(quizId, quizUpdates) {
    const {
        name, instruction, course, points, num_of_questions, quiz_type, assignment_group, difficulty
    } = quizUpdates;

    console.log(quizUpdates);

    const [result] = await db.query(
      `UPDATE quizzes SET 
            name = ?, instruction = ?, course = ?, points = ?, num_of_questions = ?,
            quiz_type = ?, assignment_group = ?, difficulty = ?
        WHERE _id = ?`,
      [
        name, instruction, course, points, num_of_questions,
        quiz_type, assignment_group, difficulty,
        quizId
      ]
    );

    return result;
}

export async function setPublishStatus(quizId, status) {
    const [result] = await db.query("UPDATE quizzes SET publish_status = ? WHERE _id = ?", [status, quizId]);
    return result;
}