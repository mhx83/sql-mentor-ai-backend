import db from "./model.js"; // Shared MySQL connection

const insertSampleData = async () => {
  // Insert Users (Only if table is empty)
  const [userCount] = await db.query("SELECT COUNT(*) AS count FROM users");
  if (userCount[0].count === 0) {
  await db.query(`
    INSERT INTO users (username, password, firstName, lastName, email, dob, role)
    VALUES
      ('john_doe', '123', 'John', 'Doe', 'john.doe@example.com', '1998-04-12', 'STUDENT'),
      ('jane_smith', '123', 'Jane', 'Smith', 'jane.smith@example.com', '1988-06-24', 'STUDENT'),
      ('mike_jones', '123', 'Mike', 'Jones', 'mike.jones@example.com', '1997-09-05', 'STUDENT'),
      ('linda_green', '123', 'Linda', 'Green', 'linda.green@example.com', '1995-11-30', 'STUDENT'),
      ('peter_parker', '123', 'Peter', 'Parker', 'peter.parker@example.com', '1999-07-17', 'STUDENT'),
      ('tony_stark', '123', 'Tony', 'Stark', 'tony.stark@example.com', '1975-05-29', 'STUDENT'),
      ('bruce_wayne', '123', 'Bruce', 'Wayne', 'bruce.wayne@example.com', '1985-02-19', 'STUDENT'),
      ('clark_kent', '123', 'Clark', 'Kent', 'clark.kent@example.com', '1965-05-05', 'FACULTY'),
      ('natasha_romanoff', '123', 'Natasha', 'Romanoff', 'natasha.romanoff@example.com', '1994-11-22', 'FACULTY'),
      ('steve_rogers', '123', 'Steve', 'Rogers', 'steve.rogers@example.com', '1980-07-04', 'FACULTY');
      `);
    }

  const [courseCount] = await db.query("SELECT COUNT(*) AS count FROM courses");
  if (courseCount[0].count === 0) {
    await db.query(`
      INSERT INTO courses (name, number, description)
      VALUES
          ('Introduction to Databases', 'DB101', 'Fundamentals of database systems and SQL'),
          ('Advanced SQL Queries', 'DB102', 'Advanced SQL techniques and optimization strategies'),
          ('Database Design', 'DB103', 'Entity-Relationship diagrams and normalization'),
          ('Transaction Management', 'DB104', 'ACID properties and concurrency control'),
          ('Indexing and Query Optimization', 'DB105', 'Optimizing SQL queries for performance'),
          ('NoSQL Databases', 'DB106', 'Introduction to NoSQL and its differences from relational databases'),
          ('Database Security', 'DB107', 'Securing databases and preventing SQL injection attacks'),
          ('Data Warehousing', 'DB108', 'Concepts of data warehouses and OLAP'),
          ('Big Data and Databases', 'DB109', 'Handling big data in modern databases'),
          ('Cloud Databases', 'DB110', 'Database-as-a-Service and cloud storage solutions');
    `);
  }

  // Check if enrollments table is empty
  const [enrollmentCount] = await db.query("SELECT COUNT(*) AS count FROM enrollments");
  if (enrollmentCount[0].count === 0) {
    await db.query(`
      INSERT INTO enrollments (course, user, status)
      VALUES
          (1, 1, 'Enrolled'),
          (2, 2, 'Enrolled'),
          (3, 3, 'Enrolled'),
          (4, 4, 'Enrolled'),
          (5, 5, 'Enrolled'),
          (6, 6, 'Enrolled'),
          (7, 7, 'Enrolled'),
          (8, 8, 'Enrolled'),
          (9, 9, 'Enrolled'),
          (10, 10, 'Enrolled');
  `);
  }

  const [quizCount] = await db.query("SELECT COUNT(*) AS count FROM quizzes");
  if (quizCount[0].count === 0) {
    await db.query(`
      INSERT INTO quizzes 
        (name, course, instruction, num_of_questions, quiz_type, points, assignment_group, difficulty)
      VALUES
          ('SQL Fundamentals', 1, 'Test your basic SQL knowledge.', 4, 'Graded Quiz', 20, 'QUIZZES', 'Easy'),
          ('SQL Syntax', 1, 'Assess your understanding of SQL syntax.', 3, 'Graded Quiz', 15, 'QUIZZES', 'Easy'),
          ('SQL Operators', 1, 'Test your knowledge of SQL operators.', 4, 'Graded Quiz', 18, 'QUIZZES', 'Medium'),
          ('SQL Aggregation', 1, 'Evaluate your knowledge of aggregate functions.', 5, 'Graded Quiz', 22, 'QUIZZES', 'Medium'),
          ('SQL Joins', 1, 'Test your ability to use different types of JOINs.', 5, 'Graded Quiz', 25, 'QUIZZES', 'Hard'),
          ('SQL Subqueries', 1, 'Check your understanding of subqueries.', 3, 'Graded Quiz', 17, 'QUIZZES', 'Hard'),

          ('Advanced SQL', 2, 'Test your advanced SQL skills.', 3, 'Graded Quiz', 13, 'QUIZZES', 'Medium'),
          ('SQL Functions', 2, 'Evaluate your knowledge of SQL window functions.', 4, 'Graded Quiz', 20, 'QUIZZES', 'Hard'),
          ('SQL Optimization', 2, 'Assess your SQL query optimization skills.', 5, 'Graded Quiz', 25, 'QUIZZES', 'Hard'),
          ('SQL Transactions', 2, 'Test your knowledge of transactions and concurrency control.', 4, 'Graded Quiz', 22, 'QUIZZES', 'Hard'),
          ('SQL Security', 2, 'Evaluate your understanding of SQL security principles.', 3, 'Graded Quiz', 18, 'QUIZZES', 'Medium'),
          ('SQL Triggers', 2, 'Test your understanding of SQL triggers.', 3, 'Graded Quiz', 15, 'QUIZZES', 'Medium'),

          ('Database Design', 3, 'Test your understanding of ER diagrams and normalization.', 2, 'Graded Quiz', 10, 'QUIZZES', 'Hard'),
          ('ER Modeling', 3, 'Evaluate your knowledge of Entity-Relationship models.', 4, 'Graded Quiz', 18, 'QUIZZES', 'Hard'),
          ('Database Constraints', 3, 'Test your knowledge of database constraints.', 3, 'Graded Quiz', 15, 'QUIZZES', 'Medium'),
          ('Relational Algebra', 3, 'Assess your understanding of relational algebra.', 4, 'Graded Quiz', 20, 'QUIZZES', 'Hard'),
          ('Functional Dependencies', 3, 'Evaluate your understanding of functional dependencies.', 3, 'Graded Quiz', 17, 'QUIZZES', 'Medium'),
          ('Data Modeling', 3, 'Test your ability to design efficient database schemas.', 5, 'Graded Quiz', 25, 'QUIZZES', 'Hard'),

          ('Database Transactions', 4, 'Assess your understanding of database transactions.', 6, 'Graded Quiz', 60, 'QUIZZES', 'Medium'),
          ('ACID Properties', 4, 'Test your knowledge of ACID properties in databases.', 3, 'Graded Quiz', 15, 'QUIZZES', 'Medium'),
          ('Transaction Isolation', 4, 'Evaluate your understanding of isolation levels in transactions.', 4, 'Graded Quiz', 20, 'QUIZZES', 'Hard'),
          ('Deadlock Prevention', 4, 'Assess your knowledge of deadlock prevention strategies.', 5, 'Graded Quiz', 25, 'QUIZZES', 'Hard'),
          ('Database Recovery', 4, 'Test your understanding of database recovery techniques.', 3, 'Graded Quiz', 18, 'QUIZZES', 'Medium'),
          ('Concurrency Control', 4, 'Evaluate your ability to handle concurrency in databases.', 4, 'Graded Quiz', 22, 'QUIZZES', 'Hard'),

          ('Indexing', 5, 'Test your knowledge of database indexing and query optimization.', 2, 'Graded Quiz', 10, 'QUIZZES', 'Hard'),
          ('SQL Index Types', 5, 'Evaluate your knowledge of different types of indexes.', 4, 'Graded Quiz', 20, 'QUIZZES', 'Medium'),
          ('Query Optimization', 5, 'Test your ability to optimize SQL queries.', 5, 'Graded Quiz', 25, 'QUIZZES', 'Hard'),
          ('Indexing Strategies', 5, 'Assess your understanding of indexing strategies.', 3, 'Graded Quiz', 15, 'QUIZZES', 'Medium'),
          ('Execution Plans', 5, 'Evaluate your knowledge of query execution plans.', 4, 'Graded Quiz', 18, 'QUIZZES', 'Hard'),
          ('Partitioning', 5, 'Test your understanding of data partitioning and sharding.', 4, 'Graded Quiz', 22, 'QUIZZES', 'Hard'),

          ('Normalization', 6, 'Evaluate your understanding of database normalization.', 4, 'Graded Quiz', 26, 'QUIZZES', 'Medium'),
          ('First Normal Form', 6, 'Test your knowledge of 1NF principles.', 3, 'Graded Quiz', 15, 'QUIZZES', 'Medium'),
          ('Second Normal Form', 6, 'Assess your understanding of 2NF and partial dependencies.', 3, 'Graded Quiz', 18, 'QUIZZES', 'Hard'),
          ('Third Normal Form', 6, 'Evaluate your understanding of 3NF and transitive dependencies.', 4, 'Graded Quiz', 20, 'QUIZZES', 'Hard'),
          ('BCNF', 6, 'Test your knowledge of Boyce-Codd Normal Form.', 3, 'Graded Quiz', 17, 'QUIZZES', 'Medium'),
          ('Denormalization', 6, 'Assess your understanding of when to denormalize a database.', 4, 'Graded Quiz', 22, 'QUIZZES', 'Hard');
  `);
  }


  const [questionCount] = await db.query("SELECT COUNT(*) AS count FROM questions");
  if (questionCount[0].count === 0) {
    await db.query(`
      INSERT INTO questions (type, quiz, description, points, possible_answers, correct_answer)
      VALUES
          -- SQL Fundamentals Quiz (Quiz 1, 4 questions, 20 points total)
          ('multiple choice', 1, 'Which SQL statement is used to retrieve data?', 5, '["SELECT", "DELETE", "UPDATE", "INSERT"]', 'SELECT'),
          ('multiple choice', 1, 'What does SQL stand for?', 5, '["Structured Query Language", "Sequential Query Language", "Standard Query Language", "System Query Language"]', 'Structured Query Language'),
          ('multiple choice', 1, 'Which SQL statement is used to insert new records?', 5, '["INSERT", "DELETE", "UPDATE", "SELECT"]', 'INSERT'),
          ('multiple choice', 1, 'What is the purpose of the SQL JOIN clause?', 5, '["Combine rows from multiple tables", "Delete records", "Create a new table", "Filter records"]', 'Combine rows from multiple tables'),
          
          -- SQL Syntax Quiz (Quiz 2, 3 questions, 15 points total)
          ('multiple choice', 2, 'Which SQL clause is used to filter records?', 5, '["WHERE", "ORDER BY", "GROUP BY", "HAVING"]', 'WHERE'),
          ('multiple choice', 2, 'Which SQL clause is used to sort records?', 5, '["ORDER BY", "WHERE", "GROUP BY", "HAVING"]', 'ORDER BY'),
          ('multiple choice', 2, 'Which SQL clause is used to group records with aggregate functions?', 5, '["GROUP BY", "WHERE", "ORDER BY", "HAVING"]', 'GROUP BY'),
          
          -- SQL Operators Quiz (Quiz 3, 4 questions, 18 points total)
          ('multiple choice', 3, 'Which SQL operator is used to select values within a range?', 4, '["BETWEEN", "IN", "LIKE", "NOT"]', 'BETWEEN'),
          ('multiple choice', 3, 'Which SQL operator is used to search for a specified pattern?', 4, '["LIKE", "IN", "BETWEEN", "EXISTS"]', 'LIKE'),
          ('multiple choice', 3, 'Which SQL logical operator is used to combine multiple conditions?', 5, '["AND", "OR", "NOT", "XOR"]', 'AND'),
          ('multiple choice', 3, 'Which SQL operator is used to check if a value exists in a list?', 5, '["IN", "BETWEEN", "LIKE", "HAVING"]', 'IN'),
          
          -- SQL Aggregation Quiz (Quiz 4, 5 questions, 22 points total)
          ('multiple choice', 4, 'Which SQL function is used to get the total sum of a column?', 4, '["SUM", "COUNT", "AVG", "MAX"]', 'SUM'),
          ('multiple choice', 4, 'Which SQL function is used to count the number of records?', 4, '["COUNT", "SUM", "AVG", "MIN"]', 'COUNT'),
          ('multiple choice', 4, 'Which SQL function returns the highest value in a column?', 5, '["MAX", "MIN", "AVG", "SUM"]', 'MAX'),
          ('multiple choice', 4, 'Which SQL function is used to calculate the average of a column?', 4, '["AVG", "SUM", "COUNT", "MAX"]', 'AVG'),
          ('multiple choice', 4, 'Which SQL clause is used with aggregate functions to group results?', 5, '["GROUP BY", "ORDER BY", "HAVING", "DISTINCT"]', 'GROUP BY'),
          
          -- SQL Joins Quiz (Quiz 5, 5 questions, 25 points total)
          ('multiple choice', 5, 'Which type of JOIN returns only matching rows between two tables?', 5, '["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN"]', 'INNER JOIN'),
          ('multiple choice', 5, 'Which JOIN returns all records from the left table and matching ones from the right?', 5, '["LEFT JOIN", "INNER JOIN", "FULL JOIN", "CROSS JOIN"]', 'LEFT JOIN'),
          ('multiple choice', 5, 'Which JOIN returns all records from both tables when there is a match?', 5, '["FULL JOIN", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN"]', 'FULL JOIN'),
          ('multiple choice', 5, 'Which JOIN returns all possible combinations of records from both tables?', 5, '["CROSS JOIN", "INNER JOIN", "LEFT JOIN", "FULL JOIN"]', 'CROSS JOIN'),
          ('multiple choice', 5, 'Which SQL condition ensures a join condition is met?', 5, '["ON", "USING", "WHERE", "HAVING"]', 'ON'),
          
          -- SQL Subqueries Quiz (Quiz 6, 3 questions, 17 points total)
          ('multiple choice', 6, 'Which SQL keyword is used to create a subquery?', 6, '["IN", "HAVING", "EXISTS", "JOIN"]', 'EXISTS'),
          ('multiple choice', 6, 'What is the purpose of a correlated subquery?', 6, '["Depends on outer query", "Runs independently", "Optimizes performance", "Combines tables"]', 'Depends on outer query'),
          ('multiple choice', 6, 'Which type of subquery executes once for every row in the outer query?', 5, '["Correlated subquery", "Scalar subquery", "Multi-row subquery", "Nested subquery"]', 'Correlated subquery'),

          -- Advanced SQL Quiz (Quiz 7, 3 questions, 13 points total)
          ('multiple choice', 7, 'Which SQL command is used to modify existing data in a table?', 5, '["UPDATE", "INSERT", "DELETE", "ALTER"]', 'UPDATE'),
          ('multiple choice', 7, 'Which SQL clause is used to remove duplicate records in a query?', 4, '["DISTINCT", "GROUP BY", "HAVING", "ORDER BY"]', 'DISTINCT'),
          ('multiple choice', 7, 'Which SQL function returns the number of records in a result set?', 4, '["COUNT", "SUM", "AVG", "MIN"]', 'COUNT'),
          
          -- SQL Window Functions Quiz (Quiz 8, 4 questions, 20 points total)
          ('multiple choice', 8, 'Which SQL function is used to get the rank of a row within a partition?', 5, '["RANK", "DENSE_RANK", "ROW_NUMBER", "NTILE"]', 'RANK'),
          ('multiple choice', 8, 'Which SQL function assigns a unique sequential number to each row?', 5, '["ROW_NUMBER", "RANK", "DENSE_RANK", "NTILE"]', 'ROW_NUMBER'),
          ('multiple choice', 8, 'Which SQL function returns a moving average over a defined window?', 5, '["AVG", "SUM", "LAG", "LEAD"]', 'AVG'),
          ('multiple choice', 8, 'Which clause is required for using window functions in SQL?', 5, '["OVER", "WHERE", "HAVING", "DISTINCT"]', 'OVER'),
          
          -- SQL Performance Optimization Quiz (Quiz 9, 5 questions, 25 points total)
          ('multiple choice', 9, 'Which SQL technique improves query performance by precomputing results?', 5, '["Indexing", "Partitioning", "Materialized Views", "Stored Procedures"]', 'Materialized Views'),
          ('multiple choice', 9, 'Which type of index is best for columns with high cardinality?', 5, '["B-Tree Index", "Bitmap Index", "Hash Index", "Full-Text Index"]', 'B-Tree Index'),
          ('multiple choice', 9, 'What is the purpose of an execution plan in SQL?', 5, '["To optimize queries", "To clean up data", "To modify database structure", "To enforce constraints"]', 'To optimize queries'),
          ('multiple choice', 9, 'Which technique can help optimize queries by storing frequently accessed data?', 5, '["Caching", "Partitioning", "Normalization", "Sharding"]', 'Caching'),
          ('multiple choice', 9, 'What does the SQL EXPLAIN statement do?', 5, '["Displays the query execution plan", "Deletes records", "Creates an index", "Merges tables"]', 'Displays the query execution plan'),
          
          -- SQL Transactions and Concurrency Quiz (Quiz 10, 4 questions, 22 points total)
          ('multiple choice', 10, 'Which SQL statement is used to start a transaction?', 6, '["BEGIN TRANSACTION", "START TRANSACTION", "COMMIT", "ROLLBACK"]', 'BEGIN TRANSACTION'),
          ('multiple choice', 10, 'Which isolation level prevents dirty reads?', 6, '["READ COMMITTED", "READ UNCOMMITTED", "SERIALIZABLE", "REPEATABLE READ"]', 'READ COMMITTED'),
          ('multiple choice', 10, 'What is the purpose of the COMMIT statement in SQL?', 5, '["To save all changes in a transaction", "To undo a transaction", "To delete records", "To roll back changes"]', 'To save all changes in a transaction'),
          ('multiple choice', 10, 'Which SQL command is used to undo changes in a transaction?', 5, '["ROLLBACK", "COMMIT", "SAVEPOINT", "TRANSACTION"]', 'ROLLBACK'),
          
          -- SQL Security Quiz (Quiz 11, 3 questions, 18 points total)
          ('multiple choice', 11, 'Which SQL command is used to grant permissions to users?', 6, '["GRANT", "REVOKE", "DENY", "ALTER"]', 'GRANT'),
          ('multiple choice', 11, 'Which SQL command is used to remove permissions from a user?', 6, '["REVOKE", "GRANT", "DENY", "ALTER"]', 'REVOKE'),
          ('multiple choice', 11, 'Which SQL practice helps prevent SQL injection attacks?', 6, '["Using parameterized queries", "Using raw SQL statements", "Disabling constraints", "Allowing unrestricted input"]', 'Using parameterized queries'),
          
          -- SQL Triggers Quiz (Quiz 12, 3 questions, 15 points total)
          ('multiple choice', 12, 'What is the primary purpose of an SQL trigger?', 5, '["To automate database tasks", "To delete data", "To create indexes", "To join tables"]', 'To automate database tasks'),
          ('multiple choice', 12, 'Which SQL command is used to create a trigger?', 5, '["CREATE TRIGGER", "CREATE PROCEDURE", "CREATE EVENT", "CREATE FUNCTION"]', 'CREATE TRIGGER'),
          ('multiple choice', 12, 'Which event can a trigger be associated with?', 5, '["INSERT", "UPDATE", "DELETE", "All of the above"]', 'All of the above'),

          -- SQL Fundamentals Quiz (Quiz 13, 4 questions, 20 points total)
          ('multiple choice', 13, 'Which SQL statement is used to retrieve data?', 5, '["SELECT", "DELETE", "UPDATE", "INSERT"]', 'SELECT'),
          ('multiple choice', 13, 'What does SQL stand for?', 5, '["Structured Query Language", "Sequential Query Language", "Standard Query Language", "System Query Language"]', 'Structured Query Language'),
          ('multiple choice', 13, 'Which SQL statement is used to insert new records?', 5, '["INSERT", "DELETE", "UPDATE", "SELECT"]', 'INSERT'),
          ('multiple choice', 13, 'What is the purpose of the SQL JOIN clause?', 5, '["Combine rows from multiple tables", "Delete records", "Create a new table", "Filter records"]', 'Combine rows from multiple tables'),
    
          -- SQL Syntax Quiz (Quiz 14, 3 questions, 15 points total)
          ('multiple choice', 14, 'Which SQL clause is used to filter records?', 5, '["WHERE", "ORDER BY", "GROUP BY", "HAVING"]', 'WHERE'),
          ('multiple choice', 14, 'Which SQL clause is used to sort records?', 5, '["ORDER BY", "WHERE", "GROUP BY", "HAVING"]', 'ORDER BY'),
          ('multiple choice', 14, 'Which SQL clause is used to group records with aggregate functions?', 5, '["GROUP BY", "WHERE", "ORDER BY", "HAVING"]', 'GROUP BY'),
    
          -- SQL Operators Quiz (Quiz 15, 4 questions, 18 points total)
          ('multiple choice', 15, 'Which SQL operator is used to select values within a range?', 4, '["BETWEEN", "IN", "LIKE", "NOT"]', 'BETWEEN'),
          ('multiple choice', 15, 'Which SQL operator is used to search for a specified pattern?', 4, '["LIKE", "IN", "BETWEEN", "EXISTS"]', 'LIKE'),
          ('multiple choice', 15, 'Which SQL logical operator is used to combine multiple conditions?', 5, '["AND", "OR", "NOT", "XOR"]', 'AND'),
          ('multiple choice', 15, 'Which SQL operator is used to check if a value exists in a list?', 5, '["IN", "BETWEEN", "LIKE", "HAVING"]', 'IN'),
    
          -- SQL Aggregation Quiz (Quiz 16, 5 questions, 22 points total)
          ('multiple choice', 16, 'Which SQL function is used to get the total sum of a column?', 4, '["SUM", "COUNT", "AVG", "MAX"]', 'SUM'),
          ('multiple choice', 16, 'Which SQL function is used to count the number of records?', 4, '["COUNT", "SUM", "AVG", "MIN"]', 'COUNT'),
          ('multiple choice', 16, 'Which SQL function returns the highest value in a column?', 5, '["MAX", "MIN", "AVG", "SUM"]', 'MAX'),
          ('multiple choice', 16, 'Which SQL function is used to calculate the average of a column?', 4, '["AVG", "SUM", "COUNT", "MAX"]', 'AVG'),
          ('multiple choice', 16, 'Which SQL clause is used with aggregate functions to group results?', 5, '["GROUP BY", "ORDER BY", "HAVING", "DISTINCT"]', 'GROUP BY'),
    
          -- SQL Joins Quiz (Quiz 17, 5 questions, 25 points total)
          ('multiple choice', 17, 'Which type of JOIN returns only matching rows between two tables?', 5, '["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN"]', 'INNER JOIN'),
          ('multiple choice', 17, 'Which JOIN returns all records from the left table and matching ones from the right?', 5, '["LEFT JOIN", "INNER JOIN", "FULL JOIN", "CROSS JOIN"]', 'LEFT JOIN'),
          ('multiple choice', 17, 'Which JOIN returns all records from both tables when there is a match?', 5, '["FULL JOIN", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN"]', 'FULL JOIN'),
          ('multiple choice', 17, 'Which JOIN returns all possible combinations of records from both tables?', 5, '["CROSS JOIN", "INNER JOIN", "LEFT JOIN", "FULL JOIN"]', 'CROSS JOIN'),
          ('multiple choice', 17, 'Which SQL condition ensures a join condition is met?', 5, '["ON", "USING", "WHERE", "HAVING"]', 'ON'),
    
          -- SQL Subqueries Quiz (Quiz 18, 3 questions, 17 points total)
          ('multiple choice', 18, 'Which SQL keyword is used to create a subquery?', 6, '["IN", "HAVING", "EXISTS", "JOIN"]', 'EXISTS'),
          ('multiple choice', 18, 'What is the purpose of a correlated subquery?', 6, '["Depends on outer query", "Runs independently", "Optimizes performance", "Combines tables"]', 'Depends on outer query'),
          ('multiple choice', 18, 'Which type of subquery executes once for every row in the outer query?', 5, '["Correlated subquery", "Scalar subquery", "Multi-row subquery", "Nested subquery"]', 'Correlated subquery'),

          -- Database Transactions Quiz (Quiz 19, 6 questions, 60 points total)
          ('multiple choice', 19, 'Which SQL statement is used to start a transaction?', 10, '["BEGIN TRANSACTION", "START TRANSACTION", "COMMIT", "ROLLBACK"]', 'BEGIN TRANSACTION'),
          ('multiple choice', 19, 'Which SQL command permanently saves all changes in a transaction?', 10, '["COMMIT", "ROLLBACK", "SAVEPOINT", "START TRANSACTION"]', 'COMMIT'),
          ('multiple choice', 19, 'Which SQL command is used to undo changes in a transaction?', 10, '["ROLLBACK", "COMMIT", "SAVEPOINT", "TRANSACTION"]', 'ROLLBACK'),
          ('multiple choice', 19, 'Which SQL feature allows temporary savepoints within a transaction?', 10, '["SAVEPOINT", "ROLLBACK", "COMMIT", "BEGIN"]', 'SAVEPOINT'),
          ('multiple choice', 19, 'Which term describes the atomic execution of multiple SQL statements?', 10, '["Transaction", "Procedure", "Function", "Trigger"]', 'Transaction'),
          ('multiple choice', 19, 'Which SQL command releases a previously set savepoint?', 10, '["RELEASE SAVEPOINT", "ROLLBACK", "COMMIT", "DELETE SAVEPOINT"]', 'RELEASE SAVEPOINT'),
    
          -- ACID Properties Quiz (Quiz 20, 3 questions, 15 points total)
          ('multiple choice', 20, 'Which ACID property ensures a transaction is fully completed or fully rolled back?', 5, '["Atomicity", "Consistency", "Isolation", "Durability"]', 'Atomicity'),
          ('multiple choice', 20, 'Which ACID property ensures that a database remains in a valid state?', 5, '["Consistency", "Atomicity", "Durability", "Isolation"]', 'Consistency'),
          ('multiple choice', 20, 'Which ACID property ensures that committed transactions are permanent?', 5, '["Durability", "Atomicity", "Consistency", "Isolation"]', 'Durability'),
    
          -- Transaction Isolation Quiz (Quiz 21, 4 questions, 20 points total)
          ('multiple choice', 21, 'Which isolation level prevents dirty reads?', 5, '["READ COMMITTED", "READ UNCOMMITTED", "SERIALIZABLE", "REPEATABLE READ"]', 'READ COMMITTED'),
          ('multiple choice', 21, 'Which isolation level ensures that transactions are executed serially?', 5, '["SERIALIZABLE", "READ COMMITTED", "REPEATABLE READ", "READ UNCOMMITTED"]', 'SERIALIZABLE'),
          ('multiple choice', 21, 'Which isolation level prevents non-repeatable reads?', 5, '["REPEATABLE READ", "READ UNCOMMITTED", "READ COMMITTED", "SERIALIZABLE"]', 'REPEATABLE READ'),
          ('multiple choice', 21, 'Which isolation level allows transactions to read uncommitted changes?', 5, '["READ UNCOMMITTED", "READ COMMITTED", "REPEATABLE READ", "SERIALIZABLE"]', 'READ UNCOMMITTED'),
    
          -- Deadlock Prevention Quiz (Quiz 22, 5 questions, 25 points total)
          ('multiple choice', 22, 'Which technique prevents deadlocks by ensuring a transaction requests all locks upfront?', 5, '["Two-phase locking", "Deadlock detection", "Timeouts", "Wait-die scheme"]', 'Two-phase locking'),
          ('multiple choice', 22, 'Which method detects and resolves deadlocks in a database?', 5, '["Deadlock detection", "Two-phase locking", "Timeouts", "Wait-die scheme"]', 'Deadlock detection'),
          ('multiple choice', 22, 'Which deadlock prevention technique assigns priorities to transactions?', 5, '["Wait-die scheme", "Timeouts", "Deadlock detection", "Two-phase locking"]', 'Wait-die scheme'),
          ('multiple choice', 22, 'Which strategy avoids deadlocks by allowing transactions to wait for a fixed time before aborting?', 5, '["Timeouts", "Deadlock detection", "Wait-die scheme", "Two-phase locking"]', 'Timeouts'),
          ('multiple choice', 22, 'Which of the following can help mitigate deadlocks?', 5, '["Using smaller transactions", "Increasing the number of locks", "Allowing indefinite waits", "Ignoring lock conflicts"]', 'Using smaller transactions'),
    
          -- Database Recovery Quiz (Quiz 23, 3 questions, 18 points total)
          ('multiple choice', 23, 'Which type of database failure requires restoring from a backup?', 6, '["Media failure", "Transaction failure", "Deadlock", "Lock contention"]', 'Media failure'),
          ('multiple choice', 23, 'Which recovery method involves rolling back uncommitted transactions?', 6, '["Undo logging", "Redo logging", "Deferred updates", "Shadow paging"]', 'Undo logging'),
          ('multiple choice', 23, 'Which recovery technique maintains both old and new values of data?', 6, '["Redo logging", "Undo logging", "Checkpointing", "Deferred updates"]', 'Redo logging'),
    
          -- Concurrency Control Quiz (Quiz 24, 4 questions, 22 points total)
          ('multiple choice', 24, 'Which concurrency control method uses locks to coordinate access to data?', 6, '["Two-phase locking", "Timestamp ordering", "Optimistic concurrency", "MVCC"]', 'Two-phase locking'),
          ('multiple choice', 24, 'Which concurrency control technique allows multiple versions of data to exist simultaneously?', 6, '["MVCC", "Two-phase locking", "Timestamp ordering", "Deadlock detection"]', 'MVCC'),
          ('multiple choice', 24, 'Which concurrency control mechanism assigns a unique timestamp to each transaction?', 5, '["Timestamp ordering", "Two-phase locking", "Optimistic concurrency", "MVCC"]', 'Timestamp ordering'),
          ('multiple choice', 24, 'Which concurrency control approach assumes conflicts are rare and checks for conflicts at commit time?', 5, '["Optimistic concurrency", "Two-phase locking", "MVCC", "Timestamp ordering"]', 'Optimistic concurrency'),

          -- Indexing Quiz (Quiz 25, 2 questions, 10 points total)
          ('multiple choice', 25, 'Which type of index is most commonly used in relational databases?', 5, '["B-Tree Index", "Bitmap Index", "Hash Index", "Full-Text Index"]', 'B-Tree Index'),
          ('multiple choice', 25, 'What is the main benefit of indexing in databases?', 5, '["Improves query performance", "Reduces storage usage", "Prevents duplicate records", "Increases data security"]', 'Improves query performance'),

          -- SQL Index Types Quiz (Quiz 26, 4 questions, 20 points total)
          ('multiple choice', 26, 'Which type of index is best for columns with high cardinality?', 5, '["B-Tree Index", "Bitmap Index", "Hash Index", "Full-Text Index"]', 'B-Tree Index'),
          ('multiple choice', 26, 'Which type of index is best suited for columns with low cardinality?', 5, '["Bitmap Index", "B-Tree Index", "Hash Index", "Full-Text Index"]', 'Bitmap Index'),
          ('multiple choice', 26, 'Which type of index is best for exact key lookups?', 5, '["Hash Index", "B-Tree Index", "Bitmap Index", "Full-Text Index"]', 'Hash Index'),
          ('multiple choice', 26, 'Which index type is used for full-text searching?', 5, '["Full-Text Index", "B-Tree Index", "Bitmap Index", "Hash Index"]', 'Full-Text Index'),

          -- Query Optimization Quiz (Quiz 27, 5 questions, 25 points total)
          ('multiple choice', 27, 'Which SQL technique improves query performance by precomputing results?', 5, '["Indexing", "Partitioning", "Materialized Views", "Stored Procedures"]', 'Materialized Views'),
          ('multiple choice', 27, 'What is the purpose of an execution plan in SQL?', 5, '["To optimize queries", "To clean up data", "To modify database structure", "To enforce constraints"]', 'To optimize queries'),
          ('multiple choice', 27, 'Which SQL command provides query execution details?', 5, '["EXPLAIN", "DESCRIBE", "SELECT", "ANALYZE"]', 'EXPLAIN'),
          ('multiple choice', 27, 'Which technique can help optimize queries by storing frequently accessed data?', 5, '["Caching", "Partitioning", "Normalization", "Sharding"]', 'Caching'),
          ('multiple choice', 27, 'Which SQL operation is computationally expensive and should be minimized in queries?', 5, '["JOIN", "SELECT", "INSERT", "DELETE"]', 'JOIN'),

          -- Indexing Strategies Quiz (Quiz 28, 3 questions, 15 points total)
          ('multiple choice', 28, 'Which indexing strategy is best for optimizing range queries?', 5, '["Clustered Index", "Non-Clustered Index", "Hash Index", "Bitmap Index"]', 'Clustered Index'),
          ('multiple choice', 28, 'Which indexing technique physically orders data in a table?', 5, '["Clustered Index", "Non-Clustered Index", "Bitmap Index", "Full-Text Index"]', 'Clustered Index'),
          ('multiple choice', 28, 'Which indexing strategy helps speed up filtering on boolean columns?', 5, '["Bitmap Index", "B-Tree Index", "Hash Index", "Full-Text Index"]', 'Bitmap Index'),

          -- Execution Plans Quiz (Quiz 29, 4 questions, 18 points total)
          ('multiple choice', 29, 'What is the purpose of an execution plan in SQL?', 5, '["To optimize queries", "To clean up data", "To modify database structure", "To enforce constraints"]', 'To optimize queries'),
          ('multiple choice', 29, 'Which SQL command provides query execution details?', 5, '["EXPLAIN", "DESCRIBE", "SELECT", "ANALYZE"]', 'EXPLAIN'),
          ('multiple choice', 29, 'Which execution plan operator is used for index lookups?', 4, '["Index Seek", "Table Scan", "Nested Loops", "Hash Match"]', 'Index Seek'),
          ('multiple choice', 29, 'Which execution plan operation is least efficient?', 4, '["Table Scan", "Index Seek", "Index Scan", "Hash Match"]', 'Table Scan'),

          -- Partitioning Quiz (Quiz 30, 4 questions, 22 points total)
          ('multiple choice', 30, 'Which database partitioning method divides data based on range values?', 6, '["Range Partitioning", "Hash Partitioning", "List Partitioning", "Composite Partitioning"]', 'Range Partitioning'),
          ('multiple choice', 30, 'Which partitioning method distributes rows based on a hashing algorithm?', 6, '["Hash Partitioning", "Range Partitioning", "List Partitioning", "Composite Partitioning"]', 'Hash Partitioning'),
          ('multiple choice', 30, 'Which partitioning method groups data based on predefined lists of values?', 5, '["List Partitioning", "Range Partitioning", "Hash Partitioning", "Composite Partitioning"]', 'List Partitioning'),
          ('multiple choice', 30, 'Which partitioning strategy combines multiple partitioning techniques?', 5, '["Composite Partitioning", "Range Partitioning", "Hash Partitioning", "List Partitioning"]', 'Composite Partitioning'),

          -- Normalization Quiz (Quiz 31, 4 questions, 26 points total)
          ('multiple choice', 31, 'What is the primary goal of database normalization?', 7, '["Eliminate redundancy", "Improve security", "Increase storage", "Enhance indexing"]', 'Eliminate redundancy'),
          ('multiple choice', 31, 'Which process is used to organize data efficiently in a relational database?', 7, '["Normalization", "Denormalization", "Indexing", "Partitioning"]', 'Normalization'),
          ('multiple choice', 31, 'Which normal form eliminates repeating groups in a table?', 6, '["First Normal Form", "Second Normal Form", "Third Normal Form", "BCNF"]', 'First Normal Form'),
          ('multiple choice', 31, 'What issue does normalization primarily address?', 6, '["Data redundancy", "Query performance", "Security risks", "Storage limitations"]', 'Data redundancy'),

          -- First Normal Form Quiz (Quiz 32, 3 questions, 15 points total)
          ('multiple choice', 32, 'Which condition must be met for a table to be in First Normal Form (1NF)?', 5, '["Eliminate duplicate rows", "Have a primary key", "Ensure atomic values", "Use foreign keys"]', 'Ensure atomic values'),
          ('multiple choice', 32, 'Which data issue does 1NF help to prevent?', 5, '["Repeating groups", "Foreign key constraints", "Complex joins", "Query optimization"]', 'Repeating groups'),
          ('multiple choice', 32, 'What is a violation of 1NF?', 5, '["A table with multiple values in a single column", "A table with a foreign key", "A table with a primary key", "A table with indexed columns"]', 'A table with multiple values in a single column'),

          -- Second Normal Form Quiz (Quiz 33, 3 questions, 18 points total)
          ('multiple choice', 33, 'What is the requirement for Second Normal Form (2NF)?', 6, '["No partial dependencies", "No transitive dependencies", "No foreign keys", "Only one column per table"]', 'No partial dependencies'),
          ('multiple choice', 33, 'What issue does 2NF help to eliminate?', 6, '["Partial dependencies", "Transitive dependencies", "Duplicate keys", "Redundant foreign keys"]', 'Partial dependencies'),
          ('multiple choice', 33, 'Which type of table structure does not satisfy 2NF?', 6, '["A table with composite primary keys and non-key attributes", "A table with a single primary key", "A table fully normalized", "A table using denormalization"]', 'A table with composite primary keys and non-key attributes'),

          -- Third Normal Form Quiz (Quiz 34, 4 questions, 20 points total)
          ('multiple choice', 34, 'What is the main requirement for Third Normal Form (3NF)?', 5, '["No transitive dependencies", "No partial dependencies", "Only one foreign key", "Use of composite keys"]', 'No transitive dependencies'),
          ('multiple choice', 34, 'Which type of dependency does 3NF help remove?', 5, '["Transitive dependency", "Functional dependency", "Partial dependency", "Recursive dependency"]', 'Transitive dependency'),
          ('multiple choice', 34, 'Which situation violates 3NF?', 5, '["A column depends on another non-key column", "A table has no foreign keys", "A table has a single primary key", "A table with atomic values"]', 'A column depends on another non-key column'),
          ('multiple choice', 34, 'Why is 3NF beneficial in database design?', 5, '["Reduces redundancy", "Increases query complexity", "Allows more duplicate data", "Reduces indexing overhead"]', 'Reduces redundancy'),

          -- BCNF Quiz (Quiz 35, 3 questions, 17 points total)
          ('multiple choice', 35, 'What is the main requirement for Boyce-Codd Normal Form (BCNF)?', 6, '["Every determinant must be a candidate key", "No partial dependencies", "No foreign keys", "Only single-column primary keys"]', 'Every determinant must be a candidate key'),
          ('multiple choice', 35, 'Which scenario violates BCNF?', 6, '["A table with functional dependencies where a non-key attribute determines another", "A table with a single-column primary key", "A fully normalized table", "A table with no repeating groups"]', 'A table with functional dependencies where a non-key attribute determines another'),
          ('multiple choice', 35, 'What does BCNF primarily help to resolve?', 5, '["Anomalies due to functional dependencies", "Issues with indexing", "Slow query performance", "Complex table joins"]', 'Anomalies due to functional dependencies'),

          -- Denormalization Quiz (Quiz 36, 4 questions, 22 points total)
          ('multiple choice', 36, 'What is denormalization in database design?', 6, '["Combining tables to optimize performance", "Removing indexes", "Adding redundant foreign keys", "Reducing transaction isolation"]', 'Combining tables to optimize performance'),
          ('multiple choice', 36, 'Why might denormalization be used in a database?', 6, '["To improve read performance", "To reduce storage", "To increase redundancy", "To enforce ACID properties"]', 'To improve read performance'),
          ('multiple choice', 36, 'What is a disadvantage of denormalization?', 5, '["Increased data redundancy", "Improved query performance", "Simplified joins", "Stronger foreign key constraints"]', 'Increased data redundancy'),
          ('multiple choice', 36, 'Which situation might require denormalization?', 5, '["High read-intensive queries", "Strict normalization rules", "Low data redundancy", "Small datasets"]', 'High read-intensive queries');
    `);
  }
};

export default insertSampleData;

