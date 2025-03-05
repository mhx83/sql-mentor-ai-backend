import db from "./model.js"; // Shared MySQL connection

const insertSampleData = async () => {
  // Insert Users (Only if table is empty)
  const [userCount] = await db.query("SELECT COUNT(*) AS count FROM users");
  if (userCount[0].count === 0) {
  await db.query(`
        INSERT INTO users (username, password, firstName, lastName, email, dob, role)
        VALUES 
          ('iron_man', 'stark123', 'Tony', 'Stark', 'tony@stark.com', '1970-05-29', 'FACULTY'),
          ('dark_knight', 'wayne123', 'Bruce', 'Wayne', 'bruce@wayne.com', '1972-02-19', 'STUDENT');
      `);
    }

  const [courseCount] = await db.query("SELECT COUNT(*) AS count FROM courses");
  if (courseCount[0].count === 0) {
    await db.query(`
      INSERT INTO courses (name, number, description)
      VALUES
        ('Ancient Chinese Environmental Management', 'RS119', 'This course explores the principles and practices of environmental management.'),
        ('Leadership Lessons from Chinese Mythology', 'RS120', 'Drawing on stories from Chinese mythology and history, this course examines leadership.'),
        ('Hydraulic Engineering in Ancient Civilizations', 'RS121', 'This engineering course offers an in-depth study of hydraulic projects.');
    `);
  }

  // Check if enrollments table is empty
  const [enrollmentCount] = await db.query("SELECT COUNT(*) AS count FROM enrollments");
  if (enrollmentCount[0].count === 0) {
    await db.query(`
    INSERT INTO enrollments (course, user, status)
    VALUES 
      (1, 2, 'ENROLLED'),
      (1, 1, 'ENROLLED'),
      (2, 4, 'ENROLLED'),
      (2, 1, 'ENROLLED'),
      (3, 2, 'ENROLLED'),
      (4, 2, 'ENROLLED'),
      (4, 4, 'ENROLLED'),
      (4, 1, 'ENROLLED'); 
  `);
  }
};

export default insertSampleData;

