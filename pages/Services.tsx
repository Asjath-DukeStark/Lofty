
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { SERVICES } from '../constants';
import { ServiceCategory, Service } from '../types';
import { Clock, Tag, ChevronRight, SlidersHorizontal, Sparkle, X, ArrowRight, CheckCircle2, RotateCcw, Search, Sparkles, Euro } from 'lucide-react';
import { motion, AnimatePresence, LayoutGroup, Variants } from 'framer-motion';
import PageLoader from '../components/PageLoader';
import { useNavigate } from 'react-router-dom';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05
    }
  }
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
    scale: 0.97,
    filter: 'blur(4px)'
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 15,
    filter: 'blur(8px)',
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const PRICE_RANGES = [
  { label: 'All', value: 'all' },
  { label: '< LKR 10000', value: 'under-10000' },
  { label: 'LKR 10k - 20k', value: '10000-20000' },
  { label: '> LKR 20000', value: 'over-20000' }
];

const Services: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [onlyPopular, setOnlyPopular] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<Service | null>(null);
  const [isFilterSticky, setIsFilterSticky] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const navigate = useNavigate();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const priceScrollRef = useRef<HTMLDivElement>(null);

  const categories = ['All', ...Object.values(ServiceCategory)];

  const filteredServices = useMemo(() => {
    return SERVICES.filter(s => {
      // Category Match
      const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;

      // Search Match
      const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Popularity Match
      const matchesPopular = !onlyPopular || s.isPopular;

      // Price Match
      const numericPrice = parseInt(s.price.replace('LKR', '').trim());
      let matchesPrice = true;
      if (priceFilter === 'under-10000') matchesPrice = numericPrice < 10000;
      else if (priceFilter === '10000-20000') matchesPrice = numericPrice >= 10000 && numericPrice <= 20000;
      else if (priceFilter === 'over-20000') matchesPrice = numericPrice > 20000;

      return matchesCategory && matchesSearch && matchesPopular && matchesPrice;
    });
  }, [selectedCategory, searchTerm, priceFilter, onlyPopular]);

  const getCategoryCount = (cat: string) => {
    if (cat === 'All') return SERVICES.length;
    return SERVICES.filter(s => s.category === cat).length;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsFilterSticky(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);

    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 1200);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (selectedServiceForModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedServiceForModal]);

  const handleCategorySelect = (cat: any) => {
    if (cat === selectedCategory) return;
    setSelectedCategory(cat);
  };

  const handleReserve = () => {
    if (selectedServiceForModal) {
      navigate('/booking', { state: { serviceId: selectedServiceForModal.id } });
      setSelectedServiceForModal(null);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setPriceFilter('all');
    setOnlyPopular(false);
  };

  return (
    <div className="bg-[#fcfaf7] min-h-screen pt-24 pb-32 overflow-hidden">
      <AnimatePresence mode="wait">
        {isInitializing ? (
          <PageLoader key="loader" label="Curating the Menu" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Header Section */}
            <section className="px-6 pt-12 pb-2 md:pt-28 md:pb-12 text-center max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              >
                <span className="text-[#a89078] uppercase tracking-[0.8em] text-[8px] md:text-[11px] font-bold mb-4 md:mb-6 block">
                  BESPOKE TREATMENTS
                </span>
                <h1 className="text-4xl md:text-8xl font-serif text-[#2d1b10] mb-6 md:mb-8 italic leading-tight">
                  Ritual <br />
                  <span className="font-light not-italic opacity-80">Catalog</span>
                </h1>
                <div className="h-[1px] w-8 md:w-12 bg-[#a89078]/50 mx-auto mb-8 md:mb-10"></div>
              </motion.div>
            </section>

            {/* Filter & Search Section */}
            <div className={`sticky top-[70px] md:top-[80px] z-40 transition-all duration-700 py-3 md:py-6 ${isFilterSticky ? 'bg-[#fcfaf7]/95 backdrop-blur-3xl border-b border-[#ede3da] shadow-md' : 'bg-transparent'
              }`}>
              <div className="max-w-[1400px] mx-auto px-4 md:px-8 space-y-4">

                {/* Search Bar */}
                <div className="relative max-w-2xl mx-auto">
                  <div className="relative group">
                    <Search className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${searchTerm ? 'text-[#2d1b10]' : 'text-[#a89078]'}`} size={16} strokeWidth={1.5} />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search rituals or ingredients..."
                      className="w-full bg-white/40 backdrop-blur-sm border border-[#ede3da] focus:border-[#a89078] focus:bg-white rounded-full pl-14 pr-12 py-4 md:py-5 text-sm outline-none transition-all placeholder:text-[#a89078]/50 font-light italic text-[#2d1b10] shadow-sm focus:shadow-lg"
                    />
                    <AnimatePresence>
                      {searchTerm && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          onClick={() => setSearchTerm('')}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-[#a89078] hover:text-[#2d1b10] bg-[#fcfaf7] rounded-full transition-all"
                        >
                          <X size={14} />
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Categories Row */}
                <div className="flex items-center relative">
                  <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-2 md:gap-4 no-scrollbar snap-x touch-pan-x py-2 flex-grow [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
                  >
                    <LayoutGroup id="category-filter">
                      {categories.map((cat) => {
                        const isActive = selectedCategory === cat;
                        const count = getCategoryCount(cat);
                        return (
                          <motion.button
                            key={cat}
                            whileTap={{
                              scale: 0.94,
                              transition: { type: "spring", stiffness: 400, damping: 20 }
                            }}
                            onClick={() => handleCategorySelect(cat as any)}
                            className={`relative group flex items-center gap-2.5 whitespace-nowrap px-6 md:px-10 py-3.5 md:py-4.5 rounded-full text-[8px] md:text-[10px] font-bold tracking-[0.3em] md:tracking-[0.35em] uppercase transition-all shrink-0 snap-center ${isActive ? 'text-[#fcfaf7]' : 'text-[#a89078] hover:text-[#2d1b10]'
                              }`}
                          >
                            {isActive && (
                              <motion.div
                                layoutId="active-pill"
                                className="absolute inset-0 bg-[#2d1b10] rounded-full shadow-[0_10px_30px_rgba(45,27,16,0.3)]"
                                transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                              />
                            )}
                            <span className="relative z-10">{cat}</span>
                            <span className={`relative z-10 text-[7px] md:text-[8px] opacity-40 group-hover:opacity-100 transition-opacity ${isActive ? 'text-[#fcfaf7]/50' : 'text-[#a89078]'}`}>
                              {count}
                            </span>
                          </motion.button>
                        );
                      })}
                    </LayoutGroup>
                  </div>
                </div>

                {/* Secondary Filter Row: Price & Popularity */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-2 border-t border-[#ede3da]/30">
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <span className="hidden md:flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.4em] text-[#a89078] shrink-0">
                      <SlidersHorizontal size={10} /> Investment:
                    </span>
                    <div ref={priceScrollRef} className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                      {PRICE_RANGES.map((range) => (
                        <button
                          key={range.value}
                          onClick={() => setPriceFilter(range.value)}
                          className={`px-4 py-2 rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${priceFilter === range.value
                              ? 'bg-[#a89078] text-white border-[#a89078]'
                              : 'bg-white text-[#a89078] border-[#ede3da] hover:border-[#a89078]'
                            }`}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                    <button
                      onClick={() => setOnlyPopular(!onlyPopular)}
                      className={`flex items-center gap-2.5 px-6 py-2 rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] transition-all border ${onlyPopular
                          ? 'bg-[#2d1b10] text-white border-[#2d1b10]'
                          : 'bg-white text-[#2d1b10] border-[#ede3da] hover:border-[#2d1b10]'
                        }`}
                    >
                      <Sparkles size={12} className={onlyPopular ? 'text-white' : 'text-[#a89078]'} />
                      Popular Choice
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Grid */}
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 mt-8 md:mt-16 min-h-[400px]">
              <AnimatePresence mode="popLayout">
                {filteredServices.length > 0 ? (
                  <motion.div
                    key="grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3 md:gap-16 lg:gap-20"
                  >
                    {filteredServices.map((service) => (
                      <motion.div
                        key={service.id}
                        layout
                        variants={itemVariants}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                      >
                        <motion.div
                          onClick={() => setSelectedServiceForModal(service)}
                          whileHover={{ y: -8, transition: { duration: 0.4 } }}
                          whileTap={{ scale: 0.98 }}
                          className="group relative flex flex-col md:flex-row items-stretch bg-white rounded-3xl md:rounded-[3.5rem] p-3 md:p-10 border border-[#ede3da] hover:border-[#a89078]/40 transition-all duration-700 overflow-hidden shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(45,27,16,0.08)] cursor-pointer h-full"
                        >
                          {service.isPopular && (
                            <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-[#2d1b10] text-white px-3 py-1.5 rounded-full text-[7px] font-bold uppercase tracking-widest shadow-xl">
                              <Sparkle size={8} fill="currentColor" /> Best-seller
                            </div>
                          )}

                          <div className="w-full md:w-52 lg:w-64 shrink-0 overflow-hidden rounded-2xl md:rounded-[2.2rem] relative mb-4 md:mb-0 aspect-square md:aspect-[4/5] shadow-inner">
                            <motion.img
                              initial={{ scale: 1.1 }}
                              src={service.image}
                              alt={service.title}
                              className="w-full h-full object-cover transition-all duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2d1b10]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                          </div>

                          <div className="flex-grow md:pl-10 flex flex-col justify-between py-1 md:py-2">
                            <div className="space-y-2 md:space-y-4">
                              <div className="flex items-center gap-2 md:gap-3">
                                <div className="w-1 h-1 rounded-full bg-[#a89078]/40" />
                                <span className="text-[7px] md:text-[9px] font-bold uppercase tracking-[0.4em] md:tracking-[0.5em] text-[#a89078] truncate">{service.category}</span>
                              </div>
                              <h3 className="text-sm md:text-3xl font-serif text-[#2d1b10] leading-tight group-hover:italic transition-all duration-700 line-clamp-2">{service.title}</h3>
                              <p className="hidden md:block text-[#5c4a3e] text-[12px] md:text-[13px] leading-relaxed font-light opacity-60 italic line-clamp-3">
                                {service.description}
                              </p>

                              <div className="flex flex-wrap items-center gap-2 md:gap-6 text-[7px] md:text-[10px] font-bold uppercase tracking-[0.1em] md:tracking-[0.25em] text-[#a89078] pt-1 md:pt-3">
                                <div className="flex items-center gap-1.5 md:gap-2.5">
                                  <Clock size={10} strokeWidth={1.5} className="opacity-40 md:w-3 md:h-3" />
                                  <span className="whitespace-nowrap">{service.duration}</span>
                                </div>
                                <div className="flex items-center gap-1.5 md:gap-2.5 text-[#2d1b10]">
                                  <Tag size={10} strokeWidth={1.5} className="text-[#a89078] md:w-3 md:h-3" />
                                  <span className="whitespace-nowrap">{service.price}</span>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 md:mt-8 flex items-center">
                              <motion.div
                                className="flex items-center gap-2 bg-[#fcfaf7] group-hover:bg-[#2d1b10] group-hover:text-white px-3 md:px-6 py-2 md:py-3.5 rounded-full transition-all duration-500 text-[7px] md:text-[9px] uppercase font-bold tracking-[0.1em] md:tracking-[0.2em] shadow-sm"
                              >
                                <span className="hidden xs:inline">Details</span> <ChevronRight size={10} className="group-hover:translate-x-1 transition-transform md:w-3 md:h-3" />
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="no-results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="w-20 h-20 bg-[#f7f1eb] rounded-full flex items-center justify-center text-[#a89078] mb-8 animate-pulse">
                      <Search size={32} strokeWidth={1} />
                    </div>
                    <h3 className="text-2xl font-serif text-[#2d1b10] mb-4">No Rituals Found</h3>
                    <p className="text-[#5c4a3e] font-light italic opacity-60 max-w-sm mb-10">
                      We couldn't find any services matching your specific criteria. Try broadening your refined search.
                    </p>
                    <button
                      onClick={clearFilters}
                      className="px-8 py-4 bg-[#2d1b10] text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#3d2b1f] transition-all"
                    >
                      Clear all filters
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Service Detail Modal */}
            <AnimatePresence>
              {selectedServiceForModal && (
                <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-8 overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedServiceForModal(null)}
                    className="fixed inset-0 bg-[#2d1b10]/90 backdrop-blur-2xl"
                  />

                  <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: 100, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.95, y: 50, filter: 'blur(10px)' }}
                    transition={{ type: "spring", damping: 30, stiffness: 200 }}
                    className="relative w-full max-w-6xl bg-[#fcfaf7] rounded-t-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] z-10 max-h-[96vh] flex flex-col"
                  >
                    <div className="overflow-y-auto flex-1 no-scrollbar">
                      <div className="flex flex-col md:flex-row min-h-full">
                        <div className="w-full md:w-1/2 h-72 md:h-auto relative overflow-hidden group">
                          <motion.img
                            initial={{ scale: 1.25 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                            src={selectedServiceForModal.image}
                            alt={selectedServiceForModal.title}
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={() => setSelectedServiceForModal(null)}
                            className="absolute top-4 right-4 md:top-6 md:right-6 p-3 md:p-4 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-[#2d1b10] transition-all z-20"
                          >
                            <X size={20} strokeWidth={1.5} />
                          </button>
                          <div className="absolute inset-0 bg-gradient-to-r from-[#2d1b10]/30 to-transparent pointer-events-none" />
                        </div>

                        <div className="w-full md:w-1/2 p-6 md:p-20 flex flex-col justify-between bg-[#fcfaf7] relative">
                          <div className="space-y-6 md:space-y-12">
                            <div>
                              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-5">
                                <Sparkle size={10} className="text-[#a89078]" />
                                <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.5em] md:tracking-[0.6em] text-[#a89078]">{selectedServiceForModal.category}</span>
                              </div>
                              <h2 className="text-3xl md:text-7xl font-serif text-[#2d1b10] mb-4 md:mb-6 italic leading-tight">{selectedServiceForModal.title}</h2>
                              <div className="h-[1px] w-12 md:w-16 bg-[#a89078]/40"></div>
                            </div>

                            <p className="text-[#5c4a3e] text-base md:text-2xl leading-relaxed font-light opacity-90 italic">
                              {selectedServiceForModal.description}
                            </p>

                            <div className="flex gap-8 md:gap-20 border-t border-[#ede3da] pt-6 md:pt-10">
                              <div className="space-y-1">
                                <p className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold text-[#a89078]">Duration</p>
                                <p className="font-serif text-lg md:text-3xl text-[#2d1b10]">{selectedServiceForModal.duration}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold text-[#a89078]">Investment</p>
                                <p className="font-serif text-lg md:text-3xl text-[#2d1b10]">{selectedServiceForModal.price}</p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-8 md:mt-20">
                            <button
                              onClick={handleReserve}
                              className="w-full group relative overflow-hidden bg-[#2d1b10] text-white py-5 md:py-8 rounded-xl md:rounded-[2rem] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-[11px] flex items-center justify-center gap-4 md:gap-6 hover:bg-[#3d2b1f] transition-all shadow-2xl active:scale-95"
                            >
                              <span className="relative z-10">Confirm Reservation</span>
                              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-2 transition-transform duration-500" />
                            </button>
                            <p className="text-center text-[7px] md:text-[9px] text-[#a89078] uppercase tracking-widest mt-4 md:mt-6 opacity-50">Private consultations included with every ritual</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* Success Toast */}
            <AnimatePresence>
              {showSuccessToast && (
                <motion.div
                  initial={{ opacity: 0, y: 80, x: "-50%" }}
                  animate={{ opacity: 1, y: 0, x: "-50%" }}
                  exit={{ opacity: 0, y: 80, x: "-50%" }}
                  className="fixed bottom-12 md:bottom-20 left-1/2 z-[300] w-[92%] max-w-md"
                >
                  <div className="bg-[#2d1b10] text-white p-4 md:p-5 rounded-2xl md:rounded-[2rem] shadow-[0_25px_60px_-12px_rgba(0,0,0,0.5)] border border-white/10 flex items-center justify-between gap-3 md:gap-4 backdrop-blur-lg">
                    <div className="flex items-center gap-3 md:gap-4 pl-1">
                      <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#fcfaf7]/10 flex items-center justify-center text-[#a89078] shadow-inner">
                        <CheckCircle2 size={16} md:size={18} />
                      </div>
                      <div>
                        <p className="text-[8px] md:text-[9px] uppercase tracking-widest font-bold text-[#a89078] mb-0.5">Booking Initialized</p>
                        <p className="text-[10px] md:text-[11px] font-light italic opacity-80">Concierge will contact you shortly.</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowSuccessToast(false)}
                      className="shrink-0 flex items-center gap-1.5 bg-[#fcfaf7] text-[#2d1b10] px-4 md:px-5 py-2.5 md:py-3 rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-widest hover:bg-white transition-all active:scale-95 shadow-lg"
                    >
                      <RotateCcw size={10} md:size={12} /> Again
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Services;
