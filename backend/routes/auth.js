const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const JWT_SECRET = 'sekreti_i_forte';

// ✅ Sign Up
router.post('/signup', [
    body('username').notEmpty().withMessage('Username është i detyrueshëm'),
    body('email').isEmail().withMessage('Email i pavlefshëm'),
    body('password').isLength({ min: 6 }).withMessage('Fjalëkalimi duhet të ketë së paku 6 karaktere')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Ky email është në përdorim!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ 
            username, 
            email, 
            password: hashedPassword, 
            role: role || 'user' 
        });

        res.json({ message: 'Regjistrimi u realizua me sukses!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gabim gjatë regjistrimit!' });
    }
});

// ✅ Login
router.post('/login', [
    body('email').isEmail().withMessage('Email i pavlefshëm'),
    body('password').notEmpty().withMessage('Fjalëkalimi është i detyrueshëm')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'Email ose fjalëkalim i gabuar!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Email ose fjalëkalim i gabuar!' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gabim gjatë hyrjes!' });
    }
});

module.exports = router;
