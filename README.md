# ⚡ ByteRead - Micro-Learning & Non-Fiction Book Summaries

> **Solusi cerdas menyerap intisari buku non-fiksi dalam 3 menit.** Dilengkapi sitasi ISBN terverifikasi, analogi konkret, evaluasi pemahaman cepat, dan sistem gamifikasi belajar interaktif.

---

## 🌟 Fitur Utama

- 📖 **Intisari 3 Menit**: Ringkasan padat dan actionable dari buku-buku best-seller dunia (Atomic Habits, The Psychology of Money, Deep Work, dll).
- ⚡ **Mode Swipe 60 Detik**: Flashcard interaktif untuk menangkap ide utama dalam tempo cepat.
- 🎯 **Gamifikasi & Leveling**: Dapatkan XP, streak harian harian, freeze streak, dan naik level reader.
- 🎧 **Audio Fokus (Binaural Beats)**: Fitur audio fokus ambient untuk mendukung kenyamanan membaca.
- 💬 **Quote Snapshot & Sharing**: Simpan kutipan inspiratif dan bagikan dengan tema visual elegan.
- 🔐 **Autentikasi & Akun**: Register, Login, JWT auth, serta sinkronisasi progres baca ke server.
- 🗄️ **Smart Hybrid Database**: Terintegrasi dengan MySQL & sistem fallback JSON database lokal otomatis.

---

## 🚀 Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React, Framer Motion, Vite
- **Backend**: Node.js, Express.js, JWT, bcryptjs, mysql2
- **Database**: MySQL (Host DomaiNesia / Local) dengan Automatic Local JSON Storage Fallback

---

## 📦 Panduan Instalasi & Menjalankan

### 1. Clone Repositori
```bash
git clone https://github.com/MohammadKevin/ByteRead.git
cd ByteRead
```

### 2. Install Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment (`.env`)
Salin file `.env.example` menjadi `.env`:
```env
PORT=5000
JWT_SECRET="your_super_secret_jwt_key"

# Database Configuration (MySQL / DomaiNesia)
DB_HOST="localhost"
DB_PORT=3306
DB_USER="root"
DB_PASSWORD=""
DB_NAME="budayaki_byteread"
```

### 4. Jalankan Aplikasi
Jalankan frontend dan backend secara bersamaan:
```bash
npm run dev
```

- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000`

---

## 📝 Lisensi
Dibuat untuk keperluan tugas & riset pengembangan web interaktif modern.
