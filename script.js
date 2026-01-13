// Photo array with animation
const photos = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg'];

let currentPhotoIndex = 0;

// Initialize animations
function initializeAnimations() {
  animateTitle();
  animateConfetti();
  startPhotoSlideshow();
  animateHeartsBackground();
}

// Title animation with fade-in and glow effect
function animateTitle() {
  const title = document.querySelector('.birthday-title');
  if (!title) return;
  
  title.style.opacity = '0';
  title.style.animation = 'fadeInGlow 2s ease-in-out forwards';
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInGlow {
      0% {
        opacity: 0;
        text-shadow: 0 0 5px rgba(255, 182, 193, 0.5);
      }
      50% {
        text-shadow: 0 0 20px rgba(255, 182, 193, 0.8);
      }
      100% {
        opacity: 1;
        text-shadow: 0 0 30px rgba(255, 182, 193, 1);
      }
    }
    
    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-20px);
      }
    }
    
    @keyframes bounce {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
    }
    
    @keyframes confetti-fall {
      0% {
        transform: translateY(-100vh) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
      }
    }
    
    @keyframes slideIn {
      0% {
        opacity: 0;
        transform: translateX(-50px);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes heart-rise {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) translateX(100px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Confetti animation
function animateConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) {
    console.warn('Confetti canvas not found');
    return;
  }
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const confetti = [];
  
  // Create confetti particles
  for (let i = 0; i < 100; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 3 + 2,
      color: ['#FF69B4', '#FFB6C1', '#FFC0CB', '#FF1493', '#FFD700'][Math.floor(Math.random() * 5)],
      size: Math.random() * 5 + 2,
      rotation: Math.random() * Math.PI * 2
    });
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    confetti.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.rotation += 0.05;
      
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      ctx.fillStyle = particle.color;
      ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
      ctx.restore();
      
      // Recycle particles that fall off screen
      if (particle.y > canvas.height) {
        particle.y = -10;
        particle.x = Math.random() * canvas.width;
      }
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  // Handle window resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Photo slideshow animation
function startPhotoSlideshow() {
  const photoElement = document.getElementById('photo-slideshow');
  if (!photoElement) {
    console.warn('Photo slideshow element not found');
    return;
  }
  
  function showNextPhoto() {
    photoElement.style.animation = 'none';
    photoElement.offsetHeight; // Trigger reflow
    photoElement.src = photos[currentPhotoIndex];
    photoElement.style.animation = 'slideIn 0.5s ease-in-out';
    
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
  }
  
  // Show first photo immediately
  showNextPhoto();
  
  // Change photo every 5 seconds
  setInterval(showNextPhoto, 5000);
}

// Background hearts animation
function animateHeartsBackground() {
  const container = document.body;
  
  setInterval(() => {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.bottom = '-50px';
    heart.style.fontSize = '30px';
    heart.style.animation = 'heart-rise ' + (3 + Math.random() * 2) + 's ease-in forwards';
    heart.style.pointerEvents = 'none';
    
    container.appendChild(heart);
    
    // Remove element after animation completes
    setTimeout(() => heart.remove(), 5000);
  }, 300);
}

// Start all animations when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAnimations);
} else {
  initializeAnimations();
}