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
    const { name, course, instruction, quiz_type, points, num_of_questions, publish_status } = quiz;
    const [result] = await db.query(
      `INSERT INTO quizzes (name, course, instruction, quiz_type, points, num_of_questions, publish_status) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, course, instruction, quiz_type, points, num_of_questions, publish_status]
    );
    return { _id: result.insertId, ...quiz };  // Replacing `id` with `_id`
}

export async function deleteQuiz(quizId) {
    await db.query("DELETE FROM quizzes WHERE _id = ?", [quizId]);
}

export async function updateQuiz(quizId, quizUpdates) {
    const {
        name, instruction, course, points, shuffle_answer, has_time_limit, time_limit,
        has_many_attempts, how_many_attempts, show_correct_answer, show_answer_date,
        access_code_required, one_question_at_a_time, webcam_required,
        lock_questions_after_answering, due_date, available_date, until_date
    } = quizUpdates;

    const [result] = await db.query(
      `UPDATE quizzes SET 
            name = ?, instruction = ?, course = ?, points = ?, shuffle_answer = ?, 
            has_time_limit = ?, time_limit = ?, has_many_attempts = ?, how_many_attempts = ?, 
            show_correct_answer = ?, show_answer_date = ?, access_code_required = ?, 
            one_question_at_a_time = ?, webcam_required = ?, 
            lock_questions_after_answering = ?, due_date = ?, available_date = ?, until_date = ? 
        WHERE _id = ?`,
      [
          name, instruction, course, points, shuffle_answer, has_time_limit, time_limit,
          has_many_attempts, how_many_attempts, show_correct_answer,
          formatDate(show_answer_date), // Format to 'YYYY-MM-DD'
          access_code_required, one_question_at_a_time, webcam_required,
          lock_questions_after_answering,
          formatDate(due_date),  // Format date correctly
          formatDate(available_date),
          formatDate(until_date),
          quizId
      ]
    );

    return result;
}

export async function setPublishStatus(quizId, status) {
    const [result] = await db.query("UPDATE quizzes SET publish_status = ? WHERE _id = ?", [status, quizId]);
    return result;
}