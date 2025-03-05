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
       shuffle_answer ENUM('YES', 'NO') DEFAULT 'NO',
       has_time_limit ENUM('YES', 'NO') DEFAULT 'NO',
       time_limit INT DEFAULT NULL,
       has_many_attempts ENUM('YES', 'NO') DEFAULT 'NO',
       how_many_attempts INT DEFAULT NULL,
       show_correct_answer ENUM('YES', 'NO') DEFAULT 'NO',
       show_answer_date DATE DEFAULT NULL,
       access_code_required ENUM('YES', 'NO') DEFAULT 'NO',
       access_code VARCHAR(255) DEFAULT NULL,
       one_question_at_a_time ENUM('YES', 'NO') DEFAULT 'NO',
       webcam_required ENUM('YES', 'NO') DEFAULT 'NO',
       lock_questions_after_answering ENUM('YES', 'NO') DEFAULT 'NO',
       due_date DATE DEFAULT NULL,
       available_date DATE DEFAULT NULL,
       until_date DATE DEFAULT NULL,
       publish_status VARCHAR(50) DEFAULT 'published',
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
};

export default createTables;

