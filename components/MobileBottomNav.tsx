
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, LayoutGrid, Calendar, Phone, Sparkles, Image } from 'lucide-react';

const MobileBottomNav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Services', path: '/services', icon: LayoutGrid },
    { name: 'Gallery', path: '/gallery', icon: Image },
    { name: 'AI', path: '/ai-consultant', icon: Sparkles },
    { name: 'Book', path: '/booking', icon: Calendar },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  return (
    <div className="lg:hidden fixed bottom-4 sm:bottom-8 left-0 right-0 z-[120] px-4 pointer-events-none flex justify-center">
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto bg-[#261810]/90 backdrop-blur-xl border border-white/10 rounded-[2rem] h-[56px] sm:h-[68px] flex items-center p-1 sm:p-1.5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] max-w-full overflow-x-auto no-scrollbar scroll-smooth"
      >
        <div className="flex items-center gap-1 sm:gap-1.5 h-full relative px-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative flex items-center justify-center outline-none touch-manipulation group shrink-0"
              >
                <motion.div
                  initial={false}
                  animate={{
                    width: isActive ? 'auto' : '40px',
                    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                  }}
                  transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                  className={`flex items-center gap-2 px-2.5 sm:px-4 h-[44px] sm:h-[52px] rounded-full relative z-10 sm:min-w-[52px] min-w-[40px] justify-center`}
                >
                  <Icon
                    size={18}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/40'} shrink-0`}
                  />

                  <AnimatePresence initial={false} mode="wait">
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -5 }}
                        transition={{ duration: 0.2 }}
                        className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-white whitespace-nowrap overflow-hidden"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>

                {isActive && (
                  <motion.div
                    layoutId="active-pill-background"
                    className="absolute inset-0 bg-white/5 rounded-full -z-0"
                    transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default MobileBottomNav;
