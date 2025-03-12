document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    const card = document.querySelector('.invitation-card');
    const innerContent = document.querySelector('.inner-content');
    const elements = document.querySelectorAll('.join-us, .wedding-of, .couple-names, .and-divider, .wedding-details');
    
    // Ensure all elements are visible after animations complete
    setTimeout(() => {
        elements.forEach(el => {
            el.style.opacity = 1;
        });
    }, 3000);
    
    // Add subtle parallax effect on desktop
    if (window.innerWidth > 768 && card && innerContent) {
        card.addEventListener('mousemove', function(e) {
            // Calculate mouse position relative to card
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;
            
            // Calculate movement based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const moveX = (x - centerX) / 40;
            const moveY = (y - centerY) / 40;
            
            // Apply subtle movement effect
            innerContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        // Reset on mouse leave
        card.addEventListener('mouseleave', function() {
            innerContent.style.transform = 'translate(0, 0)';
        });
    }
    
    // Handle mobile touch events
    if (window.innerWidth <= 768 && card) {
        // Disable any effects that might interfere with mobile scrolling
        card.addEventListener('touchmove', function(e) {
            // Allow default touch behavior for scrolling
        });
    }
    
    // Add transition for smooth animation
    innerContent.style.transition = 'transform 0.2s ease';
    
    // Initialize countdown timer
    initCountdown();
    
    // Initialize music player
    initMusicPlayer();
    
    console.log('Wedding invitation loaded successfully with animations');
});

// Initialize music player functionality
function initMusicPlayer() {
    const musicButton = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    let isPlaying = false;
    
    // Try to preload the audio
    backgroundMusic.load();
    
    // Update button text and icon based on play state
    function updateMusicButton() {
        const tooltip = musicButton.querySelector('.music-tooltip');
        const icon = musicButton.querySelector('i');
        
        if (isPlaying) {
            musicButton.classList.add('playing');
            tooltip.textContent = 'Pause Music';
            icon.className = 'fas fa-pause';
        } else {
            musicButton.classList.remove('playing');
            tooltip.textContent = 'Play Wedding Music';
            icon.className = 'fas fa-music';
        }
    }
    
    // Toggle music play/pause
    musicButton.addEventListener('click', function() {
        if (isPlaying) {
            backgroundMusic.pause();
        } else {
            // Modern browsers require user interaction to play audio
            // This click event satisfies that requirement
            const playPromise = backgroundMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error('Audio playback failed:', error);
                });
            }
        }
        
        isPlaying = !isPlaying;
        updateMusicButton();
    });
    
    // Handle audio ended event
    backgroundMusic.addEventListener('ended', function() {
        // This shouldn't happen with loop=true, but just in case
        isPlaying = false;
        updateMusicButton();
    });
    
    // Attempt to autoplay immediately (this is our first attempt)
    tryAutoplay();
    
    // If first attempt fails, try again on any user interaction
    document.addEventListener('click', function autoPlayHandler() {
        if (!isPlaying) {
            tryAutoplay();
        }
    });
    
    // Also try on scroll, mousemove, and touchstart
    document.addEventListener('scroll', function() {
        if (!isPlaying) tryAutoplay();
    }, { once: true });
    
    document.addEventListener('mousemove', function() {
        if (!isPlaying) tryAutoplay();
    }, { once: true });
    
    document.addEventListener('touchstart', function() {
        if (!isPlaying) tryAutoplay();
    }, { once: true });
    
    // Function to try autoplay
    function tryAutoplay() {
        // Unmute the audio first (browsers allow muted autoplay)
        backgroundMusic.muted = false;
        
        const playPromise = backgroundMusic.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    isPlaying = true;
                    updateMusicButton();
                    console.log('Autoplay successful!');
                })
                .catch(error => {
                    console.log('Autoplay prevented:', error);
                    // If autoplay fails, simulate a click on the music button to make it more noticeable
                    musicButton.classList.add('attention');
                });
        }
    }
}

// Countdown timer function
function initCountdown() {
    // Set the wedding date - April 7, 2025 at 8:00 PM
    const weddingDate = new Date('April 7, 2025 20:00:00').getTime();
    
    // Update the countdown every second
    const countdownTimer = setInterval(function() {
        // Get today's date and time
        const now = new Date().getTime();
        
        // Find the distance between now and the wedding date
        const distance = weddingDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result
        document.getElementById('days').textContent = formatTime(days);
        document.getElementById('hours').textContent = formatTime(hours);
        document.getElementById('minutes').textContent = formatTime(minutes);
        document.getElementById('seconds').textContent = formatTime(seconds);
        
        // If the countdown is finished, display a message
        if (distance < 0) {
            clearInterval(countdownTimer);
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            
            // Optionally change the countdown title
            document.querySelector('.countdown-title').textContent = 'Our special day is here!';
        }
    }, 1000);
}

// Helper function to format time (add leading zero if needed)
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Function to open location on map
function openMap() {
    // Open in Google Maps
    window.open(`https://maps.app.goo.gl/htjMkiRwJLTutbyT9`, '_blank');
}
