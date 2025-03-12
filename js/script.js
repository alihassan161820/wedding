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
    
    console.log('Wedding invitation loaded successfully with animations');
});
