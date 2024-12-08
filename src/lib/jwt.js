// src/lib/jwt.js
import jwt from 'jsonwebtoken';

const secretKey = process.env.jwtsecret; // Bu anahtarı güvenli bir yerde saklayın

export function generateToken(payload) {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
}