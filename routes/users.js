const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
    db.query('SELECT id, name FROM users', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "No authentication required", users: results });
    });
});

router.post('/', (req, res) => {
    const { name } = req.body;
    db.query('INSERT INTO users (name) VALUES (?)', [name], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id: result.insertId, name });
    });
});

module.exports = router;

