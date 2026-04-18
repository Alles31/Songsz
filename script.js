// Load and display songs from data.json
let currentPlayingId = null;

async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        displaySongs(data.songs);
    } catch (error) {
        console.error('Error loading data:', error);
        document.getElementById('songs-list').innerHTML = '<p class="empty-state">No songs yet. Check back soon.</p>';
    }
}

function displaySongs(songs) {
    const container = document.getElementById('songs-list');
    
    if (!songs || songs.length === 0) {
        container.innerHTML = '<p class="empty-state">No songs yet. Check back soon.</p>';
        return;
    }

    container.innerHTML = songs.map(song => `
        <article class="song-card">
            <div class="song-thumbnail">
                <img src="${song.image}" alt="${song.title}" onerror="this.src='https://via.placeholder.com/60/8a2be2/ffffff?text=${encodeURIComponent(song.title.substring(0, 3))}'">
            </div>
            <div class="song-info">
                <div class="song-header">
                    <div>
                        <h2 class="song-title">${song.title}</h2>
                        <p class="song-artist">${song.artist}</p>
                    </div>
                    <div class="player-controls">
                        <button class="skip-btn" data-song-id="${song.id}" title="Rewind 10 seconds" onclick="skipBackward(event)">⏮ 10s</button>
                        <button class="play-btn" data-song-id="${song.id}" data-music-file="${song.musicFile}" title="Play" onclick="playMusic(event)">▶</button>
                        <button class="pause-btn" data-song-id="${song.id}" title="Pause" onclick="pauseMusic(event)" style="display:none;">⏸</button>
                        <button class="skip-btn" data-song-id="${song.id}" title="Forward 10 seconds" onclick="skipForward(event)">10s ⏭</button>
                    </div>
                </div>
                <p class="song-memory">${song.memory}</p>
            </div>
        </article>
    `).join('');
}

// Skip forward 10 seconds
function skipForward(event) {
    event.stopPropagation();
    const audioPlayer = document.getElementById('audio-player');
    if (audioPlayer.src) {
        audioPlayer.currentTime = Math.min(audioPlayer.currentTime + 10, audioPlayer.duration);
    }
}

// Skip backward 10 seconds
function skipBackward(event) {
    event.stopPropagation();
    const audioPlayer = document.getElementById('audio-player');
    if (audioPlayer.src) {
        audioPlayer.currentTime = Math.max(audioPlayer.currentTime - 10, 0);
    }
}

// Play music
function playMusic(event) {
    const btn = event.target;
    const songId = btn.getAttribute('data-song-id');
    const musicFile = btn.getAttribute('data-music-file');
    const audioPlayer = document.getElementById('audio-player');
    const pauseBtn = document.querySelector(`.pause-btn[data-song-id="${songId}"]`);

    // Stop any currently playing song
    if (currentPlayingId !== null && currentPlayingId !== songId) {
        const prevPlayBtn = document.querySelector(`.play-btn[data-song-id="${currentPlayingId}"]`);
        const prevPauseBtn = document.querySelector(`.pause-btn[data-song-id="${currentPlayingId}"]`);
        if (prevPlayBtn) prevPlayBtn.style.display = 'inline-flex';
        if (prevPauseBtn) prevPauseBtn.style.display = 'none';
        audioPlayer.pause();
    }

    // Play new song or resume
    if (currentPlayingId === songId && audioPlayer.paused) {
        // Resume current song
        audioPlayer.play().catch(err => {
            console.error('Error playing audio:', err);
            alert('Could not play music. Make sure the file exists in the music folder.');
        });
    } else if (currentPlayingId !== songId) {
        // Play new song
        audioPlayer.src = musicFile;
        audioPlayer.play().catch(err => {
            console.error('Error playing audio:', err);
            alert('Could not play music. Make sure the file exists in the music folder.');
        });
        currentPlayingId = songId;
    }

    // Toggle button visibility
    btn.style.display = 'none';
    pauseBtn.style.display = 'inline-flex';
}

// Pause music
function pauseMusic(event) {
    const btn = event.target;
    const songId = btn.getAttribute('data-song-id');
    const audioPlayer = document.getElementById('audio-player');
    const playBtn = document.querySelector(`.play-btn[data-song-id="${songId}"]`);

    audioPlayer.pause();
    btn.style.display = 'none';
    playBtn.style.display = 'inline-flex';
}

// Update button when song ends
document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audio-player');
    
    audioPlayer.addEventListener('ended', function() {
        if (currentPlayingId !== null) {
            // Reset button when song ends
            const playBtn = document.querySelector(`.play-btn[data-song-id="${currentPlayingId}"]`);
            const pauseBtn = document.querySelector(`.pause-btn[data-song-id="${currentPlayingId}"]`);
            if (playBtn) playBtn.style.display = 'inline-flex';
            if (pauseBtn) pauseBtn.style.display = 'none';
            currentPlayingId = null;
        }
    });

    loadData();
});

