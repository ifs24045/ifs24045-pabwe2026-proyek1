# NilaiKu (Frontend)

**NilaiKu** adalah aplikasi web manajemen nilai mata kuliah untuk mahasiswa. Pengguna dapat mendaftar, login, mencatat mata kuliah beserta SKS, nilai, dan semester, memfilter berdasarkan semester, serta melihat IPK dan total SKS yang dihitung otomatis.

Proyek 1 - Pengembangan Aplikasi Berbasis Web (PABWE) 2026, Institut Teknologi Del.

- Backend: https://github.com/ifs24045/ifs24045-pabwe2026-p1-api
- Demo online: https://ifs24045-pabwe2026-proyek1.vercel.app

## Fitur

- Registrasi dan login (JWT)
- CRUD mata kuliah (tambah, lihat, edit, hapus)
- Filter mata kuliah berdasarkan semester
- Dashboard dengan IPK, total SKS, dan jumlah mata kuliah
- Manajemen profil (ubah nama dan password)

## Teknologi

- React 19 dengan Vite
- React Router DOM dan Axios
- Vitest dan Testing Library (pengujian)
- Oxlint (linter)
- SonarQube dan Jenkins (analisis kualitas dan pipeline CI/CD)

## Prasyarat

- [Bun](https://bun.sh) versi 1.x
- Git
- **Backend NilaiKu sudah berjalan** di `http://localhost:3000` (lihat langkah di bawah)

## Cara Menjalankan di Komputer Lokal

Aplikasi ini membutuhkan backend, jadi jalankan backend lebih dulu.

### 1. Jalankan Backend

```bash
git clone https://github.com/ifs24045/ifs24045-pabwe2026-p1-api.git
cd ifs24045-pabwe2026-p1-api
bun install
cp .env.example .env          # Windows (CMD): copy .env.example .env
bun run dev
```

Pastikan terminal menampilkan `Server berjalan di port 3000`. Biarkan terminal ini tetap terbuka.

### 2. Jalankan Frontend

Buka terminal baru, lalu:

```bash
git clone https://github.com/ifs24045/ifs24045-pabwe2026-proyek1.git
cd ifs24045-pabwe2026-proyek1
bun install
bun run dev
```

Buka http://localhost:5173 di browser.

### Akun Uji Coba

| Username   | Password      |
| ---------- | ------------- |
| `penguji`  | `penguji123`  |

Atau buat akun baru lewat halaman Register.

## Konfigurasi

Alamat API diatur lewat variabel `VITE_API_URL` pada file `.env` (sudah disertakan di repository):

```
VITE_API_URL=http://localhost:3000
```

Ubah nilainya jika backend berjalan di alamat lain.

## Script

| Perintah          | Fungsi                                          |
| ----------------- | ----------------------------------------------- |
| `bun run dev`     | Menjalankan server pengembangan                 |
| `bun run build`   | Build produksi ke folder `dist`                 |
| `bun run preview` | Pratinjau hasil build                           |
| `bun run test`    | Menjalankan pengujian beserta coverage          |
| `bun run lint`    | Menjalankan Oxlint                              |

## Struktur Proyek

```
src
├── components        # AppLayout, AuthLayout, MatakuliahForm, NilaiBadge
├── context           # AuthContext (state autentikasi)
├── pages             # Landing, Dashboard, Matakuliah, Tambah/Edit, Profil
│   └── auth          # Login, Register
└── utils             # Instance Axios dan hook useMatakuliahForm
```

## Halaman

| Rute                     | Keterangan                       |
| ------------------------ | -------------------------------- |
| `/`                      | Landing page                     |
| `/auth/login`            | Login                            |
| `/auth/register`         | Registrasi                       |
| `/dashboard`             | Ringkasan akademik               |
| `/matakuliah`            | Daftar mata kuliah dan filter    |
| `/matakuliah/tambah`     | Tambah mata kuliah               |
| `/matakuliah/edit/:id`   | Edit mata kuliah                 |
| `/profil`                | Profil pengguna                  |

## Penulis

Thimoty Geraldino Sianipar (11S24045) - S1 Informatika, Institut Teknologi Del