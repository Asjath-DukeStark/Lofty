
import React from 'react';
import { CONTACT_INFO } from '../constants';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const LogoIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="45" stroke={color} strokeWidth="1.5" />
    <path d="M50 20L54 46L80 50L54 54L50 80L46 54L20 50L46 46L50 20Z" fill={color} />
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2d1b10] text-[#a89078] py-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
        <div className="flex flex-col items-start">
          <LogoIcon className="w-12 h-12 mb-8 text-[#a89078]/40" />
          <h3 className="text-[#fcfaf7] text-2xl font-serif mb-8 uppercase tracking-[0.3em] font-light">Lofty Beauty</h3>
          <p className="mb-8 leading-relaxed opacity-70 font-light text-sm">
            Grounded aesthetics for the modern soul. Premium skincare and wellness protocols in the heart of Vienna.
          </p>
          <div className="flex space-x-6">
            <a href={CONTACT_INFO.socials.instagram} className="hover:text-white transition-colors duration-300">
              <Instagram size={20} />
            </a>
            <a href={CONTACT_INFO.socials.facebook} className="hover:text-white transition-colors duration-300">
              <Facebook size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-[#fcfaf7] text-xs font-bold mb-8 uppercase tracking-[0.4em]">Connect</h4>
          <ul className="space-y-6 text-sm font-light">
            <li className="flex items-start space-x-4">
              <MapPin size={18} className="mt-1 flex-shrink-0 text-[#fcfaf7]/30" />
              <span>{CONTACT_INFO.address}</span>
            </li>
            <li className="flex items-center space-x-4">
              <Phone size={18} className="flex-shrink-0 text-[#fcfaf7]/30" />
              <span>{CONTACT_INFO.phone}</span>
            </li>
            <li className="flex items-center space-x-4">
              <Mail size={18} className="flex-shrink-0 text-[#fcfaf7]/30" />
              <span>{CONTACT_INFO.email}</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#fcfaf7] text-xs font-bold mb-8 uppercase tracking-[0.4em]">Availability</h4>
          <ul className="space-y-4 text-sm font-light">
            {CONTACT_INFO.hours.map((h, i) => (
              <li key={i} className="flex justify-between border-b border-white/5 pb-3">
                <span className="opacity-60">{h.day}</span>
                <span className="text-[#fcfaf7]">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.4em] opacity-40">
        <div>&copy; {new Date().getFullYear()} Lofty Beauty Parlour.</div>
        <div className="flex items-center gap-4">
          <span>Vienna</span>
          <div className="w-1 h-1 bg-[#a89078] rounded-full" />
          <span>Austria</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
