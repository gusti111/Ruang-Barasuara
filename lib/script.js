/**
 * BARASUARA FANS PROJECT - CORE ENGINE
 * Diperbarui dengan Optimasi Performa (Throttle) & Aksesibilitas (ESC Key)
 */

// 1. KONFIGURASI DATA (Lyric Decryptor)
const lyricHighlights = {
    'Nyala Suara': "Nyalakan nyala dalam dadamu, bakar semua keraguan.",
    'Sendu Melagu': "Membasuh luka dengan air mata, merawat duka dalam tawa.",
    'Bahas Bahasa': "Andai aku kau jadikan sepasang mata, 'kan kupetik bintang.",
    'Pikiran dan Perjalanan': "Mengarungi waktu, menembus batas pikiran yang fana.",
    'Guna Manusia': "Apa guna manusia jika tak berguna bagi sesama?",
    'Pancarona': "Warna-warni hidup bersatu dalam simfoni pancarona."
};

// 2. SISTEM PEMUTAR VIDEO YOUTUBE (Untuk music.html)
function playYouTube(title, videoId) {
    const container = document.getElementById('video-player-container');
    const frame = document.getElementById('youtube-frame');
    const titleDisplay = document.getElementById('playing-title');

    // Cek eksistensi elemen untuk mencegah TypeError
    if (container && frame && titleDisplay) {
        container.classList.remove('hidden');

        // Injeksi URL Embed
        frame.src = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;
        
        // Injeksi Lirik Dinamis
        const quote = lyricHighlights[title] || "Energi. Emosi. Eksplorasi.";
        titleDisplay.innerHTML = `Memutar: ${title} <br><small style="font-style: italic; color: #ff6a3d;">"${quote}"</small>`;

        // Autoscroll
        container.scrollIntoView({ behavior: 'smooth' });
        
        console.log(`System: Streaming initiated for ${title} [ID: ${videoId}]`);
    }
}

function closeVideo() {
    const container = document.getElementById('video-player-container');
    const frame = document.getElementById('youtube-frame');
    
    if (container && !container.classList.contains('hidden') && frame) {
        container.classList.add('hidden');
        frame.src = ""; // Reset src untuk mematikan audio/video
        console.log("System: Video player closed.");
    }
}

// 3. AKSESIBILITAS KEYBOARD (Menutup video dengan tombol ESC)
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeVideo();
    }
});

// 4. SISTEM PEMUTAR AUDIO GLOBAL (Untuk index.html)
function playMusic(trackName) {
    const player = document.getElementById('audio-player-global'); 
    const trackText = document.getElementById('current-track'); 
    
    if (player && trackText) {
        player.classList.remove('hidden');
        trackText.innerText = "Playing: " + trackName;
        console.log("System: Global audio player activated for " + trackName);
    }
}

// 5. SISTEM ANIMASI SCROLL DENGAN OPTIMASI THROTTLE
const elements = document.querySelectorAll('.fade-in'); 

function showOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;

    elements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < triggerBottom) {
            el.classList.add('show'); 
        }
    });
}

// Fungsi Throttle untuk membatasi eksekusi scroll event (Efisiensi CPU)
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 6. EVENT LISTENERS
// Menggunakan throttle(..., 100) berarti fungsi hanya akan dieksekusi maksimal 1 kali setiap 100ms
window.addEventListener('scroll', throttle(showOnScroll, 100));
window.addEventListener('load', showOnScroll); 

// Debugging Status
console.log("SIG System: Core Engine v2.1 (Optimized) - Active");