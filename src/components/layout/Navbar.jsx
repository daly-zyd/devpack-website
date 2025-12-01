import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../i18n/translations';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isMobileLanguageMenuOpen, setIsMobileLanguageMenuOpen] = useState(false);
  const location = useLocation();
  const { isDark, toggleTheme, mounted } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  const languages = [
    { code: 'fr', label: 'Français', short: 'FR', flagSrc: './images/flags/fr.png' },
    { code: 'en', label: 'English', short: 'EN', flagSrc: './images/flags/en.png' },
    { code: 'ar', label: 'العربية', short: 'AR', flagSrc: './images/flags/tn.png' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsMobileLanguageMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      setIsMobileLanguageMenuOpen(false);
    }
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: t.navbar.accueil, path: '/' },
    { name: t.navbar.apropos, path: '/about' },
    { name: t.navbar.produits, path: '/products' },
    { name: t.navbar.contact, path: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white dark:bg-slate-900/95 backdrop-blur-lg shadow-2xl dark:shadow-teal-500/10'
          : 'bg-white/50 dark:bg-slate-900/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center group">
            <img
              src="/Logo_DevPack.png"
              alt="DevPack Logo"
              className={`h-14 w-auto hover:drop-shadow-lg transition-all duration-300 rounded-lg p-1 ${
                isDark ? 'bg-slate-800' : ''
              }`}
            />
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative px-4 py-2 group"
              >
                <span
                  className={`relative z-10 font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'text-teal-400'
                      : 'text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white'
                  }`}
                >
                  {item.name}
                </span>
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-blue-600/20 rounded-lg border border-teal-500/30"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              title={isDark ? t.navbar.lightMode : t.navbar.darkMode}
            >
              {mounted && (isDark ? <Sun size={20} /> : <Moon size={20} />)}
            </motion.button>

            <div className="relative">
              <motion.button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                title={t.navbar.changeLanguage}
              >
                <Globe size={20} />
              </motion.button>

              <AnimatePresence>
                {isLanguageMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg shadow-xl z-50"
                  >
                    {languageOptions.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          toggleLanguage(lang.code);
                          setIsLanguageMenuOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-3 ${
                          language === lang.code
                            ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 font-semibold'
                            : 'text-gray-800 dark:text-gray-200'
                        }`}
                      >
                        <img
                          src={lang.flagSrc}
                          alt={lang.label}
                          className="w-8 h-6 rounded-sm object-cover shadow-sm"
                          loading="lazy"
                        />
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
              className="relative px-6 py-2.5 overflow-hidden rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-shadow"
            >
              <span className="relative z-10">{t.navbar.brochure}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-0 hover:opacity-100 transition-opacity"></div>
            </motion.button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center gap-2 text-gray-800 dark:text-white p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <motion.div
              key="mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsMobileLanguageMenuOpen(false);
              }}
            ></motion.div>
            <motion.div
              key="mobile-panel"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute top-20 left-0 right-0 bg-white dark:bg-slate-950/95 backdrop-blur-xl border-t border-gray-200 dark:border-teal-500/20 shadow-2xl"
            >
              <div className="px-4 py-6 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-800">
                  <motion.button
                    onClick={toggleTheme}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2.5 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                    title={isDark ? t.navbar.lightMode : t.navbar.darkMode}
                  >
                    {mounted && (isDark ? <Sun size={20} /> : <Moon size={20} />)}
                  </motion.button>
                  <div className="relative">
                    <motion.button
                      onClick={() => setIsMobileLanguageMenuOpen((prev) => !prev)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2.5 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                      title={t.navbar.changeLanguage}
                    >
                      <Globe size={20} />
                    </motion.button>
                    <AnimatePresence>
                      {isMobileLanguageMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg shadow-xl z-50"
                        >
                          {languageOptions.map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => {
                                toggleLanguage(lang.code);
                                setIsMobileLanguageMenuOpen(false);
                                setIsMobileMenuOpen(false);
                              }}
                              className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-3 ${
                                language === lang.code
                                  ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 font-semibold'
                                  : 'text-gray-800 dark:text-gray-200'
                              }`}
                            >
                              <img
                                src={lang.flagSrc}
                                alt={lang.label}
                                className="w-8 h-6 rounded-sm object-cover shadow-sm"
                                loading="lazy"
                              />
                              <span>{lang.label}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsMobileLanguageMenuOpen(false);
                    }}
                    className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                      location.pathname === item.path
                        ? 'bg-gradient-to-r from-teal-500/20 to-blue-600/20 text-teal-600 dark:text-teal-400 border border-teal-500/30'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800/70'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/pdfs/Brochure DevPack.pdf';
                    link.download = 'Brochure DevPack.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="w-full px-4 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg shadow-teal-500/30"
                >
                  {t.navbar.brochure}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
