import { Quest, LeaderboardEntry, Badge, CanteenReward, WeeklySeasonInfo } from '../types';

export const WEEKLY_SEASON_DATA: WeeklySeasonInfo = {
  seasonNumber: 4,
  resetDaysLeft: 3,
  resetHoursLeft: 14,
  topRankRewardTitle: 'Free Nasi Ayam Laos Pak Yoyok 1 Minggu + Crown Avatar 👑🍗',
  topRankRewardPerks: [
    '🍗 Voucher Makan Gratis 1 Minggu Penuh: Nasi Ayam Laos Pak Yoyok + Es Teh Manis',
    '👑 Crown Gold Avatar Frame di Papan Skor Kampus',
    '⚡ +1,000 Bonus XP & Badge Eksklusif "Ayam Laos Master"'
  ]
};

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge-ayam-laos',
    title: 'Ayam Laos Master 🍗',
    icon: '🍗',
    description: 'Juara #1 Kompetisi Mingguan Kampus! Berhasil memenangkan stok Nasi Ayam Laos Pak Yoyok!',
    unlocked: false
  },
  {
    id: 'badge-overlord',
    title: 'ByteRead Overlord 👑',
    icon: '👑',
    description: 'Juara #1 Kompetisi Mingguan Kampus! Mempertahankan tahta 1 minggu penuh.',
    unlocked: false
  },
  {
    id: 'badge-404',
    title: '404 Hunter 🎯',
    icon: '👾',
    description: 'Berhasil membongkar rahasia Error 404 tanpa panik!',
    unlocked: true,
    unlockedAt: 'Kemarin'
  },
  {
    id: 'badge-api',
    title: 'API Whisperer ⚡',
    icon: '📡',
    description: 'Paham request & response REST API dalam sekali baca.',
    unlocked: false
  },
  {
    id: 'badge-git',
    title: 'Git Merge Legend 🔀',
    icon: '🛡️',
    description: 'Menyelesaikan 3 quest DevOps tanpa merusak branch main.',
    unlocked: false
  },
  {
    id: 'badge-streak',
    title: '5-Day Streak 🔥',
    icon: '🚀',
    description: 'Login dan membaca Byte-sized material 5 hari berturut-turut.',
    unlocked: true,
    unlockedAt: 'Hari ini'
  }
];

export const INITIAL_CANTEEN_REWARDS: CanteenReward[] = [
  {
    id: 'canteen-ayam-laos',
    title: 'Voucher Special Nasi Ayam Laos Pak Yoyok 🍗',
    xpCost: 500,
    description: 'Tukarkan di Kantin Kampus / Warung Pak Yoyok untuk 1 Porsi Nasi Ayam Laos Crispy + Sambal Pedas + Es Teh Manis.',
    sponsor: 'Warung Ayam Laos Pak Yoyok x Perpus IT',
    icon: '🍗',
    unlocked: false
  },
  {
    id: 'canteen-kopi',
    title: 'Voucher Kopi Free-Refill Kantin IT ☕',
    xpCost: 350,
    description: 'Tukarkan di Kantin Gedung B untuk 1 cangkir Kopi Espresso / Es Kopi Susu Code.',
    sponsor: 'Kantin IT Hub',
    icon: '☕',
    unlocked: true
  },
  {
    id: 'canteen-snack',
    title: 'Voucher Gorengan Combo Pack 🥟',
    xpCost: 250,
    description: 'Dapat 5 gorengan hangat di Kantin Kejujuran Perpustakaan.',
    sponsor: 'Perpus Tech',
    icon: '🥟',
    unlocked: true
  },
  {
    id: 'canteen-print',
    title: 'Gratis Print 20 Halaman Tugas 🖨️',
    xpCost: 600,
    description: 'Bebas ngeprint laporan di Lab Komputer 3.',
    sponsor: 'Lab Komputer Kampus',
    icon: '🖨️',
    unlocked: false
  }
];

export const QUESTS: Quest[] = [
  {
    id: 'quest-404',
    title: 'Misteri di Balik Error 404',
    tagline: 'Mengapa URL impianmu berakhir dengan Not Found?',
    category: 'Web Architecture',
    difficulty: 'Easy',
    estimatedMinutes: 3,
    xpReward: 100,
    canteenBonusXp: 50,
    badgeReward: {
      id: 'badge-404',
      title: '404 Hunter 🎯',
      icon: '👾',
      description: 'Berhasil melacak Error 404 Not Found sampai ke akarnya!'
    },
    slides: [
      {
        id: 1,
        title: '01/04: HTTP Status Code 404 Bukan Berarti Server Mati',
        category: 'Web Architecture',
        estimatedSec: 40,
        contentMarkdown: `Pernah buka URL terus dapet angka **404 Not Found**? 

Banyak programmer pemula ngira server-nya mati atau internetnya putus. Padahal **SALAH BESAR**!

Kenyataannya: **Request kamu BERHASIL sampai ke server**, dan server-nya hidup sehat. Tapi server mengabarkan: *"Gua denger permintaan lu, tapi barang/halaman yang lu cari GAK ADA di database/folder gua."*`,
        analogy: 'Analogi Warung Kopi: Kamu masuk warung (Server ON), kasir nyapa ramah (Koneksi OK), tapi kamu mesen "Jus Buah Naga" padahal warung itu cuma jualan Kopi (404 Not Found)!',
        codeSnippet: `// Response dari Server HTTP
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "status": 404,
  "error": "Not Found",
  "message": "Endpoint GET /api/v1/crush-heart tidak ditemukan!",
  "timestamp": "2025-02-18T10:00:00Z"
}`,
        keyTakeaway: 'Error 404 artinya Request sampai, tapi URL/Resource tidak ditemukan di server.'
      },
      {
        id: 2,
        title: '02/04: Beda 404 dengan Error 500 & 403',
        category: 'HTTP Standard',
        estimatedSec: 45,
        contentMarkdown: `Jangan tertukar antara keluarga 4xx dan 5xx!

- **4xx (Client Error):** Pintu salah, URL typox, atau lu gak punya izin. Murni kesalahan pengirim request!
- **401 Unauthorized / 403 Forbidden:** Lu belum login atau gak punya akses token.
- **500 Internal Server Error:** Server-nya yang *crash*, kodenya *buggy*, atau kodenya kena *NullPointerException*.`,
        analogy: '401: Belum beli tiket bioskop. 403: Punya tiket tapi mau masuk ruangan VIP Khusus Direktur. 500: Bioskopnya mati lampu / proyektor meledak!',
        codeSnippet: `// Struktur Header Respon HTTP
2xx = Success (200 OK, 201 Created)
3xx = Redirection (301 Moved Permanently)
4xx = Client Error (404 Not Found, 403 Forbidden)
5xx = Server Error (500 Internal Error, 502 Bad Gateway)`,
        keyTakeaway: 'Kepala 4xx = Kesalahan Client / Pengguna. Kepala 5xx = Kesalahan Internal Server.'
      },
      {
        id: 3,
        title: '03/04: Kenapa Angkanya Harus 404?',
        category: 'Computer History Trivia',
        estimatedSec: 35,
        contentMarkdown: `Mitos populer bilang nama 404 diambil dari nomor ruang kamar server pertama di CERN (Swiss) tempat Tim Berners-Lee menciptakan World Wide Web.

Meskipun CERN mengklarifikasi tidak ada ruangan bernama "Room 404", angka **4** ditentukan sebagai kategori Client Error, dan **04** adalah nomor urut spesifik untuk *Specific Syntax / Resource Not Found*.`,
        analogy: 'Sama seperti protokol port 80 untuk HTTP dan port 443 untuk HTTPS, 404 adalah standar konsorsium IETF.',
        codeSnippet: `// Standard RFC 7231 Section 6.5.4
The 404 (Not Found) status code indicates that the origin server
does not perceive that the target resource exists or is willing
to disclose that one exists.`,
        keyTakeaway: '404 adalah kode standar resmi IETF untuk Resource Not Found.'
      },
      {
        id: 4,
        title: '04/04: Cara Frontend Developer Dealing Dengan 404',
        category: 'Best Practice UX',
        estimatedSec: 40,
        contentMarkdown: `Jangan biarkan user-mu melihat layar putih membosankan (*Default Browser 404*)!

Sebagai Web Dev & UI/UX Expert yang keren:
1. Buat **Custom 404 Page** yang lucu atau interactive (misal ada mini game atau meme).
2. Sediakan **Tombol Back to Home** atau Search Bar.
3. Kirim **HTTP Status 404 asli** di header jika menggunakan SSR/Backend (penting untuk SEO Google Bot).`,
        analogy: 'Halaman 404 yang bagus itu seperti pramuniaga toko yang bilang: "Maaf barangnya habis bro, tapi coba cek raks sebelah sini deh!"',
        codeSnippet: `// React Router 404 Catch-All Route
<Route path="*" element={<CustomNotFoundPage />} />`,
        keyTakeaway: 'Selalu buat Custom 404 Page dengan rekomendasi navigasi untuk menyelamatkan UX pengguna.'
      }
    ],
    questions: [
      {
        id: 101,
        question: 'Apa arti murni dari HTTP Status Code 404 Not Found?',
        options: [
          'Koneksi internet pengguna terputus total',
          'Server mati dan meledak di data center',
          'Request berhasil diterima server, namun URL/Resource yang diminta tidak ada',
          'Database server kehabisan memori RAM'
        ],
        correctAnswer: 2,
        explanation: '404 Not Found berarti server beroperasi normal dan menerima request, tetapi tidak menemukan resource sesuai path/URL yang diminta.',
        memeCorrect: {
          imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80',
          title: 'HACKERMAN APPROVES! 😎',
          caption: 'Syntax Tepat! Kamu bukan sekadar script kiddie!',
          quote: '"Finally, someone who understands Client vs Server Errors!"'
        },
        memeWrong: {
          imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
          title: 'CONFUSED PROGRAMMER MEME 🙀',
          caption: 'Server-nya gak mati woi! Re-read slide 1!',
          quote: '"When the junior dev blames the server for a 404 error..."'
        }
      },
      {
        id: 102,
        question: 'Kategori status code kepala 4xx menandakan jenis error apa?',
        options: [
          'Server Crash & Internal Error',
          'Client / Request Error (Kesalahan pengirim request)',
          'Redirection ke domain lain',
          'Sukses mengambil data dari database'
        ],
        correctAnswer: 1,
        explanation: 'Status code 4xx adalah Client-side Errors (misal typo URL, tidak punya token akses, atau format payload salah).',
        memeCorrect: {
          imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
          title: 'CLEAN CODE VICTORY ⚡',
          caption: 'Combo x2! Pemahaman HTTP kamu top tier!',
          quote: '"Keep calm and read the HTTP status codes!"'
        },
        memeWrong: {
          imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
          title: 'BUG DETECTED IN BRAIN 🤖',
          caption: 'Inget: 4xx = Client Error, 5xx = Server Error!',
          quote: '"It\'s not a bug, it\'s an unexpected feature in your answer."'
        }
      },
      {
        id: 103,
        question: 'Praktik UI/UX terbaik saat menangani 404 di web modern adalah?',
        options: [
          'Biarkan layar putih polos browser tanpa informasi',
          'Tampilkan alert JavaScript bertuliskan "Woi Error!" lalu tutup browser',
          'Buat Custom 404 Page yang kreatif disertai tombol navigasi kembali ke Home',
          'Redirect paksa user ke google.com tanpa penjelasan'
        ],
        correctAnswer: 2,
        explanation: 'Custom 404 Page menjaga User Experience (UX) tetap ramah dan membantu pengguna menemukan kembali jalan di dalam aplikasi.',
        memeCorrect: {
          imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
          title: 'UX DESIGNER APPROVED! 🎨',
          caption: 'Keren! Kamu calon Senior UI/UX + Web Developer hebat!',
          quote: '"Good UX turns a 404 dead-end into a pleasant detour."'
        },
        memeWrong: {
          imageUrl: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=600&q=80',
          title: 'FACEPALM DEV 🤦♂️',
          caption: 'User nangis kalau kamu kasih layar putih tanpa navigasi!',
          quote: '"Please don\'t leave users stranded in black-hole URLs!"'
        }
      }
    ]
  },
  {
    id: 'quest-api-101',
    title: 'Mengenal REST API dalam 3 Menit',
    tagline: 'Bukan sihir, cuma HTTP request bawa JSON!',
    category: 'API & Protocol',
    difficulty: 'Medium',
    estimatedMinutes: 3,
    xpReward: 120,
    canteenBonusXp: 75,
    badgeReward: {
      id: 'badge-api',
      title: 'API Whisperer ⚡',
      icon: '📡',
      description: 'Paham GET, POST, PUT, DELETE tanpa ragu!'
    },
    slides: [
      {
        id: 1,
        title: '01/03: Konsep REST API (Representational State Transfer)',
        category: 'API Basics',
        estimatedSec: 45,
        contentMarkdown: `API (*Application Programming Interface*) adalah kurir penghubung antara Frontend (React/Vue/Flutter) dan Backend (Node.js/Python/Go).

REST API memanfaatkan kata kerja HTTP (*HTTP Verbs*) standar:
- **GET:** Ambil data (Read)
- **POST:** Buat data baru (Create)
- **PUT / PATCH:** Update data (Update)
- **DELETE:** Hapus data (Delete)`,
        analogy: 'Gojek Food Analogy: Kamu (Frontend) milih menu di app -> Mas Gojek (API) bawa pesanan ke Dapur Resto (Backend) -> Dapur masak dan bungkus makanan (JSON Response) -> Mas Gojek anterin ke kamu!',
        codeSnippet: `// Contoh Request Fetching REST API
fetch('https://api.byteread.ac.id/v1/books')
  .then(res => res.json())
  .then(data => console.log(data));`,
        keyTakeaway: 'REST API menggunakan HTTP Verbs (GET, POST, PUT, DELETE) dengan data biasanya berformat JSON.'
      },
      {
        id: 2,
        title: '02/03: JSON (JavaScript Object Notation) Payload',
        category: 'Data Format',
        estimatedSec: 40,
        contentMarkdown: `Hampir semua REST API modern berkomunikasi menggunakan **JSON**. Format ini sangat ringan, mudah dibaca manusia (*human-readable*), dan didukung semua bahasa pemograman.

JSON selalu menggunakan format **Key-Value Pair** dengan *double quotes* \`"key": "value"\`.`,
        analogy: 'JSON seperti formulir pendaftaran fisik, tapi dalam format teks digital yang super rapi.',
        codeSnippet: `{
  "student_id": "IT-2025-099",
  "name": "Budi Syntax",
  "is_active": true,
  "skills": ["React", "Tailwind", "Python"],
  "stats": {
    "xp": 450,
    "rank": "Junior Scripter"
  }
}`,
        keyTakeaway: 'JSON adalah format universal pengiriman data API berupa pasangan Key-Value.'
      },
      {
        id: 3,
        title: '03/03: HTTP Headers & Authorization Bearer Token',
        category: 'API Security',
        estimatedSec: 50,
        contentMarkdown: `Gimana server tahu kalau request API itu dikirim oleh kamu yang udah login, bukan hacker?

Jawabannya: **Authorization Header** bertipe \`Bearer Token\` (JWT - JSON Web Token).

Setiap kali kirim request ke endpoint rahasia, Frontend melampirkan *Token Tiket Masuk* di bagian Header request.`,
        analogy: 'Sama seperti gelang konser musik: Sekali kamu dapet gelang dari loket login, kamu tinggal tunjukin gelang itu ke semua pintu masuk wahana!',
        codeSnippet: `// Request Header dengan Authorization JWT
GET /api/v1/user/profile HTTP/1.1
Host: api.byteread.ac.id
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Accept: application/json`,
        keyTakeaway: 'Bearer Token pada Request Header digunakan untuk membuktikan identitas pengguna yang sudah terverifikasi.'
      }
    ],
    questions: [
      {
        id: 201,
        question: 'HTTP Verb manakah yang digunakan untuk membuat data baru di REST API?',
        options: [
          'GET',
          'POST',
          'DELETE',
          'OPTION'
        ],
        correctAnswer: 1,
        explanation: 'POST digunakan untuk mengirimkan data baru ke server (Create operation dalam CRUD).',
        memeCorrect: {
          imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
          title: 'POST REQUEST DEPLOYED! 🚀',
          caption: 'Benar 100%! POST = Create Data Baru!',
          quote: '"201 Created! Data successfully stored in DB."'
        },
        memeWrong: {
          imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80',
          title: 'POST VS GET CONFUSION 😅',
          caption: 'GET itu cuma buat ambil data bro! Kalau buat data baru pakai POST!',
          quote: '"GET creates nothing except high server read logs!"'
        }
      },
      {
        id: 202,
        question: 'Apa fungsi utama dari Authorization Header dengan Bearer Token?',
        options: [
          'Membuat tampilan UI website jadi dark mode',
          'Membuktikan identitas dan hak akses pengguna yang sudah login ke server',
          'Mempercepat kecepatan internet Wi-Fi kampus',
          'Mengubah format JSON menjadi file MP3'
        ],
        correctAnswer: 1,
        explanation: 'Bearer Token (JWT) di header bertindak sebagai tiket digital sah untuk membuktikan otentikasi user.',
        memeCorrect: {
          imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
          title: 'SECURITY GURU BADGE 🛡️',
          caption: 'Access Granted! Token verified successfully!',
          quote: '"HTTP/1.1 200 OK - Authorized Scripter!"'
        },
        memeWrong: {
          imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
          title: 'ACCESS DENIED 401 🔒',
          caption: 'Token kamu invalid atau tebakanmu kurang pas!',
          quote: '"Unauthorized! Please re-check the security slides."'
        }
      }
    ]
  },
  {
    id: 'quest-git-crash',
    title: 'Git Merge Conflict Emergency',
    tagline: 'Jangan panik pas liat <<<<<<< HEAD!',
    category: 'Git & DevOps',
    difficulty: 'Hard',
    estimatedMinutes: 4,
    xpReward: 150,
    canteenBonusXp: 100,
    badgeReward: {
      id: 'badge-git',
      title: 'Git Merge Legend 🔀',
      icon: '🛡️',
      description: 'Menaklukkan merge conflict tanpa delete folder project!'
    },
    slides: [
      {
        id: 1,
        title: '01/03: Mengapa Merge Conflict Terjadi?',
        category: 'Git Version Control',
        estimatedSec: 45,
        contentMarkdown: `Merge Conflict **BUKAN BUG GIT**, melainkan perlindungan Git!

Conflict terjadi ketika 2 orang developer mengubah **baris baris kode yang sama** pada file yang sama di dua branch berbeda, lalu mencoba menggabungkannya (*git merge*).

Git bingung: *"Versi Budi atau versi Ani yang harus gua pakai?"* Maka Git berhenti dan minta kamu memutuskan secara manual!`,
        analogy: 'Dua orang editor menulis revisi di kalimat paragraf yang sama pada dokumen Google Docs tanpa fitur auto-sync.',
        codeSnippet: `<<<<<<< HEAD (Baris kamu di branch main)
const apiURL = "https://api.production.com";
=======
const apiURL = "https://api.staging-test.com";
>>>>>>> feature/new-api (Baris dari branch temanmu)`,
        keyTakeaway: 'Merge Conflict terjadi saat 2 commit merubah baris kode yang sama di waktu bersamaan.'
      },
      {
        id: 2,
        title: '02/03: Cara Resolusi Conflict Seperti Pro',
        category: 'VS Code Workflow',
        estimatedSec: 50,
        contentMarkdown: `Jangan hapus repo dan re-clone dari awal! (Kebiasaan pemula 🙈).

Langkah mudah menyelesaikan conflict di VS Code:
1. Buka file yang berkonflik.
2. Pilih salah satu tombol pembantu:
   - **Accept Current Change** (Pakai kodemu)
   - **Accept Incoming Change** (Pakai kode temanmu)
   - **Accept Both Changes** (Pakai dua-duanya)
3. Save file -> \`git add .\` -> \`git commit -m "fix: resolve merge conflict"\`.`,
        analogy: 'Seperti hakim pertandingan yang menentukan versi mana yang paling benar sebelum dimasukkan ke dalam buku rekor.',
        codeSnippet: `# Command Line Steps
git status                     # Cek file yang conflict
# (Edit file manual / VS Code)
git add .                      # Stage resolved files
git commit -m "Merge resolved" # Selesaikan merge process`,
        keyTakeaway: 'Pilih versi kode yang benar, simpan, git add, dan buat commit penyelesaian merge.'
      }
    ],
    questions: [
      {
        id: 301,
        question: 'Langkah pertama yang benar ketika menghadapi Merge Conflict di Git adalah?',
        options: [
          'Hapus folder project dan komplain di grup chat',
          'Buka file yang conflict, pilih kode yang sesuai (Accept Current/Incoming), simpan file, lalu commit',
          'Matikan laptop dan pura-pura sakit',
          'Format ulang harddisk komputer'
        ],
        correctAnswer: 1,
        explanation: 'Conflict diselesaikan dengan memilih perubahan yang tepat, staging file (git add), dan melakukan commit.',
        memeCorrect: {
          imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
          title: 'SENIOR GIT DEVELOPER! 🔀',
          caption: 'Mantap! Kamu tidak pernah lagi panik kena Merge Conflict!',
          quote: '"Keep Calm and Git Resolve Conflict!"'
        },
        memeWrong: {
          imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
          title: 'DONT DELETE THE REPO! 😱',
          caption: 'Jangan re-clone project bro! Selesaikan conflict-nya pakai VS Code!',
          quote: '"git rm -rf . is not a valid conflict resolution strategy!"'
        }
      }
    ]
  }
];

export const DUMMY_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    name: 'Alfadli Dev',
    handle: '@DevGuru_SBY',
    xp: 1450,
    levelTitle: 'Level 8: Senior Architect',
    streak: 14,
    avatarSeed: 101
  },
  {
    rank: 2,
    name: 'Siti NullPointer',
    handle: '@SitiCode',
    xp: 1200,
    levelTitle: 'Level 6: Bug Slayer',
    streak: 9,
    avatarSeed: 102
  },
  {
    rank: 3,
    name: 'Fahry (Kamu)',
    handle: '@SyntaxNinja',
    xp: 450,
    levelTitle: 'Level 3: Junior Scripter',
    streak: 5,
    avatarSeed: 103,
    isCurrentUser: true
  },
  {
    rank: 4,
    name: 'Rian Async',
    handle: '@RianPromise',
    xp: 380,
    levelTitle: 'Level 3: Junior Scripter',
    streak: 3,
    avatarSeed: 104
  },
  {
    rank: 5,
    name: 'Dewi CSS Master',
    handle: '@FlexboxQueen',
    xp: 310,
    levelTitle: 'Level 2: Code Padawan',
    streak: 2,
    avatarSeed: 105
  }
];
