# Panduan Kustomisasi Undangan Digital

Dokumen ini menjelaskan cara mengganti isi dan tampilan website undangan **Alya & Raka** tanpa mengubah struktur fitur utama. Website berada di `client/src/pages/Home.tsx`, sedangkan seluruh gaya visual berada di `client/src/index.css`.

> Sebelum mengubah kode, buat salinan atau branch kerja agar perubahan mudah dibandingkan dan dipulihkan.

## 1. Menjalankan proyek secara lokal

Pastikan Node.js dan pnpm tersedia, lalu jalankan perintah berikut dari folder repository:

```bash
pnpm install
pnpm dev
```

Untuk pemeriksaan sebelum menyimpan perubahan, jalankan:

```bash
pnpm check
pnpm build
```

`pnpm check` memeriksa tipe TypeScript. `pnpm build` membuat build produksi dan akan membantu menemukan kesalahan import atau JSX.

## 2. Mengganti data pasangan dan acara

Semua data utama disimpan dalam objek `CONFIG` di bagian atas `client/src/pages/Home.tsx`. Ubah nilai di satu tempat ini agar nama dan detail yang tampil di berbagai section tetap konsisten.

| Properti | Fungsi | Contoh penggantian |
|---|---|---|
| `couple` | Nama lengkap pasangan | `"Nadia & Fajar"` |
| `shortNames` | Nama singkat atau nama panggilan | `"Nadia & Fajar"` |
| `parents` | Nama orang tua | Teks dua baris dengan `\n` |
| `eventDate` | Target countdown dalam format ISO | `"2027-09-12T09:00:00+07:00"` |
| `dateLabel` | Tanggal yang dibaca tamu | `"12 September 2027"` |
| `dayLabel` | Nama hari acara | `"Minggu"` |
| `akadTime` | Waktu akad | `"08.30 WIB"` |
| `receptionTime` | Waktu resepsi | `"11.00–14.00 WIB"` |
| `venue` | Nama tempat | `"Gedung Serbaguna Nusantara"` |
| `address` | Alamat lengkap | Alamat final venue |
| `mapsUrl` | Tautan Google Maps | URL lokasi final |
| `calendarUrl` | Tautan Google Calendar | URL event final |

Countdown hero dan countdown pada detail acara sama-sama membaca `eventDate`. Gunakan timezone yang benar, misalnya `+07:00` untuk WIB, agar angka countdown tidak bergeser.

Tanggal yang ditampilkan pada label hero, stamp tanggal, footer, dan copy acara ditulis langsung di JSX. Setelah mengubah `CONFIG`, cari teks seperti `19.06.27`, `19 Juni 2027`, dan `19 · 06 · 2027`, kemudian sesuaikan juga agar seluruh tampilan menggunakan tanggal baru.

## 3. Mengatur nama tamu melalui URL

Nama tamu dibaca dari parameter URL `to`:

```text
https://undangandig-yw6eesz3.manus.space/?to=Keluarga%20Budi%20Santoso
```

Jika parameter tidak ada, cover menampilkan `Tamu undangan`. Nilai tersebut dirapikan spasinya, dibatasi panjangnya, dan ditampilkan sebagai teks biasa. Jangan memasukkan HTML ke parameter URL.

Untuk pengujian lokal, gunakan contoh berikut:

```text
http://localhost:3000/?to=Keluarga%20Budi%20Santoso
```

## 4. Mengganti foto galeri

Daftar foto berada pada konstanta `gallery` di `client/src/pages/Home.tsx`. Setiap foto memiliki `src`, `alt`, dan `className`.

| Properti | Cara mengisi |
|---|---|
| `src` | URL aset gambar yang tersedia di penyimpanan proyek |
| `alt` | Deskripsi singkat dan spesifik tentang isi foto |
| `className` | `gallery-tall`, `gallery-wide`, `gallery-portrait`, atau `gallery-square` |

Jangan menyimpan gambar besar di `client/public` atau `client/src/assets`. Simpan file sumber di `/home/ubuntu/webdev-static-assets/`, unggah menggunakan alur aset proyek, lalu gunakan URL storage yang dihasilkan pada `src`. Setiap item sebaiknya menggunakan foto yang berbeda agar masonry gallery terasa seperti kumpulan fragmen perjalanan, bukan pengulangan gambar.

Lightbox sudah tersedia dan mendukung klik overlay untuk menutup, tombol sebelumnya/berikutnya, keyboard `Escape`, `ArrowLeft`, dan `ArrowRight`, serta penguncian scroll halaman ketika terbuka. Jika menambah foto, pastikan item baru tetap memiliki `alt` yang deskriptif.

## 5. Mengganti musik latar

Audio dipasang melalui elemen `<audio>` di `Home.tsx` dan memakai file:

```text
/manus-storage/arsip-bunga-ambient_93e9fff0.wav
```

Untuk mengganti musik, unggah file audio baru ke penyimpanan aset proyek lalu ubah nilai `src` pada elemen audio. Musik sebaiknya instrumental, tidak memiliki vokal, dan cukup lembut untuk menemani pembacaan undangan. Playback dimulai setelah tamu menekan **Buka undangan** karena browser dapat memblokir autoplay sebelum interaksi pengguna.

Fade-in volume berlangsung dari 0 menuju sekitar 24%. Tombol floating dapat digunakan untuk play atau pause. Jangan menghapus `aria-label`, atribut `loop`, atau fallback error pada `audio.play()`.

## 6. Mengubah warna, font, dan gaya visual

Token warna dan font berada di bagian awal `client/src/index.css`:

```css
:root {
  --paper: #f3eee5;
  --paper-deep: #e8dfd2;
  --ink: #272822;
  --moss: #586557;
  --terracotta: #b9644b;
}
```

Tema saat ini bernama **Arsip Bunga**. Ia menggunakan `Cormorant Garamond` untuk headline dan `DM Sans` untuk body, label, navigasi, dan form. Jika mengganti tema, ubah token warna terlebih dahulu, kemudian periksa kontras pada cover, gallery section, form, sticky navigation, dan footer.

Logo atau emblem digunakan pada cover, header, section tertentu, dan footer. Jika mengganti emblem, pertahankan file PNG transparan dan gunakan URL storage yang sama pada seluruh kemunculan agar identitas visual tetap konsisten.

## 7. RSVP dan guestbook

RSVP saat ini bersifat **frontend-only**. Pesan disimpan pada `localStorage` dengan key `arsip-bunga-rsvp`, sehingga pesan hanya terlihat pada browser dan perangkat tempat pesan dikirim. Tidak ada data tamu awal yang dibuat-buat.

Validasi sederhana mewajibkan nama dan pesan. Setelah submit, website menampilkan feedback tanpa reload dan menambahkan pesan baru ke guestbook. Untuk menerima RSVP lintas perangkat, website perlu di-upgrade dengan backend/database dan endpoint penyimpanan yang aman; jangan mengganti localStorage dengan kredensial database di frontend.

## 8. Navigasi, countdown, dan aksesibilitas

Navigasi desktop dan sticky navigation mobile membaca `activeSection`. Nilai tersebut diperbarui menggunakan `IntersectionObserver` untuk menandai section aktif ketika tamu menggulir halaman. Jika menambah section baru yang ingin tampil pada scroll-spy, tambahkan ID-nya ke daftar berikut di `Home.tsx` dan tambahkan tautan navigasinya:

```ts
["atas", "cerita", "acara", "galeri", "rsvp", "kasih"]
```

Jaga agar setiap anchor memiliki section `id` yang cocok. Tombol, input, gambar, radio button, dan dialog lightbox sudah memiliki label atau atribut aksesibilitas dasar. Pertahankan `alt`, `aria-label`, `aria-current`, dan aturan `prefers-reduced-motion` ketika melakukan modifikasi.

## 9. Checklist personalisasi sebelum dibagikan

| Pemeriksaan | Status yang diharapkan |
|---|---|
| Nama pasangan dan nama orang tua sudah final | Tidak ada placeholder |
| Tanggal, hari, dan timezone benar | Countdown sesuai waktu lokal |
| Alamat dan Google Maps dapat dibuka | Tautan membuka lokasi yang benar |
| Google Calendar berisi event yang benar | Judul, waktu, lokasi, dan deskripsi sesuai |
| Semua foto sudah diganti dan memiliki alt text | Tidak ada foto yang tidak sengaja terulang |
| Musik dapat diputar setelah tombol buka ditekan | Kontrol play/pause merespons |
| RSVP kosong ditolak | Validasi nama dan pesan tampil |
| RSVP berhasil muncul di guestbook | Tidak perlu reload halaman |
| Mobile navigation tidak menutupi konten | Diuji pada lebar sekitar 320–390 px |
| Reduced motion tetap nyaman | Konten terlihat tanpa animasi penting |

## 10. Workflow GitHub dan publikasi

Setelah perubahan selesai, jalankan `pnpm check` dan `pnpm build`. Kemudian simpan checkpoint proyek agar perubahan terdokumentasi dan tersinkron ke repository GitHub yang terhubung.

Website proyek saat ini tersedia di:

```text
https://undangandig-yw6eesz3.manus.space
```

Untuk undangan personal, gunakan parameter `to` pada URL produksi. Untuk pembaruan berikutnya, ubah kode secara bertahap, uji pada desktop dan mobile, lalu simpan checkpoint dengan pesan yang menjelaskan perubahan.

## Ringkasan file penting

| File | Tanggung jawab |
|---|---|
| `client/src/pages/Home.tsx` | Data konfigurasi, section, countdown, audio, RSVP, gallery, dan lightbox |
| `client/src/index.css` | Token visual, layout editorial, responsive styling, motion, dan sticky navigation |
| `client/index.html` | Metadata dan entry HTML |
| `ideas.md` | Keputusan desain dan arah visual Arsip Bunga |
| `todo.md` | Checklist pekerjaan terakhir |
