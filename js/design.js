// Design Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initArtPieceToggles();
    initGalleryAnimations();
});

function initArtPieceToggles() {
    const artPieces = document.querySelectorAll('.art-piece[data-bs-toggle="collapse"]');
    
    artPieces.forEach(piece => {
        const targetId = piece.getAttribute('data-bs-target');
        const collapseElement = document.querySelector(targetId);
        const button = piece.querySelector('.btn');
        const chevron = piece.querySelector('.fa-chevron-down');
        
        if (!collapseElement || !button) return;
        
        // Listen for Bootstrap collapse events
        collapseElement.addEventListener('show.bs.collapse', function() {
            piece.setAttribute('aria-expanded', 'true');
            if (chevron) chevron.style.transform = 'rotate(180deg)';
        });
        
        collapseElement.addEventListener('hide.bs.collapse', function() {
            piece.setAttribute('aria-expanded', 'false');
            if (chevron) chevron.style.transform = 'rotate(0deg)';
        });
        
        // Make the entire art piece clickable
        piece.addEventListener('click', function(e) {
            // Don't trigger if clicking the button itself
            if (e.target.closest('.btn')) return;
            
            const bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapseElement);
            
            if (collapseElement.classList.contains('show')) {
                bsCollapse.hide();
            } else {
                bsCollapse.show();
            }
        });
    });
}

function initGalleryAnimations() {
    // Intersection Observer for gallery items
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
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        // Set initial state
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        observer.observe(item);
    });
}

// Optional: Add keyboard support for accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('art-piece')) {
            e.preventDefault();
            focusedElement.click();
        }
    }
});