const { body, validationResult } = require('express-validator');

const validateMeasurement = [
    body('user_id').isInt(),
    body('systolic').isInt({ min: 50, max: 250 }),  
    body('diastolic').isInt({ min: 30, max: 150 }),  
    body('pulse').isInt({ min: 30, max: 200 }),  
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateMeasurement };
