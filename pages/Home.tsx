
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence, Variants, PanInfo } from 'framer-motion';
import { ArrowRight, Star, ChevronRight } from 'lucide-react';
import { SERVICES, TESTIMONIALS } from '../constants';
import TiltCard from '../components/TiltCard';
import PageLoader from '../components/PageLoader';

const HERO_SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2070&auto=format&fit=crop",
    title: "Total",
    subtitle: "Peace",
    tagline: "VIENNA'S BEST BEAUTY SALON",
    description: "Enjoy a moment of quiet and relaxation in the city center."
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=2073&auto=format&fit=crop",
    title: "Skin",
    subtitle: "Health",
    tagline: "EXPERT SKINCARE TREATMENTS",
    description: "Personal skin care designed specifically for your skin type."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=2070&auto=format&fit=crop",
    title: "Custom",
    subtitle: "Style",
    tagline: "PROFESSIONAL HAIR & BEAUTY",
    description: "Personalized beauty services that make you look your best."
  }
];

const Home: React.FC = () => {
  const [isInitializing, setIsInitializing] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollY } = useScroll();
  const timerRef = useRef<number | null>(null);

  const heroScale = useTransform(scrollY, [0, 800], [1, 1.05]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(nextSlide, 7000);
  }, [nextSlide]);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitializing(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isInitializing) return;
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isInitializing, resetTimer]);

  const handleDragEnd = (e: any, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      nextSlide();
      resetTimer();
    } else if (info.offset.x > swipeThreshold) {
      prevSlide();
      resetTimer();
    }
  };

  const slideVariants: Variants = {
    initial: (direction: number) => ({
      opacity: 0,
      scale: 1.1,
      filter: 'blur(10px)'
    }),
    animate: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.8 }
    }
  };

  const textContainerVariants: Variants = {
    animate: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3
      }
    }
  };

  const textItemVariants: Variants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="bg-[#fcfaf7] overflow-hidden">
      <AnimatePresence mode="wait">
        {isInitializing ? (
          <PageLoader key="loader" label="Welcome to Lofty" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Hero Section - Optimized for Mobile Swipe */}
            <section className="relative h-[82dvh] md:h-[100dvh] flex items-center justify-center overflow-hidden touch-none">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentSlide}
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  style={{ scale: heroScale, opacity: heroOpacity }}
                  className="absolute inset-0 cursor-grab active:cursor-grabbing"
                >
                  <img
                    src={HERO_SLIDES[currentSlide].image}
                    alt={HERO_SLIDES[currentSlide].title}
                    className="w-full h-full object-cover pointer-events-none select-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#2d1b10]/60 via-[#2d1b10]/10 to-[#fcfaf7] pointer-events-none"></div>
                </motion.div>
              </AnimatePresence>

              <div className="relative text-center text-white px-6 max-w-6xl w-full z-10 mt-16 md:mt-0 pointer-events-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`text-${currentSlide}`}
                    variants={textContainerVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex flex-col items-center"
                  >
                    <div className="mb-3 md:mb-6">
                      <motion.span
                        variants={textItemVariants}
                        className="block text-[9px] md:text-[11px] uppercase tracking-[0.8em] font-bold text-white/80"
                      >
                        {HERO_SLIDES[currentSlide].tagline}
                      </motion.span>
                    </div>

                    <div className="mb-4 md:mb-8">
                      <motion.h1
                        variants={textItemVariants}
                        className="text-4xl md:text-[10rem] font-serif leading-[1.1] md:leading-[1] tracking-tight"
                      >
                        {HERO_SLIDES[currentSlide].title} <br />
                        <span className="italic font-light text-[#fcfaf7]/70">{HERO_SLIDES[currentSlide].subtitle}</span>
                      </motion.h1>
                    </div>

                    <div className="mb-8 md:mb-14">
                      <motion.p
                        variants={textItemVariants}
                        className="text-[10px] md:text-sm uppercase tracking-[0.3em] font-light opacity-60 max-w-sm md:max-w-none px-4"
                      >
                        {HERO_SLIDES[currentSlide].description}
                      </motion.p>
                    </div>

                    <motion.div
                      variants={textItemVariants}
                      className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 w-full px-4 pointer-events-auto"
                    >
                      <Link
                        to="/services"
                        className="w-full md:w-auto group relative flex items-center justify-center px-8 md:px-12 py-4 md:py-5 rounded-full border border-white/20 hover:bg-white hover:text-[#2d1b10] transition-all duration-500 bg-white/10 backdrop-blur-[20px] backdrop-saturate-150 active:scale-95 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]"
                      >
                        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold">SEE SERVICES</span>
                        <ChevronRight size={14} className="ml-3 group-hover:translate-x-1 transition-transform" />
                      </Link>

                      <Link
                        to="/booking"
                        className="w-full md:w-auto px-8 md:px-12 py-4 md:py-5 rounded-full bg-white text-[#2d1b10] font-bold text-[9px] md:text-[10px] uppercase tracking-[0.4em] hover:bg-[#fcfaf7] transition-all shadow-xl active:scale-95"
                      >
                        BOOK NOW
                      </Link>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="absolute bottom-10 md:bottom-16 left-0 right-0 z-20 flex justify-center gap-2">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentSlide(idx);
                      resetTimer();
                    }}
                    className="p-3 outline-none touch-manipulation"
                  >
                    <div className={`transition-all duration-500 ease-out ${currentSlide === idx
                        ? 'w-10 md:w-14 h-[1.5px] bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]'
                        : 'w-2 md:w-4 h-[1.5px] bg-white/30'
                      }`} />
                  </button>
                ))}
              </div>
            </section>

            {/* Intro Section - Reduced padding to get to content faster */}
            <section className="py-20 md:py-64 px-8 max-w-6xl mx-auto flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8 md:space-y-16"
              >
                <div className="flex justify-center">
                  <Star className="text-[#a89078] animate-pulse" size={20} strokeWidth={1} />
                </div>
                <h2 className="text-4xl md:text-8xl font-serif text-[#2d1b10] leading-[1.2] italic">
                  Find your own <br />
                  <span className="not-italic font-light">inner glow.</span>
                </h2>
                <p className="text-[#5c4a3e] max-w-xl md:max-w-2xl mx-auto text-base md:text-2xl font-light italic leading-relaxed opacity-70">
                  "At Lofty, we focus on making you feel good. Our treatments help you relax and look your best, giving you a fresh start every time."
                </p>
                <Link to="/about" className="inline-block text-[9px] md:text-[10px] uppercase tracking-[0.5em] text-[#a89078] font-bold border-b border-[#a89078]/30 pb-2 hover:text-[#2d1b10] hover:border-[#2d1b10] transition-all">
                  About Us
                </Link>
              </motion.div>
            </section>

            {/* Featured Services */}
            <section className="py-20 md:py-56 bg-[#f7f1eb]/50 px-6 md:px-8">
              <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24 gap-8">
                  <div className="max-w-xl">
                    <span className="text-[#a89078] uppercase tracking-[0.5em] text-[9px] md:text-[10px] font-bold mb-3 md:mb-6 block">Popular Services</span>
                    <h3 className="text-4xl md:text-7xl font-serif text-[#2d1b10] italic">Best-selling <br />treatments.</h3>
                  </div>
                  <Link to="/services" className="px-8 py-3.5 md:px-12 md:py-5 rounded-full border border-[#2d1b10] text-[#2d1b10] text-[9px] md:text-[10px] font-bold uppercase tracking-widest hover:bg-[#2d1b10] hover:text-white transition-all active:scale-95">
                    See All Services
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                  {SERVICES.slice(0, 3).map((s, idx) => (
                    <motion.div
                      key={s.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1, duration: 0.8 }}
                      viewport={{ once: true, margin: "-50px" }}
                      className="group cursor-pointer"
                    >
                      <TiltCard className="mb-6 md:mb-8">
                        <img
                          src={s.image}
                          alt={s.title}
                          className="w-full aspect-[4/5] object-cover rounded-[2rem] md:rounded-[3rem] grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                        />
                      </TiltCard>
                      <div className="px-2 md:px-4 space-y-2 md:space-y-3">
                        <p className="text-[9px] uppercase tracking-widest text-[#a89078] font-bold">{s.category}</p>
                        <h4 className="text-xl md:text-2xl font-serif text-[#2d1b10]">{s.title}</h4>
                        <p className="text-[12px] text-[#5c4a3e] opacity-60 font-light italic leading-relaxed line-clamp-2">{s.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
