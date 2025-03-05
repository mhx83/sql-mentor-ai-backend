import db from "./model.js"; // Shared database connection

const createTables = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      _id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      firstName VARCHAR(50),
      lastName VARCHAR(50),
      email VARCHAR(100) UNIQUE NOT NULL,
      dob DATE,
      role ENUM('STUDENT', 'FACULTY', 'ADMIN', 'USER') DEFAULT 'USER'
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS courses (
      _id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      number VARCHAR(20) UNIQUE NOT NULL,
      description TEXT
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS enrollments (
      _id INT AUTO_INCREMENT PRIMARY KEY,
      course INT NOT NULL,
      user INT NOT NULL,
      status ENUM('ENROLLED', 'DROPPED', 'COMPLETED') DEFAULT 'ENROLLED',
      FOREIGN KEY (course) REFERENCES courses(_id) ON DELETE CASCADE,
      FOREIGN KEY (user) REFERENCES users(_id) ON DELETE CASCADE
    );
  `);
};

export default createTables;
