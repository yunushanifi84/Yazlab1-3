import jwt from 'jsonwebtoken';
import * as jose from 'jose';

const secretKey = process.env.JWTSECRET;
const secretKeyUint8Array = new TextEncoder().encode(secretKey);

export const generateToken = (user) => {
    return jwt.sign(user, secretKey, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
};

export const checkToken = (req) => {
    const token = req.headers.get('authorization');
    if (!token) {
        return false;
    }
    try {
        const tokenWithoutBearer = token.replace('Bearer ', '').trim();
        const decoded = jose.jwtVerify(tokenWithoutBearer, secretKeyUint8Array);
        return decoded;
    } catch (error) {
        return false;
    }
};