import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Composant dédié au reset du scroll lors des changements de route
export default function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    // Force scroll to top avec délai pour attendre le rendu complet
    const forceScrollTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Immédiat
    forceScrollTop();
    
    // Via rAF (après repaint)
    requestAnimationFrame(() => {
      forceScrollTop();
    });
    
    // Avec délai court (pour les images)
    const t1 = setTimeout(forceScrollTop, 100);
    
    // Fallback final
    const t2 = setTimeout(() => {
      if (window.scrollY > 0) forceScrollTop();
    }, 300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [location.pathname]);

  return null;
}
