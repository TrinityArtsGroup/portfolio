// Audio Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initAudioPlayers();
    initVideoPlayers();
    initScrollAnimations();
});

function initAudioPlayers() {
    const audioPlayers = document.querySelectorAll('.audio-player');
    
    audioPlayers.forEach(player => {
        // Pause other audio when one starts playing
        player.addEventListener('play', function() {
            audioPlayers.forEach(otherPlayer => {
                if (otherPlayer !== player) {
                    otherPlayer.pause();
                }
            });
        });
        
        // Add loading state
        player.addEventListener('loadstart', function() {
            this.style.opacity = '0.7';
        });
        
        player.addEventListener('canplay', function() {
            this.style.opacity = '1';
        });
        
        // Error handling
        player.addEventListener('error', function() {
            console.error('Audio failed to load:', this.src);
            this.style.border = '2px solid #ff6b6b';
        });
    });
}

function initVideoPlayers() {
    const videoPlayers = document.querySelectorAll('.video-player');
    
    videoPlayers.forEach(player => {
        // Pause other media when video starts playing
        player.addEventListener('play', function() {
            // Pause all audio players
            document.querySelectorAll('.audio-player').forEach(audio => {
                audio.pause();
            });
            
            // Pause other videos
            videoPlayers.forEach(otherPlayer => {
                if (otherPlayer !== player) {
                    otherPlayer.pause();
                }
            });
        });
        
        // Add loading state
        player.addEventListener('loadstart', function() {
            this.style.opacity = '0.7';
        });
        
        player.addEventListener('canplay', function() {
            this.style.opacity = '1';
        });
        
        // Error handling
        player.addEventListener('error', function() {
            console.error('Video failed to load:', this.src);
            this.style.border = '2px solid #ff6b6b';
        });
    });
}

function initScrollAnimations() {
    // Intersection Observer for audio projects
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animations
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all audio projects
    document.querySelectorAll('.audio-project').forEach(project => {
        // Set initial state
        project.style.opacity = '0';
        project.style.transform = 'translateY(30px)';
        project.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        observer.observe(project);
    });
}

// Keyboard accessibility for media controls
document.addEventListener('keydown', function(e) {
    if (e.target.tagName === 'AUDIO' || e.target.tagName === 'VIDEO') {
        if (e.key === ' ') {
            e.preventDefault();
            if (e.target.paused) {
                e.target.play();
            } else {
                e.target.pause();
            }
        }
    }
});

// Optional: Add volume control with mouse wheel
document.querySelectorAll('.audio-player, .video-player').forEach(player => {
    player.addEventListener('wheel', function(e) {
        if (e.ctrlKey) { // Only when holding Ctrl
            e.preventDefault();
            const delta = e.deltaY > 0 ? -0.1 : 0.1;
            this.volume = Math.max(0, Math.min(1, this.volume + delta));
        }
    });
});