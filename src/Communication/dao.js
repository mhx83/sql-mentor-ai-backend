import db from "../model.js";

// 发送消息
// export async function createMessage(senderId, receiverId, subject, content) {
//     const query = `
//     INSERT INTO messages (sender_id, receiver_id, subject, content, sendTime)
//     VALUES (?, ?, ?, ?, NOW());
//   `;
//     const values = [senderId, receiverId, subject, content];
//     const [result] = await db.query(query, values);
//     return result.insertId;
// }

export async function createMessage(senderId, receiverId, subject, content) {
    const sendTime = new Date(); // 本地时区时间
    const query = `
    INSERT INTO messages (sender_id, receiver_id, subject, content, sendTime)
    VALUES (?, ?, ?, ?, ?);
  `;
    const values = [senderId, receiverId, subject, content, sendTime];
    const [result] = await db.query(query, values);
    return result.insertId;
}

// 查询我收到的消息
export async function findMessagesReceivedByUser(userId) {
    const query = `
    SELECT m.*, 
           CONCAT(s.firstName, ' ', s.lastName) AS senderName
    FROM messages m
    JOIN users s ON m.sender_id = s._id
    WHERE m.receiver_id = ?
    ORDER BY m.sendTime DESC;
  `;
    const values = [userId];
    const [rows] = await db.query(query, values);
    return rows;
}

// 查询我发出的消息
export async function findMessagesSentByUser(userId) {
    const query = `
    SELECT m.*, 
           CONCAT(r.firstName, ' ', r.lastName) AS receiverName
    FROM messages m
    JOIN users r ON m.receiver_id = r._id
    WHERE m.sender_id = ?
    ORDER BY m.sendTime DESC;
  `;
    const values = [userId];
    const [rows] = await db.query(query, values);
    return rows;
}

// 查询与某用户的全部对话记录（往来记录）
export async function findConversationBetweenUsers(user1, user2) {
    const query = `
    SELECT m.*, 
           CONCAT(s.firstName, ' ', s.lastName) AS senderName,
           CONCAT(r.firstName, ' ', r.lastName) AS receiverName
    FROM messages m
    JOIN users s ON m.sender_id = s._id
    JOIN users r ON m.receiver_id = r._id
    WHERE (m.sender_id = ? AND m.receiver_id = ?)
       OR (m.sender_id = ? AND m.receiver_id = ?)
    ORDER BY m.sendTime ASC;
  `;
    const values = [user1, user2, user2, user1];
    const [rows] = await db.query(query, values);
    return rows;
}
