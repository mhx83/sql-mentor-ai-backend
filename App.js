import express from "express";
import cors from "cors";
import UserRoutes from "./src/Users/routes.js";
import CourseRoutes from "./src/Courses/routes.js";
import QuizRoutes from "./src/Quizzes/routes.js";
import QuestionRoutes from "./src/Questions/routes.js";
import session from "express-session";
import "dotenv/config";
import AttemptRoutes from "./src/Attempts/routes.js";
import createTables from "./src/schema.js";
import insertSampleData from "./src/seed.js";
import mysql from "mysql2/promise";

const isProduction = process.env.NODE_ENV === "production"

// MySQL Connection Configuration
let dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

if (isProduction) {
    dbConfig = {
        user: "root",
        password: "87654321",
        database: "project",
        socketPath: "/cloudsql/db-group9-451622:us-west1:group9-sql-mentor-project",
    }
}

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
const allowedOrigins = [
    "http://localhost:3000",
    process.env.FRONTEND_URL // This will be your Netlify URL
];

app.use(
  cors({
      credentials: true,
      origin: allowedOrigins,
  })
);

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true, // Prevents JavaScript access to cookies
        secure: true, // Ensures cookies only work over HTTPS
        sameSite: "None", // Allows cookies in cross-site requests
    }
};

if (process.env.NODE_ENV === "production") {
    sessionOptions.proxy = true;
}

app.use(session(sessionOptions));

app.use(express.json());
UserRoutes(app);
CourseRoutes(app);
QuizRoutes(app);
QuestionRoutes(app);
AttemptRoutes(app);

// Define a test route
app.get("/", (req, res) => {
    res.send({ message: "Welcome to the Group9 Project Server!" });
});

const PORT = process.env.PORT || (process.env.NODE_ENV === "production" ? 8080 : 4000);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
