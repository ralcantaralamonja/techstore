import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { getConnection } from '../database/database';

const router = Router();

router.post('/api/register', async (req, res) => {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({ message: 'Bad Request. Please fill all fields.' });
    }

    try {
        const connection = await getConnection();

        // Check if user already exists
        const userExists = await connection.query("SELECT * FROM usuario WHERE email = ?", email);
        if (userExists.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save the new user to the database
        const result = await connection.query(`INSERT INTO usuario (nombre, email, password) VALUES (?, ?, ?)`, [nombre, email, hashedPassword]);
        
        res.json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;
