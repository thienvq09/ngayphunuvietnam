/* ═══════════════════════════════════════════
   FALLING PETALS & HEARTS
═══════════════════════════════════════════ */
(function createPetals() {
  const container = document.getElementById('petalContainer');
  const symbols = ['🌸', '💗', '🩷', '🌷', '💕', '🪻', '❤️', '🩵'];
  const count = window.innerWidth < 600 ? 18 : 30;

  for (let i = 0; i < count; i++) {
    const petal = document.createElement('span');
    petal.classList.add('petal');
    petal.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    petal.style.left = Math.random() * 100 + '%';
    petal.style.fontSize = (Math.random() * 14 + 10) + 'px';
    petal.style.animationDuration = (Math.random() * 6 + 6) + 's';
    petal.style.animationDelay = (Math.random() * 8) + 's';
    container.appendChild(petal);
  }
})();

/* ═══════════════════════════════════════════
   SPARKLE PARTICLES
═══════════════════════════════════════════ */
(function createSparkles() {
  const container = document.getElementById('sparkleContainer');
  const count = window.innerWidth < 600 ? 12 : 22;

  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.classList.add('sparkle');
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 100 + '%';
    s.style.animationDelay = (Math.random() * 4) + 's';
    s.style.animationDuration = (Math.random() * 2 + 2) + 's';
    container.appendChild(s);
  }
})();

/* ═══════════════════════════════════════════
   HEART CONFETTI ENGINE (Pure JS – no lib)
═══════════════════════════════════════════ */
const confettiCanvas = document.getElementById('confetti-canvas');
const ctx = confettiCanvas.getContext('2d');
let confettiParticles = [];
let confettiRunning = false;

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function drawHeart(cx, cy, size, color, rotation) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotation);
  ctx.fillStyle = color;
  ctx.beginPath();
  const s = size;
  ctx.moveTo(0, -s * 0.4);
  ctx.bezierCurveTo(-s * 0.5, -s, -s, -s * 0.4, 0, s * 0.5);
  ctx.moveTo(0, -s * 0.4);
  ctx.bezierCurveTo(s * 0.5, -s, s, -s * 0.4, 0, s * 0.5);
  ctx.fill();
  ctx.restore();
}

function launchConfetti() {
  confettiRunning = true;
  const colors = ['#e91e63', '#f48fb1', '#ff4081', '#ff80ab', '#f8bbd0', '#c2185b', '#ff1744', '#d50000', '#ff6090'];
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  for (let i = 0; i < 120; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 10 + 4;
    confettiParticles.push({
      x: centerX,
      y: centerY,
      vx: Math.cos(angle) * speed * (0.6 + Math.random()),
      vy: Math.sin(angle) * speed * (0.6 + Math.random()) - 3,
      size: Math.random() * 10 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.15,
      gravity: 0.12 + Math.random() * 0.06,
      opacity: 1,
      decay: 0.008 + Math.random() * 0.006
    });
  }

  requestAnimationFrame(animateConfetti);
}

function animateConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  confettiParticles = confettiParticles.filter(p => p.opacity > 0.01);

  for (const p of confettiParticles) {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.gravity;
    p.vx *= 0.99;
    p.rotation += p.rotationSpeed;
    p.opacity -= p.decay;

    ctx.globalAlpha = p.opacity;
    drawHeart(p.x, p.y, p.size, p.color, p.rotation);
  }

  ctx.globalAlpha = 1;

  if (confettiParticles.length > 0) {
    requestAnimationFrame(animateConfetti);
  } else {
    confettiRunning = false;
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
}

/* Secondary burst after a short delay */
function secondBurst() {
  const colors = ['#ff4081', '#e91e63', '#f48fb1', '#c2185b', '#ff80ab'];

  for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 7 + 2;
    const originX = Math.random() * window.innerWidth;
    const originY = Math.random() * window.innerHeight * 0.6;
    confettiParticles.push({
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.12,
      gravity: 0.1,
      opacity: 1,
      decay: 0.012
    });
  }

  if (!confettiRunning) {
    confettiRunning = true;
    requestAnimationFrame(animateConfetti);
  }
}

/* ═══════════════════════════════════════════
   OPEN GIFT BOX → SHOW CARD
═══════════════════════════════════════════ */
const screen1 = document.getElementById('screen1');
const screen2 = document.getElementById('screen2');
const giftBox = document.getElementById('giftBox');
const giftBoxWrapper = document.getElementById('giftBoxWrapper');
let opened = false;

function openGift() {
  if (opened) return;
  opened = true;

  // Open lid animation
  giftBox.classList.add('opened');
  giftBox.style.animation = 'none';

  // Launch confetti after lid opens
  setTimeout(launchConfetti, 400);
  setTimeout(secondBurst, 1200);
  setTimeout(secondBurst, 2000);

  // Fade out screen 1
  setTimeout(() => {
    screen1.classList.add('hide');
  }, 900);

  // Show screen 2
  setTimeout(() => {
    screen2.classList.add('show');
    requestAnimationFrame(() => {
      screen2.classList.add('visible');
    });
    addFloatingHearts();
  }, 1600);
}

giftBoxWrapper.addEventListener('click', openGift);
giftBoxWrapper.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openGift(); }
});

/* ═══════════════════════════════════════════
   FLOATING HEARTS AROUND CARD
═══════════════════════════════════════════ */
function addFloatingHearts() {
  const card = document.getElementById('card');
  const hearts = ['💖', '💗', '💝', '🩷', '♥️'];

  for (let i = 0; i < 8; i++) {
    const h = document.createElement('span');
    h.classList.add('float-heart');
    h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    h.style.left = Math.random() * 90 + 5 + '%';
    h.style.bottom = Math.random() * 30 + '%';
    h.style.animationDelay = (Math.random() * 4) + 's';
    h.style.animationDuration = (Math.random() * 3 + 3) + 's';
    h.style.fontSize = (Math.random() * 12 + 12) + 'px';
    card.appendChild(h);
  }
}
