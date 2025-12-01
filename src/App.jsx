import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import FloatingParticles from './components/shared/FloatingParticles';
import AnimatedBackground from './components/shared/AnimatedBackground';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/shared/ScrollToTop';
import ScrollManager from './components/shared/ScrollManager';
import BackgroundBlobs from './components/shared/BackgroundBlobs';
import Background3D from './components/shared/Background3D';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Test from './pages/Test';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          {/* Background elements outside any relative container so fixed positioning works */}
          <AnimatedBackground />
          <FloatingParticles />
          <Background3D />
          <BackgroundBlobs />
          <ScrollToTop />
          
          {/* Main content container - transparent bg so backgrounds show through */}
          <Navbar />
          
          <Routes>
            <Route path="/test" element={<Test />} />
            <Route path="*" element={
              <div className="relative transition-colors duration-300">
                <div className="relative z-10 bg-white/70 dark:bg-slate-950/70 backdrop-blur-sm pt-20">
                  <Routes>
                    <Route path="/" element={<><ScrollManager /><Home /></>} />
                    <Route path="/about" element={<><ScrollManager /><About /></>} />
                    <Route path="/products" element={<><ScrollManager /><Products /></>} />
                    <Route path="/contact" element={<><ScrollManager /><Contact /></>} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <Footer />
                </div>
              </div>
            } />
          </Routes>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
