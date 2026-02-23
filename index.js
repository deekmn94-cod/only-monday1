const music = new Audio();
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playlistElement = document.getElementById('playlist');

// ສ້າງຂໍ້ມູນເພງ (ທ່ານສາມາດເພີ່ມໄດ້ຮອດ 100 ເພງ ໃນ Array ນີ້)
const songs = [
    { name: 'song1', displayName: 'Only Monday', artist: 'only monday', url: '1.mp3' },
     { name: 'song1', displayName: 'Only Monday', artist: 'only monday', url: '2.mp3' },
      { name: 'song1', displayName: 'Only Monday', artist: 'only monday', url: '3.mp3' },
       
        { name: 'song1', displayName: 'Only Monday', artist: 'only monday', url: '4.mp3' },
         { name: 'song1', displayName: 'Only Monday', artist: 'only monday', url: '5.mp3' },
          { name: 'song1', displayName: 'Only Monday', artist: 'only monday', url: '6.mp3' },
           { name: 'song1', displayName: 'onlymonday', artist: 'only monday', url: '7.mp3' },
            
             
             { name: 'song1', displayName: 'Only Monday', artist: 'only monday', url: '8.mp3' },
             
             { name: 'song1', displayName: 'only monday', artist: 'only monday', url: '9.mp3' },
             { name: 'song1', displayName: 'Only Monday', artist: 'only monday', url: '10.mp3' },
             { name: 'song1', displayName: 'only monday', artist: 'only monday', url: '11.mp3' },
             
    // ເພີ່ມເພງອື່ນໆ ທີ່ນີ້...
];

let isPlaying = false;
let songIndex = 0;

function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    music.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    music.pause();
}

function loadSong(song) {
    title.innerText = song.displayName;
    artist.innerText = song.artist;
    music.src = song.url;
    updatePlaylistUI();
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) songIndex = songs.length - 1;
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) songIndex = 0;
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        
        // ອັບເດດຕົວເລກເວລາ
        document.getElementById('current-time').textContent = formatTime(currentTime);
        document.getElementById('duration').textContent = formatTime(duration);
    }
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

function formatTime(time) {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// ສ້າງລາຍຊື່ເພງໃນຫນ້າເວັບ
function buildPlaylist() {
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.innerText = `${index + 1}. ${song.displayName}`;
        li.setAttribute('onclick', `selectSong(${index})`);
        li.id = `song-${index}`;
        playlistElement.appendChild(li);
    });
    document.getElementById('song-count').innerText = songs.length;
}

function selectSong(index) {
    songIndex = index;
    loadSong(songs[songIndex]);
    playSong();
}

function updatePlaylistUI() {
    document.querySelectorAll('#playlist li').forEach(li => li.classList.remove('active'));
    document.getElementById(`song-${songIndex}`).classList.add('active');
}

// Event Listeners
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
music.addEventListener('ended', nextSong);

// ເລີ່ມຕົ້ນ
buildPlaylist();
loadSong(songs[songIndex]);