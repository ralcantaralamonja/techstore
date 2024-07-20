import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';
import { getConnection } from '../database/database';

const router = Router();

router.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Bad Request. Please fill all fields.' });
    }

    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM usuario WHERE email = ?", email);

        if (result.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user);
        res.json({ token });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;
