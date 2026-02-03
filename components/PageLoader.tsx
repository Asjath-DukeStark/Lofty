
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface PageLoaderProps {
  label: string;
}

const PageLoader: React.FC<PageLoaderProps> = ({ label }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex flex-col items-center justify-center py-40 text-center min-h-[60vh] w-full"
  >
    <div className="relative mb-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="w-20 h-20 border-t-2 border-[#a89078] rounded-full"
      />
      <Sparkles className="absolute inset-0 m-auto text-[#a89078] animate-pulse" size={20} />
    </div>
    <p className="text-[10px] uppercase tracking-[0.4em] text-[#a89078] font-bold px-4">{label}</p>
  </motion.div>
);

export default PageLoader;
