import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Reset visibility on route change
    setIsVisible(false);

    const threshold = 50; // lower threshold for visibility
    let lastKnownScrollY = window.scrollY;
    let ticking = false;

    const updateVisibility = () => {
      ticking = false;
      const scrollY = window.scrollY;
      // Utiliser body.scrollHeight qui est la vraie hauteur du contenu
      const docHeight = document.body.scrollHeight;
      const winHeight = window.innerHeight;
      const shouldShow = scrollY > threshold;
      
      // console.log(`[ScrollToTop] scrollY: ${scrollY}, docHeight: ${docHeight}, threshold: ${threshold}, shouldShow: ${shouldShow}`);
      
      setIsVisible(shouldShow);
    };

    const onScroll = () => {
      lastKnownScrollY = window.scrollY;
      if (!ticking) {
        requestAnimationFrame(updateVisibility);
        ticking = true;
      }
    };

    // Extra wheel fallback (some browsers may not fire scroll if no movement)
    const onWheel = () => {
      onScroll();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: true });

    // Initial check (after potential dynamic content)
    updateVisibility();
    const t1 = setTimeout(updateVisibility, 150);
    const t2 = setTimeout(updateVisibility, 500);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onWheel);
      clearTimeout(t1); clearTimeout(t2);
    };
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.button
          key="scroll-top-btn"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-full shadow-lg shadow-teal-500/40 hover:shadow-teal-500/60 transition-shadow z-[60]"
          aria-label="Retour en haut"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
