import mysql from "mysql2/promise";
import "dotenv/config";


const isProduction = process.env.NODE_ENV === "production";

// MySQL Connection Configuration
let dbConfig
if (isProduction) {
  dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
  }
} else {
  dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  };
}

let db;
db = await mysql.createPool(dbConfig);
console.log("Connected to MySQL database:", dbConfig.database);

export default db;