import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      console.log('Canvas size:', canvas.width, 'x', canvas.height);
    };
    setCanvasSize();

    // Particules lumineuses
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 3;
        this.speedX = (Math.random() - 0.5) * 3;
        this.speedY = (Math.random() - 0.5) * 3;
        this.opacity = Math.random() * 0.3 + 0.7;
        this.color = ['#0f9b95', '#3b82f6', '#8b5cf6'][Math.floor(Math.random() * 3)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 40;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Vagues animées
    class Wave {
      constructor(y, amplitude, frequency, speed, color) {
        this.y = y;
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.speed = speed;
        this.color = color;
        this.offset = 0;
      }

      update() {
        this.offset += this.speed;
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        for (let x = 0; x < canvas.width; x++) {
          const y = this.y + Math.sin((x * this.frequency) + this.offset) * this.amplitude;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, this.y - this.amplitude, 0, canvas.height);
        gradient.addColorStop(0, this.color + '60');
        gradient.addColorStop(1, this.color + 'DD');
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();
      }
    }

    // Orbes flottants avec glow
    class Orb {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 120 + 80;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.color = ['#0f9b95', '#3b82f6', '#8b5cf6'][Math.floor(Math.random() * 3)];
        this.opacity = Math.random() * 0.4 + 0.3;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < -this.radius) this.x = canvas.width + this.radius;
        if (this.x > canvas.width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = canvas.height + this.radius;
        if (this.y > canvas.height + this.radius) this.y = -this.radius;
      }

      draw() {
        ctx.save();
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, this.color + Math.floor(this.opacity * 255).toString(16).padStart(2, '0'));
        gradient.addColorStop(1, this.color + '00');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Initialisation
    const particles = Array.from({ length: 100 }, () => new Particle());
    const waves = [
      new Wave(canvas.height * 0.7, 30, 0.01, 0.02, '#0f9b95'),
      new Wave(canvas.height * 0.75, 25, 0.015, 0.025, '#3b82f6'),
      new Wave(canvas.height * 0.8, 20, 0.02, 0.03, '#8b5cf6'),
    ];
    const orbs = Array.from({ length: 8 }, () => new Orb());

    // Animation
    let time = 0;
    const animate = () => {
      time += 0.01;

      // Gradient de fond animé
      const gradient = ctx.createLinearGradient(
        0, 
        0, 
        canvas.width, 
        canvas.height
      );
      gradient.addColorStop(0, `rgba(15, 155, 149, ${0.15 + Math.sin(time) * 0.08})`);
      gradient.addColorStop(0.5, `rgba(59, 130, 246, ${0.15 + Math.cos(time) * 0.08})`);
      gradient.addColorStop(1, `rgba(139, 92, 246, ${0.15 + Math.sin(time + 1) * 0.08})`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dessiner les orbes
      orbs.forEach(orb => {
        orb.update();
        orb.draw();
      });

      // Dessiner les vagues
      waves.forEach(wave => {
        wave.update();
        wave.draw();
      });

      // Dessiner les particules
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -40,
      }}
    />
  );
}
