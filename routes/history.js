//הצגת היסטוריית המדידות עם הדגשה של מדידות חריגות
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/history/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = 'SELECT * FROM measurements WHERE user_id = ? ORDER BY measurement_date DESC';

    db.pool.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        
        const averageSystolic = results.reduce((sum, row) => sum + row.systolic, 0) / results.length;
        const averageDiastolic = results.reduce((sum, row) => sum + row.diastolic, 0) / results.length;

        
        const highlightedMeasurements = results.map(measurement => {
            const isSystolicHigh = measurement.systolic > averageSystolic * 1.2;
            const isDiastolicHigh = measurement.diastolic > averageDiastolic * 1.2;
            return { ...measurement, highlighted: isSystolicHigh || isDiastolicHigh };
        });

        res.status(200).json({ history: highlightedMeasurements });
    });
});

module.exports = router;
