// Main JS file

// Modal Logic
const modalContainer = document.getElementById('modal-container');
const modalBody = document.getElementById('modal-body');
const closeModalBtn = document.querySelector('.close-modal');

function openModal(modalId) {
    console.log('Opening modal:', modalId);
    
    // Find the content with the matching ID
    const content = document.getElementById(`content-${modalId}`);
    
    if (content) {
        modalBody.innerHTML = content.innerHTML;
        modalContainer.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop background scrolling
    } else {
        console.error('Modal content not found for:', modalId);
    }
}

// Close Modal Event Listener
closeModalBtn.addEventListener('click', () => {
    modalContainer.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
});

// Close when clicking outside content
modalContainer.addEventListener('click', (e) => {
    if (e.target === modalContainer) {
        modalContainer.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Smooth Scroll for navigation
function scrollToSection(id) {
    const element = document.getElementById(id);
    if(element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Glitch effect randomization (Optional polish)
const glitchElement = document.querySelector('.glitch');
if(glitchElement) {
    setInterval(() => {
        const originalText = glitchElement.getAttribute('data-text');
        // Simple visual flicker logic could go here if using JS-based glitch
        // For now, handled purely by CSS animations if we add them, 
        // or just static for simplicity in this MVP.
    }, 3000);
}

// Intersection Observer for fade-in elements (Optional)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section-pad, .feature-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add dynamic class for observer
const style = document.createElement('style');
style.innerHTML = `
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);
