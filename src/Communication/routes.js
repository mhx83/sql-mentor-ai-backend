import * as dao from './dao.js';

export default function CommunicationRoutes(app) {

    // 发消息
    app.post('/api/messages', async (req, res) => {
        const { sender_id, receiver_id, subject, content } = req.body;
        if (!sender_id || !receiver_id || !subject) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const messageId = await dao.createMessage(sender_id, receiver_id, subject, content);
        res.status(201).json({ messageId });
    });

    // 查询收到的消息
    app.get('/api/messages/received/:userId', async (req, res) => {
        const messages = await dao.findMessagesReceivedByUser(req.params.userId);
        res.json(messages);
    });

    // 查询发出的消息
    app.get('/api/messages/sent/:userId', async (req, res) => {
        const messages = await dao.findMessagesSentByUser(req.params.userId);
        res.json(messages);
    });

    // 查询某人对话
    app.get('/api/messages/conversation', async (req, res) => {
        const { user1, user2 } = req.query;
        if (!user1 || !user2) {
            return res.status(400).json({ error: 'Missing user IDs' });
        }
        const messages = await dao.findConversationBetweenUsers(user1, user2);
        res.json(messages);
    });
}
