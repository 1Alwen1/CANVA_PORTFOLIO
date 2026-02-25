// js/script.js
document.addEventListener('DOMContentLoaded', function() {
    // ===== TYPING EFFECT =====
    const typedSpan = document.getElementById('typed-role');
    const roles = ['Web Developer', 'Designer', 'Programmer', 'Basic IT Support'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 150;
  
    function typeEffect() {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        typedSpan.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedSpan.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }
  
      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 80; // pause then delete
        setTimeout(typeEffect, 1500);
        return;
      }
      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 150;
      }
      setTimeout(typeEffect, typeSpeed);
    }
    typeEffect();
  
    // ===== MOBILE MENU TOGGLE =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  
    // close menu when link clicked (smooth)
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
          });
        }
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
        }
      });
    });
  
    // ===== STICKY NAVBAR background =====
    window.addEventListener('scroll', () => {
      const navbar = document.getElementById('navbar');
      if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 15, 25, 0.8)';
      } else {
        navbar.style.background = 'var(--glass-bg)';
      }
    });
  
    // ===== BACK TO TOP BUTTON =====
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) {
        backToTop.style.display = 'flex';
      } else {
        backToTop.style.display = 'none';
      }
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  
    // ===== SCROLL REVEAL (Intersection Observer) =====
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    fadeElements.forEach(el => observer.observe(el));
  
    // ===== FORM VALIDATION =====
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (!name) {
        alert('Name cannot be empty');
        return;
      }
      if (!email || !emailPattern.test(email)) {
        alert('Please enter a valid email');
        return;
      }
      if (!message) {
        alert('Message cannot be empty');
        return;
      }
      alert(`Thanks ${name}! Your message has been sent (simulated).`);
      form.reset();
    });
  });