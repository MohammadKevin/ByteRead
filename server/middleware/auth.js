import jwt from 'jsonwebtoken';
import { db } from '../db/database.js';

export const JWT_SECRET = process.env.JWT_SECRET || 'byteread_super_secret_jwt_key_2026';

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Akses ditolak. Token otentikasi tidak ditemukan.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = db.findUserById(decoded.userId);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Sesi tidak valid. Pengguna tidak ditemukan.' });
    }

    // Strip password from req.user
    const { password, ...userWithoutPassword } = user;
    req.user = userWithoutPassword;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token kedaluwarsa atau tidak valid.', error: err.message });
  }
};
