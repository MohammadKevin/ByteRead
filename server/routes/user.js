import express from 'express';
import { db } from '../db/database.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// PUT /api/user/sync (Update full user state: XP, streak, bookmarks, etc.)
router.put('/sync', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      xp,
      level,
      levelTitle,
      streak,
      completedBookIds,
      inProgressBookIds,
      bookmarkedBookIds,
      savedQuotes,
      totalMinutesRead,
      totalHoursSaved,
      quizAccuracyAverage
    } = req.body;

    const updatedUser = await db.updateUser(userId, {
      ...(xp !== undefined && { xp }),
      ...(level !== undefined && { level }),
      ...(levelTitle !== undefined && { levelTitle }),
      ...(streak !== undefined && { streak }),
      ...(completedBookIds !== undefined && { completedBookIds }),
      ...(inProgressBookIds !== undefined && { inProgressBookIds }),
      ...(bookmarkedBookIds !== undefined && { bookmarkedBookIds }),
      ...(savedQuotes !== undefined && { savedQuotes }),
      ...(totalMinutesRead !== undefined && { totalMinutesRead }),
      ...(totalHoursSaved !== undefined && { totalHoursSaved }),
      ...(quizAccuracyAverage !== undefined && { quizAccuracyAverage })
    });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User tidak ditemukan.' });
    }

    const { password: _, ...userProfile } = updatedUser;
    return res.json({
      success: true,
      message: 'Data berhasil disinkronisasi ke server.',
      data: { user: userProfile }
    });
  } catch (err) {
    console.error('[USER] Sync error:', err);
    return res.status(500).json({ success: false, message: 'Gagal memperbarui data user.' });
  }
});

export default router;
