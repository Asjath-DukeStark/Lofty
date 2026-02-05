
import React, { useState, useEffect } from 'react';
import { Award, Heart, Shield, Users, Leaf, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageLoader from '../components/PageLoader';

const About: React.FC = () => {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitializing(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#fcfaf7] pt-20 pb-32">
      <AnimatePresence mode="wait">
        {isInitializing ? (
          <PageLoader key="loader" label="Our Story" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Hero */}
            <section className="bg-[#f7f1eb] py-32 md:py-48 mb-32 relative overflow-hidden rounded-b-[5rem]">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
              </div>
              <div className="max-w-7xl mx-auto px-8 text-center relative z-10">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-[#a89078] uppercase tracking-[0.6em] text-[11px] font-bold mb-10 block"
                >
                  WHO WE ARE
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-7xl md:text-9xl font-serif mb-12 italic text-[#2d1b10] leading-none"
                >
                  Our <span className="font-light">Story</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-[#5c4a3e] max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed font-light italic opacity-80"
                >
                  "We created a calm place for you to relax. We focus on natural beauty and making sure you feel good every time you visit us."
                </motion.p>
              </div>
            </section>

            {/* Philosophy Main */}
            <section className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-32 items-center mb-48">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="relative"
              >
                <img
                  src="/images/about_philosophy.jpg"
                  alt="Spa Detail"
                  className="rounded-[4rem] shadow-3xl relative z-10"
                />
              </motion.div>

              <div className="space-y-16">
                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}>
                  <span className="text-[#a89078] uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block">Our Goal</span>
                  <h2 className="text-5xl md:text-7xl font-serif text-[#2d1b10] leading-tight italic">Simple, Natural <br /><span className="font-light text-4xl md:text-5xl">and Expert Care.</span></h2>
                </motion.div>
                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-[#5c4a3e] leading-relaxed text-xl font-light opacity-90">
                  Lofty Beauty started in Vienna because we wanted to offer a friendly, warm place for beauty care. We use natural products and expert skills to help your skin stay healthy and glowing.
                </motion.p>
                <div className="grid grid-cols-2 gap-16 pt-8">
                  <div className="space-y-6">
                    <div className="w-16 h-16 rounded-full bg-[#f7f1eb] flex items-center justify-center text-[#2d1b10]">
                      <Leaf size={28} strokeWidth={1} />
                    </div>
                    <h4 className="font-bold uppercase tracking-[0.3em] text-[11px] text-[#2d1b10]">Natural</h4>
                    <p className="text-[#a89078] text-xs leading-relaxed uppercase tracking-widest font-medium">We use healthy, organic ingredients.</p>
                  </div>
                  <div className="space-y-6">
                    <div className="w-16 h-16 rounded-full bg-[#f7f1eb] flex items-center justify-center text-[#2d1b10]">
                      <Sparkles size={28} strokeWidth={1} />
                    </div>
                    <h4 className="font-bold uppercase tracking-[0.3em] text-[11px] text-[#2d1b10]">Experts</h4>
                    <p className="text-[#a89078] text-xs leading-relaxed uppercase tracking-widest font-medium">Personal treatments just for you.</p>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default About;
