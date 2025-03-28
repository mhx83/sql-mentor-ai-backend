import * as dao from './dao.js';

export default function AnalyticsRoutes(app) {

    app.get('/api/user/:userId/:userRole/analytics/:courseId', async (req, res) => {
       
        const { userId, userRole, courseId } = req.params;
        let data;

        if (userRole === 'STUDENT') {
            data = await dao.getStudentGrades(userId, courseId);
        } else if (userRole === 'FACULTY') {
            data = await dao.getFacultyGrades(courseId);
        } else {
            return res.status(400).json({ error: 'Invalid user role' });
        }
        res.json(data);
    });

    app.get(
        "/api/user/:userId/:userRole/analytics/:dateRange/:countType",
        async (req, res) => {
        const { userId, userRole, dateRange, countType } = req.params;
        try {
            const data = await dao.fetchActivityData(
            userId,
            userRole,
            dateRange,
            countType
            );
            res.json(data);
        } catch (error) {
            console.error("Error fetching activity data:", error);
            res.status(500).json({ error: "Failed to fetch activity data" });
        }
        }
    );

    app.get('api/user/:userId/communication', async (req, res) => {
        try {
            const { userId } = req.params;
            const data = await getCommunicationData(userId);
            res.json(data);
        } catch (err) {
            console.error('Error fetching communication data:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
}