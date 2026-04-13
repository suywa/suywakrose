const DISCORD_ID = "1097843326142656603";
const video = document.getElementById('bg-video');
const volumeSlider = document.getElementById('volume-slider');
const muteBtn = document.getElementById('mute-btn');

function startSite() {
    document.getElementById('enter-screen').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('enter-screen').style.display = 'none';
        document.getElementById('main-content').classList.remove('hidden');
    }, 800);
    video.muted = false;
    video.play();
}

async function updateStatus() {
    try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const data = await res.json();
        if(!data.success) return;
        const { discord_status, activities } = data.data;
        const dot = document.getElementById('status-dot');
        const text = document.getElementById('status-text');
        const colors = { online: '#43b581', idle: '#faa61a', dnd: '#f04747', offline: '#747f8d' };
        dot.style.background = colors[discord_status] || colors.offline;
        if (activities.length > 0) {
            text.textContent = (activities[0].state || activities[0].name).substring(0, 25);
        } else {
            text.textContent = discord_status.toUpperCase();
        }
    } catch (e) { console.error(e); }
}

video.addEventListener('timeupdate', () => {
    const cur = video.currentTime;
    const dur = video.duration;
    if(!dur) return;
    document.getElementById('progress-fill').style.width = (cur / dur * 100) + "%";
    const fmt = (s) => {
        const m = Math.floor(s/60);
        const sec = Math.floor(s%60);
        return `${m}:${sec < 10 ? '0' : ''}${sec}`;
    }
    document.getElementById('current-time').textContent = fmt(cur);
    document.getElementById('duration').textContent = fmt(dur);
});

volumeSlider.addEventListener('input', (e) => {
    video.volume = e.target.value;
    video.muted = false;
    updateVolumeIcon();
});

function toggleMute() {
    video.muted = !video.muted;
    updateVolumeIcon();
}

function updateVolumeIcon() {
    if (video.muted || video.volume === 0) {
        muteBtn.className = 'fa-solid fa-volume-xmark';
    } else if (video.volume < 0.5) {
        muteBtn.className = 'fa-solid fa-volume-low';
    } else {
        muteBtn.className = 'fa-solid fa-volume-high';
    }
}

async function updateStatus() {
    try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const data = await res.json();
        if(!data.success) return;

        const { discord_status, activities, discord_user } = data.data;
        
        document.getElementById('discord-pfp').src = `https://cdn.discordapp.com/avatars/${DISCORD_ID}/${discord_user.avatar}.png`;
        document.getElementById('discord-name').textContent = discord_user.global_name || discord_user.username;

        const dot = document.getElementById('status-dot');
        const colors = { online: '#43b581', idle: '#faa61a', dnd: '#f04747', offline: '#747f8d' };
        dot.style.background = colors[discord_status] || colors.offline;

        const text = document.getElementById('status-text');
        if (activities.length > 0) {
            const activity = activities.find(a => a.type === 0) || activities[0];
            text.textContent = activity.state || activity.name;
        } else {
            text.textContent = discord_status.toUpperCase();
        }
    } catch (e) { console.error(e); }
}

setInterval(updateStatus, 30000);
updateStatus();