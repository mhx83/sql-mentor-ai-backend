import db from "../model.js"; // Import MySQL connection

// Find all courses a user is enrolled in
export async function findCoursesForUser(userId) {
    const query = `
    SELECT courses.* FROM courses
    JOIN enrollments ON courses._id = enrollments.course
    WHERE enrollments.user = ?;
  `;
    const [rows] = await db.query(query, [userId]);
    return rows;
}

// Find all users enrolled in a specific course
export async function findUsersForCourse(courseId) {
    const query = `
    SELECT users.* FROM users
    JOIN enrollments ON users._id = enrollments.user
    WHERE enrollments.course = ?;
  `;
    const [rows] = await db.query(query, [courseId]);
    return rows;
}

// Enroll a user in a course
export async function enrollUserInCourse(user, course) {
    const query = `
    INSERT INTO enrollments (user, course, status) 
    VALUES (?, ?, 'ENROLLED');
  `;
    const [result] = await db.query(query, [user, course]);
    return { _id: result.insertId, user, course, status: "ENROLLED" };
}

// Unenroll a user from a course
export async function unenrollUserFromCourse(user, course) {
    const query = `
    DELETE FROM enrollments 
    WHERE user = ? AND course = ?;
  `;
    const [result] = await db.query(query, [user, course]);
    return result.affectedRows > 0;
}

// Unenroll all users from a deleted course
export async function unenrollUserFromDeletedCourse(courseId) {
    const query = `
    DELETE FROM enrollments 
    WHERE course = ?;
  `;
    const [result] = await db.query(query, [courseId]);
    return result.affectedRows > 0;
}
