import * as dao from "./dao.js";
import * as quizDao from "../Quizzes/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {

    app.get("/api/courses", async (req, res) => {
        const courses = await dao.findAllCourses();
        res.send(courses);
    });

    app.post("/api/courses", async (req, res) => {
        const course = await dao.createCourse(req.body);
        const currentUser = req.session["currentUser"];
        if (currentUser) {
            await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
        }
        res.json(course);
    });

    app.delete("/api/courses/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const status = await dao.deleteCourse(courseId);
        await enrollmentsDao.unenrollUserFromDeletedCourse(courseId);
        res.send(status);
    });

    app.put("/api/courses/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const courseUpdates = req.body;
        const status = await dao.updateCourse(courseId, courseUpdates);
        res.send(status);
    });

    app.get("/api/courses/:courseId/people", (req, res) => {
        const { courseId } = req.params;
        const enrolledUsers = dao.findAllPeopleInCourse(courseId);
        res.json(enrolledUsers);
    });

    app.get("/api/courses/:courseId/quizzes", async (req, res) => {
        const { courseId } = req.params;
        const quizzes = await quizDao.findQuizzesForCourse(courseId);
        res.json(quizzes);
    });

    app.get("/api/courses/:courseId/quizzes/published", async (req, res) => {
        const { courseId } = req.params;
        const quizzes = await quizDao.findPublishedQuizzes(courseId);
        res.json(quizzes);
    });

    app.post("/api/courses/:courseId/quizzes", async (req, res) => {
        const { courseId } = req.params;
        const quiz = {
            ...req.body,
            course: courseId,
        };
        const newQuiz = await quizDao.createQuiz(quiz);
        res.send(newQuiz);
    })

    const findUsersForCourse = async (req, res) => {
        const { cid } = req.params;
        const users = await enrollmentsDao.findUsersForCourse(cid);
        res.json(users);
    };

    app.get("/api/courses/:cid/users", findUsersForCourse);

}