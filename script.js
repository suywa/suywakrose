// toggle sections
function toggleSocials(id) {
    const element = document.getElementById(id);
    const isActive = element.classList.contains("active");
    const expansion = document.getElementById("expansion");

    document.querySelectorAll('.socials-extension').forEach(section => {
        section.classList.remove("active");
        section.classList.add("inactive");
    });

    if (!isActive) {
        element.classList.remove("inactive");
        element.classList.add("active");
        expansion.style.display = "block";
    } else {
        expansion.style.display = "none";
    }

    // If no section is active, hide the expansion div
    const anyActive = Array.from(document.querySelectorAll('.socials-extension')).some(sec =>
        sec.classList.contains("active")
    );
    expansion.style.display = anyActive ? "block" : "none";
}

// tilt effect
const tiltTargets = ['container', 'music-wrapper', 'expansion'];
let mouseX = 0, mouseY = 0;

tiltTargets.forEach(id => {
    const box = document.getElementById(id);
    if (!box) return;

    let rect = null;
    let isHovering = false;

    function updateTilt() {
        if (!isHovering || !rect) return;

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = mouseX - centerX;
        const deltaY = mouseY - centerY;

        const percentX = deltaX / (rect.width / 2);
        const percentY = deltaY / (rect.height / 2);

        const maxTilt = 15;
        const rotateX = -(percentY * maxTilt);
        const rotateY = percentX * maxTilt;
        const shadowX = -percentX * 30;
        const shadowY = -percentY * 30;

        box.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        box.style.boxShadow = `${shadowX}px ${shadowY}px 60px rgba(0, 0, 0, 0.4)`;

        requestAnimationFrame(updateTilt);
    }

    box.addEventListener('mouseenter', () => {
        rect = box.getBoundingClientRect();
        isHovering = true;
        requestAnimationFrame(updateTilt);
    });

    box.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    box.addEventListener('mouseleave', () => {
        isHovering = false;
        box.style.transform = 'rotateX(0deg) rotateY(0deg)';
        box.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
    });
});

// typewriter
const messages = ["🦋 17", "🌙 anime fan", "🎧 lost in unreleased juice", "🖥️ pc builder", "🌿 Bengali", "🍀 FREE PALESTINE"];
let index = 0, charIndex = 0;
const typeElem = document.getElementById("typewriter");

function typeEffect() {
  if (charIndex < messages[index].length) {
    typeElem.textContent += messages[index].charAt(charIndex++);
    setTimeout(typeEffect, 60);
  } else {
    setTimeout(() => {
      typeElem.textContent = "";
      charIndex = 0;
      index = (index + 1) % messages.length;
      typeEffect();
    }, 1500);
  }
}
typeEffect();

// music player
const audio = document.getElementById("audio-player");
const volumeSlider = document.getElementById("volume-slider");
const progressSlider = document.getElementById("progress-slider");
const playPauseBtn = document.getElementById("play-pause");
const songs = ["assets/song1.mp3", "assets/song2.mp3", "assets/song3.mp3"];
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const volumeBtn = document.getElementById("volume-btn");
const volumeWrap = document.querySelector(".volume-container");
const currentTimeEl = document.getElementById("current-time");
const totalTimeEl = document.getElementById("total-time");
const playPauseIcon = document.querySelector("#play-pause use");
let songIndex = 0;

// Volume control
volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
});

// Update progress bar
audio.addEventListener("timeupdate", () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressSlider.value = percent || 0;
});

// Seek when progress slider changes
progressSlider.addEventListener("input", () => {
    const seekTime = (progressSlider.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

// Controls
document.getElementById("next").onclick = () => {
    songIndex = (songIndex + 1) % songs.length;
    audio.src = songs[songIndex];
    audio.play();
};

document.getElementById("back").onclick = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audio.src = songs[songIndex];
    audio.play();
};

playPauseBtn.onclick = () => {
    if (audio.paused) {
        audio.play();
        playPauseIcon.setAttribute("xlink:href", "newicons.svg#icon-pause");
    } else {
        audio.pause();
        playPauseIcon.setAttribute("xlink:href", "newicons.svg#icon-resume");
    }
};


// volume controls

volumeBtn.addEventListener("click", () => {
    volumeSlider.style.display =
        volumeSlider.style.display === "block" ? "none" : "block";
});


volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
});

audio.addEventListener("timeupdate", () => {
    progressSlider.value = (audio.currentTime / audio.duration) * 100 || 0;
});

progressSlider.addEventListener("input", () => {
    audio.currentTime = (progressSlider.value / 100) * audio.duration;
});

const songData = [
    { file: "assets/song1.mp3", title: "moonlight.mp3", artist: "juice wrld" },
    { file: "assets/song2.mp3", title: "purple moncler.mp3", artist: "juice wrld" },
    { file: "assets/song3.mp3", title: "cali girl... where are you.mp3", artist: "juice wrld" },
    { file: "assets/song4.mp3", title: "designer (rolling loud)", artist: "juice wrld" },
    { file: "assets/song5.mp3", title: "911 (overdose)", artist: "juice wrld" },
    { file: "assets/song6.mp3", title: "mr. freeze", artist: "juice wrld" },
    { file: "assets/song7.mp3", title: "carry it", artist: "juice wrld" },
    { file: "assets/song8.mp3", title: "chimp", artist: "juice wrld" }
];

// song name and artist display

function loadSong(index) {
    const song = songData[index];
    audio.src = song.file;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;

    const playIcon = document.getElementById("play-icon");
    const isPaused = audio.paused;
    playIcon.setAttribute("xlink:href", isPaused ? "newicons.svg#icon-pause" : "newicons.svg#icon-resume");
}

document.getElementById("next").onclick = () => {
    songIndex = (songIndex + 1) % songData.length;
    loadSong(songIndex);
    audio.play();
};

document.getElementById("back").onclick = () => {
    songIndex = (songIndex - 1 + songData.length) % songData.length;
    loadSong(songIndex);
    audio.play();
};

audio.addEventListener("loadeddata", () => {
    songTitle.textContent = songData[songIndex].title;
    songArtist.textContent = songData[songIndex].artist;
});

// Initial load

loadSong(songIndex);

// default audio settings

window.addEventListener("DOMContentLoaded", () => {
    audio.volume = volumeSlider.value;  
    audio.volume = 0.10;
    volumeSlider.value = 0.10;
    audio.play();
});

// song progess display

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
}

audio.addEventListener("timeupdate", () => {
    progressSlider.value = (audio.currentTime / audio.duration) * 100 || 0;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    totalTimeEl.textContent = formatTime(audio.duration || 0);
});

//shuffle functionality

document.getElementById("shuffle").onclick = () => {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * songData.length);
    } while (newIndex === songIndex); // avoid repeating the current song

    songIndex = newIndex;
    loadSong(songIndex);
    audio.play();
};

