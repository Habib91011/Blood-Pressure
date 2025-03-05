const express = require('express');
const db = require('../db');
const { validateMeasurement } = require('../middleware/validation');
const router = express.Router();

router.post('/', validateMeasurement, (req, res) => {
    const { user_id, systolic, diastolic, pulse } = req.body;
    db.query('INSERT INTO measurements (user_id, systolic, diastolic, pulse) VALUES (?, ?, ?, ?)',
        [user_id, systolic, diastolic, pulse], (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ id: result.insertId, user_id, systolic, diastolic, pulse });
        });
});

module.exports = router;
