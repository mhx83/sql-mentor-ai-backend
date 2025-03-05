import db from "../model.js";

export async function findQuestionsForQuiz(quizId) {
    const [questions] = await db.query("SELECT * FROM questions WHERE quiz = ?", [quizId]);
    return questions;
}

export async function getQuestion(questionId) {
    const [questions] = await db.query("SELECT * FROM questions WHERE _id = ?", [questionId]);
    return questions[0]; // Return first result
}

export async function createQuestion(question) {
    const { type, quiz, description, points, possible_answers, correct_answer } = question;
    const [result] = await db.query(
      "INSERT INTO questions (type, quiz, description, points, possible_answers, correct_answer) VALUES (?, ?, ?, ?, ?, ?)",
      [type, quiz, description, points, JSON.stringify(possible_answers), correct_answer]
    );
    return { _id: result.insertId, ...question };
}

export async function deleteQuestion(questionId) {
    await db.query("DELETE FROM questions WHERE _id = ?", [questionId]);
}

export async function updateQuestion(questionId, questionUpdates) {
    const { type, description, points, possible_answers, correct_answer } = questionUpdates;
    await db.query(
      "UPDATE questions SET type = ?, description = ?, points = ?, possible_answers = ?, correct_answer = ? WHERE _id = ?",
      [type, description, points, JSON.stringify(possible_answers), correct_answer, questionId]
    );
}
