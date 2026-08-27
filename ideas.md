# Arah Desain Undangan Digital

## Tiga Pendekatan Awal

### Tema Nama: Senja di Selatan
**Very Brief Intro:** Romansa coastal modern dengan warna pasir, terracotta, dan biru laut yang terasa hangat, editorial, dan intim.
**Probability:** 0.07

### Tema Nama: Arsip Bunga
**Very Brief Intro:** Estetika botanical editorial yang memadukan kertas arsip, tipografi serif, dan ilustrasi bunga taktil untuk kesan personal dan timeless.
**Probability:** 0.03

### Tema Nama: Nocturne Atelier
**Very Brief Intro:** Arah dark romantic yang dramatis dengan tinta malam, aksen tembaga, dan komposisi seperti sampul novel klasik.
**Probability:** 0.09

## Pendekatan Terpilih: Arsip Bunga

### Design Movement
Botanical editorialism dengan pengaruh arsip surat, buku botani lama, dan editorial fashion kontemporer. Hasilnya harus terasa seperti artefak pribadi yang dikurasi, bukan template undangan.

### Core Principles
1. **Editorial asymmetry:** Komposisi memanfaatkan kolom offset, garis margin, dan foto yang keluar dari ritme grid seragam.
2. **Tactile restraint:** Tekstur kertas, grain lembut, dan garis tinta tipis memberi kedalaman tanpa dekorasi berlebihan.
3. **Warm intimacy:** Copy spesifik dan tenang, dengan ruang kosong yang membuat setiap detail terasa penting.
4. **Quiet motion:** Animasi masuk seperti halaman arsip yang dibuka perlahan—halus, singkat, dan tidak mengalihkan perhatian.

### Color Philosophy
Latar utama memakai ivory hangat seperti kertas katun tua agar terasa dekat dan tak lekang waktu. Ink charcoal memberi kontras literer. Terracotta muted menjadi aksen manusiawi seperti cap lilin, sementara moss green membawa hubungan dengan flora tanpa menjadikannya tema rustic generik. Signature brand color: **Parchment Terracotta #B9644B**.

### Layout Paradigm
Halaman disusun seperti spread editorial: hero memakai split composition, section cerita memakai nomor margin dan kolom teks offset, detail acara menggunakan garis waktu vertikal, dan galeri menggunakan masonry dengan crop yang tidak seragam. Konten tidak dipusatkan terus-menerus.

### Signature Elements
1. Emblem botani abstrak berupa dua batang yang bertemu membentuk monogram tanpa huruf.
2. Nomor section besar dan garis margin seperti halaman herbarium.
3. Label kecil bergaya cap arsip dengan warna terracotta.

### Interaction Philosophy
Interaksi harus terasa seperti membuka arsip pribadi: tombol memiliki underline yang tumbuh, foto memperbesar sangat halus, dan feedback salin/RSVP muncul ringkas tanpa mengganggu alur membaca.

### Animation
Cover bergerak slide-up 700ms dengan easing lembut. Setelah cover selesai, header dan elemen utama fade-in bertahap. Section reveal menggunakan opacity dan translateY kecil; galeri memakai scale 1.02 maksimum. Reduced motion menonaktifkan transform dan menampilkan semua konten langsung.

### Typography System
Display: **Cormorant Garamond**, dengan italic digunakan untuk nama dan momen emosional. Body/UI: **DM Sans**, dipakai pada label, navigasi, form, dan detail agar tetap jernih pada layar kecil. H1 memakai clamp besar dan line-height rapat; metadata uppercase memakai letter-spacing 0.16em.

### Brand Essence
Undangan digital untuk pasangan yang ingin kisah mereka terasa seperti surat yang disimpan lama—personal, editorial, dan hangat.
Personality: **intimate, curated, quietly romantic**.

### Brand Voice
Headline dan CTA terdengar puitis tetapi spesifik, tidak mengandalkan kalimat klise. CTA mengundang tindakan dengan lembut.

Contoh:
- “Satu hari yang kami simpan, kini ingin kami rayakan bersama.”
- “Buka halaman kisah kami.”

### Wordmark & Logo
Gunakan emblem grafis tanpa teks: dua batang bunga bergaya ukiran yang saling melengkung membentuk ruang negatif seperti pintu terbuka. Emblem tampil sebagai cap kecil pada cover, header, footer, dan favicon.

### Signature Brand Color
**Parchment Terracotta — #B9644B**, warna cap arsip yang memberi aksen hangat dan mudah dikenali di atas ivory.

## Konfigurasi Konten Implementasi
Semua data pasangan, tanggal, lokasi, tautan, dan pembayaran disimpan dalam satu objek konfigurasi terpusat dengan placeholder yang mudah diganti. Karena proyek ini frontend-only, RSVP dan guestbook memakai localStorage dan diberi penjelasan transparan bahwa data belum tersimpan ke server.
