// Showcase JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    initImageCompare();
});

function initImageCompare() {
    const compareContainer = document.getElementById('img-compare');
    const slider = document.getElementById('img-slider');
    const beforeImage = document.querySelector('.img-compare-before');
    
    if (!compareContainer || !slider || !beforeImage) return;
    
    let isActive = false;
    
    // Function to update the clip path
    function updateClipPath(percentage) {
        beforeImage.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
        slider.style.left = `${percentage}%`;
    }
    
    // Mouse events
    slider.addEventListener('mousedown', function(e) {
        isActive = true;
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isActive) return;
        
        const rect = compareContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        
        updateClipPath(percentage);
    });
    
    document.addEventListener('mouseup', function() {
        isActive = false;
    });
    
    // Touch events for mobile
    slider.addEventListener('touchstart', function(e) {
        isActive = true;
        e.preventDefault();
    });
    
    document.addEventListener('touchmove', function(e) {
        if (!isActive) return;
        
        const rect = compareContainer.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        
        updateClipPath(percentage);
        e.preventDefault();
    });
    
    document.addEventListener('touchend', function() {
        isActive = false;
    });
    
    // Click to position
    compareContainer.addEventListener('click', function(e) {
        if (e.target === slider) return;
        
        const rect = compareContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        
        updateClipPath(percentage);
    });
}