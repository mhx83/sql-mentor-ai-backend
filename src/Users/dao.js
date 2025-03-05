import db from "../model.js"; // Import shared MySQL connection


// Create a new user
export const createUser = async (user) => {
    const { username, password, firstName, lastName, email, dob, role } = user;
    const insertSQL = `
        INSERT INTO users (username, password, firstName, lastName, email, dob, role)
        VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
    const [result] = await db.query(insertSQL, [username, password, firstName, lastName, email, dob, role]);
    return { _id: result.insertId, ...user };
};

// Find users by partial name (Search in `firstName` & `lastName`)
export const findUsersByPartialName = async (partialName) => {
    const search = `%${partialName}%`;
    const [rows] = await db.query(
      "SELECT * FROM users WHERE firstName LIKE ? OR lastName LIKE ?",
      [search, search]
    );
    return rows;
};

// Find all users
export const findAllUsers = async () => {
    const [rows] = await db.query("SELECT * FROM users");
    return rows;
};

// Find user by ID
export const findUserById = async (_id) => {
    const [rows] = await db.query("SELECT * FROM users WHERE _id = ?", [_id]);
    return rows.length ? rows[0] : null;
};

// Find user by username
export const findUserByUsername = async (username) => {
    const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
    return rows.length ? rows[0] : null;
};

// Find user by credentials (Login)
export const findUserByCredentials = async (username, password) => {
    const [rows] = await db.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password]);
    return rows.length ? rows[0] : null;
};

// Update user
export const updateUser = async (_id, user) => {
    const { username, password, firstName, lastName, email, dob, role } = user;
    const updateSQL = `
        UPDATE users
        SET username = ?, password = ?, firstName = ?, lastName = ?, email = ?, dob = ?, role = ?
        WHERE _id = ?;
    `;
    const [result] = await db.query(updateSQL, [username, password, firstName, lastName, email, dob, role, _id]);
    return result.affectedRows > 0 ? { _id, ...user } : null;
};

// Delete user
export const deleteUser = async (_id) => {
    const [result] = await db.query("DELETE FROM users WHERE _id = ?", [_id]);
    return result.affectedRows > 0;
};

// Find users by role
export const findUsersByRole = async (role) => {
    const [rows] = await db.query("SELECT * FROM users WHERE role = ?", [role]);
    return rows;
};
