import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
        quiz: { type: mongoose.Schema.Types.ObjectId, ref: "QuizModel" },
        answers: { type: Array, required: true },
        score: { type: Number, default: 0 },
    },
    { collection: "attempts" }
);

export default schema;