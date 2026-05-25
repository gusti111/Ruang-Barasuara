/**
<<<<<<< HEAD
 * BARASUARA FANS PROJECT - CORE ENGINE v4.0 (Ultimate Architecture)
 * Arsitektur: Modular, IntersectionObserver, Secure Iframe Tunneling, & Audio Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ==========================================
    // 1. INTERSECTION OBSERVER (Eradikasi Throttle CPU)
    // ==========================================
    const fadeElements = document.querySelectorAll('.fade-in');
    if (fadeElements.length > 0) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    obs.unobserve(entry.target); // Efisiensi memori mutlak
                }
            });
        }, { threshold: 0.15 });
        fadeElements.forEach(el => observer.observe(el));
    }

    // ==========================================
    // 2. VIDEO CONTROLLER (Secure Iframe Injector)
    // ==========================================
    const VideoController = {
        container: document.getElementById('video-player-container'),
        frame: document.getElementById('youtube-frame'),
        titleDisplay: document.getElementById('playing-title'),

        play(title, videoId) {
            if (!this.container || !this.frame || !this.titleDisplay) return;

            this.container.classList.remove('hidden');
            
            // BYPASS KEAMANAN: Memaksa perizinan dari browser lokal maupun GitHub Pages
            const origin = window.location.origin;
            this.frame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&enablejsapi=1&origin=${encodeURIComponent(origin)}&rel=0`;
            
            this.titleDisplay.innerText = `Memutar: ${title}`;
            this.container.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            console.log(`[Video Engine] Secure Stream: ${videoId} | Origin: ${origin}`);
        },

        close() {
            if (this.container && this.frame) {
                this.container.classList.add('hidden');
                this.frame.src = ""; // Bunuh frame agar buffering berhenti seketika
            }
        }
    };

    // ==========================================
    // 3. AUDIO CONTROLLER (Web Audio API Engine)
    // ==========================================
    const AudioController = {
        player: document.getElementById('audio-player-global'),
        trackText: document.getElementById('current-track'),
        engine: document.getElementById('core-audio-engine'),
        btn: document.getElementById('main-play-btn'),
        
        // Peta direktori audio lokal
        tracks: {
            'Taifun': 'audio/taifun.mp3',
            'Pikiran dan Perjalanan': 'audio/pikiran-perjalanan.mp3'
        },

        init() {
            if (this.btn && this.engine) {
                this.btn.addEventListener('click', () => {
                    if (this.engine.paused) {
                        this.engine.play();
                        this.btn.innerText = "⏸";
                    } else {
                        this.engine.pause();
                        this.btn.innerText = "▶";
                    }
                });
            }
        },

        playPreview(trackName) {
            if (!this.player || !this.trackText || !this.engine) return;
            
            const src = this.tracks[trackName];
            if (!src) {
                console.warn(`[Audio Engine] Data audio tidak ditemukan untuk: ${trackName}`);
                alert(`File audio untuk "${trackName}" belum diatur dalam sistem.`);
                return;
            }

            this.player.classList.remove('hidden');
            this.trackText.innerText = "Playing: " + trackName;
            
            // Cegah reload file yang sama jika sudah dimuat
            if (!this.engine.src.includes(src)) {
                this.engine.src = src;
            }
            
            this.engine.play().then(() => {
                this.btn.innerText = "⏸";
                console.log(`[Audio Engine] Pemutaran lokal diinisiasi: ${src}`);
            }).catch(err => {
                console.error("[Audio Engine] Autoplay diblokir oleh peramban:", err);
            });
        }
    };
    AudioController.init();

    // ==========================================
    // 4. CENTRAL EVENT DELEGATION (Router Interaksi DOM)
    // ==========================================
    document.addEventListener('click', (e) => {
        const btnVideo = e.target.closest('.play-video-btn');
        if (btnVideo) return VideoController.play(btnVideo.dataset.title, btnVideo.dataset.vid);

        const btnAudio = e.target.closest('.play-audio-btn');
        if (btnAudio) return AudioController.playPreview(btnAudio.dataset.track);

        const btnClose = e.target.closest('.close-video-btn');
        if (btnClose) return VideoController.close();
    });

    // ==========================================
    // 5. CSS REACTIVE GLOW DELEGATION (Efek Visual)
    // ==========================================
    document.addEventListener('mousemove', (e) => {
        const card = e.target.closest('.card, .album-card, .tour-card');
        if (!card) return; // Hanya kalkulasi jika kursor berada di atas kartu
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });

    // Aksesibilitas: Tombol ESC untuk UX yang mulus
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") VideoController.close();
    });

    // ==========================================
    // 6. BACKWARD COMPATIBILITY FALLBACK
    // ==========================================
    // Jika halaman index.html lamamu masih ada yang menggunakan atribut onclick="..."
    window.playYouTube = (title, id) => VideoController.play(title, id);
    window.closeVideo = () => VideoController.close();
    window.playMusic = (track) => AudioController.playPreview(track);

    console.log("SIG System: Core Engine v4.0 (Ultimate) - Active");
});
=======
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
>>>>>>> 72297c0e45e171693a8ec0d75094a89e4b7c7d64
