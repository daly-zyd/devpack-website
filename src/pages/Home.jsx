
import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, Shield, Leaf, TrendingUp, Download, CheckCircle, Package, ZoomIn, X } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import ImageGallery from '../components/layout/ImageGallery';
import ReferencesCarousel from '../components/layout/ReferencesCarousel';

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const statsData = [
    { label: t.home.boucherie, value: 350, suffix: '+' },
    { label: t.home.primeur, value: 200, suffix: '+' },
    { label: t.home.bio, value: 150, suffix: '+' },
    { label: t.home.oeufs, value: 500, suffix: 'k+' },
  ];

  const advantages = [
    {
      title: t.home.ecoresponsable,
      description: t.home.ecoresponsableDesc,
      icon: Leaf,
    },
    {
      title: t.home.densite,
      description: t.home.densiteDesc,
      icon: TrendingUp,
    },
    {
      title: t.home.monomateriau,
      description: t.home.monomateriaDesc,
      icon: Shield,
    },
  ];

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const closeModalBtnRef = useRef(null);
  const modalRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const navigate = useNavigate();

  useEffect(() => {
    const modalOpen = !!(selectedProduct || selectedCategory);
    let previousActive = null;
    if (modalOpen) {
      previousActive = document.activeElement;
      if (closeModalBtnRef.current) closeModalBtnRef.current.focus();
    }

    const onKey = (e) => {
      if (!modalOpen) return;
      if (e.key === 'Escape') {
        setSelectedProduct(null);
        setSelectedCategory(null);
        return;
      }

      // Focus trap: handle Tab
      if (e.key === 'Tab') {
        const container = modalRef.current;
        if (!container) return;
        const focusable = Array.from(
          container.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])')
        ).filter((el) => el.offsetParent !== null);
        if (focusable.length === 0) return;
        const idx = focusable.indexOf(document.activeElement);
        if (e.shiftKey) {
          const next = idx <= 0 ? focusable.length - 1 : idx - 1;
          focusable[next].focus();
          e.preventDefault();
        } else {
          const next = idx === -1 || idx === focusable.length - 1 ? 0 : idx + 1;
          focusable[next].focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      if (previousActive && previousActive.focus) previousActive.focus();
    };
  }, [selectedProduct, selectedCategory]);

  const products = [
    {
      title: t.home.boxOeufs,
      description: t.home.boxOeufsDesc,
      gradient: 'from-teal-500 to-blue-600',
      image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800&h=600&fit=crop',
      icon: Package,
    },
    {
      title: t.home.barquettes,
      description: t.home.barquettesDesc,
      gradient: 'from-blue-600 to-blue-700',
      image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800&h=600&fit=crop',
      icon: Package,
    },
  ];

  const categories = [
    {
      key: 'sealed',
      image: '/devpack-website/images/categories/containers-sealed.jpg',
      title: t.home.categoriesList.sealed.title,
      description: t.home.categoriesList.sealed.description,
    },
    {
      key: 'sealedPp',
      image: '/devpack-website/images/categories/pp-sealed.jpg',
      title: t.home.categoriesList.sealedPp.title,
      description: t.home.categoriesList.sealedPp.description,
    },
    {
      key: 'shale',
      image: '/devpack-website/images/categories/shale-containers.jpg',
      title: t.home.categoriesList.shale.title,
      description: t.home.categoriesList.shale.description,
    },
    {
      key: 'salad',
      image: '/devpack-website/images/categories/salad-containers.jpg',
      title: t.home.categoriesList.salad.title,
      description: t.home.categoriesList.salad.description,
    },
    {
      key: 'sushi',
      image: '/devpack-website/images/categories/sushi-containers.jpg',
      title: t.home.categoriesList.sushi.title,
      description: t.home.categoriesList.sushi.description,
    },
    {
      key: 'sauce',
      image: '/devpack-website/images/categories/sauce-containers.jpg',
      title: t.home.categoriesList.sauce.title,
      description: t.home.categoriesList.sauce.description,
    },
    {
      key: 'pastry',
      image: '/devpack-website/images/categories/pastry-containers.jpg',
      title: t.home.categoriesList.pastry.title,
      description: t.home.categoriesList.pastry.description,
    },
    {
      key: 'icecream',
      image: '/devpack-website/images/categories/icecream-containers.jpg',
      title: t.home.categoriesList.icecream.title,
      description: t.home.categoriesList.icecream.description,
    },
    {
      key: 'eggs',
      image: '/devpack-website/images/categories/egg-containers.jpg',
      title: t.home.categoriesList.eggs.title,
      description: t.home.categoriesList.eggs.description,
    },
  ];
  
  return (
    <div className="w-full bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <motion.section ref={heroRef} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/20 to-white dark:from-slate-950 dark:via-blue-950/20 dark:to-slate-950"></div>

        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,155,149,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        {/* Optional Lottie animation (place hero.json in public/animations/hero.json) */}
        {/* HeroLottie removed — kept empty decorative layer for future use */}
        <div className="absolute inset-0 pointer-events-none opacity-60" />

        <motion.div
          style={{ y, opacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-500/10 to-blue-600/10 rounded-full border border-teal-500/30"
            >
              <span className="text-teal-400 text-sm font-medium">✦ {t.home.productsTitle}</span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="block text-gray-900 dark:text-white mb-2 sm:mb-4 animate-text-glow">{t.home.heroTitle.split(' ').slice(0, -1).join(' ')}</span>
              <span className="block bg-gradient-to-r from-teal-400 via-blue-500 to-blue-700 bg-clip-text text-transparent pb-2 sm:pb-4">
                {t.home.heroTitle.split(' ').slice(-1).join(' ')}
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              {t.home.heroSubtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/products')}
                className="group relative px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-xl shadow-2xl shadow-teal-500/30 hover:shadow-teal-500/50 transition-shadow overflow-hidden btn-glow animate-glow-pulse"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>{t.home.heroCta}</span>
                  <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.button>

              <motion.button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/pdfs/Brochure DevPack.pdf';
                  link.download = 'Brochure DevPack.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gray-200 dark:bg-slate-900/50 backdrop-blur-sm text-gray-900 dark:text-white font-semibold rounded-xl border border-gray-300 dark:border-teal-500/30 hover:border-gray-400 dark:hover:border-teal-500/50 transition-colors flex items-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>{t.home.downloadBrochure}</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-6 h-10 border-2 border-teal-400/50 rounded-full flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-2 bg-teal-400 rounded-full"></motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Category Image Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedCategory(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={prefersReducedMotion ? { duration: 0.12 } : { type: 'spring', damping: 25 }}
              className="relative max-w-4xl w-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCategory(null)}
                ref={closeModalBtnRef}
                aria-label="Fermer la modale"
                className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-slate-800/90 rounded-full hover:bg-white dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-6 h-6 text-gray-900 dark:text-white" />
              </button>

              <div className="relative h-96 bg-gray-100 dark:bg-slate-800">
                {selectedCategory.image && (
                  <img src={selectedCategory.image} alt={selectedCategory.title} loading="lazy" className="w-full h-full object-cover" />
                )}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent`}></div>
              </div>

              <div className="p-6 sm:p-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">{selectedCategory.title}</h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">{selectedCategory.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products Section */}
      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative py-32 bg-gradient-to-b from-white to-gray-50 dark:from-slate-950 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-20"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 animate-text-glow">
              {t.home.productsSection} <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">{t.home.packagingHeading}</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t.home.productsParagraph}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative rounded-2xl bg-gray-100 dark:bg-slate-900/50 backdrop-blur-sm border border-gray-200 dark:border-teal-500/20 hover:border-gray-300 dark:hover:border-teal-500/40 transition-all duration-300 overflow-hidden card-3d animate-float"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>

                {/* Image Container */}
                <div className="relative h-48 sm:h-56 md:h-72 overflow-hidden">
                  <motion.img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {/* Overlay on Hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center"
                  >
                    <motion.button
                      onClick={() => setSelectedProduct(product)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-4 bg-white/90 dark:bg-slate-900/90 rounded-full backdrop-blur-sm shadow-2xl"
                    >
                      <ZoomIn className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                    </motion.button>
                  </motion.div>

                  {/* Gradient Badge */}
                  <div className="absolute top-4 left-4">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${product.gradient} shadow-lg`}>
                      <product.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-5 sm:p-6 md:p-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">{product.title}</h3>
                  
                  {/* Description - Visible on hover */}
                  {/* <div className="overflow-hidden">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{product.description}</p>
                  </div> */}

                  {/* <button className="flex items-center space-x-2 text-teal-600 dark:text-teal-400 font-semibold group-hover:translate-x-2 transition-transform">
                    <span>{t.home.learnMore}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button> */}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Modal for Image Zoom */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedProduct(null)}
              role="dialog"
              aria-modal="true"
            >
              <motion.div
                ref={modalRef}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={prefersReducedMotion ? { duration: 0.12 } : { type: "spring", damping: 25 }}
                className="relative max-w-4xl w-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                      onClick={() => setSelectedProduct(null)}
                      ref={closeModalBtnRef}
                      aria-label="Fermer la modale"
                      className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-slate-800/90 rounded-full hover:bg-white dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-900 dark:text-white" />
                </button>

                {/* Image */}
                <div className="relative h-96 bg-gray-100 dark:bg-slate-800">
                  {selectedProduct.image && (
                    <img src={selectedProduct.image} alt={selectedProduct.title} loading="lazy" className="w-full h-full object-cover" />
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent`}></div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${selectedProduct.gradient}`}>
                      <selectedProduct.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{selectedProduct.title}</h3>
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">{selectedProduct.description}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* Stats Section */}
      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative py-16 sm:py-24 md:py-32 bg-gray-50 dark:bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,155,149,0.1),transparent_50%)]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-6 animate-text-glow">
              {t.home.statsSection} <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">{t.home.statsKeyHeading}</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {statsData.map((stat, index) => (
              <StatCard key={index} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Categories Section */}
      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative py-32 bg-gradient-to-b from-white to-gray-50 dark:from-slate-950 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-20 space-y-3 sm:space-y-4"
          >
            <motion.span
              className="inline-flex items-center px-4 py-1 rounded-full text-xs sm:text-sm font-semibold text-teal-500 bg-teal-500/10 border border-teal-500/20"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              {t.home.collectionLabel}
            </motion.span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white animate-text-glow">
              {t.home.categoriesTitle}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {t.home.categoriesSubtitle}
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative p-6 rounded-2xl bg-gray-100 dark:bg-slate-900/60 backdrop-blur-sm border border-gray-200 dark:border-teal-500/20 hover:border-gray-300 dark:hover:border-teal-500/40 transition-all duration-300 overflow-hidden card-3d animate-float"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-blue-500/10 to-blue-700/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="relative z-10 space-y-5">
                  <div className="overflow-hidden rounded-2xl border border-white/40 dark:border-white/10 shadow-lg shadow-slate-900/20 relative">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="h-40 sm:h-44 md:h-48 w-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    <button
                      onClick={() => setSelectedCategory(category)}
                      aria-label={`Zoom ${category.title}`}
                      className="absolute inset-0 flex items-center justify-center p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <div className="p-3 bg-white/90 dark:bg-slate-800/90 rounded-full shadow-2xl">
                        <ZoomIn className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                      </div>
                    </button>
                  </div>
                  
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/80 dark:bg-slate-900/70 text-teal-600 dark:text-teal-300 border border-teal-500/20 mb-3 sm:mb-4">
                      <Package className="w-3 sm:w-4 h-3 sm:h-4" />
                      <span>{t.home.packagingHeading}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">{category.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{category.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Advantages Section */}
      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative py-20 sm:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-20"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 animate-text-glow">
              {t.home.whyChoose} <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">DevPack</span> ?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.05 }}
                className="relative p-6 sm:p-8 rounded-2xl bg-gray-100 dark:bg-gradient-to-br dark:from-slate-900/80 dark:to-slate-800/80 backdrop-blur-sm border border-gray-200 dark:border-teal-500/20 hover:border-gray-300 dark:hover:border-teal-500/40 transition-all card-3d animate-float"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-600/5 rounded-2xl"></div>

                <div className="relative z-10">
                  <div className="inline-flex p-3 sm:p-4 rounded-xl bg-gradient-to-br from-teal-500/10 to-blue-600/10 mb-4 sm:mb-6">
                    <advantage.icon className="w-7 sm:w-8 h-7 sm:h-8 text-teal-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">{advantage.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">{advantage.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-100 to-gray-50 dark:from-slate-900/80 dark:to-slate-800/80 backdrop-blur-sm border border-gray-200 dark:border-teal-500/20 rounded-2xl p-6 sm:p-8 animate-glow-pulse card-3d"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">{t.home.extraBenefits}</h3>
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                t.home.benefit1,
                t.home.benefit2,
                t.home.benefit3,
                t.home.benefit4,
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative py-32 bg-white dark:bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,155,149,0.1),transparent_70%)]"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white animate-text-glow">
              {t.home.readyRevolutionize} <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">{t.home.packagingHeading}</span> ?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t.home.readyText}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/contact')}
              className="inline-flex items-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-xl shadow-2xl shadow-teal-500/30 hover:shadow-teal-500/50 transition-shadow btn-glow animate-glow-pulse"
            >
              <span>{t.home.contactUs}</span>
              <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
      
      {/* References / Références Section */}
      <ReferencesCarousel />
    </div>
  );
}
function StatCard({ stat, index }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = stat.value / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= stat.value) {
              setCount(stat.value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [stat.value, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative p-4 sm:p-5 md:p-6 lg:p-8 rounded-2xl bg-gray-100 dark:bg-slate-900/50 backdrop-blur-sm border border-gray-200 dark:border-teal-500/20 hover:border-gray-300 dark:hover:border-teal-500/40 transition-all group animate-glow-pulse card-3d"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

      <div className="relative z-10 text-center">
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-2 sm:mb-3 leading-tight">
          {count}{stat.suffix}
        </div>
        <div className="text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-400 font-medium line-clamp-2">{stat.label}</div>
      </div>
    </motion.div>
  );
}