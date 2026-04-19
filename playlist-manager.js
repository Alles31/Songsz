// Playlist Manager Logic
let allSongs = [];
let selectedSongs = [];
let filteredSongs = [];

async function initializePlaylistManager() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        allSongs = data.songs;
        filteredSongs = allSongs; // Initialize filtered songs

        // Load existing playlist from localStorage
        const savedPlaylist = localStorage.getItem('customPlaylist');
        if (savedPlaylist) {
            selectedSongs = JSON.parse(savedPlaylist);
        } else {
            // Default: select all songs
            selectedSongs = allSongs.map(song => song.id);
        }

        renderSongsList();
        updatePlaylistPreview();
        updateCounters();
    } catch (error) {
        console.error('Error loading songs:', error);
        displayError('Failed to load songs');
    }
}

function renderSongsList() {
    const container = document.getElementById('songs-list');

    if (!filteredSongs || filteredSongs.length === 0) {
        container.innerHTML = '<p class="empty-state">No songs found matching your search</p>';
        return;
    }

    container.innerHTML = filteredSongs.map(song => {
        const isSelected = selectedSongs.includes(song.id);
        return `
            <div class="song-selection-item ${isSelected ? 'selected' : ''}">
                <input 
                    type="checkbox" 
                    class="song-checkbox" 
                    value="${song.id}" 
                    ${isSelected ? 'checked' : ''}
                    onchange="toggleSong(${song.id})"
                >
                <div class="selection-song-info">
                    <img src="${song.image}" alt="${song.title}" class="selection-thumbnail" onerror="this.src='https://via.placeholder.com/40/8a2be2/ffffff?text=${encodeURIComponent(song.title.substring(0, 2))}'">
                    <div class="selection-text">
                        <p class="selection-song-title">${song.title}</p>
                        <p class="selection-song-artist">${song.artist}</p>
                    </div>
                </div>
                <span class="selection-order">${selectedSongs.includes(song.id) ? selectedSongs.indexOf(song.id) + 1 : '-'}</span>
            </div>
        `;
    }).join('');
}

function toggleSong(songId) {
    const index = selectedSongs.indexOf(songId);
    
    if (index > -1) {
        // Remove song
        selectedSongs.splice(index, 1);
    } else {
        // Add song - maintain order from original data
        selectedSongs = allSongs
            .filter(song => selectedSongs.includes(song.id) || song.id === songId)
            .map(song => song.id);
    }

    renderSongsList();
    updatePlaylistPreview();
    updateCounters();
}

function filterSongs() {
    const searchInput = document.getElementById('search-input').value.toLowerCase().trim();
    
    if (searchInput === '') {
        // If search is empty, show all songs
        filteredSongs = allSongs;
    } else {
        // Filter by title or artist
        filteredSongs = allSongs.filter(song => 
            song.title.toLowerCase().includes(searchInput) || 
            song.artist.toLowerCase().includes(searchInput)
        );
    }
    
    renderSongsList();
}

function selectAllSongs() {
    selectedSongs = allSongs.map(song => song.id);
    renderSongsList();
    updatePlaylistPreview();
    updateCounters();
}

function clearAllSongs() {
    selectedSongs = [];
    renderSongsList();
    updatePlaylistPreview();
    updateCounters();
}

function resetPlaylist() {
    selectedSongs = allSongs.map(song => song.id);
    renderSongsList();
    updatePlaylistPreview();
    updateCounters();
}

function updatePlaylistPreview() {
    const container = document.getElementById('playlist-display');

    if (selectedSongs.length === 0) {
        container.innerHTML = '<p class="empty-playlist">No songs selected. Add songs to create your playlist!</p>';
        return;
    }

    const selectedSongsData = selectedSongs
        .map(id => allSongs.find(song => song.id === id))
        .filter(song => song !== undefined);

    container.innerHTML = selectedSongsData.map((song, idx) => `
        <div class="preview-item">
            <span class="preview-number">${idx + 1}</span>
            <div class="preview-song-info">
                <p class="preview-title">${song.title}</p>
                <p class="preview-artist">${song.artist}</p>
            </div>
            <button class="remove-from-playlist" onclick="removeSongFromPlaylist(${song.id})" title="Remove from playlist">
                ✕
            </button>
        </div>
    `).join('');
}

function removeSongFromPlaylist(songId) {
    const index = selectedSongs.indexOf(songId);
    if (index > -1) {
        selectedSongs.splice(index, 1);
    }
    renderSongsList();
    updatePlaylistPreview();
    updateCounters();
}

function updateCounters() {
    document.getElementById('selected-count').textContent = selectedSongs.length;
    document.getElementById('total-count').textContent = allSongs.length;
}

function savePlaylist() {
    if (selectedSongs.length === 0) {
        alert('Please select at least one song for your playlist!');
        return;
    }

    // Save to localStorage
    localStorage.setItem('customPlaylist', JSON.stringify(selectedSongs));
    
    // Show success message
    const btn = document.getElementById('save-playlist-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '✓ SAVED! Redirecting...';
    btn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
    
    // Redirect to player after 1 second
    setTimeout(() => {
        window.location.href = 'player.html';
    }, 1000);
}

function displayError(message) {
    console.error(message);
    document.querySelector('.songs-selection').innerHTML = `
        <p class="error-message">${message}</p>
    `;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('select-all-btn').addEventListener('click', selectAllSongs);
    document.getElementById('clear-all-btn').addEventListener('click', clearAllSongs);
    document.getElementById('reset-btn').addEventListener('click', resetPlaylist);
    document.getElementById('save-playlist-btn').addEventListener('click', savePlaylist);

    initializePlaylistManager();
});
