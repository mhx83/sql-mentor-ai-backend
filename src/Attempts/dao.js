import db from "../model.js";

export async function createAttempt(attempt) {
    // Check if user already attempted the quiz
    const [existingAttempt] = await db.query(
      "SELECT * FROM attempts WHERE user = ? AND quiz = ? ORDER BY submissionTime DESC",
      [attempt.user, attempt.quiz]
    );

    let attemptCount = 1;
    if (existingAttempt.length > 0) {
        // Update the last attempt count
        attemptCount = existingAttempt[0].attemptCount + 1;
    }

    // Create new attempt
    const [newAttempt] = await db.query(
      "INSERT INTO attempts (user, quiz, score, attemptCount, submissionTime) VALUES (?, ?, ?, ?, ?)",
      [attempt.user, attempt.quiz, attempt.score, attemptCount, new Date()]
    );

    // Insert answers
    for (const [questionId, userAnswer] of Object.entries(attempt.answers)) {
        await db.query(
          "INSERT INTO answers (attempt_id, question_id, user_answer) VALUES (?, ?, ?)",
          [newAttempt.insertId, questionId, userAnswer]
        );
    }

    return { _id: newAttempt.insertId, attemptCount: 1 };
}


export function removeAttempt(attemptId) {
    return model.deleteOne(attemptId);
}

export async function calculateScore(attemptId) {
    try {
        // Step 1: Fetch Attempt Data
        const [attemptResults] = await db.query(
          "SELECT user, quiz FROM attempts WHERE _id = ?",
          [attemptId]
        );
        if (attemptResults.length === 0) throw new Error("Attempt not found");

        const attempt = attemptResults[0];

        // Step 2: Fetch Quiz Questions
        const [questions] = await db.query(
          "SELECT _id, type, correct_answer, possible_answers, points FROM questions WHERE quiz = ?",
          [attempt.quiz]
        );

        // Step 3: Convert Question Data to a Map
        const questionDetails = new Map();
        questions.forEach(q => {
            questionDetails.set(q._id.toString(), {
                type: q.type,
                correctAnswer: q.correct_answer,
                possibleAnswers: q.possible_answers,
                points: q.points
            });
        });

        // Step 4: Fetch User's Submitted Answers
        const [userAnswers] = await db.query(
          "SELECT question_id, user_answer FROM answers WHERE attempt_id = ?",
          [attemptId]
        );

        // Step 5: Calculate Score
        let totalScore = 0;

        for (const { question_id, user_answer } of userAnswers) {
            const question = questionDetails.get(question_id.toString());
            if (!question) continue;

            const { type, correctAnswer, possibleAnswers, points } = question;
            let isCorrect = false;

            if (type === "multiple choice") {
                isCorrect = user_answer === correctAnswer;
            } else if (type === "fill in the blank") {
                isCorrect = possibleAnswers.some(ans => ans.toLowerCase() === user_answer.toLowerCase());
            } else if (type === "true or false") {
                isCorrect = user_answer === correctAnswer;
            }

            if (isCorrect) totalScore += points;
        }

        // Step 6: Update Score in Database
        await db.query("UPDATE attempts SET score = ? WHERE _id = ?", [totalScore, attemptId]);

        return { attemptId, user: attempt.user, quiz: attempt.quiz, score: totalScore };
    } catch (error) {
        console.error("Error calculating score:", error.message);
        throw error;
    }
}

export async function getLastAttemptForQuiz(userId, quizId) {
    // Fetch the latest attempt
    const [attempt] = await db.query(
      "SELECT * FROM attempts WHERE user = ? AND quiz = ? ORDER BY _id DESC LIMIT 1",
      [userId, quizId]
    );

    if (attempt.length === 0) {
        return null;
    }

    // Fetch answers related to the attempt
    const [answers] = await db.query(
      "SELECT question_id, user_answer FROM answers WHERE attempt_id = ?",
      [attempt[0]._id]
    );

    // Convert to MongoDB-style object structure
    const formattedAnswers = [{ ...Object.fromEntries(answers.map(a => [a.question_id, a.user_answer])) }];

    return {
        _id: attempt[0]._id,
        user: userId,
        quiz: quizId,
        attemptCount: attempt[0].attemptCount,
        score: attempt[0].score,
        answers: formattedAnswers
    };
}

