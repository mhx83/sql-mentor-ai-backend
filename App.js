import express from 'express';
import cors from "cors";
import UserRoutes from "./src/Users/routes.js";
import CourseRoutes from "./src/Courses/routes.js";
import QuizRoutes from "./src/Quizzes/routes.js";
import QuestionRoutes from './src/Questions/routes.js';
import session from "express-session";
import "dotenv/config";
import AttemptRoutes from './src/Attempts/routes.js';
import createTables from "./src/schema.js";
import insertSampleData from "./src/seed.js";
import mysql from "mysql2/promise";


// MySQL Connection Configuration
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

// Connect to Database
let db;
(async () => {
    try {
        db = await mysql.createConnection(dbConfig);
        console.log("Connected to MySQL database:", dbConfig.database);
    } catch (err) {
        console.error("Error connecting to MySQL:", err);
        process.exit(1); // Exit process if DB connection fails
    }
})();

// Ensure tables and sample data exist at startup
(async () => {
    await createTables();
    await insertSampleData();
})();

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
QuizRoutes(app);
QuestionRoutes(app);
AttemptRoutes(app);
app.listen(process.env.PORT || 4000);
