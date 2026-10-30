# Design: Engineering fieldnotes

Sistem visual yang disetujui untuk portfolio Backend Software Engineer ascaveth. Implementasi berikutnya mengikuti dokumen ini. Perubahan arah visual dilakukan secara eksplisit.

## Arah dan prinsip visual
- Genre editorial; komposisi dokumen panjang dengan kolom anotasi. Tema custom dengan karakter hangat, tenang, teliti, dan personal.
- Acuan persetujuan: `design-explorations/fieldnotes/index.html` dan stylesheet pendampingnya. Dokumen ini mengunci arah tersebut tanpa mengimplementasikan website.
- Jadikan keputusan engineering sebagai materi utama: masalah, batasan, keputusan, dan bukti verifikasi. Anotasi harus menjelaskan materi, bukan menjadi dekorasi.
- Gunakan bidang kertas datar, tipografi serif, ruang kosong, dan garis pemisah. Hindari tekstur kertas buatan, gradient, glassmorphism, bayangan kartu, pill berlebihan, terminal palsu, dan grid kartu seragam.
- Satu gagasan utama per bidang pandang. Heading memakai satu warna dan satu gaya; jangan memberi aksen pada satu kata saja.
- Konten prototype adalah contoh, bukan fakta portfolio. Jangan menerbitkan klaim, angka, testimoni, pengalaman, atau alamat contoh sebagai informasi aktual.

## Warna dan token
Deklarasikan semua warna dan keluarga font melalui token di `:root`. Nilai berikut berasal dari prototype yang disetujui; `DESIGN.md` menjadi acuan sampai token implementasi dibuat.

```css
:root {
  --paper: #f3eee2; /* Latar kertas hangat */
  --ink: #292d28; /* Teks utama dan bidang bukti */
  --accent: #975036; /* Anotasi, tautan hover, dan focus */
  --muted: #65665a; /* Keterangan sekunder */
  --line: #c8c5b6; /* Garis pemisah pada kertas */
  --display: Palatino, "Palatino Linotype", serif;
  --body: "Trebuchet MS", sans-serif;
}
```

Aksen digunakan terbatas sebagai penanda. Panel bukti memakai `--ink` dengan teks `--paper`; gunakan garis dan keterangan yang tetap terbaca pada bidang gelap. Token `--surface` hijau dari prototype tidak digunakan dan tidak termasuk sistem yang dikunci. Periksa contrast teks dan kontrol pada setiap pasangan warna sebelum implementasi diterima.

## Tipografi
- Heading menggunakan serif regular, bobot 400, line-height sekitar 1.06. Body menggunakan sans 16px dengan line-height 1.6 dan measure maksimum 58ch.
- H1 desktop memakai `clamp(48px, 7.4vw, 104px)`, tracking -0.035em, dan measure sekitar 13ch. H2 memakai `clamp(34px, 4vw, 56px)`; judul proyek 40px; H3 umum 28px.
- Kalimat pengantar 21px; anotasi 15px; metadata 14px. Label memakai sentence case, tanpa tracked capitals. Monospace hanya untuk kode atau data teknis bila diperlukan.
- Gunakan balanced wrapping untuk heading, pretty wrapping untuk paragraf, `min-width: 0`, dan `overflow-wrap: break-word`. Hindari pemenggalan kata akibat kolom terlalu sempit.
- Font lokal menjaga prototype mandiri. Perbedaan fallback antarplatform perlu diperiksa; bila memakai webfont kemudian, gunakan font berlisensi dan `font-display: swap`.

## Layout dan komposisi
- Container terpusat, maksimum 1240px. Sediakan gutter minimum 20px pada semua ukuran, termasuk tablet; ruang luar bertambah pada layar lebar.
- Navigasi sederhana: identitas di kiri, tautan bagian di kanan, dengan garis bawah tipis. Footer memuat identitas, konteks halaman, dan tautan kembali ke atas.
- Hero memakai kolom anotasi 180px dan kolom utama fleksibel, dipisahkan gap 60px. Headline, satu kalimat pengantar, dan satu aksi utama harus terlihat pada 1280 × 800.
- About dan experience mengikuti sumbu teks utama. Kolom margin boleh kosong; jangan membiarkan teks utama mengisi kolom anotasi secara tidak sengaja.
- Selected projects berbentuk artikel: narasi dan panel bukti dengan rasio sekitar 1.6:1, gap 60px. Panel gelap hanya digunakan untuk bukti atau alur yang relevan. Detail keputusan dapat dibuka dengan disclosure native.
- Gunakan garis tipis 1px untuk pemisah rutin dan garis double 3px untuk batas editorial penting. Sudut persegi, tanpa bayangan. Contact berupa undangan singkat dan alamat aktual.
- Gunakan ritme spacing kelipatan 4px. Acuan: section 72px vertikal, artikel 32px, panel 24px, dan gap kolom 60px. Ruang kosong harus menguatkan hierarki, bukan memisahkan konten yang saling terkait.

## Responsive behavior
- Pada lebar 700px ke bawah, seluruh grid menjadi satu kolom dengan gutter 20px dan gap 20px. Anotasi hero berada sebelum judul; bukti proyek mengikuti narasinya.
- H1 mobile sekitar 54px, section 44px vertikal, dan hero 32px di atas serta 48px di bawah. Sesuaikan judul panjang agar tetap terbaca pada 320px tanpa memotong konten.
- Navigasi boleh wrap; contact dan footer bertumpuk mengikuti urutan baca. Hindari tinggi tetap dan horizontal scroll. Gunakan `overflow-x: clip` pada html dan body.
- Verifikasi implementasi pada 320px, 390px, 700px, 1280px, dan 1920px. Screenshot prototype sebelumnya hanya memeriksa 390px dan 1280px, bukan seluruh rentang tersebut.

## Interaksi, aksesibilitas, dan motion
- Karakter motion: diam. Konten langsung terlihat tanpa JavaScript; tidak ada floating loop, parallax, animasi mengetik, atau reveal saat scroll.
- Primary action berbentuk persegi dengan fill `--ink`, teks `--paper`, dan padding 12px 24px. Hover berganti ke `--accent`. Tautan teks tetap memiliki affordance underline.
- Gunakan `:focus-visible` instan dengan outline aksen 3px dan offset 5px. Semua tautan dan disclosure dapat dioperasikan melalui keyboard; status expanded mengikuti elemen native.
- Bila transisi ditambahkan, batasi pada warna atau opacity selama 120–160ms. Jangan gunakan `transition: all` atau animasi dimensi dan posisi layout.
- Pada `prefers-reduced-motion: reduce`, matikan animasi dan transisi serta gunakan scroll biasa. Jangan bergantung pada hover untuk membuka informasi penting.
- Gunakan struktur heading berurutan, landmark semantik, target sentuh yang memadai, dan contrast minimum WCAG AA. Ini merupakan kriteria implementasi, bukan klaim audit aksesibilitas prototype.

## Exports dan batas tahap ini
Belum ada `tokens.css` produksi. Blok token di atas mendokumentasikan nilai yang disetujui; ekstraksi stylesheet, konten aktual, dan implementasi final menunggu instruksi berikutnya. Root `index.html`, `style.css`, `CNAME`, serta konfigurasi deployment tidak diubah oleh tahap dokumentasi ini.
