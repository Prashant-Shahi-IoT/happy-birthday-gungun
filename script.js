// Canvas Setup for Tree Animation
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Tree Animation Variables
let animationProgress = 0;
const animationDuration = 3000; // 3 seconds for tree to grow
let startTime = null;
let treeComplete = false;
let heartFormationProgress = 0;
const heartFormationDuration = 2000; // 2 seconds for heart formation
let heartStartTime = null;
let heartComplete = false;

// Tree Drawing Function
function drawTree(progress) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const baseY = canvas.height * 0.8;
    
    // Draw trunk
    const trunkHeight = canvas.height * 0.3 * progress;
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(centerX, baseY);
    ctx.lineTo(centerX, baseY - trunkHeight);
    ctx.stroke();
    
    // Draw branches and leaves
    drawBranches(centerX, baseY - trunkHeight, -90, 8, progress);
}

function drawBranches(x, y, angle, length, progress) {
    if (length < 5 || progress < 0.3) return;
    
    const radians = (angle * Math.PI) / 180;
    const endX = x + Math.cos(radians) * length * progress;
    const endY = y + Math.sin(radians) * length * progress;
    
    ctx.strokeStyle = '#654321';
    ctx.lineWidth = length / 8;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    
    // Draw leaves as small circles
    if (progress > 0.5) {
        drawLeaves(endX, endY, length, progress);
    }
    
    // Recursive branches
    if (progress > 0.4) {
        drawBranches(endX, endY, angle - 25, length * 0.7, progress);
        drawBranches(endX, endY, angle + 25, length * 0.7, progress);
    }
}

function drawLeaves(x, y, size, progress) {
    ctx.fillStyle = `rgba(34, 177, 76, ${0.6 * progress})`;
    ctx.beginPath();
    ctx.arc(x, y, size / 4, 0, Math.PI * 2);
    ctx.fill();
}

// Heart Shape Animation
function drawHeartWithLeaves(progress) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = 100;
    
    // Draw heart shape with leaves
    drawHeartShape(centerX, centerY, scale, progress);
}

function drawHeartShape(cx, cy, scale, progress) {
    const points = generateHeartPoints(cx, cy, scale);
    
    // Draw heart outline
    ctx.strokeStyle = '#ff69b4';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    for (let i = 0; i < points.length * progress; i++) {
        const point = points[i];
        if (i === 0) {
            ctx.moveTo(point.x, point.y);
        } else {
            ctx.lineTo(point.x, point.y);
        }
    }
    ctx.stroke();
    
    // Draw leaves filling the heart
    const leafPoints = generateHeartPoints(cx, cy, scale);
    for (let i = 0; i < leafPoints.length * progress; i++) {
        const point = leafPoints[i];
        ctx.fillStyle = `rgba(34, 177, 76, ${0.7})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
        ctx.fill();
    }
}

function generateHeartPoints(cx, cy, scale) {
    const points = [];
    for (let t = 0; t < Math.PI * 2; t += 0.05) {
        const x = cx + scale * (16 * Math.sin(t) ** 3);
        const y = cy - scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 10;
        points.push({ x, y });
    }
    return points;
}

// Animation Loop
function animate(currentTime) {
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    
    if (!treeComplete) {
        animationProgress = Math.min(elapsed / animationDuration, 1);
        drawTree(animationProgress);
        
        if (animationProgress === 1) {
            treeComplete = true;
        }
    } else {
        if (!heartStartTime) heartStartTime = currentTime;
        const heartElapsed = currentTime - heartStartTime;
        heartFormationProgress = Math.min(heartElapsed / heartFormationDuration, 1);
        drawHeartWithLeaves(heartFormationProgress);
        
        if (heartFormationProgress === 1) {
            heartComplete = true;
        }
    }
    
    if (!heartComplete) {
        requestAnimationFrame(animate);
    }
}

// Start animation when page loads
window.addEventListener('load', () => {
    requestAnimationFrame(animate);
});

// Photo Slideshow
const photos = [
    'https://via.placeholder.com/600x400?text=Photo+1',
    'https://via.placeholder.com/600x400?text=Photo+2',
    'https://via.placeholder.com/600x400?text=Photo+3'
];

let currentPhotoIndex = 0;

const slideImage = document.getElementById('slide-image');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

function showPhoto(index) {
    slideImage.classList.remove('active');
    
    setTimeout(() => {
        slideImage.src = photos[index];
        slideImage.classList.add('active');
    }, 300);
}

prevBtn.addEventListener('click', () => {
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    showPhoto(currentPhotoIndex);
});

nextBtn.addEventListener('click', () => {
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    showPhoto(currentPhotoIndex);
});

// Initialize first photo
showPhoto(0);

// Optional: Auto-rotate photos every 5 seconds
// setInterval(() => {
//     currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
//     showPhoto(currentPhotoIndex);
// }, 5000);

// Clock (Optional - uncomment to enable)
function updateClock() {
    const now = new Date();
    document.getElementById('hours').textContent = String(now.getHours()).padStart(2, '0');
    document.getElementById('minutes').textContent = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('seconds').textContent = String(now.getSeconds()).padStart(2, '0');
}
// Uncomment to enable clock
// setInterval(updateClock, 1000);
// document.getElementById('clock-box').style.display = 'block';