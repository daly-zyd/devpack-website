import { useEffect, useRef } from 'react';

export default function Background3D() {
  const ref = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const loadScript = (src) =>
      new Promise((resolve) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const s = document.createElement('script');
        s.src = src;
        s.async = true;
        s.onload = resolve;
        document.head.appendChild(s);
      });

    Promise.all([
      loadScript('https://unpkg.com/three@0.152.2/build/three.min.js'),
      loadScript('https://unpkg.com/vanta@0.5.24/dist/vanta.net.min.js'),
    ])
      .then(() => {
        if (!mounted) return;
        const VANTA = window.VANTA || window.vanta;
        const VANTA_NET = VANTA && (VANTA.NET || VANTA.net);
        if (VANTA_NET && ref.current) {
          try {
            instanceRef.current = VANTA_NET({
              el: ref.current,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.0,
              minWidth: 200.0,
              scale: 1.0,
              scaleMobile: 1.0,
              color: 0x0fbf95,
              backgroundColor: 0x000000,
              points: 12.0,
              maxDistance: 20.0,
            });
            // Make background transparent by clearing canvas alpha
            if (ref.current && ref.current.canvas) {
              ref.current.canvas.style.backgroundColor = 'transparent';
            }
          } catch (e) {
            // fail silently
            // console.error('Vanta init error', e);
          }
        }
      })
      .catch(() => {});

    return () => {
      mounted = false;
      if (instanceRef.current && instanceRef.current.destroy) {
        try {
          instanceRef.current.destroy();
        } catch (e) {
          // ignore
        }
        instanceRef.current = null;
      }
    };
  }, []);

  // Use a fixed full-viewport element so the Vanta canvas covers the whole window
  // and cannot be clipped by parent containers or layout changes.
  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -25, width: '100vw', height: '100vh' }}
    />
  );
}
