import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
import useAutoCarousel from '../../hooks/useAutoCarousel';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../i18n/translations';

const images = Array.from({ length: 14 }, (_, i) => `./images/refs/${i + 1}.png`);

export default function ReferencesCarousel() {
  const { index, setIndex, isPaused, setIsPaused, prev, next, prefersReducedMotion } = useAutoCarousel(images.length, { delay: 4000 });
  const containerRef = useRef(null);
  const motionDuration = prefersReducedMotion ? 0 : 0.8;
  const { language } = useLanguage();
  const t = translations[language];
  const titleParts = (t.home.referencesTitle || 'Nos Références').split(' ');
  const titleFirst = titleParts.length > 1 ? titleParts.slice(0, -1).join(' ') : titleParts[0];
  const titleLast = titleParts.slice(-1).join(' ');

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const [direction, setDirection] = useState(0);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    if (newDirection > 0) next();
    else prev();
  };

  return (
    <section
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative py-20 sm:py-28 md:py-32 bg-gradient-to-b from-white via-gray-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-500/10 to-blue-600/10 rounded-full border border-teal-500/20 mb-6"
          >
            <span className="text-teal-400 text-sm font-medium">✦ Nos partenaires</span>
          </motion.div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 animate-text-glow">
            <span className="block mb-2">{titleFirst}</span>
            <span className="block bg-gradient-to-r from-teal-400 via-blue-500 to-blue-700 bg-clip-text text-transparent">{titleLast}</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4">
            Découvrez les marques et entreprises qui nous font confiance pour leurs solutions d'emballage innovantes.
          </p>
        </motion.div>

        {/* Main Carousel Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16"
        >
          {/* Main Image Display */}
          <div className="flex-1 w-full relative group">
            <div className="relative">
              {/* Glow effect background */}
              <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Main image container */}
              <div className="relative w-full h-48 sm:h-56 md:h-72 lg:h-80 xl:h-96 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-white/80 to-gray-100/80 dark:from-slate-800/80 dark:to-slate-900/80 border border-white/20 dark:border-slate-700/20 backdrop-blur-sm">
                {/* Image Carousel with smooth transitions */}
                <AnimatePresence initial={false} mode="wait" custom={direction}>
                  <motion.div
                    key={index}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: motionDuration },
                    }}
                    className="absolute inset-0 w-full h-full flex items-center justify-center p-6 sm:p-8"
                  >
                    <img
                      src={images[index]}
                      alt={`Référence ${index + 1}`}
                      loading="lazy"
                      className="max-w-full max-h-full object-contain drop-shadow-lg"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <motion.button
                  whileHover={{ scale: 1.15, backgroundColor: 'rgba(15, 155, 149, 0.9)' }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Précédent"
                  onClick={() => paginate(-1)}
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                >
                  <ArrowLeft className="w-5 sm:w-6 h-5 sm:h-6 text-gray-800 dark:text-white group-hover/btn:text-white transition-colors" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.15, backgroundColor: 'rgba(15, 155, 149, 0.9)' }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Suivant"
                  onClick={() => paginate(1)}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                >
                  <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6 text-gray-800 dark:text-white group-hover/btn:text-white transition-colors" />
                </motion.button>

                {/* Counter Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-4 right-4 z-20 bg-gradient-to-r from-teal-500 to-blue-600 text-white px-4 py-2 rounded-full shadow-lg backdrop-blur-sm border border-white/20"
                >
                  <span className="font-semibold text-sm">{index + 1}/{images.length}</span>
                </motion.div>
              </div>
            </div>

            {/* Dot Indicators - Bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-2 mt-6 sm:mt-8"
            >
              {images.map((_, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  aria-label={`Aller à la référence ${i + 1}`}
                  aria-current={i === index}
                  className={`transition-all duration-300 rounded-full ${
                    i === index
                      ? 'w-8 h-2 bg-gradient-to-r from-teal-400 to-blue-500 shadow-lg'
                      : 'w-2 h-2 bg-gray-300 dark:bg-slate-600 hover:bg-gray-400 dark:hover:bg-slate-500'
                  }`}
                />
              ))}
            </motion.div>
          </div>

          {/* Thumbnails Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full lg:w-96 xl:w-[420px]"
          >
            <div className="bg-gradient-to-br from-white/50 to-gray-100/50 dark:from-slate-900/50 dark:to-slate-800/50 backdrop-blur-md rounded-2xl border border-white/20 dark:border-slate-700/20 p-4 sm:p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-1 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full" />
                Galerie
              </h3>

              <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-5 gap-2 sm:gap-3 max-h-96 overflow-y-auto pb-2 scrollbar-thin scrollbar-thumb-teal-400 scrollbar-track-gray-200 dark:scrollbar-track-slate-700">
                {images.map((src, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    aria-label={`Miniature ${i + 1}`}
                    aria-pressed={i === index}
                    className={`relative rounded-lg overflow-hidden border-2 transition-all duration-300 transform group ${
                      i === index
                        ? 'ring-2 ring-offset-2 ring-teal-400 dark:ring-offset-slate-900 shadow-lg scale-105'
                        : 'border-gray-200 dark:border-slate-700 hover:border-teal-400 dark:hover:border-teal-400 shadow-sm'
                    }`}
                  >
                    <img
                      src={src}
                      alt={`Référence ${i + 1}`}
                      loading="lazy"
                      className="w-full h-16 sm:h-20 object-contain bg-white dark:bg-slate-800 p-1.5 sm:p-2 group-hover:scale-110 transition-transform duration-300"
                    />
                    {i === index && (
                      <motion.div
                        layoutId="selected-thumb"
                        className="absolute inset-0 bg-gradient-to-t from-teal-500/20 to-transparent rounded-lg"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center mt-12 sm:mt-16"
        >
          <ChevronDown className="w-6 h-6 text-teal-400 opacity-60" />
        </motion.div>
      </div>
    </section>
  );
}
