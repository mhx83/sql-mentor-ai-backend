import express from 'express';
import Hello from "./Hello.js";
import cors from "cors";
import UserRoutes from "./src/Users/routes.js";
import CourseRoutes from "./src/Courses/routes.js";
import ModuleRoutes from "./src/Modules/routes.js";
import AssignmentRoutes from './src/Assignments/routes.js';
import QuizRoutes from "./src/Quizzes/routes.js";
import QuestionRoutes from './src/Questions/routes.js';
import session from "express-session";
import "dotenv/config";
import mongoose from "mongoose";
import AttemptRoutes from './src/Attempts/routes.js';


const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING);

const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
})
);

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));


app.use(express.json());
UserRoutes(app);
CourseRoutes(app);
// ModuleRoutes(app);
// AssignmentRoutes(app);
QuizRoutes(app);
QuestionRoutes(app);
AttemptRoutes(app);
// Hello(app);
app.listen(process.env.PORT || 4000);
