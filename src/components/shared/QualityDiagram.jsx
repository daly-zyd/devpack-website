import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QualityDiagram({ policies }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [centerNode, setCenterNode] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Calculate node positions based on container size
  useEffect(() => {
    const updateLayout = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const centerX = width / 2;
      const centerY = height / 2;

      const mobile = width < 768;
      setIsMobile(mobile);

      setCenterNode({ x: centerX, y: centerY });

      // Radial Distribution
      // Adjust radius based on device
      let radiusX, radiusY;

      if (mobile) {
        // Compact for mobile
        const minDim = Math.min(width, height);
        radiusX = minDim * 0.35;
        radiusY = minDim * 0.35;
      } else {
        // Spread out for desktop
        // Use width for X to maximize horizontal spread
        radiusX = width * 0.35;
        // Use height for Y but keep it safe
        radiusY = height * 0.38;
      }

      const newNodes = policies.map((_, i) => {
        // Distribute 5 nodes: 0, 72, 144, 216, 288 degrees
        // Offset by -90 to start at top
        const angleDeg = (i * (360 / policies.length)) - 90;
        const angleRad = (angleDeg * Math.PI) / 180;

        const x = centerX + Math.cos(angleRad) * radiusX;
        const y = centerY + Math.sin(angleRad) * radiusY;

        return { x, y, angle: angleRad };
      });

      setNodes(newNodes);

      if (canvasRef.current) {
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, [policies]);

  // Canvas Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !centerNode || nodes.length === 0) return;
    const ctx = canvas.getContext('2d');
    let animationFrame;
    let time = 0;

    // Particles
    const particles = [];
    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        pathIndex: Math.floor(Math.random() * policies.length),
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.004,
        size: 1.5 + Math.random() * 2,
        offset: Math.random() * 10 - 5 // Jitter from main path
      });
    }

    const drawConnection = (startX, startY, endX, endY, isHovered) => {
      ctx.beginPath();

      const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
      if (isHovered) {
        gradient.addColorStop(0, '#0d9488'); // Teal-600
        gradient.addColorStop(0.5, '#2563eb'); // Blue-600
        gradient.addColorStop(1, '#4f46e5'); // Indigo-600
        ctx.lineWidth = isMobile ? 2 : 3;
        ctx.shadowColor = '#0d9488';
        ctx.shadowBlur = 20;
      } else {
        gradient.addColorStop(0, '#0d948820');
        gradient.addColorStop(1, '#0d948805');
        ctx.lineWidth = 1;
        ctx.shadowBlur = 0;
      }

      ctx.strokeStyle = gradient;
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      return {
        getPoint: (t) => {
          return {
            x: startX + (endX - startX) * t,
            y: startY + (endY - startY) * t
          };
        }
      };
    };

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      const paths = nodes.map((node, i) => {
        return drawConnection(centerNode.x, centerNode.y, node.x, node.y, hoveredIndex === i);
      });

      // Draw particles
      particles.forEach(p => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          p.progress = 0;
          p.pathIndex = Math.floor(Math.random() * policies.length);
        }

        const path = paths[p.pathIndex];
        if (path) {
          const pos = path.getPoint(p.progress);

          ctx.beginPath();
          // Add some sine wave wobble
          const wobble = Math.sin(time * 10 + p.progress * 10) * 2;

          ctx.arc(pos.x + wobble, pos.y + wobble, p.size, 0, Math.PI * 2);
          ctx.fillStyle = hoveredIndex === p.pathIndex ? '#ffffff' : '#2dd4bf'; // Teal-400
          ctx.shadowColor = hoveredIndex === p.pathIndex ? '#ffffff' : '#2dd4bf';
          ctx.shadowBlur = 10;
          ctx.fill();
        }
      });

      // Draw Center Reactor Effects
      // Rotating rings
      [1, 2, 3].forEach(i => {
        ctx.save();
        ctx.translate(centerNode.x, centerNode.y);
        ctx.rotate(time * (i % 2 === 0 ? 1 : -1) * 0.5 + i);
        ctx.beginPath();
        const baseRadius = isMobile ? 40 : 60;
        ctx.arc(0, 0, baseRadius + i * (isMobile ? 10 : 15), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(45, 212, 191, ${0.1 - i * 0.02})`; // Teal
        ctx.lineWidth = 1;
        ctx.setLineDash([20, 40]); // Dashed rings
        ctx.stroke();
        ctx.restore();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, [nodes, centerNode, hoveredIndex, policies.length, isMobile]);

  return (
    <div
      ref={containerRef}
      className="relative w-full mx-auto transition-all duration-300"
      style={{
        maxWidth: '1200px',
        height: '900px', // Increased height for better spacing
        background: 'radial-gradient(circle at center, #0f172a 0%, #020617 100%)', // Slate-900 to Slate-950
        borderRadius: '32px',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(#2dd4bf 1px, transparent 1px), linear-gradient(90deg, #2dd4bf 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
        }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Center Reactor Node */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            boxShadow: [
              '0 0 40px rgba(45,212,191,0.3)',
              '0 0 80px rgba(37,99,235,0.6)',
              '0 0 40px rgba(45,212,191,0.3)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative rounded-full flex items-center justify-center border border-teal-500/30 z-20 bg-slate-900"
          style={{
            width: 'clamp(80px, 15vw, 128px)',
            height: 'clamp(80px, 15vw, 128px)'
          }}
        >
          {/* Inner spinning core */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 border-2 border-dashed border-teal-500/30 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 border border-blue-500/50 rounded-full"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-transparent rounded-full blur-xl" />

          <div className="relative flex flex-col items-center justify-center">
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-br from-teal-200 to-blue-500 drop-shadow-sm" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Q</span>
            <span className="text-teal-500/80 tracking-[0.2em] uppercase mt-1" style={{ fontSize: 'clamp(8px, 1.5vw, 10px)' }}>Qualité</span>
          </div>
        </motion.div>
      </div>

      {/* Policy Nodes */}
      {nodes.map((pos, index) => {
        const policy = policies[index];
        const isHovered = hoveredIndex === index;

        return (
          <motion.div
            key={index}
            className="absolute z-30"
            style={{
              left: pos.x,
              top: pos.y,
              x: '-50%',
              y: '-50%'
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <motion.div
              whileHover={{ scale: 1.1, rotateX: 10, rotateY: 10, z: 50 }}
              style={{ perspective: 1000 }}
              className="relative group"
            >
              {/* Glow effect on hover */}
              <div
                className={`absolute inset-0 bg-teal-500/30 blur-xl rounded-2xl transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              />

              <div
                className={`
                  relative flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-5 rounded-2xl backdrop-blur-xl border transition-all duration-300 cursor-pointer
                  ${isHovered
                    ? 'bg-slate-800/90 border-teal-400/60 shadow-2xl'
                    : 'bg-slate-900/60 border-white/10 hover:border-white/20'
                  }
                `}
                style={{
                  width: 'clamp(140px, 20vw, 220px)',
                  minHeight: 'clamp(100px, 15vh, 140px)'
                }}
              >
                <div className={`
                  p-2 sm:p-3 rounded-xl transition-all duration-500
                  ${isHovered ? 'bg-gradient-to-br from-teal-500 to-blue-600 text-white scale-110 rotate-3' : 'bg-white/5 text-gray-400'}
                `}>
                  <policy.icon className="w-5 h-5 sm:w-7 sm:h-7" />
                </div>

                <div className="text-center w-full">
                  <h3 className={`font-bold mb-1 sm:mb-2 transition-colors truncate w-full ${isHovered ? 'text-white' : 'text-gray-200'}`} style={{ fontSize: 'clamp(0.75rem, 1.5vw, 1rem)' }}>
                    {policy.title}
                  </h3>
                  <p className={`leading-relaxed transition-colors line-clamp-2 sm:line-clamp-3 ${isHovered ? 'text-gray-200' : 'text-gray-500'}`} style={{ fontSize: 'clamp(0.65rem, 1.2vw, 0.75rem)' }}>
                    {policy.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
