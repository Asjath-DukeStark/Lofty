
import React, { useState, useRef, useEffect } from 'react';
import { getBeautyAdvice } from '../geminiService';
import { Camera, Send, Sparkles, User, Bot, Loader2, Trash2, Check, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageLoader from '../components/PageLoader';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownComponents: any = {
  h1: ({ children }: any) => (
    <motion.h1
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-xl md:text-2xl font-serif mb-6 mt-4 text-[#2d1b10] flex items-center justify-center gap-3 py-4 border-y border-[#ede3da]/50"
    >
      <Sparkles size={18} className="text-[#a89078]" />
      {children}
      <Sparkles size={18} className="text-[#a89078]" />
    </motion.h1>
  ),
  h2: ({ children }: any) => (
    <motion.h2
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="text-lg md:text-xl font-serif mb-3 mt-5 text-[#2d1b10]"
    >
      {children}
    </motion.h2>
  ),
  h3: ({ children }: any) => (
    <motion.h3
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-sm md:text-md font-serif mb-4 mt-8 text-[#2d1b10] uppercase tracking-[0.25em] border-b border-[#ede3da] pb-2 flex items-center gap-2"
    >
      {children}
    </motion.h3>
  ),
  p: ({ children }: any) => (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="mb-4 last:mb-0 leading-relaxed font-light text-[#5c4a3e]"
    >
      {children}
    </motion.p>
  ),
  ul: ({ children }: any) => <ul className="list-none pl-0 mb-6 space-y-4">{children}</ul>,
  ol: ({ children }: any) => <ol className="list-decimal pl-5 mb-6 space-y-3">{children}</ol>,
  li: ({ children }: any) => {
    return (
      <motion.li
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 last:mb-0"
      >
        <div className="bg-[#fcfaf7] border border-[#ede3da] rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#a89078] opacity-20 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </motion.li>
    );
  },
  strong: ({ children }: any) => {
    // Special styling for "Investment:"
    const isInvestment = typeof children === 'string' && children.toLowerCase().includes('investment');
    return (
      <strong className={`font-bold ${isInvestment ? 'text-[#a89078] block mt-1 text-[10px] uppercase tracking-widest' : 'text-[#2d1b10]'}`}>
        {children}
      </strong>
    );
  },
  em: ({ children }: any) => <em className="italic opacity-80 font-light">{children}</em>,
};

const AIConsultant: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; content: string; image?: string }[]>([
    { role: 'bot', content: "Welcome to your Lofty Beauty analysis. I can help you identify the perfect treatments for your unique skin profile. Feel free to ask a question or share a photo for a detailed consultation." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
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
            {/* Premium Background Graphics */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                  opacity: [0.03, 0.05, 0.03]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-20 -left-20 w-96 h-96 bg-[#a89078] rounded-full blur-[100px]"
              />
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  x: [0, 50, 0],
                  opacity: [0.02, 0.04, 0.02]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 -right-20 w-[500px] h-[500px] bg-[#2d1b10] rounded-full blur-[120px]"
              />
            </div>

            {/* Minimalist Header for Mobile Space Optimization */}
            <div className="text-center mb-6 md:mb-10 px-2 relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 bg-[#2d1b10] text-white px-4 py-2 rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-[0.3em] mb-4 shadow-xl border border-white/10"
              >
                <Sparkles size={12} className="text-[#a89078]" />
                Aesthetic Intelligence
              </motion.div>
              <motion.h1
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="text-4xl md:text-7xl font-serif mb-3 text-[#2d1b10] italic tracking-tight"
              >
                Skin Rituals
              </motion.h1>
              <p className="text-[#5c4a3e] max-w-sm mx-auto text-[11px] md:text-sm leading-relaxed font-light italic opacity-60">
                A digital sanctuary for personalized skin consultations guided by advanced analysis.
              </p>
            </div>

            <div className="bg-[#fcfaf7]/60 backdrop-blur-[20px] backdrop-saturate-150 rounded-[2rem] md:rounded-[3rem] shadow-[0_30px_80px_-20px_rgba(45,27,16,0.15)] border border-white/20 overflow-hidden flex flex-col h-[calc(100dvh-320px)] md:h-[700px] relative z-10">

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
                      {m.role === 'user' ? <User className="w-[14px] h-[14px] md:w-[18px] md:h-[18px]" /> : <Bot className="w-[16px] h-[16px] md:w-[22px] md:h-[22px]" />}
                    </div>
                    <div className={`max-w-[88%] md:max-w-[75%] p-4 md:p-8 rounded-[1.5rem] md:rounded-[2rem] text-[12px] md:text-base leading-relaxed ${m.role === 'user' ? 'bg-[#2d1b10] text-white shadow-lg' : 'bg-white shadow-sm border border-[#ede3da] text-[#2d1b10] font-light italic'}`}>
                      {m.image && (
                        <div className="mb-3 md:mb-6 rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white relative group">
                          <img src={m.image} alt="Skin Analysis Reference" className="w-full h-48 md:h-80 object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#2d1b10]/40 to-transparent opacity-60" />

                          {/* Decorative Scan Line for bot analysis images */}
                          {m.role === 'user' && i === messages.length - 1 && isLoading && (
                            <motion.div
                              initial={{ top: '0%' }}
                              animate={{ top: '100%' }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                              className="absolute left-0 right-0 h-1 md:h-2 bg-[#a89078] shadow-[0_0_20px_#a89078] z-10 before:content-[''] before:absolute before:inset-0 before:bg-white/20 before:blur-sm"
                            />
                          )}
                        </div>
                      )}
                      <div className="markdown-content">
                        {m.role === 'bot' ? (
                          <ReactMarkdown remarkPlugins={[remarkGfm]} components={MarkdownComponents}>
                            {m.content}
                          </ReactMarkdown>
                        ) : (
                          <div className="whitespace-pre-wrap">{m.content}</div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <div className="flex gap-3 md:gap-6">
                    <div className="w-8 h-8 md:w-14 md:h-14 rounded-full bg-white border border-[#ede3da] flex items-center justify-center shadow-inner">
                      <Loader2 className="w-[14px] h-[14px] md:w-[18px] md:h-[18px] animate-spin text-[#a89078]" />
                    </div>
                    <div className="bg-white/80 backdrop-blur-md px-5 md:px-8 py-4 md:py-6 rounded-[1.5rem] md:rounded-[2.2rem] shadow-xl border border-[#ede3da] flex items-center gap-4">
                      <div className="flex gap-1.5">
                        <motion.div animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-1.5 h-1.5 bg-[#a89078] rounded-full" />
                        <motion.div animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#a89078] rounded-full" />
                        <motion.div animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#a89078] rounded-full" />
                      </div>
                      <span className="text-[#2d1b10] text-[9px] md:text-[11px] uppercase tracking-[0.3em] font-bold">
                        {selectedImage ? "Digital Skin Mapping..." : "Consulting Lofty Experts..."}
                      </span>
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
              <div className="p-4 md:p-8 bg-white/40 backdrop-blur-md border-t border-white/20">
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
                    <Camera className="w-[20px] h-[20px] md:w-[22px] md:h-[22px]" />
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
                    <Send className="w-[20px] h-[20px] md:w-[22px] md:h-[22px]" />
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
