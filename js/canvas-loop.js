/**
 * RUCO WEB (rucoweb.ar) — CANVAS 3D INFINITY RIBBON
 * Simulación visual del lazo de infinito en tono cobre cálido sobre blanco cremita.
 * Ligero, reactivo al cursor/touch y optimizado para batería móvil.
 */

(function () {
  'use strict';

  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let t = 0;
  let mouseX = width / 2;
  let mouseY = height / 2;
  let targetMouseX = mouseX;
  let targetMouseY = mouseY;

  window.addEventListener('mousemove', (e) => {
    targetMouseX = e.clientX;
    targetMouseY = e.clientY;
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      targetMouseX = e.touches[0].clientX;
      targetMouseY = e.touches[0].clientY;
    }
  }, { passive: true });

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);

  const particles = [];
  const PARTICLE_COUNT = window.innerWidth < 768 ? 20 : 38;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      theta: Math.random() * Math.PI * 2,
      speed: 0.003 + Math.random() * 0.005,
      radiusOffset: (Math.random() - 0.5) * 30,
      size: 1 + Math.random() * 2,
      opacity: 0.2 + Math.random() * 0.5,
      color: Math.random() > 0.4 ? '#C88742' : '#B87333'
    });
  }

  function getLemniscatePoint(theta, scale, cx, cy) {
    const sinT = Math.sin(theta);
    const cosT = Math.cos(theta);
    const denom = 1 + sinT * sinT;
    const x = cx + (scale * cosT) / denom;
    const y = cy + (scale * sinT * cosT) / denom;
    return { x, y };
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    mouseX += (targetMouseX - mouseX) * 0.04;
    mouseY += (targetMouseY - mouseY) * 0.04;

    const centerX = width * 0.5;
    const centerY = height * 0.44;
    const scale = Math.min(width * 0.46, 380);

    const steps = 160;
    ctx.save();
    ctx.lineWidth = width < 768 ? 3.5 : 5;
    ctx.lineCap = 'round';

    // Gradiente cálido de cobre suave sobre fondo crema
    const grad = ctx.createLinearGradient(
      centerX - scale * 0.6,
      centerY - scale * 0.3,
      centerX + scale * 0.6,
      centerY + scale * 0.3
    );
    grad.addColorStop(0, 'rgba(200, 135, 66, 0.04)');
    grad.addColorStop(0.3, 'rgba(200, 135, 66, 0.35)');
    grad.addColorStop(0.7, 'rgba(184, 115, 51, 0.45)');
    grad.addColorStop(1, 'rgba(22, 54, 59, 0.15)');

    ctx.strokeStyle = grad;
    ctx.beginPath();

    for (let i = 0; i <= steps; i++) {
      const angle = (i / steps) * Math.PI * 2 + t * 0.35;
      const pt = getLemniscatePoint(angle, scale, centerX, centerY);
      const wave = Math.sin(angle * 3 + t) * 12;
      if (i === 0) {
        ctx.moveTo(pt.x, pt.y + wave);
      } else {
        ctx.lineTo(pt.x, pt.y + wave);
      }
    }
    ctx.stroke();

    // Línea de brillo sutil
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = 'rgba(200, 135, 66, 0.25)';
    ctx.beginPath();
    for (let i = 0; i <= steps; i += 2) {
      const angle = (i / steps) * Math.PI * 2 + t * 0.35;
      const pt = getLemniscatePoint(angle, scale * 0.98, centerX, centerY);
      const wave = Math.sin(angle * 3 + t) * 12;
      if (i === 0) {
        ctx.moveTo(pt.x, pt.y + wave);
      } else {
        ctx.lineTo(pt.x, pt.y + wave);
      }
    }
    ctx.stroke();
    ctx.restore();

    // Partículas
    particles.forEach((p) => {
      p.theta += p.speed;
      const pt = getLemniscatePoint(p.theta, scale + p.radiusOffset, centerX, centerY);
      const wave = Math.sin(p.theta * 3 + t) * 12;

      ctx.save();
      ctx.beginPath();
      ctx.arc(pt.x, pt.y + wave, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();
      ctx.restore();
    });

    t += 0.015;
    animationFrameId = requestAnimationFrame(draw);
  }

  function start() {
    if (!animationFrameId) {
      animationFrameId = requestAnimationFrame(draw);
    }
  }

  function stop() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stop();
    } else {
      start();
    }
  });

  start();
})();
