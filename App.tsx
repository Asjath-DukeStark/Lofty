
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import MobileBottomNav from './components/MobileBottomNav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import AIConsultant from './pages/AIConsultant';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import Gallery from './pages/GalleryPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const SplashIntro = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        y: "-100%",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
      }}
      className="fixed inset-0 z-[1000] bg-[#2d1b10] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative flex flex-col items-center mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 relative"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-20px] border border-[#a89078]/20 rounded-full"
            />
            <img src="/images/New Logo.png" alt="Lofty" className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover relative z-10 shadow-2xl border-4 border-[#a89078]" />
          </div>
        </motion.div>

        <div className="relative overflow-hidden mb-6">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-7xl font-serif text-[#fcfaf7] tracking-[0.25em] flex items-center gap-4"
          >
            <span>LOFTY</span>
            <span className="italic font-light opacity-60">BEAUTY</span>
          </motion.div>
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 left-0 h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#a89078] to-transparent"
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="flex flex-col items-center gap-4"
      >
        <span className="text-[10px] uppercase tracking-[0.8em] text-[#a89078] font-bold">
          The Ritual Begins
        </span>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "160px" }}
          transition={{ delay: 0.9, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={onComplete}
          className="h-[1px] bg-[#a89078]/40"
        />
      </motion.div>
    </motion.div>
  );
};



const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/ai-consultant" element={<AIConsultant />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  return (
    <Router>
      <ScrollToTop />
      <AnimatePresence>
        {initialLoad && <SplashIntro onComplete={() => setInitialLoad(false)} />}
      </AnimatePresence>

      <div className={`flex flex-col min-h-screen bg-[#fcfaf7] selection:bg-[#3d2b1f] selection:text-[#fcfaf7] transition-opacity duration-700 ${initialLoad ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        <main className="flex-grow pb-32 lg:pb-0">
          <AnimatedRoutes />
        </main>
        <MobileBottomNav />
        <Footer />

        {/* Subtle vignette for depth */}
        <div className="fixed inset-0 pointer-events-none z-[51] shadow-[inset_0_0_120px_rgba(45,27,16,0.04)]" />
      </div>
    </Router>
  );
};

export default App;
