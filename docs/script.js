// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Navigation
    nav.classList.toggle('nav-active');

    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically handle the form submission
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Scroll Animation for Sections
const sections = document.querySelectorAll('section');
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.5s ease-out';
    observer.observe(section);
});

// Header Scroll Effect
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// YouTube Player API Integration
let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('iframe-youtube-player', {
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
    
    // Check if the browser supports 360° video
    if (browserSupports360()) {
        // Enable VR mode if available
        if (event.target.setSphericalProperties) {
            event.target.setSphericalProperties({
                enableVr: true,
                vrQuality: 'hd4k'
            });
        }
    } else {
        // Redirect to YouTube on mobile or unsupported browsers
        const videoId = '-IdUQTiWu04';
        if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            window.location.href = `youtube://watch?v=${videoId}`;
            // Fallback for if YouTube app is not installed
            setTimeout(() => {
                window.location.href = `https://www.youtube.com/watch?v=${videoId}`;
            }, 2500);
        }
    }
}

function onPlayerStateChange(event) {
    // Loop video when it ends
    if (event.data === YT.PlayerState.ENDED) {
        event.target.playVideo();
    }
}

function browserSupports360() {
    // Check for WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const hasWebGL = gl && gl instanceof WebGLRenderingContext;

    // Check for gyroscope support
    const hasGyro = window.DeviceOrientationEvent !== undefined;

    // Check for modern browser support
    const isModernBrowser = /Chrome|Firefox|Safari|Edge/.test(navigator.userAgent) && !/Mobile/.test(navigator.userAgent);

    return hasWebGL && (hasGyro || isModernBrowser);
} 