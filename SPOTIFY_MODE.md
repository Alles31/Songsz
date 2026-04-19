# 🎵 Dual Mode Music System + Playlist Builder

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
  - Loop dari awal jika sudah selesai semua lagu
  - Auto-play jika klik lagu di queue
  - **Bisa main custom playlist atau semua lagu** (lihat Playlist Manager)

### 📋 PLAYLIST MANAGER (playlist-manager.html) ⭐ NEW
- **Sistem**: Custom playlist builder
- **Features**:
  - ✓ **Select/Deselect** individual lagu
  - ✓ **SELECT ALL** - Pilih semua lagu
  - ✓ **CLEAR ALL** - Hapus semua pilihan
  - ✓ **RESET** - Kembali ke semua lagu (default)
  - 🎵 **Playlist Preview** - Lihat daftar lagu yang dipilih
  - 💾 **SAVE & PLAY** - Simpan dan langsung main

- **How it Works**:
  - Pilih lagu-lagu mana yang ingin diputar
  - Bisa pilih 1 lagu, sebagian, atau semua
  - Preview menunjukkan urutan playback
  - Klik SAVE & PLAY untuk simpan dan main di Spotify Mode
  - Playlist disimpan di browser (localStorage)

## File Structure
```
index.html               → Notes Mode (asli)
player.html            → Spotify Mode (baru)
playlist-manager.html  → Playlist Builder (baru) ⭐
script.js              → Logic untuk Notes Mode (tidak berubah)
player.js              → Logic untuk Spotify Mode (updated untuk playlist support)
playlist-manager.js    → Logic untuk Playlist Manager (baru)
styles.css             → Styling untuk semua mode (updated)
data.json              → Data lagu (tidak berubah)
```

## Cara Penggunaan

### Switch Between Modes
Di footer semua halaman, ada 3 button:
- 📔 **NOTES MODE** - Mode catatan musik
- 🎵 **SPOTIFY MODE** - Mode player berkelanjutan
- 📋 **PLAYLIST** - Buat custom playlist ⭐

### Menggunakan Playlist Manager
1. Buka halaman **PLAYLIST**
2. Pilih/batal-pilih lagu dengan checkbox
3. Lihat preview di bagian kanan
4. Klik **SAVE & PLAY** untuk simpan dan mulai
5. Otomatis redirect ke Spotify Mode dengan playlist kamu

### Spotify Mode dengan Custom Playlist
- Jika kamu sudah membuat playlist, Spotify Mode akan main itu
- Jika belum ada playlist custom, main semua lagu seperti default
- Bisa kembali ke Playlist Manager untuk ubah selection

## Default Behavior
- **First Load**: Semua lagu dipilih (default)
- **Tanpa Playlist**: Spotify Mode main semua lagu
- **Dengan Playlist**: Spotify Mode main sesuai pilihan

## Notes
- ✅ Original page (Notes Mode) TETAP AMAN
- ✅ Semua mode TERPISAH di halaman berbeda
- ✅ Setiap mode punya logika sendiri
- ✅ Data lagu dari `data.json` sama untuk semua mode
- ✅ Playlist disimpan di localStorage (lokal browser)
- ✅ File baru bisa dihapus kapan saja tanpa rusak yang lain
