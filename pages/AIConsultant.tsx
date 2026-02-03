
import React, { useState, useRef, useEffect } from 'react';
import { getBeautyAdvice } from '../geminiService';
import { Camera, Send, Sparkles, User, Bot, Loader2, Trash2, Check, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageLoader from '../components/PageLoader';

const AIConsultant: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; content: string; image?: string }[]>([
    { role: 'bot', content: "Welcome to your Lofty Beauty analysis. I can help you identify the perfect treatments for your unique skin profile. Feel free to ask a question or share a photo for a detailed consultation." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitializing(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ 
        top: scrollRef.current.scrollHeight, 
        behavior 
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 150;
      setShowScrollButton(!isNearBottom);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() && !selectedImage) return;

    const userMessage = input;
    const userImage = selectedImage;
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage, image: userImage || undefined }]);
    setInput('');
    setSelectedImage(null);
    setIsLoading(true);

    const base64Image = userImage ? userImage.split(',')[1] : undefined;
    const response = await getBeautyAdvice(userMessage || "Please analyze this photo and recommend the best Lofty Beauty treatment for my skin type.", base64Image);
    
    setMessages(prev => [...prev, { role: 'bot', content: response }]);
    setIsLoading(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-3 pt-24 pb-44 md:pt-32 md:pb-32">
      <AnimatePresence mode="wait">
        {isInitializing ? (
          <PageLoader key="loader" label="Activating Beauty Core" />
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Minimalist Header for Mobile Space Optimization */}
            <div className="text-center mb-6 md:mb-10 px-2">
              <div className="inline-flex items-center gap-2 bg-[#2d1b10] text-white px-3 py-1.5 rounded-full text-[7px] md:text-[8px] font-bold uppercase tracking-[0.2em] md:tracking-[0.25em] mb-3 shadow-md">
                <Sparkles size={10} /> Certified AI Expert
              </div>
              <h1 className="text-3xl md:text-6xl font-serif mb-2 text-[#2d1b10] italic">Skin Rituals</h1>
              <p className="text-[#5c4a3e] max-w-sm mx-auto text-[11px] md:text-sm leading-relaxed font-light italic opacity-60">
                Private digital aesthetician. Upload a photo for precise skin mapping.
              </p>
            </div>

            <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-[0_30px_80px_-20px_rgba(45,27,16,0.15)] border border-[#ede3da] overflow-hidden flex flex-col h-[calc(100dvh-320px)] md:h-[700px] relative">
              
              {/* Chat Window - Optimized for Mobile Scrolling */}
              <div 
                ref={scrollRef} 
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto p-4 md:p-10 space-y-6 md:space-y-8 bg-[#fcfaf7]/40 no-scrollbar overscroll-behavior-contain"
              >
                {messages.map((m, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={i} 
                    className={`flex gap-3 md:gap-6 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 md:w-14 md:h-14 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-[#ede3da] ${m.role === 'user' ? 'bg-[#2d1b10] text-white border-none' : 'bg-white text-[#a89078]'}`}>
                      {m.role === 'user' ? <User size={14} md:size={18} /> : <Bot size={16} md:size={22} />}
                    </div>
                    <div className={`max-w-[88%] md:max-w-[75%] p-4 md:p-8 rounded-[1.5rem] md:rounded-[2rem] text-[12px] md:text-base leading-relaxed ${m.role === 'user' ? 'bg-[#2d1b10] text-white shadow-lg' : 'bg-white shadow-sm border border-[#ede3da] text-[#2d1b10] font-light italic'}`}>
                      {m.image && (
                        <div className="mb-3 md:mb-4 rounded-xl md:rounded-2xl overflow-hidden shadow-md border-2 border-white/10">
                          <img src={m.image} alt="Skin Analysis Reference" className="w-full h-40 md:h-64 object-cover" />
                        </div>
                      )}
                      <div className="whitespace-pre-wrap">{m.content}</div>
                    </div>
                  </motion.div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-3 md:gap-6">
                    <div className="w-8 h-8 md:w-14 md:h-14 rounded-full bg-white border border-[#ede3da] flex items-center justify-center">
                      <Loader2 size={14} md:size={18} className="animate-spin text-[#a89078]" />
                    </div>
                    <div className="bg-white px-4 md:px-6 py-3 md:py-4 rounded-full shadow-sm border border-[#ede3da] flex items-center gap-3">
                      <div className="flex gap-1">
                        <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 h-1 bg-[#a89078] rounded-full" />
                        <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1 h-1 bg-[#a89078] rounded-full" />
                        <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1 h-1 bg-[#a89078] rounded-full" />
                      </div>
                      <span className="text-[#a89078] text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold">Thinking...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Scroll to Bottom Button */}
              <AnimatePresence>
                {showScrollButton && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    onClick={() => scrollToBottom()}
                    className="absolute bottom-28 right-6 bg-white border border-[#ede3da] p-3 rounded-full shadow-xl text-[#a89078] hover:text-[#2d1b10] transition-colors z-20"
                  >
                    <ArrowDown size={18} />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Confirmation Preview */}
              <AnimatePresence>
                {selectedImage && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-4 py-3 bg-[#fcfaf7] border-t border-[#ede3da] flex items-center justify-between shadow-inner"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img 
                          src={selectedImage} 
                          alt="Thumbnail" 
                          className="w-12 h-12 rounded-xl object-cover shadow-md border border-white" 
                        />
                        <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white border-2 border-white shadow-md">
                          <Check size={10} strokeWidth={4} />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] text-[#2d1b10] font-bold uppercase tracking-widest">Image Ready</span>
                        <span className="text-[10px] text-[#5c4a3e] font-light italic opacity-60">Analysis initialized...</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedImage(null)} 
                      className="p-2.5 text-[#a89078] hover:text-red-500 bg-white rounded-full shadow-sm border border-[#ede3da] transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Input Bar - Focused for Mobile Thumb Accessibility */}
              <div className="p-4 md:p-8 bg-white border-t border-[#ede3da]">
                <div className="flex gap-2 md:gap-4 items-center">
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handleImageChange}
                  />
                  <motion.button 
                    whileTap={{ scale: 0.92 }}
                    onClick={() => fileInputRef.current?.click()}
                    className={`p-4 md:p-5 rounded-xl md:rounded-2xl transition-all shadow-sm ${selectedImage ? 'bg-[#2d1b10] text-white' : 'text-[#a89078] bg-[#fcfaf7] hover:bg-[#ede3da]'}`}
                  >
                    <Camera size={20} md:size={22} />
                  </motion.button>
                  
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={selectedImage ? "Add details..." : "Ask a question..."}
                    className="flex-1 bg-[#fcfaf7] border-none focus:ring-1 focus:ring-[#a89078]/30 rounded-xl md:rounded-2xl px-5 md:px-6 py-4 md:py-5 text-[13px] md:text-base outline-none font-light italic text-[#2d1b10]"
                  />
                  
                  <motion.button 
                    whileTap={{ scale: 0.92 }}
                    onClick={handleSend}
                    disabled={isLoading || (!input.trim() && !selectedImage)}
                    className="p-4 md:p-5 bg-[#2d1b10] text-white rounded-xl md:rounded-2xl transition-all disabled:opacity-20 shadow-lg flex items-center justify-center"
                  >
                    <Send size={20} md:size={22} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIConsultant;
