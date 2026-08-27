import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from '../db/database.js';
import { JWT_SECRET, authMiddleware } from '../middleware/auth.js';

const router = express.Router();

const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, username } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Nama lengkap wajib diisi.' });
    }

    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Alamat email tidak valid.' });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ success: false, message: 'Kata sandi minimal 6 karakter.' });
    }

    const existingUser = await db.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email sudah terdaftar. Silakan masuk.' });
    }

    const newUser = await db.createUser({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      username: username?.trim()
    });

    const token = generateToken(newUser.id);
    const { password: _, ...userProfile } = newUser;

    return res.status(201).json({
      success: true,
      message: 'Pendaftaran akun berhasil!',
      data: {
        token,
        user: userProfile
      }
    });
  } catch (err) {
    console.error('[AUTH] Register error:', err);
    return res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server saat registrasi.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email dan kata sandi wajib diisi.' });
    }

    const user = await db.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Email atau kata sandi tidak cocok.' });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Email atau kata sandi tidak cocok.' });
    }

    const token = generateToken(user.id);
    const { password: _, ...userProfile } = user;

    return res.json({
      success: true,
      message: 'Login berhasil!',
      data: {
        token,
        user: userProfile
      }
    });
  } catch (err) {
    console.error('[AUTH] Login error:', err);
    return res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server saat login.' });
  }
});

// POST /api/auth/demo-login (1-Click Instant Login)
router.post('/demo-login', async (req, res) => {
  try {
    let demoUser = await db.findUserByEmail('alex@byteread.app');
    if (!demoUser) {
      demoUser = await db.createUser({
        name: 'Alex Reader',
        email: 'alex@byteread.app',
        password: 'password123',
        username: '@alex_reads'
      });
    }

    const token = generateToken(demoUser.id);
    const { password: _, ...userProfile } = demoUser;

    return res.json({
      success: true,
      message: 'Login demo berhasil!',
      data: {
        token,
        user: userProfile
      }
    });
  } catch (err) {
    console.error('[AUTH] Demo login error:', err);
    return res.status(500).json({ success: false, message: 'Gagal login akun demo.' });
  }
});

// GET /api/auth/me
router.get('/me', authMiddleware, (req, res) => {
  return res.json({
    success: true,
    data: {
      user: req.user
    }
  });
});

export default router;
