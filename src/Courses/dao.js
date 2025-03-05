import db from "../model.js"; // Import MySQL connection

// Find all courses
export async function findAllCourses() {
  const [rows] = await db.query("SELECT * FROM courses");
  return rows;
}

// Create a new course
export async function createCourse(course) {
  const { name, number, description } = course;
  const insertSQL = `
    INSERT INTO courses (name, number, description)
    VALUES (?, ?, ?);
  `;
  const [result] = await db.query(insertSQL, [name, number, description]);
  return { _id: result.insertId, ...course };
}

// Delete a course by ID
export async function deleteCourse(courseId) {
  const [result] = await db.query("DELETE FROM courses WHERE _id = ?", [courseId]);
  return result.affectedRows > 0;
}

// Update a course by ID
export async function updateCourse(courseId, courseUpdates) {
  const { name, number, description } = courseUpdates;
  const updateSQL = `
    UPDATE courses 
    SET name = ?, number = ?, description = ?
    WHERE _id = ?;
  `;
  const [result] = await db.query(updateSQL, [name, number, description, courseId]);
  return result.affectedRows > 0 ? { _id: courseId, ...courseUpdates } : null;
}

