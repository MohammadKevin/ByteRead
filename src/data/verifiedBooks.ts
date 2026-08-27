import { Book } from '../types';

export const VERIFIED_BOOKS: Book[] = [
  {
    id: 'book-atomic-habits',
    slug: 'atomic-habits',
    title: 'Atomic Habits',
    originalTitle: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
    author: 'James Clear',
    authorBio: 'Pakar pembentukan kebiasaan, pembicara internasional, dan penulis buletin mingguan beroplah jutaan pembaca.',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    ratingsCount: '2.1M+ pembaca Goodreads',
    category: 'Self-Improvement',
    moodTags: ['HABIT', 'BURNOUT'],
    readDuration: '3_MIN',
    estimatedMinutes: 3,
    totalSlides: 4,
    baseXp: 120,
    timeSavedHours: 6.5,
    verificationStatus: 'VERIFIED',
    oneSentenceSummary: 'Perubahan 1% setiap hari berakumulasi menjadi hasil besar melalui sistem yang konsisten, bukan sekadar motivasi sesaat.',
    quickTakeaways: [
      'Hasil hidupmu saat ini adalah cermin dari kebiasaan harianmu, bukan target besarmu.',
      'Ubah identitas diri terlebih dahulu: jangan katakan "saya mau lari", tapi "saya adalah pelari".',
      'Terapkan 4 hukum perubahan perilaku: buat jelas, buat menarik, buat mudah, dan buat memuaskan.'
    ],
    actionableStep: 'Terapkan aturan 2 menit: mulai kebiasaan baru hanya dengan durasi 2 menit (misal: baca 1 halaman sebelum tidur).',
    citation: {
      publisher: 'Avery (Penguin Random House LLC)',
      publisherUrl: 'https://www.penguinrandomhouse.com/books/560824/atomic-habits-by-james-clear/',
      goodreadsUrl: 'https://www.goodreads.com/book/show/40121378-atomic-habits',
      verifiedIsbn10: '0735211299',
      verifiedIsbn13: '978-0735211292',
      originalPublishYear: 2018,
      chapterReference: 'Bab 1: The Surprising Power of Atomic Habits & Bab 3: How to Build a Habit in 4 Simple Steps',
      citationApa: 'Clear, J. (2018). Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones. New York: Avery.'
    },
    slides: [
      {
        id: 1,
        slideNumber: 1,
        chapterTitle: 'Bab 1: The 1% Compounding Effect',
        hookHeadline: 'Fokus pada sistem perbaikan 1% setiap hari, bukan gol besar.',
        biteContent: 'Meningkatkan kualitas diri 1% setiap hari membuatmu 37 kali lipat lebih baik dalam setahun. Sebaliknya, turun 1% per hari membuat kemampuanmu merosot mendekati nol.',
        bulletTakeaways: [
          'Kebiasaan adalah bunga majemuk (compound interest) dari perbaikan diri.',
          'Hasil hidupmu saat ini adalah cermin kebiasaan harianmu, bukan gol besarmu.'
        ],
        realWorldAnalogy: 'Seperti balok es di ruangan minus 5°C. Suhu naik ke -4°, -3°, -2°, es belum mencair. Saat menyentuh 0°C, es meleleh drastis. Usahamu tidak sia-sia, hanya sedang terakumulasi.',
        quotableSentence: 'You do not rise to the level of your goals. You fall to the level of your systems.',
        estimatedReadSec: 45
      },
      {
        id: 2,
        slideNumber: 2,
        chapterTitle: 'Bab 2: Identity-Based Habits',
        hookHeadline: 'Ubah identitas dirimu, bukan hanya keinginan luarnya.',
        biteContent: 'Tingkat terdalam perubahan perilaku adalah identitas. Jangan bilang "saya sedang coba berhenti merokok", tapi katakan "saya bukan perokok".',
        bulletTakeaways: [
          'Outcome: Apa yang ingin didapat (turun 5 kg).',
          'Process: Apa yang dilakukan (olahraga 20 menit).',
          'Identity: Apa yang diyakini tentang diri sendiri (saya orang yang aktif dan sehat).'
        ],
        realWorldAnalogy: 'Saat ditawari kue manis: orang yang merasa dirinya "sedang diet ketat" akan merasa tersiksa, sementara orang yang mengidentifikasi dirinya "pencinta makanan sehat" akan menolak secara alami.',
        quotableSentence: 'Every action you take is a vote for the type of person you wish to become.',
        estimatedReadSec: 45
      },
      {
        id: 3,
        slideNumber: 3,
        chapterTitle: 'Bab 3: The 4 Laws of Behavior Change',
        hookHeadline: 'Empat hukum praktis agar kebiasaan baik menempel otomatis.',
        biteContent: 'Agar kebiasaan baru terbentuk permanen: Buat Jelas (Cue), Buat Menarik (Craving), Buat Mudah (Response), dan Buat Memuaskan (Reward).',
        bulletTakeaways: [
          'Buat Jelas: Taruh buku di atas meja kerja, bukan di dalam lemari tertutup.',
          'Buat Mudah: Terapkan aturan 2 menit untuk memulai.',
          'Habit Stacking: Sambungkan kebiasaan baru ke rutinitas lama ("Setelah seduh kopi pagi, saya akan baca 1 intisari").'
        ],
        realWorldAnalogy: 'Menaruh camilan sehat di meja makan membuatnya otomatis dimakan, sama seperti menyembunyikan remote TV di laci lemari membuat kita malas menyalakan TV.',
        quotableSentence: 'Make the cues of good habits obvious and the cues of bad habits invisible.',
        estimatedReadSec: 45
      },
      {
        id: 4,
        slideNumber: 4,
        chapterTitle: 'Bab 16: The Never Miss Twice Rule',
        hookHeadline: 'Jangan pernah melewatkan kebiasaan dua kali berturut-turut.',
        biteContent: 'Melewatkan 1 hari latihan atau membaca adalah ketidaksengajaan. Namun melewatkan hari kedua adalah awal mula terbentuknya kebiasaan buruk baru.',
        bulletTakeaways: [
          'Konsistensi mikro jauh lebih penting daripada intensitas sporadis.',
          'Jika hari ini gagal karena sibuk, pastikan besok kembali tepat di jalurnya meski hanya 2 menit.'
        ],
        realWorldAnalogy: 'Seperti rantai streak harian: bolong 1 hari bisa diperbaiki, tetapi jika bolong 2 hari, rantai konsistensi putus total.',
        quotableSentence: 'Missing once is an accident. Missing twice is the start of a new habit.',
        estimatedReadSec: 40
      }
    ],
    microQuiz: [
      {
        id: 101,
        question: 'Mengapa James Clear menekankan pentingnya membangun sistem dibanding sekadar menentukan gol/target?',
        options: [
          'Karena target dilarang dalam psikologi modern',
          'Pemenang dan pecundang memiliki target yang sama; pembedanya adalah sistem harian yang mereka jalankan',
          'Karena sistem hanya berlaku untuk mesin industri',
          'Target membuat orang cepat menyerah tanpa alasan'
        ],
        correctAnswerIndex: 1,
        explanation: 'Setiap atlet Olimpiade ingin medali emas (target sama), tetapi hanya mereka yang memiliki sistem latihan dan disiplin harian terbaik yang berhasil meraihnya.',
        chapterSourceRef: 'Atomic Habits, Bab 1: "Why Goals Are Overrated"',
        xpReward: 40
      },
      {
        id: 102,
        question: 'Bagaimana pola kalimat metode "Habit Stacking" yang paling efektif?',
        options: [
          'Setelah [Kebiasaan Lama], saya akan melakukan [Kebiasaan Baru]',
          'Saya akan belajar hanya saat suasana hati sedang sangat bersemangat',
          'Menghapus seluruh akun media sosial secara mendadak',
          'Membeli perlengkapan mahal sebelum memulai'
        ],
        correctAnswerIndex: 0,
        explanation: 'Habit Stacking mengikat kebiasaan baru pada jalur neuron dari rutinitas yang sudah kokoh terbentuk (misal: setelah seduh kopi pagi, baca 1 ringkasan).',
        chapterSourceRef: 'Atomic Habits, Bab 5: "The Best Way to Start a New Habit"',
        xpReward: 40
      }
    ]
  },
  {
    id: 'book-psychology-of-money',
    slug: 'psychology-of-money',
    title: 'The Psychology of Money',
    originalTitle: 'The Psychology of Money: Timeless lessons on wealth, greed, and happiness',
    author: 'Morgan Housel',
    authorBio: 'Mantan kolumnis The Wall Street Journal dan partner di Collaborative Fund.',
    coverImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    ratingsCount: '850K+ pembaca Goodreads',
    category: 'Finance',
    moodTags: ['FINANCE', 'OVERTHINKING'],
    readDuration: '3_MIN',
    estimatedMinutes: 3,
    totalSlides: 4,
    baseXp: 120,
    timeSavedHours: 5.5,
    verificationStatus: 'VERIFIED',
    oneSentenceSummary: 'Keberhasilan finansial lebih dipengaruhi oleh kendali emosi, ego, dan kesabaran daripada kecerdasan matematika semata.',
    quickTakeaways: [
      'Kaya (Rich) adalah pengeluaran yang tampak, sedangkan Makmur (Wealthy) adalah uang dan aset yang tidak dibelanjakan.',
      'Dividen tertinggi dari uang adalah kebebasan mengontrol waktu dan menentukan aktivitas harianmu.',
      'Menabunglah tanpa alasan spesifik: tabungan adalah bantalan pelindung dari ketidakpastian masa depan.'
    ],
    actionableStep: 'Sisihkan minimal 10% penghasilan ke pos dana fleksibilitas tanpa rencana konsumtif untuk membeli ketenangan pikiran.',
    citation: {
      publisher: 'Harriman House Ltd',
      publisherUrl: 'https://harriman-house.com/psychologyofmoney',
      goodreadsUrl: 'https://www.goodreads.com/book/show/41881472-the-psychology-of-money',
      verifiedIsbn10: '0857197681',
      verifiedIsbn13: '978-0857197689',
      originalPublishYear: 2020,
      chapterReference: 'Bab 3: Never Enough & Bab 9: Wealth is What You Don’t See',
      citationApa: 'Housel, M. (2020). The Psychology of Money: Timeless lessons on wealth, greed, and happiness. Hampshire: Harriman House.'
    },
    slides: [
      {
        id: 1,
        slideNumber: 1,
        chapterTitle: 'Bab 1: No One’s Crazy',
        hookHeadline: 'Keputusan finansial setiap orang dibentuk oleh pengalaman masa lalunya.',
        biteContent: 'Keputusan uang seseorang tampak aneh bagi orang lain karena setiap orang tumbuh di era ekonomi, inflasi, dan kesempatan kerja yang berbeda.',
        bulletTakeaways: [
          'Pengalaman pribadimu tentang uang hanya mewakili sebagian kecil dari realitas dunia.',
          'Pahami latar belakang psikologis seseorang sebelum menilai cara mereka membelanjakan uang.'
        ],
        realWorldAnalogy: 'Generasi yang tumbuh saat krisis moneter cenderung menimbun uang tunai, sedangkan generasi masa kini lebih nyaman dengan transaksi digital dan investasi daring.',
        quotableSentence: 'Your personal experiences with money make up maybe 0.00000001% of what’s happened in the world, but maybe 80% of how you think the world works.',
        estimatedReadSec: 45
      },
      {
        id: 2,
        slideNumber: 2,
        chapterTitle: 'Bab 9: Wealth is What You Don’t See',
        hookHeadline: 'Perbedaan mendasar antara "Rich" dan "Wealthy".',
        biteContent: 'Rich adalah pemasukan yang langsung dihabiskan untuk barang konsumsi. Wealthy adalah uang yang tidak dibelanjakan: pilihan hidup dan fleksibilitas waktu.',
        bulletTakeaways: [
          'Membeli barang mewah untuk memukau orang lain adalah cara tercepat menghabiskan uang.',
          'Kekayaan sejati memberi rasa aman saat menghadapi risiko hidup tak terduga.'
        ],
        realWorldAnalogy: 'Melihat seseorang mengendarai mobil sport mewah hanya membuktikan satu hal: rekeningnya berkurang seharga mobil tersebut, bukan berarti ia bebas dari utang.',
        quotableSentence: 'Spending money to show people how much money you have is the fastest way to have less money.',
        estimatedReadSec: 45
      },
      {
        id: 3,
        slideNumber: 3,
        chapterTitle: 'Bab 7: Freedom Over Luxury',
        hookHeadline: 'Fungsi tertinggi uang adalah membeli kontrol atas waktumu.',
        biteContent: 'Dividen paling bernilai dari tabungan adalah kemampuan untuk bangun setiap pagi dan menentukan sendiri apa yang ingin kamu kerjakan hari ini.',
        bulletTakeaways: [
          'Kontrol atas waktu sendiri adalah pendorong kepuasan hidup yang lebih kuat daripada kenaikan gaji tanpa waktu luang.',
          'Tabungan darurat memberimu daya tawar untuk meninggalkan lingkungan kerja yang merugikan.'
        ],
        realWorldAnalogy: 'Memiliki dana darurat 6 bulan biaya hidup seperti memiliki bantalan pengaman yang membuatmu tidak panik saat terjadi restrukturisasi perusahaan.',
        quotableSentence: 'The highest form of wealth is the ability to wake up every morning and say, "I can do whatever I want today."',
        estimatedReadSec: 45
      },
      {
        id: 4,
        slideNumber: 4,
        chapterTitle: 'Bab 10: Room for Error',
        hookHeadline: 'Sisakan ruang untuk kesalahan dalam setiap rencana keuangan.',
        biteContent: 'Rencana terbaik adalah rencana yang tetap bertahan saat hal-hal tidak berjalan sesuai prediksi awal.',
        bulletTakeaways: [
          'Kecerdasan finansial terletak pada margin of safety.',
          'Fleksibilitas mengalahkan prediksi pintar jangka pendek.'
        ],
        realWorldAnalogy: 'Menabung tanpa target belanja tertentu sama seperti memasang sabuk pengaman di mobil: kamu tidak berniat tabrakan, tetapi ia menyelamatkan hidupmu jika terjadi insiden.',
        quotableSentence: 'Plan on your plan not going according to plan.',
        estimatedReadSec: 40
      }
    ],
    microQuiz: [
      {
        id: 201,
        question: 'Apa definisi "Wealthy" menurut Morgan Housel?',
        options: [
          'Penghasilan yang langsung dibelanjakan untuk barang mewah',
          'Aset dan uang yang disimpan serta tidak dibelanjakan, yang memberikan kebebasan waktu',
          'Jumlah pengikut terbanyak di media sosial',
          'Memiliki banyak kartu kredit limit tinggi'
        ],
        correctAnswerIndex: 1,
        explanation: 'Wealth adalah opsi yang belum terpakai dan kebebasan waktu, sedangkan Rich adalah display konsumsi saat ini.',
        chapterSourceRef: 'The Psychology of Money, Bab 9: "Wealth is What You Don’t See"',
        xpReward: 40
      }
    ]
  },
  {
    id: 'book-deep-work',
    slug: 'deep-work',
    title: 'Deep Work',
    originalTitle: 'Deep Work: Rules for Focused Success in a Distracted World',
    author: 'Cal Newport',
    authorBio: 'Profesor Ilmu Komputer di Georgetown University dan penulis topik produktivitas ilmiah.',
    coverImage: 'https://images.unsplash.com/photo-1507842229451-9f01079ca4b5?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    ratingsCount: '450K+ pembaca Goodreads',
    category: 'Productivity',
    moodTags: ['BURNOUT', 'TECH_CAREER'],
    readDuration: '3_MIN',
    estimatedMinutes: 3,
    totalSlides: 4,
    baseXp: 120,
    timeSavedHours: 6.0,
    verificationStatus: 'VERIFIED',
    oneSentenceSummary: 'Kemampuan fokus mendalam tanpa distraksi adalah keahlian langka yang paling dihargai dalam ekonomi pengetahuan modern.',
    quickTakeaways: [
      'Deep Work adalah aktivitas fokus intensif yang melatih kemampuan kognitif menyelesaikan masalah rumit.',
      'Beralih tugas sesaat menimbulkan "Attention Residue" yang menurunkan kapasitas konsentrasi hingga 20 menit.',
      'Latihlah otak untuk menoleransi rasa bosan tanpa langsung meraih ponsel pintar.'
    ],
    actionableStep: 'Blok waktu 90 menit tanpa ponsel dan notifikasi setiap pagi untuk menyelesaikan tugas terpentingmu.',
    citation: {
      publisher: 'Grand Central Publishing (Hachette Book Group)',
      publisherUrl: 'https://www.hachettebookgroup.com/titles/cal-newport/deep-work/9781455586691/',
      goodreadsUrl: 'https://www.goodreads.com/book/show/25744928-deep-work',
      verifiedIsbn10: '1455586692',
      verifiedIsbn13: '978-1455586691',
      originalPublishYear: 2016,
      chapterReference: 'Part 1: The Deep Work Hypothesis & Part 2: Rule #1 Work Deeply',
      citationApa: 'Newport, C. (2016). Deep Work: Rules for Focused Success in a Distracted World. Boston: Grand Central Publishing.'
    },
    slides: [
      {
        id: 1,
        slideNumber: 1,
        chapterTitle: 'Part 1: The Deep Work Hypothesis',
        hookHeadline: 'Fokus intens tanpa gangguan adalah kemampuan paling bernilai saat ini.',
        biteContent: 'Dua jenis pekerjaan: Deep Work (konsentrasi mendalam memecahkan hal rumit) dan Shallow Work (balas pesan cepat, rapat koordinasi, tugas repetitif).',
        bulletTakeaways: [
          'Pekerjaan dangkal (shallow work) mudah digantikan otomatisasi dan AI.',
          'Kemampuan belajar hal sulit dengan cepat hanya terjadi saat otak berada dalam mode deep work.'
        ],
        realWorldAnalogy: 'Deep work seperti menyelam ke dasar laut untuk mengambil mutiara; shallow work seperti berenang di tepi pantai sambil bermain air.',
        quotableSentence: 'The ability to perform deep work is becoming increasingly rare at exactly the same time it is becoming increasingly valuable in our economy.',
        estimatedReadSec: 45
      },
      {
        id: 2,
        slideNumber: 2,
        chapterTitle: 'Part 2: Attention Residue',
        hookHeadline: 'Dampak buruk beralih tugas: sisa perhatian tertinggal.',
        biteContent: 'Saat beralih dari tugas inti untuk sekadar melirik pesan 5 detik, sisa perhatian (Attention Residue) tetap tertinggal di tugas kedua dan merusak fokus utama.',
        bulletTakeaways: [
          'Multitasking menurunkan efisiensi kerja otak secara drastis.',
          'Kerjakan satu tugas dalam satu blok waktu penuh sebelum beralih ke tugas lain.'
        ],
        realWorldAnalogy: 'Komputer yang membuka puluhan tab berat bersamaan: memori RAM habis dan seluruh aplikasi menjadi lambat merespons.',
        quotableSentence: 'When you switch from Task A to Task B, your attention does not immediately follow. A residue remains stuck thinking about the previous task.',
        estimatedReadSec: 45
      },
      {
        id: 3,
        slideNumber: 3,
        chapterTitle: 'Rule #2: Embrace Boredom',
        hookHeadline: 'Latih pikiranmu agar tahan terhadap rasa bosan tanpa membuka gawai.',
        biteContent: 'Jika setiap kali merasa jeda beberapa detik kamu langsung membuka media sosial, otakmu terbiasa menuntut stimulasi cepat dan kehilangan daya tahan fokus panjang.',
        bulletTakeaways: [
          'Beri ruang bagi otak untuk jeda pasif tanpa layar.',
          'Berjalan kaki sejenak membantu mengendapkan ide rumit secara alami.'
        ],
        realWorldAnalogy: 'Sama seperti otot tubuh yang perlu dilatih mengangkat beban, daya tahan konsentrasi perlu dilatih dengan tidak langsung mencari pelarian saat bosan.',
        quotableSentence: 'If every moment of potential boredom is relieved with a quick glance at your phone, your brain has been rewired for constant distraction.',
        estimatedReadSec: 45
      },
      {
        id: 4,
        slideNumber: 4,
        chapterTitle: 'Rule #4: Shutdown Ritual',
        hookHeadline: 'Tutup hari kerja dengan ritual selesai yang tegas.',
        biteContent: 'Tetapkan waktu batas kapan pekerjaan harian berhenti. Tanpa batas yang jelas, pikiranmu akan terus cemas memikirkan tugas yang belum tuntas di malam hari.',
        bulletTakeaways: [
          'Tinjau agenda esok hari, rapikan berkas, dan matikan laptop saat jam kerja usai.',
          'Istirahat malam yang berkualitas adalah modal utama fokus tajam keesokan harinya.'
        ],
        realWorldAnalogy: 'Menutup aplikasi dengan benar sebelum mematikan komputer, bukan mencabut paksa kabel listrik yang berisiko merusak sistem.',
        quotableSentence: 'Decide in advance what you’re going to do with every minute of your workday.',
        estimatedReadSec: 40
      }
    ],
    microQuiz: [
      {
        id: 301,
        question: 'Apa dampak dari fenomena "Attention Residue" saat kita kerap melirik notifikasi di sela belajar?',
        options: [
          'Konsentrasi otak langsung pulih dalam 1 detik',
          'Sisa perhatian tertinggal pada notifikasi sehingga kapasitas kognitif tugas utama menurun',
          'Mempercepat penyelesaian tugas ganda',
          'Menghemat daya baterai perangkat'
        ],
        correctAnswerIndex: 1,
        explanation: 'Setiap pergantian konteks tugas meninggalkan residu perhatian yang membuat performa berpikir melambat selama beberapa menit berikutnya.',
        chapterSourceRef: 'Deep Work, Part 1: "Deep Work is Rare"',
        xpReward: 40
      }
    ]
  },
  {
    id: 'book-show-your-work',
    slug: 'show-your-work',
    title: 'Show Your Work!',
    originalTitle: 'Show Your Work!: 10 Ways to Share Your Creativity and Get Discovered',
    author: 'Austin Kleon',
    authorBio: 'Penulis dan seniman visual yang fokus pada manifesto kreativitas praktis di era digital.',
    coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80',
    rating: 4.5,
    ratingsCount: '320K+ pembaca Goodreads',
    category: 'Creativity',
    moodTags: ['CREATIVE', 'TECH_CAREER'],
    readDuration: '2_MIN',
    estimatedMinutes: 2,
    totalSlides: 3,
    baseXp: 100,
    timeSavedHours: 4.0,
    verificationStatus: 'VERIFIED',
    oneSentenceSummary: 'Kamu tidak perlu menjadi pakar untuk mulai berbagi; dokumentasikan proses belajarmu dan biarkan audiens yang tepat menemukan karyamu.',
    quickTakeaways: [
      'Bersikaplah sebagai amatir: belajar secara terbuka tanpa rasa takut terlihat belum sempurna.',
      'Tunjukkan proses di balik layar (draf, kesalahan, solusi), bukan hanya hasil akhir yang dipoles.',
      'Bagikan satu catatan kecil bermanfaat setiap hari secara konsisten.'
    ],
    actionableStep: 'Tulis dan bagikan satu hal baru yang kamu pelajari hari ini di media sosial profesionalmu.',
    citation: {
      publisher: 'Workman Publishing Company',
      publisherUrl: 'https://austinkleon.com/show-your-work/',
      goodreadsUrl: 'https://www.goodreads.com/book/show/18290401-show-your-work',
      verifiedIsbn10: '076117897X',
      verifiedIsbn13: '978-0761178972',
      originalPublishYear: 2014,
      chapterReference: 'Bab 1: You Don’t Have to Be a Genius & Bab 4: Share Something Small Every Day',
      citationApa: 'Kleon, A. (2014). Show Your Work!: 10 Ways to Share Your Creativity and Get Discovered. New York: Workman Publishing.'
    },
    slides: [
      {
        id: 1,
        slideNumber: 1,
        chapterTitle: 'Bab 1: Be An Amateur',
        hookHeadline: 'Keberanian pemula seringkali lebih autentik dan membantu.',
        biteContent: 'Pakar sering menggunakan istilah yang rumit. Sebagai pemula, kamu memahami persis kendala yang dihadapi orang-orang yang baru mulai belajar topik yang sama.',
        bulletTakeaways: [
          'Bagikan proses pemecahan masalah sederhana yang baru saja kamu temukan.',
          'Dokumentasikan apa yang sedang kamu pelajari hari ini.'
        ],
        realWorldAnalogy: 'Membagikan cara mengatasi error pemrograman sederhana sering kali lebih banyak membantu sesama rekan belajar dibanding artikel teori yang abstrak.',
        quotableSentence: 'In the beginner’s mind there are many possibilities, in the expert’s mind there are few.',
        estimatedReadSec: 40
      },
      {
        id: 2,
        slideNumber: 2,
        chapterTitle: 'Bab 2: Think Process, Not Product',
        hookHeadline: 'Buka ruang kerja kreatifmu: perlihatkan draf dan prosesnya.',
        biteContent: 'Orang-orang tertarik melihat bagaimana sebuah karya dirancang dari nol, termasuk eksperimen yang gagal sebelum berhasil.',
        bulletTakeaways: [
          'Jadilah pencatat perjalanan belajarmu sendiri.',
          'Dokumentasi proses adalah portofolio hidup yang membangun jejaring secara alami.'
        ],
        realWorldAnalogy: 'Video di balik layar pembuatan animasi sering ditonton jutaan kali karena memperlihatkan dedikasi dan keterampilan nyata pembuatnya.',
        quotableSentence: 'Become a documentarian of what you do. Start a work journal.',
        estimatedReadSec: 40
      },
      {
        id: 3,
        slideNumber: 3,
        chapterTitle: 'Bab 4: Share Something Small Every Day',
        hookHeadline: 'Konsisten membagikan satu hal kecil setiap hari.',
        biteContent: 'Jangan menunggu karya utuh 100 halaman selesai. Bagikan satu kutipan bermakna, satu baris kode bermanfaat, atau satu pelajaran penting hari ini.',
        bulletTakeaways: [
          'Gunakan uji kegunaan sederhana: "Apakah catatan ini bermanfaat bagi orang lain?".',
          'Konsistensi berbagi membuka peluang karir yang tak terduga.'
        ],
        realWorldAnalogy: 'Tetesan air harian yang mengisi wadah secara bertahap hingga menjadi portofolio yang kokoh.',
        quotableSentence: 'One day at a time, this is enough; do not look back and do not grieve over the past.',
        estimatedReadSec: 40
      }
    ],
    microQuiz: [
      {
        id: 401,
        question: 'Menurut Austin Kleon, mengapa seorang pemula (amateur) tidak perlu minder untuk mulai berbagi proses belajarnya?',
        options: [
          'Karena pemula selalu mendapat bayaran lebih tinggi',
          'Karena pemula berbagi secara jujur dan tahu persis kesulitan yang dihadapi sesama pembelajar awal',
          'Karena pemula tidak perlu belajar teori',
          'Karena karya pemula tidak akan pernah dikritik'
        ],
        correctAnswerIndex: 1,
        explanation: 'Semangat pemula yang terbuka membantu mendemistifikasi topik rumit menjadi bahasa yang mudah dicerna sesamanya.',
        chapterSourceRef: 'Show Your Work!, Bab 1: "Be an Amateur"',
        xpReward: 40
      }
    ]
  },
  {
    id: 'book-subtle-art',
    slug: 'the-subtle-art',
    title: 'The Subtle Art of Not Giving a F*ck',
    originalTitle: 'The Subtle Art of Not Giving a F*ck: A Counterintuitive Approach to Living a Good Life',
    author: 'Mark Manson',
    authorBio: 'Penulis asal Amerika Serikat dengan pendekatan filosofi praktis dan realistis.',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    rating: 4.4,
    ratingsCount: '1.4M+ pembaca Goodreads',
    category: 'Psychology',
    moodTags: ['OVERTHINKING', 'BURNOUT'],
    readDuration: '3_MIN',
    estimatedMinutes: 3,
    totalSlides: 3,
    baseXp: 110,
    timeSavedHours: 5.0,
    verificationStatus: 'VERIFIED',
    oneSentenceSummary: 'Ketenangan hidup dicapai bukan dengan memedulikan semua hal, melainkan berani memilih hal-hal penting apa yang layak diperjuangkan.',
    quickTakeaways: [
      'Hindari toxic positivity: mengakui rasa cemas atau kegagalan adalah langkah awal menuju perbaikan diri.',
      'Kebahagiaan lahir dari menyelesaikan masalah nyata, bukan dari ketiadaan masalah.',
      'Prinsip "Do Something": jangan menunggu motivasi datang; mulailah dari tindakan kecil untuk memicu inspirasi.'
    ],
    actionableStep: 'Tulis 3 hal yang saat ini membuatmu cemas, lalu coret 2 hal yang berada di luar kendali langsungmu.',
    citation: {
      publisher: 'Harper / HarperCollins Publishers',
      publisherUrl: 'https://www.harpercollins.com/products/the-subtle-art-of-not-giving-a-fck-mark-manson',
      goodreadsUrl: 'https://www.goodreads.com/book/show/28257707-the-subtle-art-of-not-giving-a-f-ck',
      verifiedIsbn10: '0062457713',
      verifiedIsbn13: '978-0062457714',
      originalPublishYear: 2016,
      chapterReference: 'Bab 1: Don’t Try & Bab 4: The Value of Suffering',
      citationApa: 'Manson, M. (2016). The Subtle Art of Not Giving a F*ck. New York: Harper.'
    },
    slides: [
      {
        id: 1,
        slideNumber: 1,
        chapterTitle: 'Bab 1: The Feedback Loop from Hell',
        hookHeadline: 'Lepaskan tekanan untuk selalu terlihat bahagia setiap saat.',
        biteContent: 'Merasa cemas karena sedang cemas hanya memperparah kondisi mental. Penerimaan terhadap pengalaman negatif secara paradoks menghasilkan ketenangan pikiran.',
        bulletTakeaways: [
          'Mengakui kegagalan atau kesedihan adalah bagian wajar dari kehidupan manusia.',
          'Hukum Kebalikan: semakin keras mengejar rasa bahagia superfisial, semakin kamu merasa kekurangan.'
        ],
        realWorldAnalogy: 'Seperti meronta di dalam air yang tenang: semakin panik bergerak tanpa arah, semakin banyak tenaga terkuras. Tenang dan ambil kendali rasional.',
        quotableSentence: 'The desire for more positive experience is itself a negative experience. And, paradoxically, the acceptance of one’s negative experience is itself a positive experience.',
        estimatedReadSec: 45
      },
      {
        id: 2,
        slideNumber: 2,
        chapterTitle: 'Bab 2: Happiness Comes from Solving Problems',
        hookHeadline: 'Pilihlah tantangan dan kesulitan yang bermakna bagimu.',
        biteContent: 'Hidup tidak akan pernah bebas dari masalah. Yang membedakan kualitas hidup adalah kualitas masalah yang kamu pilih untuk kamu selesaikan.',
        bulletTakeaways: [
          'Hasil yang memuaskan datang satu paket dengan rasa lelah dan latihan panjang.',
          'Nikmati proses mengatasi tantangan, bukan hanya saat menerima pujian.'
        ],
        realWorldAnalogy: 'Ingin mahir berbicara bahasa asing berarti harus siap dengan rasa canggung saat salah pengucapan di masa awal latihan.',
        quotableSentence: 'Who you are is defined by what you’re willing to struggle for.',
        estimatedReadSec: 45
      },
      {
        id: 3,
        slideNumber: 3,
        chapterTitle: 'Bab 7: The "Do Something" Principle',
        hookHeadline: 'Tindakan nyata memicu motivasi, bukan sebaliknya.',
        biteContent: 'Urutan motivasi yang sebenarnya berbentuk lingkaran: Tindakan (Action) ➔ Melahirkan Inspirasi ➔ Memicu Motivasi Baru untuk melangkah lebih jauh.',
        bulletTakeaways: [
          'Saat merasa buntu, lakukan satu tindakan terkecil yang memungkinkan.',
          'Gerakan pertama memecah kebekuan mental dan memicu fokus.'
        ],
        realWorldAnalogy: 'Menulis tugas laporan: ketik satu kalimat pengantar terlebih dahulu. Begitu jari bergerak, kalimat berikutnya akan menyusul dengan sendirinya.',
        quotableSentence: 'Action isn’t just the effect of motivation; it’s also the cause of it.',
        estimatedReadSec: 40
      }
    ],
    microQuiz: [
      {
        id: 501,
        question: 'Bagaimana cara kerja prinsip "Do Something" dalam mengatasi kebuntuan dan rasa malas?',
        options: [
          'Menunggu suasana hati sempurna sebelum mulai bertindak',
          'Memulai dari tindakan kecil nyata terlebih dahulu untuk memicu aliran inspirasi dan motivasi berikutnya',
          'Mengabaikan tugas hingga tenggat waktu tiba',
          'Membeli buku baru tanpa membacanya'
        ],
        correctAnswerIndex: 1,
        explanation: 'Tindakan adalah pemantik psikologis yang memicu dorongan energi dan motivasi kelanjutan.',
        chapterSourceRef: 'The Subtle Art of Not Giving a F*ck, Bab 7: "Failure is the Way Forward"',
        xpReward: 40
      }
    ]
  },
  {
    id: 'book-make-time',
    slug: 'make-time',
    title: 'Make Time',
    originalTitle: 'Make Time: How to Focus on What Matters Every Day',
    author: 'Jake Knapp & John Zeratsky',
    authorBio: 'Mantan perancang produk di Google Ventures dan kreator metodologi Design Sprint.',
    coverImage: 'https://images.unsplash.com/photo-1495364115450-33b1e35bc525?auto=format&fit=crop&w=600&q=80',
    rating: 4.5,
    ratingsCount: '110K+ pembaca Goodreads',
    category: 'Productivity',
    moodTags: ['HABIT', 'BURNOUT'],
    readDuration: '2_MIN',
    estimatedMinutes: 2,
    totalSlides: 3,
    baseXp: 100,
    timeSavedHours: 4.5,
    verificationStatus: 'VERIFIED',
    oneSentenceSummary: 'Ambil alih kendali harimu dengan menentukan satu "Highlight" utama dan mendesain ulang lingkungan digital yang minim distraksi.',
    quickTakeaways: [
      'Dua pencuri waktu terbesar: "Busy Bandwagon" (tuntutan kerja konstan) dan "Infinity Pools" (aplikasi konten tanpa batas).',
      'Tentukan SATU "Daily Highlight" (60–90 menit) setiap pagi yang menjadi tolok ukur keberhasilan harimu.',
      'Ubah setelan ponsel menjadi alat kerja praktis, bukan mesin pancing dopamin.'
    ],
    actionableStep: 'Pilih 1 tugas penting hari ini berdurasi 60 menit dan matikan notifikasi media sosial selama mengerjakannya.',
    citation: {
      publisher: 'Currency (Crown Publishing Group / Penguin Random House)',
      publisherUrl: 'https://maketime.blog/',
      goodreadsUrl: 'https://www.goodreads.com/book/show/37880811-make-time',
      verifiedIsbn10: '0525572422',
      verifiedIsbn13: '978-0525572428',
      originalPublishYear: 2018,
      chapterReference: 'The Make Time Framework: Highlight, Laser, Energize, Reflect',
      citationApa: 'Knapp, J., & Zeratsky, J. (2018). Make Time: How to Focus on What Matters Every Day. New York: Currency.'
    },
    slides: [
      {
        id: 1,
        slideNumber: 1,
        chapterTitle: 'Konsep 1: The Busy Bandwagon & Infinity Pools',
        hookHeadline: 'Kenali dua jebakan utama yang menghabiskan waktumu tanpa sadar.',
        biteContent: 'Dua faktor penguras waktu: 1) Tuntutan respon chat tanpa henti (Busy Bandwagon) dan 2) Aplikasi dengan konten mengalir tiada akhir (Infinity Pools).',
        bulletTakeaways: [
          'Setelan standar gawai modern dirancang untuk menarik perhatianmu secara berulang.',
          'Atur ulang batasan digital secara proaktif.'
        ],
        realWorldAnalogy: 'Membuka linimasa video pendek tanpa tujuan sama seperti melompat ke kolam tanpa dasar; waktu berjam-jam berlalu tanpa disadari.',
        quotableSentence: 'Infinity Pools are apps and sources of endlessly replenishing entertainment.',
        estimatedReadSec: 40
      },
      {
        id: 2,
        slideNumber: 2,
        chapterTitle: 'Konsep 2: The Daily Highlight',
        hookHeadline: 'Pilih satu prioritas utama (Highlight) setiap pagi.',
        biteContent: 'Daripada membuat daftar tugas panjang yang menimbulkan kewalahan, pilih satu aktivitas yang jika tuntas akan membuat harimu bermakna.',
        bulletTakeaways: [
          'Durasi ideal fokus Highlight: 60 hingga 90 menit.',
          'Pilih berdasarkan urgensi, kepuasan kerja, atau kegembiraan pribadi.'
        ],
        realWorldAnalogy: 'Seperti memilih sajian utama di meja makan: ada hidangan pelengkap, tetapi sajian utamalah yang memberi kepuasan sejati.',
        quotableSentence: 'Your Highlight isn’t the only thing you’ll do each day, but it’s the focal point.',
        estimatedReadSec: 40
      },
      {
        id: 3,
        slideNumber: 3,
        chapterTitle: 'Konsep 3: Distraction-Free Phone',
        hookHeadline: 'Jadikan ponselmu sebagai alat bantu, bukan pengalih fokus.',
        biteContent: 'Hapus aplikasi hiburan tanpa batas dari layar utama ponsel dan akses hanya melalui peramban komputer meja saat waktu istirahat.',
        bulletTakeaways: [
          'Matikan notifikasi yang tidak bersifat darurat.',
          'Ciptakan jarak fisik dengan gawai saat sedang fokus bekerja.'
        ],
        realWorldAnalogy: 'Menyimpan toples kue di lemari atas yang sulit dijangkau saat sedang menjaga pola makan sehat.',
        quotableSentence: 'When you make it harder to access distractions, you create space for what matters.',
        estimatedReadSec: 40
      }
    ],
    microQuiz: [
      {
        id: 701,
        question: 'Berapa durasi waktu optimal yang disarankan untuk mengeksekusi "Daily Highlight" harian?',
        options: [
          '10 menit saja',
          '60 hingga 90 menit blok waktu fokus mendalam',
          '8 jam nonstop tanpa istirahat',
          '30 detik di sela perjalanan'
        ],
        correctAnswerIndex: 1,
        explanation: 'Blok 60-90 menit adalah durasi ideal di mana fokus manusia dapat mencapai puncaknya tanpa kelelahan mental berlebih.',
        chapterSourceRef: 'Make Time, "Highlight: Choose One Thing Each Day"',
        xpReward: 40
      }
    ]
  },
  {
    id: 'book-clean-code',
    slug: 'clean-code',
    title: 'Clean Code',
    originalTitle: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin ("Uncle Bob")',
    authorBio: 'Pelopor rekayasa perangkat lunak modern dan salah satu penandatangan Agile Manifesto.',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    ratingsCount: '210K+ pembaca Goodreads',
    category: 'Tech & Craftsmanship',
    moodTags: ['TECH_CAREER', 'CREATIVE'],
    readDuration: '5_MIN',
    estimatedMinutes: 5,
    totalSlides: 4,
    baseXp: 150,
    timeSavedHours: 8.0,
    verificationStatus: 'VERIFIED',
    oneSentenceSummary: 'Kode yang bersih ditulis agar mudah dibaca dan dipahami rekan tim selayaknya membaca teks prosa yang tertata rapi.',
    quickTakeaways: [
      'Gunakan penamaan variabel dan fungsi yang menjelaskan tujuan aslinya secara eksplisit.',
      'Satu fungsi hanya boleh mengerjakan satu tugas spesifik dan mengerjakannya dengan baik (Single Responsibility).',
      'Aturan Pramuka (Boy Scout Rule): tinggalkan berkas kode dalam kondisi lebih rapi daripada saat kamu pertama kali membukanya.'
    ],
    actionableStep: 'Refactor satu nama variabel misterius (misal: `let d;` menjadi `let elapsedTimeInDays;`) pada proyek kodemu hari ini.',
    citation: {
      publisher: 'Prentice Hall (Pearson Education, Inc.)',
      publisherUrl: 'https://www.pearson.com/en-us/subject-catalog/p/clean-code-a-handbook-of-agile-software-craftsmanship/P200000000150',
      goodreadsUrl: 'https://www.goodreads.com/book/show/3735293-clean-code',
      verifiedIsbn10: '0132350882',
      verifiedIsbn13: '978-0132350884',
      originalPublishYear: 2008,
      chapterReference: 'Bab 2: Meaningful Names, Bab 3: Functions, & Bab 4: Comments',
      citationApa: 'Martin, R. C. (2008). Clean Code: A Handbook of Agile Software Craftsmanship. Boston: Prentice Hall.'
    },
    slides: [
      {
        id: 1,
        slideNumber: 1,
        chapterTitle: 'Bab 2: Meaningful Names',
        hookHeadline: 'Nama variabel harus menjelaskan maksud dan fungsinya secara gamblang.',
        biteContent: 'Waktu yang dihabiskan untuk membaca kode jauh lebih banyak daripada menulis kode baru. Gunakan penamaan yang mudah dilafalkan dan mudah dicari.',
        bulletTakeaways: [
          'Hindari penamaan singkatan yang membingungkan.',
          'Gunakan nama yang mencerminkan domain masalah secara jelas.'
        ],
        realWorldAnalogy: 'Memberi label toples bumbu dapur dengan tulisan "Garam Halus" alih-alih "Bubuk Putih A".',
        quotableSentence: 'Clean code reads like well-written prose.',
        estimatedReadSec: 50
      },
      {
        id: 2,
        slideNumber: 2,
        chapterTitle: 'Bab 3: Small Functions',
        hookHeadline: 'Fungsi harus berukuran ringkas dan hanya mengerjakan satu tugas.',
        biteContent: 'Aturan utama penulisan fungsi: buat fungsi sesederhana mungkin. Satu fungsi hanya bertanggung jawab atas satu proses spesifik.',
        bulletTakeaways: [
          'Fungsi yang baik umumnya tidak lebih dari 20 baris kode.',
          'Hindari efek samping tersembunyi yang mengubah state secara tak terduga.'
        ],
        realWorldAnalogy: 'Tombol saklar lampu: menekan saklar hanya menyalakan lampu, tidak sekaligus menyalakan alarm atau membuka pintu garasi.',
        quotableSentence: 'Functions should do one thing. They should do it well. They should do it only.',
        estimatedReadSec: 50
      },
      {
        id: 3,
        slideNumber: 3,
        chapterTitle: 'Bab 4: Comments Are Not a Fix for Bad Code',
        hookHeadline: 'Komentar terbaik adalah kode yang mampu menjelaskan dirinya sendiri.',
        biteContent: 'Komentar sering kali menjadi basi saat kode diperbarui. Daripada menulis komentar panjang untuk menjelaskan kode yang kusut, perbaiki struktur kodenya.',
        bulletTakeaways: [
          'Gunakan komentar untuk menjelaskan alasan di balik keputusan teknis (*why*), bukan mengulang apa yang dilakukan kode (*what*).',
          'Hapus baris kode usang; manfaatkan riwayat Git untuk melihat versi lampau.'
        ],
        realWorldAnalogy: 'Memasang rambu jalan "Awas jalan rusak" selama bertahun-tahun daripada menambal permukaan aspal yang berlubang.',
        quotableSentence: 'Don’t comment bad code—rewrite it.',
        estimatedReadSec: 45
      },
      {
        id: 4,
        slideNumber: 4,
        chapterTitle: 'The Boy Scout Rule',
        hookHeadline: 'Tinggalkan basis kode dalam keadaan lebih bersih dari sebelumnya.',
        biteContent: 'Jika setiap anggota tim merapikan satu fungsi kecil atau menghapus variabel usang saat melakukan bugfix, kualitas kode akan meningkat seiring waktu.',
        bulletTakeaways: [
          'Perbaikan kecil berkelanjutan mencegah penumpukan utang teknis (technical debt).',
          'Kepedulian terhadap kebersihan kode mempermudah pekerjaan rekan kerja masa depan.'
        ],
        realWorldAnalogy: 'Aturan berkemah: selalu bersihkan area perkemahan lebih rapi daripada saat pertama kali tiba di lokasi.',
        quotableSentence: 'Leave the campground cleaner than you found it.',
        estimatedReadSec: 40
      }
    ],
    microQuiz: [
      {
        id: 801,
        question: 'Apa esensi dari "The Boy Scout Rule" dalam pengembangan perangkat lunak?',
        options: [
          'Menolak membaca kode lama yang dibuat developer lain',
          'Meninggalkan kode sedikit lebih bersih dan rapi setiap kali kita membuka atau mengubahnya',
          'Menulis ulang seluruh aplikasi dari awal setiap bulan',
          'Menghapus semua file dokumentasi'
        ],
        correctAnswerIndex: 1,
        explanation: 'Aturan ini memastikan kebersihan kode terjaga secara bertahap melalui kebiasaan harian tim developer.',
        chapterSourceRef: 'Clean Code, Bab 1: "The Boy Scout Rule"',
        xpReward: 50
      }
    ]
  },
  {
    id: 'book-draft-sample-unverified',
    slug: 'unverified-sample-draft',
    title: 'Mindset & Momentum (Draft)',
    originalTitle: 'Mindset and Momentum: Practical Principles for the Digital Age',
    author: 'Anonymous Author',
    authorBio: 'Entri draf internal yang sedang dalam proses verifikasi data ISBN dan link penerbit.',
    coverImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80',
    rating: 4.1,
    ratingsCount: '1.2K pembaca (Review Draf)',
    category: 'Productivity',
    moodTags: ['HABIT', 'BURNOUT'],
    readDuration: '2_MIN',
    estimatedMinutes: 2,
    totalSlides: 2,
    baseXp: 80,
    timeSavedHours: 3.5,
    verificationStatus: 'NEEDS_VERIFICATION', // DEMONSTRATING THE FALLBACK RULE!
    oneSentenceSummary: 'Draf ringkasan awal mengenai momentum kerja; data sumber ISBN sedang dalam verifikasi kurator.',
    quickTakeaways: [
      'Momentum kecil yang dijaga setiap hari lebih kuat daripada dorongan instan.',
      'Fokus pada konsistensi durasi 15 menit awal untuk memecah inersia.',
      'Periksa status verifikasi data sebelum mengutip secara akademis.'
    ],
    actionableStep: 'Mulai aktivitasmu 15 menit hari ini tanpa membuka aplikasi lain.',
    citation: {
      publisher: 'Belum Terkonfirmasi',
      publisherUrl: '',
      goodreadsUrl: '',
      verifiedIsbn13: 'Menunggu Verifikasi ISBN',
      originalPublishYear: 2024,
      chapterReference: 'Bab 1: Momentum Basics (Dalam Proses Review)',
      citationApa: 'Data sitasi sedang ditinjau oleh tim kurator ByteRead.',
      sourceVerificationNote: 'Data buku ini berstatus "Perlu Verifikasi" karena tautan penerbit resmi dan nomor ISBN-13 belum divalidasi penuh oleh sistem.'
    },
    slides: [
      {
        id: 1,
        slideNumber: 1,
        chapterTitle: 'Bab 1: The Physics of Momentum',
        hookHeadline: 'Inersia awal adalah rintangan terbesar saat hendak mulai bekerja.',
        biteContent: 'Memulai suatu tugas membutuhkan energi terbesar. Begitu kamu bergerak melewati 10 menit pertama, energi yang dibutuhkan berkurang drastis.',
        bulletTakeaways: [
          'Gunakan pemicu awal berdurasi singkat.',
          'Catat progres harian untuk menjaga dorongan psikologis.'
        ],
        realWorldAnalogy: 'Mendorong mobil mogok: dorongan pertama sangat berat, tetapi begitu roda berputar, mobil bergerak lebih ringan.',
        quotableSentence: 'Momentum is built by starting, not by waiting.',
        estimatedReadSec: 40
      },
      {
        id: 2,
        slideNumber: 2,
        chapterTitle: 'Bab 2: Sustaining Flow',
        hookHeadline: 'Pertahankan ritme kerja dengan membatasi durasi sesi.',
        biteContent: 'Batasi sesi kerja intensif agar energimu tidak terkuras habis dalam satu hari kerja.',
        bulletTakeaways: [
          'Berikan jeda teratur setiap 50 menit.',
          'Jaga ritme tidur yang konsisten.'
        ],
        realWorldAnalogy: 'Pelari maraton mengatur kecepatan napas agar tidak kehabisan tenaga sebelum garis akhir.',
        quotableSentence: 'Pace yourself for the long run.',
        estimatedReadSec: 40
      }
    ],
    microQuiz: [
      {
        id: 9901,
        question: 'Mengapa 10 menit pertama saat memulai tugas terasa paling berat?',
        options: [
          'Karena inersia mental membutuhkan energi aktivasi awal yang lebih tinggi sebelum masuk ke kondisi fokus',
          'Karena laptop membutuhkan waktu memanaskan processor',
          'Karena tidak boleh minum air putih saat bekerja',
          'Karena tugas selalu mustahil dikerjakan'
        ],
        correctAnswerIndex: 0,
        explanation: 'Energi aktivasi awal adalah hambatan psikologis sebelum otak terbiasa dengan ritme tugas yang sedang dikerjakan.',
        chapterSourceRef: 'Draft Review: Bab 1',
        xpReward: 30
      }
    ]
  }
];
