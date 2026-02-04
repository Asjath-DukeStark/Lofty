
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

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
    { name: 'AI Guide', path: '/ai-consultant' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className="fixed top-6 left-0 right-0 z-[100] px-4 md:px-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`mx-auto transition-all duration-700 ease-[0.16,1,0.3,1] bg-white rounded-full flex items-center justify-between shadow-[0_15px_40px_-10px_rgba(45,27,16,0.12)] border border-[#ede3da] ${scrolled ? 'max-w-[1000px] py-3 px-6 md:px-8' : 'max-w-[1200px] py-4 px-8 md:px-12'
            }`}
        >
          {/* Logo Branding */}
          <Link to="/" className="flex items-center gap-3 md:gap-4 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <img
                src="/images/Loty logo.jpeg"
                alt="Lofty Logo"
                className={`${scrolled ? 'w-10 h-10' : 'w-12 h-12 md:w-14 md:h-14'} rounded-full object-cover transition-all duration-700 shadow-md`}
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
            className="p-2 lg:hidden text-[#2d1b10] hover:opacity-50 transition-opacity"
          >
            <Menu size={24} strokeWidth={1} />
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
            className="fixed inset-0 z-[110] bg-[#fcfaf7] flex flex-col p-8 md:p-12"
          >
            <div className="flex justify-between items-center mb-24">
              <div className="flex items-center gap-4">
                <img src="/images/Loty logo.jpeg" alt="Lofty Logo" className="w-12 h-12 rounded-full object-cover shadow-sm" />
                <div className="flex flex-col leading-none">
                  <span className="text-xl font-serif font-bold tracking-[0.15em] text-[#2d1b10]">LOFTY</span>
                  <span className="text-xs font-serif italic font-light opacity-50 text-[#2d1b10] tracking-widest mt-1">BEAUTY</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-4 rounded-full bg-white border border-[#ede3da] text-[#2d1b10] shadow-sm"
              >
                <X size={24} strokeWidth={1} />
              </button>
            </div>

            <div className="flex-1 flex flex-col space-y-10 md:space-y-12">
              {['Home', ...navLinks.map(l => l.name), 'Book Now'].map((item, i) => {
                const path = item === 'Home' ? '/' : item === 'Book Now' ? '/booking' : `/${item.toLowerCase().replace(' ', '-')}`;
                return (
                  <motion.div
                    key={item}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + (i * 0.1), duration: 0.8 }}
                  >
                    <Link
                      to={path}
                      className="text-5xl md:text-7xl font-serif text-[#2d1b10] lowercase italic hover:opacity-50 transition-all flex items-center justify-between group"
                    >
                      {item}
                      <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500" size={32} strokeWidth={1} />
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="pt-12 border-t border-[#ede3da] flex flex-col md:flex-row gap-8 justify-between items-start md:items-end">
              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#a89078]">Vienna Location</p>
                <p className="text-xs text-[#2d1b10] font-light italic">Schillerplatz 4, 1010 Vienna</p>
              </div>
              <div className="space-y-4 text-right">
                <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#a89078]">Contact Us</p>
                <p className="text-xs text-[#2d1b10] font-light italic">+43 660 123 4567</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
