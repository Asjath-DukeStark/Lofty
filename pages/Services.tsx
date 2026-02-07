import React, { useState, useEffect, useRef, useMemo } from 'react';
import { SERVICES } from '../constants';
import { ServiceCategory, Service } from '../types';
import { Clock, Tag, ChevronRight, SlidersHorizontal, Sparkle, X, ArrowRight, CheckCircle2, RotateCcw, Search, Sparkles, Euro } from 'lucide-react';
import { motion, AnimatePresence, LayoutGroup, Variants } from 'framer-motion';
import PageLoader from '../components/PageLoader';
import { useNavigate } from 'react-router-dom';
import ServiceModal from '../components/ServiceModal';

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
  { label: '< LKR 5,000', value: 'under-5000' },
  { label: 'LKR 5k - 15k', value: '5000-15000' },
  { label: '> LKR 15,000', value: 'over-15000' }
];

const Services: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [onlyPopular, setOnlyPopular] = useState(false);
  const [isFilterSticky, setIsFilterSticky] = useState(false);
  const [showFilter, setShowFilter] = useState(true);
  const [isInitializing, setIsInitializing] = useState(true);
  const lastScrollY = useRef(0);

  const [selectedService, setSelectedService] = useState<Service | null>(null);

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

      // Robust Price Parsing
      let numericPrice = 0;
      if (s.price.toLowerCase().includes('request')) {
        numericPrice = 999999; // Treat as high for filtering purposes
      } else {
        // Handle ranges like "300 - 1800" by taking the lower bound
        const basePrice = s.price.split('-')[0].replace(/[^0-9]/g, '');
        numericPrice = parseInt(basePrice) || 0;
      }

      let matchesPrice = true;
      if (priceFilter === 'under-5000') matchesPrice = numericPrice < 5000;
      else if (priceFilter === '5000-15000') matchesPrice = numericPrice >= 5000 && numericPrice <= 15000;
      else if (priceFilter === 'over-15000') matchesPrice = numericPrice > 15000;

      return matchesCategory && matchesSearch && matchesPopular && matchesPrice;
    });
  }, [selectedCategory, searchTerm, priceFilter, onlyPopular]);

  const getCategoryCount = (cat: string) => {
    if (cat === 'All') return SERVICES.length;
    return SERVICES.filter(s => s.category === cat).length;
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if scrolling Down or Up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowFilter(false); // Hide on scroll down
      } else {
        setShowFilter(true); // Show on scroll up
      }

      setIsFilterSticky(currentScrollY > 100);
      lastScrollY.current = currentScrollY;
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

  const handleCategorySelect = (cat: any) => {
    if (cat === selectedCategory) return;
    setSelectedCategory(cat);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setPriceFilter('all');
    setOnlyPopular(false);
  };

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
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
            <div className={`sticky z-40 transition-all duration-500 py-3 md:py-6 ${isFilterSticky ? 'bg-[#fcfaf7]/95 backdrop-blur-3xl border-b border-[#ede3da] shadow-md' : 'bg-transparent'} ${showFilter ? 'top-[70px] md:top-[80px]' : '-top-40'}`}>
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
                          onClick={() => handleServiceClick(service)}
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
                              alt={service.altText || service.title}
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

            <ServiceModal
              service={selectedService}
              isOpen={!!selectedService}
              onClose={() => setSelectedService(null)}
            />

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Services;
