# 🎵 Music Setup Guide

## Quick Start

1. **Add your MP3 files** to the `music/` folder
2. **Update `data.json`** with the music file path
3. **Click play** on your website!

## Step-by-Step Instructions

### Local Testing (Before GitHub)

1. Get your MP3 files ready
2. Copy them to `music/` folder:
   - `music/song1.mp3`
   - `music/song2.mp3`
   - etc.

3. Update `data.json` for each song:

```json
{
  "id": 1,
  "title": "My Favorite Song",
  "artist": "Artist Name",
  "image": "https://via.placeholder.com/60/8a2be2/ffffff?text=ART",
  "musicFile": "music/my-favorite-song.mp3",
  "memory": "This is where you write your memory about this song..."
}
```

4. Open `index.html` in your browser and test the play button!

### Uploading to GitHub

When you push to GitHub:

```
1. Upload music/ folder with all MP3s
2. Update data.json with correct file paths
3. Push to your GitHub repo
4. Music will play on your live website!
```

## File Naming Tips

- Use simple names: `song-name.mp3` (not `Song Name (feat artist).mp3`)
- No special characters except hyphens
- Keep it lowercase
- Example: `midnight-city-shadows.mp3` ✓

## How the Play Button Works

- Click **▶** to play music
- Click **⏸** to pause
- When you click another song, the previous one stops
- When a song ends, button returns to ▶

## Important Notes

⚠️ **GitHub Repo Size**: MP3 files are large!
- One song ≈ 5-10 MB
- GitHub allows up to 100 MB per file
- Free GitHub Pages account has limits (1 GB per repo)

**Solution**: If your repo gets too large, consider:
- Hosting MP3s on a separate service (YouTube, SoundCloud)
- Using embed code instead of direct files
- Only adding high-quality compressed MP3s

## Example data.json (Complete)

```json
{
  "profile": {
    "name": "A Journey Through Our Songs",
    "subtitle": "THE DIGITAL KEEPSAKE",
    "profileImage": "https://via.placeholder.com/120/1a1a1a/ffffff?text=Photo",
    "quote": "Every note we've ever shared is a map leading back to the moments that defined us."
  },
  "songs": [
    {
      "id": 1,
      "title": "Midnight City Shadows",
      "artist": "The Echoes",
      "image": "https://via.placeholder.com/60/8a2be2/ffffff?text=MCS",
      "musicFile": "music/midnight-city-shadows.mp3",
      "memory": "I remember the way the rain hit the windshield that night in October..."
    },
    {
      "id": 2,
      "title": "Golden Hour Waltz",
      "artist": "Summer Archives",
      "image": "https://via.placeholder.com/60/d4af37/ffffff?text=GHW",
      "musicFile": "music/golden-hour-waltz.mp3",
      "memory": "The rooftop garden was quiet, save for the hum of the city below..."
    }
  ],
  "unreleasedChapter": {
    "quote": "Sometimes the silence between our favorite songs says more than the lyrics ever could."
  }
}
```

## Troubleshooting

**"Play button doesn't work"**
- Check if MP3 file path in data.json matches actual file name exactly
- Make sure MP3 is in `music/` folder
- Try a different MP3 format or bitrate

**"Music files are too large"**
- Compress MP3s to lower bitrate (128 kbps is good for voices/acoustic)
- Use: [MP3Compressor.com](https://mp3compressor.com) (free, online)

**"Files aren't uploading to GitHub"**
- GitHub has a 100 MB file limit
- Split large files or use different hosting

---

**Enjoy sharing your music memories!** ♪
