import { verifyToken } from './../utils/jwt';

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        console.log('No token provided');
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        console.log('User decoded from token:', decoded);
        next();
    } catch (error) {
        console.error('Error verifying token:', error.message);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};


export default authMiddleware;
