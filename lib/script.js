/**
 * BARASUARA FANS PROJECT - CORE ENGINE v4.1 (State Synchronized Architecture)
 * Arsitektur: Modular, IntersectionObserver, Secure Iframe Tunneling, Adaptive Optimization, & Pjax SPA Router
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ==========================================
    // 1. ADAPTIVE NETWORK & PERFORMANCE THROTTLE
    // ==========================================
    const RuntimeConfig = {
        isLowPerformance: false,
        init() {
            if (navigator.connection) {
                const conn = navigator.connection;
                if (conn.saveData || ['slow-2g', '2g', '3g'].includes(conn.effectiveType)) {
                    this.isLowPerformance = true;
                    document.documentElement.classList.add('low-perf-mode');
                    console.warn("[SIG System] Koneksi kritis terdeteksi. Optimasi latensi aktif.");
                }
            }
        }
    };
    RuntimeConfig.init();

    // ==========================================
    // 2. INTERSECTION OBSERVER (Penjadwalan Siklus CPU)
    // ==========================================
    const fadeElements = document.querySelectorAll('.fade-in');
    if (fadeElements.length > 0 && !RuntimeConfig.isLowPerformance) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    obs.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.12 });
        fadeElements.forEach(el => observer.observe(el));
    } else if (RuntimeConfig.isLowPerformance) {
        // Bypass langsung jika performa jaringan/perangkat buruk agar menghemat baterai
        fadeElements.forEach(el => el.classList.add('show'));
    }

    // ==========================================
    // 3. VIDEO CONTROLLER (Secure Iframe Injector)
    // ==========================================
    const VideoController = {
        container: document.getElementById('video-player-container'),
        frame: document.getElementById('youtube-frame'),
        titleDisplay: document.getElementById('playing-title'),

        play(title, videoId) {
            if (!this.container || !this.frame || !this.titleDisplay) return;

            this.container.classList.remove('hidden');
            const origin = window.location.origin || window.location.hostname;
            this.frame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&enablejsapi=1&origin=${encodeURIComponent(origin)}&rel=0`;
            
            this.titleDisplay.innerText = `Memutar: ${title}`;
            this.container.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            console.log(`[Video Engine] Stream Tunnel Injected: ${videoId}`);
        },

        close() {
            if (this.container && this.frame) {
                this.container.classList.add('hidden');
                this.frame.src = ""; 
            }
        }
    };

    // ==========================================
    // 4. AUDIO CONTROLLER (Web Audio API State Guard)
    // ==========================================
    const AudioController = {
        player: document.getElementById('audio-player-global'),
        trackText: document.getElementById('current-track'),
        engine: document.getElementById('core-audio-engine'),
        btn: document.getElementById('main-play-btn'),
        isAudioLoading: false,
        
        // PETA SINKRONISASI DATA - 3 ALBUM TERDAFTAR VALID
        tracks: {
            'Taifun': 'audio/taifun.mp3',
            'Pikiran dan Perjalanan': 'audio/pikiran-perjalanan.mp3',
            'Jalaran Sadrah': 'audio/jalaran-sadrah.mp3'
        },

        init() {
            if (this.btn && this.engine) {
                this.btn.addEventListener('click', () => {
                    if (this.isAudioLoading) return;
                    this.togglePlayback();
                });
            }
        },

        togglePlayback() {
            if (this.engine.paused) {
                this.engine.play()
                    .then(() => this.btn.innerText = "⏸")
                    .catch(err => console.error("[Audio Engine] Gagal memutar:", err));
            } else {
                this.engine.pause();
                this.btn.innerText = "▶";
            }
        },

        playPreview(trackName) {
            if (!this.player || !this.trackText || !this.engine || this.isAudioLoading) return;
            
            const src = this.tracks[trackName];
            if (!src) {
                console.warn(`[Audio Engine] Alokasi pointer gagal untuk track: ${trackName}`);
                return;
            }

            this.player.classList.remove('hidden');
            this.trackText.innerText = "Playing: " + trackName;
            
            if (!this.engine.src.includes(src)) {
                this.isAudioLoading = true;
                this.engine.src = src;
            }
            
            this.engine.play()
                .then(() => {
                    this.btn.innerText = "⏸";
                    this.isAudioLoading = false;
                })
                .catch(err => {
                    this.isAudioLoading = false;
                    console.error("[Audio Engine] Interupsi enkapsulasi autoplay browser:", err);
                });
        }
    };
    AudioController.init();

    // ==========================================
    // 5. CENTRAL EVENT DELEGATION Router (O(1) Complexity)
    // ==========================================
    document.addEventListener('click', (e) => {
        const target = e.target;

        const btnVideo = target.closest('.play-video-btn');
        if (btnVideo) return VideoController.play(btnVideo.dataset.title, btnVideo.dataset.vid);

        const btnAudio = target.closest('.play-audio-btn');
        if (btnAudio) return AudioController.playPreview(btnAudio.dataset.track);

        const btnClose = target.closest('.close-video-btn');
        if (btnClose) return VideoController.close();
    });

    // ==========================================
    // 6. REACTIVE MOUSE GLOW ENGINE (Lazy Evaluated)
    // ==========================================
    if (!RuntimeConfig.isLowPerformance) {
        document.addEventListener('mousemove', (e) => {
            const card = e.target.closest('.card, .album-card, .tour-card');
            if (!card) return; 
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
    }

    // Aksesibilitas Keyboard: ESC Tunnel
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") VideoController.close();
    });

    // Backward Compatibility Fallback Injection
    window.playYouTube = (title, id) => VideoController.play(title, id);
    window.closeVideo = () => VideoController.close();
    window.playMusic = (track) => AudioController.playPreview(track);

    console.log("SIG System: Core Engine v4.1 (Synchronized) - Active");
});
