import db from "./model.js"; // Shared database connection

const createTables = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      _id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      firstName VARCHAR(50),
      lastName VARCHAR(50),
      email VARCHAR(100),
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

  await db.query(`
    CREATE TABLE IF NOT EXISTS quizzes (
       _id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       course INT NOT NULL,
       instruction TEXT,
       num_of_questions INT DEFAULT 0,
       quiz_type VARCHAR(50),
       points INT DEFAULT 0,
       assignment_group VARCHAR(255),
       difficulty VARCHAR(50),
       FOREIGN KEY (course) REFERENCES courses(_id) ON DELETE CASCADE
      );
  `);


  await db.query(`
    CREATE TABLE IF NOT EXISTS questions (
       _id INT AUTO_INCREMENT PRIMARY KEY,
       type VARCHAR(50),
       quiz INT NOT NULL,
       description TEXT,
       points INT DEFAULT 0,
       possible_answers JSON,
       correct_answer VARCHAR(255),
       FOREIGN KEY (quiz) REFERENCES quizzes(_id) ON DELETE CASCADE
      );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS attempts (
      _id INT AUTO_INCREMENT PRIMARY KEY,
      user INT NOT NULL,
      quiz INT NOT NULL,
      attemptCount INT DEFAULT 1,
      score INT DEFAULT 0,
      submissionTime DATETIME,
      FOREIGN KEY (user) REFERENCES users(_id),
      FOREIGN KEY (quiz) REFERENCES quizzes(_id)
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS answers (
       attempt_id INT NOT NULL,
       question_id INT NOT NULL,
       user_answer VARCHAR(255) NOT NULL,
       PRIMARY KEY (attempt_id, question_id),
       FOREIGN KEY (attempt_id) REFERENCES attempts(_id),
       FOREIGN KEY (question_id) REFERENCES questions(_id)
    );
  `);
};

export default createTables;
