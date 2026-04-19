# 🎵 Dual Mode Music System

## Features Overview

### 📔 NOTES MODE (index.html)
- **Sistem**: Individual song playback dengan notes/memories
- **Behavior**: 
  - Ketika play lagu, hanya lagu itu yang main
  - Lagu berhenti otomatis setelah selesai
  - Bisa skip forward/backward 10 detik
  - Setiap lagu punya notes/memories tersendiri
- **Navigasi**: Lihat semua lagu dengan memories mereka

### 🎵 SPOTIFY MODE (player.html)
- **Sistem**: Continuous playlist dengan auto-play
- **Features**:
  - ▶ **Play/Pause**: Main atau pause musik
  - ⏮ **Previous**: Ke lagu sebelumnya
  - ⏭ **Next**: Lagu berikutnya
  - 🔁 **Loop Mode**: 
    - `LOOP` = Looping semua lagu (playlist terus berputar)
    - `LOOP 1` = Hanya looping lagu yang sedang dimainkan
  - **Volume Control**: Atur volume musik
  - **Progress Bar**: Lihat dan kontrol progress lagu
  - **Queue List**: Lihat daftar lagu yang bisa diklik untuk jump

- **Auto-play Behavior**:
  - Otomatis main lagu berikutnya saat selesai
  - Loop dari awal (ID 1) jika sudah selesai semua lagu
  - Auto-play jika klik lagu di queue

## File Structure
```
index.html          → Notes Mode (asli)
player.html         → Spotify Mode (baru)
script.js           → Logic untuk Notes Mode (tidak berubah)
player.js           → Logic untuk Spotify Mode (baru)
styles.css          → Styling untuk kedua mode
data.json           → Data lagu (tidak berubah)
```

## Cara Penggunaan

### Switch Between Modes
Di atas footer, ada dua button:
- 📔 **NOTES MODE** - Klik untuk lihat mode notes
- 🎵 **SPOTIFY MODE** - Klik untuk Spotify mode

### Spotify Mode Controls
1. **Klik lagu di queue** untuk langsung main lagu itu
2. **Play/Pause** untuk kontrol playback
3. **Prev/Next** untuk navigasi
4. **Loop** untuk ubah mode looping
5. **Volume slider** untuk atur volume
6. **Progress bar** untuk skip ke bagian lagu

## Notes
- ✅ Original page (Notes Mode) TIDAK BERUBAH
- ✅ Spotify Mode TERPISAH di halaman baru
- ✅ Setiap mode punya logika sendiri
- ✅ Data lagu dari `data.json` sama untuk kedua mode
