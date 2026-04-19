// Spotify Mode - Continuous Playback
let allSongs = [];
let currentSongIndex = 0;
let isPlaying = false;
let loopMode = 'all'; // 'all' = loop semua, 'one' = loop 1 lagu

async function initializePlayer() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        allSongs = data.songs;
        
        if (allSongs.length === 0) {
            displayError('No songs available');
            return;
        }

        setupAudioListeners();
        renderQueueList();
        loadCurrentSong();
        updatePlayerDisplay();
    } catch (error) {
        console.error('Error loading songs:', error);
        displayError('Failed to load songs');
    }
}

function setupAudioListeners() {
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const progressBar = document.getElementById('progress-bar');
    const volumeSlider = document.getElementById('volume-slider');

    // Play next song when current ends
    audioPlayer.addEventListener('ended', function() {
        if (loopMode === 'one') {
            // Loop current song
            audioPlayer.currentTime = 0;
            audioPlayer.play().catch(err => console.error('Error auto-playing:', err));
        } else {
            // Play next song
            playNextSong();
        }
    });

    // Update progress bar and time
    audioPlayer.addEventListener('timeupdate', function() {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.value = percent || 0;
        updateTimeDisplay();
    });

    // Update duration when metadata loads
    audioPlayer.addEventListener('loadedmetadata', function() {
        updateTimeDisplay();
    });

    // Progress bar seek
    progressBar.addEventListener('change', function() {
        const time = (progressBar.value / 100) * audioPlayer.duration;
        audioPlayer.currentTime = time;
    });

    // Volume control
    volumeSlider.addEventListener('input', function() {
        audioPlayer.volume = this.value / 100;
    });

    // Set initial volume
    audioPlayer.volume = volumeSlider.value / 100;
}

function loadCurrentSong() {
    const audioPlayer = document.getElementById('audio-player');
    const song = allSongs[currentSongIndex];
    
    if (song) {
        audioPlayer.src = song.musicFile;
        audioPlayer.load();
        updatePlayerDisplay();
        
        // Auto play if was playing
        if (isPlaying) {
            audioPlayer.play().catch(err => {
                console.error('Error playing audio:', err);
                displayError('Could not play music. Check if files exist.');
            });
        }
    }
}

function updatePlayerDisplay() {
    const song = allSongs[currentSongIndex];
    
    if (song) {
        document.getElementById('current-title').textContent = song.title;
        document.getElementById('current-artist').textContent = song.artist;
        document.getElementById('current-album').src = song.image;
        document.getElementById('song-counter').textContent = `Song ${currentSongIndex + 1} of ${allSongs.length}`;
        
        // Highlight current song in queue
        document.querySelectorAll('.queue-item').forEach((item, idx) => {
            if (idx === currentSongIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
}

function updateTimeDisplay() {
    const audioPlayer = document.getElementById('audio-player');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    
    currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    durationEl.textContent = formatTime(audioPlayer.duration);
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function renderQueueList() {
    const queueContainer = document.getElementById('playlist-queue');
    
    queueContainer.innerHTML = allSongs.map((song, idx) => `
        <div class="queue-item ${idx === currentSongIndex ? 'active' : ''}" data-index="${idx}" onclick="jumpToSong(${idx})">
            <span class="queue-number">${idx + 1}</span>
            <div class="queue-song-info">
                <p class="queue-title">${song.title}</p>
                <p class="queue-artist">${song.artist}</p>
            </div>
            <span class="queue-indicator ${idx === currentSongIndex ? 'playing' : ''}">
                ${idx === currentSongIndex ? '♫' : ''}
            </span>
        </div>
    `).join('');
}

function playPause() {
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    
    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
        playPauseBtn.innerHTML = '▶ PLAY';
    } else {
        audioPlayer.play().catch(err => {
            console.error('Error playing audio:', err);
            displayError('Could not play music');
        });
        isPlaying = true;
        playPauseBtn.innerHTML = '⏸ PAUSE';
    }
}

function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % allSongs.length;
    loadCurrentSong();
    updatePlayerDisplay();
    
    // Auto play the next song
    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.play().catch(err => console.error('Error auto-playing next:', err));
    isPlaying = true;
    updatePlayPauseButton();
    renderQueueList();
}

function playPreviousSong() {
    currentSongIndex = (currentSongIndex - 1 + allSongs.length) % allSongs.length;
    loadCurrentSong();
    updatePlayerDisplay();
    
    // Auto play the previous song
    const audioPlayer = document.getElementById('audio-player');
    if (isPlaying) {
        audioPlayer.play().catch(err => console.error('Error playing previous:', err));
    }
    renderQueueList();
}

function jumpToSong(index) {
    currentSongIndex = index;
    loadCurrentSong();
    updatePlayerDisplay();
    
    // Auto play when jumping
    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.play().catch(err => console.error('Error jumping to song:', err));
    isPlaying = true;
    updatePlayPauseButton();
    renderQueueList();
}

function toggleLoop() {
    const loopBtn = document.getElementById('loop-btn');
    
    if (loopMode === 'all') {
        loopMode = 'one';
        loopBtn.innerHTML = '⟲ LOOP 1';
        loopBtn.classList.add('loop-one');
    } else {
        loopMode = 'all';
        loopBtn.innerHTML = '⟲ LOOP';
        loopBtn.classList.remove('loop-one');
    }
}

function updatePlayPauseButton() {
    const playPauseBtn = document.getElementById('play-pause-btn');
    playPauseBtn.innerHTML = isPlaying ? '⏸ PAUSE' : '▶ PLAY';
}

function displayError(message) {
    console.error(message);
    const playerDisplay = document.querySelector('.player-display');
    if (playerDisplay) {
        playerDisplay.innerHTML = `<p class="error-message">${message}</p>`;
    }
}

// Event Listeners for Controls
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('play-pause-btn').addEventListener('click', playPause);
    document.getElementById('next-btn').addEventListener('click', playNextSong);
    document.getElementById('prev-btn').addEventListener('click', playPreviousSong);
    document.getElementById('loop-btn').addEventListener('click', toggleLoop);
    
    initializePlayer();
});
