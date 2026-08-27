import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');
const DB_FILE = path.join(DATA_DIR, 'byteread_db.json');

// Parse connection details from DATABASE_URL or individual env vars
const parseDbConfig = () => {
  if (process.env.DATABASE_URL) {
    try {
      const url = new URL(process.env.DATABASE_URL);
      return {
        host: url.hostname,
        port: parseInt(url.port || '3306'),
        user: decodeURIComponent(url.username),
        password: decodeURIComponent(url.password),
        database: url.pathname.replace(/^\//, '')
      };
    } catch (e) {
      console.warn('[DB] Failed to parse DATABASE_URL, using fallback parameters');
    }
  }

  return {
    host: process.env.DB_HOST || 'brescia.id.rapidplex.com',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'budayaki_admin',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'budayaki_byteread'
  };
};

// Ensure data dir exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

let mysqlPool = null;
let isMysqlActive = false;

// Initialize MySQL connection with auto-table creation
export const initMySQL = async () => {
  const config = parseDbConfig();
  try {
    // 1. Create Connection Pool to remote/local MySQL
    mysqlPool = mysql.createPool({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      database: config.database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 10000
    });

    // Test connection with ping
    await mysqlPool.query('SELECT 1');

    // 2. Auto-Migrate Tables (DDL)
    await mysqlPool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(191) PRIMARY KEY,
        email VARCHAR(191) UNIQUE NOT NULL,
        username VARCHAR(191) UNIQUE NOT NULL,
        name VARCHAR(191) NOT NULL,
        password VARCHAR(255) NOT NULL,
        avatarSeed INT DEFAULT 1,
        level INT DEFAULT 1,
        levelTitle VARCHAR(191) DEFAULT 'Level 1: Page Novice 📖',
        xp INT DEFAULT 0,
        totalMinutesRead INT DEFAULT 0,
        totalHoursSaved FLOAT DEFAULT 0,
        quizAccuracyAverage FLOAT DEFAULT 0,
        currentStreak INT DEFAULT 0,
        longestStreak INT DEFAULT 0,
        lastReadDate VARCHAR(50),
        streakFreezesAvailable INT DEFAULT 1,
        isFreezeActive BOOLEAN DEFAULT FALSE,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

      CREATE TABLE IF NOT EXISTS user_bookmarks (
        id VARCHAR(191) PRIMARY KEY,
        userId VARCHAR(191) NOT NULL,
        bookId VARCHAR(191) NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY user_book_idx (userId, bookId),
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

      CREATE TABLE IF NOT EXISTS saved_quote_snapshots (
        id VARCHAR(191) PRIMARY KEY,
        userId VARCHAR(191) NOT NULL,
        bookId VARCHAR(191) NOT NULL,
        bookTitle VARCHAR(191) NOT NULL,
        author VARCHAR(191) NOT NULL,
        quote TEXT NOT NULL,
        themeStyle VARCHAR(50) DEFAULT 'FRESH_BLUE',
        savedAt VARCHAR(100) DEFAULT 'Hari ini',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

      CREATE TABLE IF NOT EXISTS user_book_progress (
        id VARCHAR(191) PRIMARY KEY,
        userId VARCHAR(191) NOT NULL,
        bookId VARCHAR(191) NOT NULL,
        status VARCHAR(50) DEFAULT 'IN_PROGRESS',
        totalSecondsRead INT DEFAULT 0,
        isQuizPassed BOOLEAN DEFAULT FALSE,
        quizScore INT DEFAULT 0,
        xpEarned INT DEFAULT 0,
        lastReadAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY user_prog_idx (userId, bookId),
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    isMysqlActive = true;
    console.log(`✅ [MySQL Database] Terhubung sukses ke server (${config.host}) dan database \`${config.database}\` aktif!`);
  } catch (err) {
    isMysqlActive = false;
    console.log(`⚠️ [MySQL Database] Belum dapat terhubung ke ${config.host}:${config.port} (${err.message}).`);
    console.log('ℹ️ [ByteRead Fallback] Mode penyimpanan lokal JSON otomatis aktif agar aplikasi tetap berjalan lancar.');
  }
};

// Initial JSON Seed
const getInitialDb = () => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync('password123', salt);

  return {
    users: [
      {
        id: 'user-demo-01',
        name: 'Alex Reader',
        username: '@alex_reads',
        email: 'alex@byteread.app',
        password: hashedPassword,
        avatarSeed: 42,
        level: 3,
        levelTitle: 'Level 3: Byte Synthesizer ⚡',
        xp: 380,
        xpToNextLevel: 650,
        streak: {
          currentStreak: 3,
          longestStreak: 5,
          lastReadDate: new Date().toISOString().split('T')[0],
          streakHistory: [
            { date: new Date().toISOString().split('T')[0], booksCompleted: 1, xpEarned: 120 }
          ],
          isFreezeActive: false,
          freezeCountAvailable: 1
        },
        completedBookIds: ['book-atomic-habits'],
        inProgressBookIds: ['book-psychology-of-money'],
        bookmarkedBookIds: ['book-deep-work', 'book-show-your-work'],
        savedQuotes: [
          {
            id: 'quote-sample-1',
            bookId: 'book-atomic-habits',
            bookTitle: 'Atomic Habits',
            author: 'James Clear',
            quote: 'You do not rise to the level of your goals. You fall to the level of your systems.',
            themeStyle: 'FRESH_BLUE',
            savedAt: 'Hari ini'
          }
        ],
        totalMinutesRead: 9,
        totalHoursSaved: 6.5,
        quizAccuracyAverage: 90,
        createdAt: new Date().toISOString()
      }
    ]
  };
};

class HybridDatabaseManager {
  constructor() {
    this.localData = this.loadLocal();
    initMySQL();
  }

  loadLocal() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('[DB] Reinitializing JSON fallback');
    }
    const initial = getInitialDb();
    this.saveLocal(initial);
    return initial;
  }

  saveLocal(data = this.localData) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('[DB] Write JSON error', err);
    }
  }

  async findUserByEmail(email) {
    if (!email) return null;
    const cleanEmail = email.toLowerCase().trim();

    if (isMysqlActive && mysqlPool) {
      try {
        const [rows] = await mysqlPool.query('SELECT * FROM users WHERE LOWER(email) = ?', [cleanEmail]);
        if (rows && rows.length > 0) {
          const user = rows[0];
          // Get bookmarks
          const [bRows] = await mysqlPool.query('SELECT bookId FROM user_bookmarks WHERE userId = ?', [user.id]);
          const [pRows] = await mysqlPool.query('SELECT bookId, status FROM user_book_progress WHERE userId = ?', [user.id]);
          const [qRows] = await mysqlPool.query('SELECT * FROM saved_quote_snapshots WHERE userId = ?', [user.id]);

          return {
            ...user,
            bookmarkedBookIds: bRows.map(b => b.bookId),
            completedBookIds: pRows.filter(p => p.status === 'COMPLETED').map(p => p.bookId),
            inProgressBookIds: pRows.filter(p => p.status === 'IN_PROGRESS').map(p => p.bookId),
            savedQuotes: qRows,
            streak: {
              currentStreak: user.currentStreak,
              longestStreak: user.longestStreak,
              lastReadDate: user.lastReadDate || '',
              streakHistory: [],
              isFreezeActive: Boolean(user.isFreezeActive),
              freezeCountAvailable: user.streakFreezesAvailable
            }
          };
        }
      } catch (err) {
        console.warn('[MySQL] Query error, falling back to JSON:', err.message);
      }
    }

    return this.localData.users.find(u => u.email.toLowerCase() === cleanEmail) || null;
  }

  async findUserById(id) {
    if (!id) return null;

    if (isMysqlActive && mysqlPool) {
      try {
        const [rows] = await mysqlPool.query('SELECT * FROM users WHERE id = ?', [id]);
        if (rows && rows.length > 0) {
          const user = rows[0];
          const [bRows] = await mysqlPool.query('SELECT bookId FROM user_bookmarks WHERE userId = ?', [user.id]);
          const [pRows] = await mysqlPool.query('SELECT bookId, status FROM user_book_progress WHERE userId = ?', [user.id]);
          const [qRows] = await mysqlPool.query('SELECT * FROM saved_quote_snapshots WHERE userId = ?', [user.id]);

          return {
            ...user,
            bookmarkedBookIds: bRows.map(b => b.bookId),
            completedBookIds: pRows.filter(p => p.status === 'COMPLETED').map(p => p.bookId),
            inProgressBookIds: pRows.filter(p => p.status === 'IN_PROGRESS').map(p => p.bookId),
            savedQuotes: qRows,
            streak: {
              currentStreak: user.currentStreak,
              longestStreak: user.longestStreak,
              lastReadDate: user.lastReadDate || '',
              streakHistory: [],
              isFreezeActive: Boolean(user.isFreezeActive),
              freezeCountAvailable: user.streakFreezesAvailable
            }
          };
        }
      } catch (err) {
        console.warn('[MySQL] Query error, falling back to JSON:', err.message);
      }
    }

    return this.localData.users.find(u => u.id === id) || null;
  }

  async createUser({ name, email, password, username }) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const cleanUsername = username ? (username.startsWith('@') ? username : `@${username}`) : `@${email.split('@')[0]}`;
    const cleanEmail = email.toLowerCase().trim();
    const newId = `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    if (isMysqlActive && mysqlPool) {
      try {
        await mysqlPool.query(`
          INSERT INTO users (id, email, username, name, password, avatarSeed, level, levelTitle, xp, totalMinutesRead, totalHoursSaved, quizAccuracyAverage, currentStreak, longestStreak)
          VALUES (?, ?, ?, ?, ?, ?, 1, 'Level 1: Page Novice 📖', 0, 0, 0, 0, 0, 0)
        `, [newId, cleanEmail, cleanUsername, name.trim(), hashedPassword, Math.floor(Math.random() * 100)]);

        return {
          id: newId,
          name: name.trim(),
          username: cleanUsername,
          email: cleanEmail,
          avatarSeed: 1,
          level: 1,
          levelTitle: 'Level 1: Page Novice 📖',
          xp: 0,
          totalMinutesRead: 0,
          totalHoursSaved: 0,
          quizAccuracyAverage: 0,
          bookmarkedBookIds: [],
          completedBookIds: [],
          inProgressBookIds: [],
          savedQuotes: [],
          streak: {
            currentStreak: 0,
            longestStreak: 0,
            lastReadDate: '',
            streakHistory: [],
            isFreezeActive: false,
            freezeCountAvailable: 1
          }
        };
      } catch (err) {
        console.warn('[MySQL] Insert error, saving to local JSON:', err.message);
      }
    }

    // Local JSON
    const newUser = {
      id: newId,
      name: name.trim(),
      username: cleanUsername,
      email: cleanEmail,
      password: hashedPassword,
      avatarSeed: Math.floor(Math.random() * 100),
      level: 1,
      levelTitle: 'Level 1: Page Novice 📖',
      xp: 0,
      xpToNextLevel: 150,
      streak: {
        currentStreak: 0,
        longestStreak: 0,
        lastReadDate: '',
        streakHistory: [],
        isFreezeActive: false,
        freezeCountAvailable: 1
      },
      completedBookIds: [],
      inProgressBookIds: [],
      bookmarkedBookIds: [],
      savedQuotes: [],
      totalMinutesRead: 0,
      totalHoursSaved: 0,
      quizAccuracyAverage: 0,
      createdAt: new Date().toISOString()
    };

    this.localData.users.push(newUser);
    this.saveLocal();
    return newUser;
  }

  async updateUser(id, updates) {
    if (isMysqlActive && mysqlPool) {
      try {
        const { xp, level, levelTitle, totalMinutesRead, totalHoursSaved, quizAccuracyAverage, streak, bookmarkedBookIds, completedBookIds, inProgressBookIds, savedQuotes } = updates;
        
        await mysqlPool.query(`
          UPDATE users SET
            xp = COALESCE(?, xp),
            level = COALESCE(?, level),
            levelTitle = COALESCE(?, levelTitle),
            totalMinutesRead = COALESCE(?, totalMinutesRead),
            totalHoursSaved = COALESCE(?, totalHoursSaved),
            quizAccuracyAverage = COALESCE(?, quizAccuracyAverage),
            currentStreak = COALESCE(?, currentStreak),
            longestStreak = COALESCE(?, longestStreak),
            lastReadDate = COALESCE(?, lastReadDate)
          WHERE id = ?
        `, [
          xp ?? null,
          level ?? null,
          levelTitle ?? null,
          totalMinutesRead ?? null,
          totalHoursSaved ?? null,
          quizAccuracyAverage ?? null,
          streak?.currentStreak ?? null,
          streak?.longestStreak ?? null,
          streak?.lastReadDate ?? null,
          id
        ]);

        // Sync bookmarks if provided
        if (bookmarkedBookIds && Array.isArray(bookmarkedBookIds)) {
          await mysqlPool.query('DELETE FROM user_bookmarks WHERE userId = ?', [id]);
          for (const bId of bookmarkedBookIds) {
            await mysqlPool.query('INSERT IGNORE INTO user_bookmarks (id, userId, bookId) VALUES (?, ?, ?)', [`bm-${Date.now()}-${bId}`, id, bId]);
          }
        }

        return this.findUserById(id);
      } catch (err) {
        console.warn('[MySQL] Update error, falling back to local JSON:', err.message);
      }
    }

    const idx = this.localData.users.findIndex(u => u.id === id);
    if (idx === -1) return null;

    const existing = this.localData.users[idx];
    const merged = {
      ...existing,
      ...updates,
      id: existing.id,
      email: existing.email,
      updatedAt: new Date().toISOString()
    };
    this.localData.users[idx] = merged;
    this.saveLocal();
    return merged;
  }
}

export const db = new HybridDatabaseManager();
