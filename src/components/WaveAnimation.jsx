import { useEffect, useRef } from 'react';
import './WaveAnimation.css';

const WaveAnimation = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const bubblesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, speedX: 0, speedY: 0 });

  // Wave settings
  const DENSITY = 0.75;
  const FRICTION = 1.14;
  const MOUSE_PULL = 0.09;
  const AOE = 200;
  const WATER_DENSITY = 2.07;
  const AIR_DENSITY = 1.02;
  const MAX_BUBBLES = 60;
  const TWITCH_INTERVAL = 1000;
  const BUBBLE_INTERVAL = 400;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext('2d');
    let width = container.clientWidth;
    let height = container.clientHeight;
    const DETAIL = Math.round(width / 60);

    canvas.width = width;
    canvas.height = height;

    // Initialize particles
    particlesRef.current = [];
    for (let i = 0; i < DETAIL + 1; i++) {
      particlesRef.current.push({
        x: (width / (DETAIL - 4)) * (i - 2),
        y: height * 0.5,
        original: { x: 0, y: height * 0.5 },
        velocity: { x: 0, y: Math.random() * 3 },
        force: { x: 0, y: 0 },
        mass: 10,
      });
    }

    // Helper functions
    const distanceBetween = (p1, p2) => {
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const insertImpulse = (positionX, forceY) => {
      const index = Math.round((positionX / width) * particlesRef.current.length);
      const particle = particlesRef.current[index];
      if (particle) {
        particle.force.y += forceY;
      }
    };

    const createBubble = () => {
      if (bubblesRef.current.length > MAX_BUBBLES) {
        bubblesRef.current.shift();
      }

      const minSize = 15;
      const maxSize = 30;
      const size = minSize + Math.random() * (maxSize - minSize);
      const catapult = 30;

      bubblesRef.current.push({
        x: maxSize + Math.random() * (width - maxSize),
        y: height - maxSize,
        velocity: { x: Math.random() * catapult - catapult / 2, y: 0 },
        size: size,
        mass: size / maxSize + 1,
      });
    };

    const getClosestParticle = (point) => {
      let closestIndex = 0;
      let closestDistance = 1000;

      particlesRef.current.forEach((particle, i) => {
        const thisDistance = distanceBetween(particle, point);
        if (thisDistance < closestDistance) {
          closestDistance = thisDistance;
          closestIndex = i;
        }
      });

      return particlesRef.current[closestIndex];
    };

    // Animation loop
    const animate = () => {
      const particles = particlesRef.current;
      const bubbles = bubblesRef.current;
      const mouse = mouseRef.current;

      // Create gradient
      const gradientFill = context.createLinearGradient(width * 0.5, height * 0.2, width * 0.5, height);
      gradientFill.addColorStop(0, '#00AABB');
      gradientFill.addColorStop(1, 'rgba(0,200,250,0)');

      context.clearRect(0, 0, width, height);
      context.fillStyle = gradientFill;
      context.beginPath();
      context.moveTo(particles[0].x, particles[0].y);

      // Update wave particles
      for (let i = 0; i < particles.length; i++) {
        const current = particles[i];
        const previous = particles[i - 1];
        const next = particles[i + 1];

        if (previous && next) {
          let forceY = 0;
          forceY += -DENSITY * (previous.y - current.y);
          forceY += DENSITY * (current.y - next.y);
          forceY += (DENSITY / 15) * (current.y - current.original.y);

          current.velocity.y += -(forceY / current.mass) + current.force.y;
          current.velocity.y /= FRICTION;
          current.force.y /= FRICTION;
          current.y += current.velocity.y;

          const distance = distanceBetween(mouse, current);
          if (distance < AOE) {
            const origDistance = distanceBetween(mouse, current.original);
            mouse.speedX *= 0.98;
            mouse.speedY *= 0.98;
            current.force.y += MOUSE_PULL * (1 - origDistance / AOE) * mouse.speedY;
          }

          context.quadraticCurveTo(
            previous.x,
            previous.y,
            previous.x + (current.x - previous.x) / 2,
            previous.y + (current.y - previous.y) / 2
          );
        }
      }

      context.lineTo(particles[particles.length - 1].x, particles[particles.length - 1].y);
      context.lineTo(width, height);
      context.lineTo(0, height);
      context.lineTo(particles[0].x, particles[0].y);
      context.fill();

      // Update bubbles
      context.fillStyle = 'rgba(255,255,255,0.7)';
      context.beginPath();

      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        const p = getClosestParticle(b);

        b.velocity.y /= b.y > p.y ? WATER_DENSITY : AIR_DENSITY;
        b.velocity.y += p.y > b.y ? 1 / b.mass : -((b.y - p.y) * 0.01) / b.mass;
        b.y += b.velocity.y;

        if (b.x > width - b.size) b.velocity.x = -b.velocity.x;
        if (b.x < b.size) b.velocity.x = Math.abs(b.velocity.x);

        b.velocity.x /= 1.04;
        b.x += b.velocity.x;

        // Remove bubbles that float too high
        if (b.y < -b.size * 2) {
          bubbles.splice(i, 1);
          continue;
        }

        context.moveTo(b.x, b.y);
        context.arc(b.x, b.y, b.size, 0, Math.PI * 2, true);
      }

      context.fill();
      animationRef.current = requestAnimationFrame(animate);
    };

    // Mouse events
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const newX = e.clientX - rect.left;
      const newY = e.clientY - rect.top;

      mouseRef.current.speedX = Math.max(Math.min(newX - mouseRef.current.x, 40), -40);
      mouseRef.current.speedY = Math.max(Math.min(newY - mouseRef.current.y, 40), -40);
      mouseRef.current.x = newX;
      mouseRef.current.y = newY;
    };

    // Resize handler
    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;

      const DETAIL = Math.round(width / 60);
      particlesRef.current = [];
      for (let i = 0; i < DETAIL + 1; i++) {
        particlesRef.current.push({
          x: (width / (DETAIL - 4)) * (i - 2),
          y: height * 0.5,
          original: { x: (width / (DETAIL - 4)) * (i - 2), y: height * 0.5 },
          velocity: { x: 0, y: Math.random() * 3 },
          force: { x: 0, y: 0 },
          mass: 10,
        });
      }
    };

    // Set up intervals
    const twitchInterval = setInterval(() => {
      const forceRange = 4;
      insertImpulse(Math.random() * width, Math.random() * (forceRange * 2) - forceRange);
    }, TWITCH_INTERVAL);

    const bubbleInterval = setInterval(createBubble, BUBBLE_INTERVAL);

    // Add event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Start animation
    animate();
    createBubble();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current);
      clearInterval(twitchInterval);
      clearInterval(bubbleInterval);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} id="WaveContainer" className="wave-container">
      <canvas ref={canvasRef} id="world"></canvas>
    </div>
  );
};

export default WaveAnimation;
