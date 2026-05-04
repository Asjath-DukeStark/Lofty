
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ChevronRight, Search, ShoppingBag } from 'lucide-react';

const LogoIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="45" stroke={color} strokeWidth="1.5" />
    <path d="M50 20L54 46L80 50L54 54L50 80L46 54L20 50L46 46L50 20Z" fill={color} />
  </svg>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'AI Guide', path: '/ai-consultant' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className="fixed top-6 left-0 right-0 z-[100] px-4 md:px-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`mx-auto transition-all duration-700 ease-[0.16,1,0.3,1] backdrop-blur-[20px] backdrop-saturate-150 rounded-full flex items-center justify-between border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${scrolled ? 'bg-white/80 max-w-[1000px] py-1.5 md:py-2 px-5 md:px-8' : 'bg-white/60 max-w-[1200px] py-1.5 md:py-4 px-5 md:px-12'
            }`}
        >
          {/* Logo Branding */}
          <Link to="/" className="flex items-center gap-3 md:gap-4 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <img
                src="/images/New Logo.png"
                alt="Lofty Logo"
                className={`${scrolled ? 'w-8 h-8 md:w-14 md:h-14' : 'w-9 h-9 md:w-18 md:h-18'} rounded-full object-cover transition-all duration-700 shadow-md border-2 border-[#2d1b10]`}
              />
            </motion.div>
            <div className="flex flex-col leading-none">
              <span className="text-sm md:text-lg font-serif font-bold tracking-[0.15em] text-[#2d1b10]">LOFTY</span>
              <span className="text-[8px] md:text-[10px] font-serif italic font-light opacity-50 text-[#2d1b10] tracking-widest mt-1">BEAUTY</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 hover:text-[#2d1b10] ${isActive ? 'text-[#2d1b10]' : 'text-[#a89078]'
                    }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="active-dot"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#2d1b10] rounded-full"
                    />
                  )}
                </Link>
              );
            })}

            <Link
              to="/booking"
              className="ml-4 px-8 py-3.5 bg-[#2d1b10] text-white rounded-full text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#3d2b1f] transition-all shadow-lg active:scale-95"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsOpen(true)}
            className="p-1 lg:hidden text-[#2d1b10] hover:opacity-50 transition-opacity"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </motion.div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-white flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <img src="/images/New Logo.png" alt="Lofty Logo" className="w-10 h-10 rounded-full object-cover border border-[#2d1b10]" />
                <div className="flex flex-col leading-none">
                  <span className="text-lg font-serif font-bold tracking-[0.1em] text-[#2d1b10]">LOFTY</span>
                  <span className="text-[8px] font-serif italic font-light opacity-50 text-[#2d1b10] tracking-widest mt-0.5">BEAUTY</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-[#2d1b10]">
                <Link to="/services" onClick={() => setIsOpen(false)} className="hover:text-[#a89078] transition-colors">
                  <Search size={20} strokeWidth={1.5} />
                </Link>
                <Link to="/booking" onClick={() => setIsOpen(false)} className="hover:text-[#a89078] transition-colors">
                  <ShoppingBag size={20} strokeWidth={1.5} />
                </Link>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:text-[#a89078] transition-colors">
                  <X size={24} strokeWidth={1} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar">
              {/* Primary Links */}
              <div className="flex flex-col mb-8">
                {['Home', 'Services', 'Gallery', 'Book Now'].map((item, i) => {
                  const path = item === 'Home' ? '/' : item === 'Book Now' ? '/booking' : `/${item.toLowerCase().replace(' ', '-')}`;
                  return (
                    <motion.div
                      key={item}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + (i * 0.05), duration: 0.4 }}
                    >
                      <Link
                        to={path}
                        className="flex items-center justify-between py-4 border-b border-[#ede3da] group"
                      >
                        <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-[#2d1b10]">{item}</span>
                        <ChevronRight size={16} strokeWidth={1.5} className="text-[#a89078] group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Secondary Links */}
              <div className="flex flex-col space-y-1">
                {['About', 'AI Guide', 'Contact'].map((item, i) => {
                  const path = `/${item.toLowerCase().replace(' ', '-')}`;
                  return (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + (i * 0.05), duration: 0.4 }}
                    >
                      <Link
                        to={path}
                        className="block py-2.5 text-[13px] md:text-sm font-medium text-[#5c4a3e] hover:text-[#2d1b10] transition-colors"
                      >
                        {item}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
