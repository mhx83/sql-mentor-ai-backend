import * as attemptsDao from "./dao.js";
import express from "express";

export default function QuizRoutes(app) {
    app.post("/api/quizzes/:quizId/submit", async (req, res) => {
        try {
            const { quizId } = req.params;
            const { answers } = req.body;
            const userId = req.user?._id; // 假设用户信息在 `req.user` 中

            if (!answers || Object.keys(answers).length === 0) {
                return res.status(400).send("No answers provided.");
            }

            const result = await attemptsDao.createAttempt(userId, quizId, answers);
            res.status(201).json(result);
        } catch (error) {
            console.error("Error submitting quiz:", error);
            res.status(500).send("Failed to submit the quiz.");
        }
    });
}