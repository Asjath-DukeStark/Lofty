
import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, Clock, Check, ChevronLeft, ArrowRight, Sparkles, ReceiptText, ShoppingBag, MessageCircle } from 'lucide-react';
import { SERVICES, CONTACT_INFO } from '../constants';
import { ServiceCategory, Service } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import PageLoader from '../components/PageLoader';

const Booking: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isInitializing, setIsInitializing] = useState(false);

  // Form State
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('Morning (09:00 - 12:00)');
  const [userName, setUserName] = useState('');
  const [userNotes, setUserNotes] = useState('');
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error' | 'no_url'>('idle');

  const navigate = useNavigate();
  const location = useLocation();
  const categories = Object.values(ServiceCategory);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitializing(false), 1200);

    // Check for pre-selected service from navigation state
    const state = location.state as { serviceId?: string } | null;
    if (state?.serviceId) {
      setSelectedServices([state.serviceId]);
    }

    return () => clearTimeout(timer);
  }, [location.state]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const toggleService = (id: string) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const selectedData = useMemo(() => {
    return SERVICES.filter(s => selectedServices.includes(s.id));
  }, [selectedServices]);

  const totals = useMemo(() => {
    const price = selectedData.reduce((acc, s) => {
      const p = parseInt(s.price.replace('LKR', '').trim());
      return acc + (isNaN(p) ? 0 : p);
    }, 0);

    const duration = selectedData.reduce((acc, s) => {
      const d = parseInt(s.duration.split(' ')[0]);
      return acc + (isNaN(d) ? 0 : d);
    }, 0);

    return { price, duration };
  }, [selectedData]);

  const getSafeDate = () => {
    if (bookingDate) return bookingDate;
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const generateGoogleCalendarLink = () => {
    const safeDate = getSafeDate();
    const dateStr = safeDate.replace(/-/g, ''); // "YYYYMMDD"
    let startHour = "09";
    let endHour = "12";
    
    if (bookingTime.includes("Midday")) {
      startHour = "12";
      endHour = "15";
    } else if (bookingTime.includes("Late")) {
      startHour = "15";
      endHour = "19";
    }
    
    const dates = `${dateStr}T${startHour}0000/${dateStr}T${endHour}0000`;
    const title = `Lofty Booking: ${userName || 'Client'} (${selectedData.map(s => s.title).join(', ')})`;
    const details = `🌟 LOFTY BEAUTY RESERVATION 🌟\n\n• Client Name: ${userName || 'Not specified'}\n• Services: ${selectedData.map(s => `${s.title} (LKR ${s.price.replace(/LKR/g, '').trim()})`).join(', ')}\n• Total Investment: LKR ${totals.price}\n• Duration: ~${totals.duration} min\n• Notes: ${userNotes || 'None'}\n\nLocation: 73/2 AVV Road, Akkaraipattu 19, Sri Lanka`;

    const baseUrl = 'https://calendar.google.com/calendar/render';
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: title,
      dates: dates,
      details: details,
      location: '73/2 AVV Road, Akkaraipattu 19, Sri Lanka',
      ctz: 'Asia/Colombo'
    });
    
    return `${baseUrl}?${params.toString()}`;
  };

  const syncToGoogleCalendar = async () => {
    const url = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
    if (!url) {
      setSyncStatus('no_url');
      return;
    }

    setSyncStatus('syncing');

    const safeDate = getSafeDate();
    let startHour = "09:00:00";
    let endHour = "12:00:00";
    
    if (bookingTime.includes("Midday")) {
      startHour = "12:00:00";
      endHour = "15:00:00";
    } else if (bookingTime.includes("Late")) {
      startHour = "15:00:00";
      endHour = "19:00:00";
    }
    
    const startTimeIso = `${safeDate}T${startHour}`;
    const endTimeIso = `${safeDate}T${endHour}`;

    try {
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: JSON.stringify({
          name: userName || 'Client',
          services: selectedData.map(s => s.title).join(', '),
          price: totals.price.toString(),
          duration: totals.duration.toString(),
          notes: userNotes || 'None',
          startTime: startTimeIso,
          endTime: endTimeIso
        })
      });
      console.log("Calendar sync triggered in background");
      setSyncStatus('success');
    } catch (e) {
      console.error("Error triggering calendar sync:", e);
      setSyncStatus('error');
    }
  };

  const generateWhatsAppLink = () => {
    const cleanPhone = CONTACT_INFO.phone.replace(/[^0-9]/g, '');
    const serviceList = selectedData.map(s => `• ${s.title} (${s.price})`).join('\n');
    const safeDate = getSafeDate();
    // const calLink = generateGoogleCalendarLink(); // Temporarily disabled backup calendar link

    const message = `Hello Lofty Beauty! I'd like to book a ritual journey.

*Rituals:*
${serviceList}

*Details:*
• Date: ${safeDate}
• Time: ${bookingTime}
• Name: ${userName || 'Not specified'}
• Total: LKR ${totals.price}
• Duration: ~${totals.duration} min

*Notes:* 
${userNotes || 'None'}

I'm looking forward to my visit!`;

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  const handleFinalConfirm = () => {
    setStep(3);
    
    // Trigger background sync to Google Calendar
    syncToGoogleCalendar();

    const link = generateWhatsAppLink();
    // Open WhatsApp in a new tab
    window.open(link, '_blank');
  };

  return (
    <div className="bg-[#fcfaf7] min-h-screen pt-28 md:pt-40 pb-48 md:pb-32">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <AnimatePresence mode="wait">
          {isInitializing ? (
            <PageLoader key="loader" label="Preparing Sanctuary" />
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center mb-10 md:mb-16">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[#a89078] uppercase tracking-[0.4em] text-[9px] md:text-[10px] font-bold mb-3 block"
                >
                  Reservation
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-6xl font-serif text-[#2d1b10] mb-6 italic leading-tight"
                >
                  {step === 3 ? 'Journey Initialized' : 'Secure Your Journey'}
                </motion.h1>

                <div className="flex justify-center items-center gap-4 md:gap-6">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="flex items-center gap-4">
                      <motion.div
                        animate={step === num ? { scale: 1.15, boxShadow: "0 10px 25px -5px rgba(45,27,16,0.2)" } : { scale: 1 }}
                        className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${step === num ? 'bg-[#2d1b10] text-white' : 'bg-[#ede3da] text-[#a89078]'
                          }`}>
                        {num}
                      </motion.div>
                      {num < 3 && <div className="w-8 md:w-12 h-[1px] bg-[#ede3da]"></div>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] shadow-xl md:shadow-2xl p-6 md:p-16 border border-[#ede3da] min-h-[450px] relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8 md:space-y-12 pb-16"
                    >
                      <div className="flex justify-between items-center md:items-end">
                        <h2 className="text-2xl md:text-3xl font-serif text-[#2d1b10]">Select Services</h2>
                        <div className="flex flex-col items-end">
                          <span className="text-[9px] uppercase tracking-widest text-[#a89078] font-bold">Menu</span>
                          <span className="text-[10px] text-[#2d1b10] italic">{SERVICES.length} Options</span>
                        </div>
                      </div>

                      <div className="space-y-10 md:space-y-12">
                        {categories.map((cat) => {
                          const catServices = SERVICES.filter(s => s.category === cat);
                          if (catServices.length === 0) return null;

                          return (
                            <div key={cat} className="space-y-4 md:space-y-5">
                              <h3 className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-[#a89078] border-b border-[#f7f1eb] pb-2 flex items-center gap-3">
                                <Sparkles size={10} className="opacity-50" /> {cat}
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                {catServices.map((s) => {
                                  const isSelected = selectedServices.includes(s.id);
                                  return (
                                    <motion.button
                                      key={s.id}
                                      whileTap={{ scale: 0.97 }}
                                      onClick={() => toggleService(s.id)}
                                      className={`group flex items-center justify-between p-5 md:p-6 rounded-2xl border transition-all duration-500 text-left min-h-[72px] ${isSelected
                                        ? 'border-[#2d1b10] bg-[#2d1b10] text-white shadow-lg'
                                        : 'border-[#ede3da] hover:border-[#a89078] bg-white text-[#2d1b10]'
                                        }`}
                                    >
                                      <div className="pr-4">
                                        <p className="font-bold text-[12px] md:text-sm uppercase tracking-wide leading-tight mb-1">{s.title}</p>
                                        <p className={`text-[9px] md:text-[10px] uppercase tracking-widest ${isSelected ? 'text-white/60' : 'text-[#a89078]'}`}>
                                          {s.duration} • {s.price}
                                        </p>
                                      </div>
                                      <div className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center transition-all ${isSelected ? 'bg-white text-[#2d1b10]' : 'border border-[#ede3da] text-transparent group-hover:border-[#a89078]'
                                        }`}>
                                        <Check size={14} strokeWidth={3} />
                                      </div>
                                    </motion.button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Floating Ritual Island */}
                      <AnimatePresence>
                        {selectedServices.length > 0 && (
                          <motion.div
                            initial={{ y: 150, opacity: 0, x: "-50%" }}
                            animate={{ y: 0, opacity: 1, x: "-50%" }}
                            exit={{ y: 150, opacity: 0, x: "-50%" }}
                            className="fixed bottom-[110px] left-1/2 w-[94%] md:w-auto md:min-w-[550px] bg-[#2d1b10]/40 backdrop-blur-[20px] backdrop-saturate-150 border border-white/10 rounded-full p-2 flex items-center justify-between shadow-[0_15px_35px_-10px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.15)] z-[150]"
                          >
                            <div className="flex items-center gap-4 md:gap-8 ml-4 md:ml-8">
                              <div className="flex flex-col">
                                <span className="text-[8px] uppercase tracking-widest font-bold text-white/40">Services</span>
                                <span className="text-sm md:text-lg font-serif text-white">{selectedServices.length}</span>
                              </div>
                              <div className="h-6 w-[1px] bg-white/20"></div>
                              <div className="flex flex-col">
                                <span className="text-[8px] uppercase tracking-widest font-bold text-white/40">Total</span>
                                <span className="text-sm md:text-lg font-serif text-white">LKR {totals.price}</span>
                              </div>
                            </div>

                            <button
                              onClick={() => setStep(2)}
                              className="bg-white text-[#2d1b10] px-7 md:px-12 py-3.5 md:py-4.5 rounded-full font-bold uppercase tracking-[0.25em] text-[10px] transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl hover:bg-[#fcfaf7]"
                            >
                              Continue <ArrowRight size={14} />
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8 md:space-y-10"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                        <h2 className="text-2xl md:text-3xl font-serif text-[#2d1b10]">Personal Details</h2>
                        <div className="text-left md:text-right bg-[#f7f1eb] md:bg-transparent px-4 py-2 md:p-0 rounded-xl w-full md:w-auto">
                          <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-[#a89078] font-bold">Summary</p>
                          <p className="text-base md:text-lg font-serif italic text-[#2d1b10]">LKR {totals.price} • {totals.duration} min</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <div className="space-y-2">
                          <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-[#a89078] ml-2">Preferred Date</label>
                          <input
                            type="date"
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            className="w-full bg-[#fcfaf7] border border-[#ede3da] rounded-xl px-6 py-4 outline-none focus:ring-1 focus:ring-[#2d1b10] text-sm appearance-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-[#a89078] ml-2">Time Slot</label>
                          <select
                            value={bookingTime}
                            onChange={(e) => setBookingTime(e.target.value)}
                            className="w-full bg-[#fcfaf7] border border-[#ede3da] rounded-xl px-6 py-4 outline-none text-sm appearance-none"
                          >
                            <option>Morning (09:00 - 12:00)</option>
                            <option>Midday (12:00 - 15:00)</option>
                            <option>Late (15:00 - 19:00)</option>
                          </select>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-[#a89078] ml-2">Name</label>
                          <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full bg-[#fcfaf7] border border-[#ede3da] rounded-xl px-6 py-4 outline-none focus:ring-1 focus:ring-[#2d1b10] text-sm"
                            placeholder="How shall we address you?"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-[#a89078] ml-2">Notes</label>
                          <textarea
                            rows={3}
                            value={userNotes}
                            onChange={(e) => setUserNotes(e.target.value)}
                            className="w-full bg-[#fcfaf7] border border-[#ede3da] rounded-xl px-6 py-4 outline-none focus:ring-1 focus:ring-[#2d1b10] resize-none text-sm placeholder:opacity-40"
                            placeholder="Skin concerns or style preferences..."
                          />
                        </div>
                      </div>

                      <div className="flex flex-col-reverse md:flex-row gap-4 pt-6 md:pt-10">
                        <button onClick={() => setStep(1)} className="w-full md:flex-1 bg-[#f7f1eb] text-[#2d1b10] py-5 md:py-6 rounded-2xl font-bold uppercase tracking-widest text-[9px] md:text-[10px] flex items-center justify-center gap-2 hover:bg-[#ede3da] transition-all active:scale-95"><ChevronLeft size={16} /> Edit Rituals</button>
                        <button onClick={handleFinalConfirm} className="w-full md:flex-[2] bg-[#2d1b10] text-white py-5 md:py-6 rounded-2xl font-bold uppercase tracking-widest text-[9px] md:text-[10px] shadow-xl active:scale-95 transition-all">Confirm Journey</button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-10 md:space-y-12"
                    >
                      <div className="text-center py-4 md:py-6 space-y-6">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-[#2d1b10] text-white rounded-full flex items-center justify-center mx-auto shadow-2xl mb-6 md:mb-8">
                          <Check strokeWidth={1.5} size={36} className="md:w-10 md:h-10" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-serif text-[#2d1b10] italic leading-tight">Ritual Prepared</h2>
                        <p className="text-[#5c4a3e] max-w-sm mx-auto font-light text-sm md:text-base leading-relaxed italic opacity-80 px-4">
                          We have opened WhatsApp to finalize your session. If it didn't open automatically, please click below.
                        </p>
                      </div>

                      <div className="bg-[#fcfaf7] rounded-3xl p-6 md:p-12 border border-[#ede3da] shadow-inner">
                        <div className="flex items-center gap-3 mb-6 md:mb-8 border-b border-[#ede3da] pb-4">
                          <ReceiptText size={16} className="text-[#a89078]" />
                          <h4 className="text-[9px] md:text-[11px] uppercase tracking-[0.4em] font-bold text-[#2d1b10]">Summary</h4>
                        </div>

                        <div className="space-y-4">
                          {selectedData.map((s, i) => (
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + (i * 0.1) }}
                              key={s.id}
                              className="flex justify-between items-center"
                            >
                              <div className="flex items-center gap-3 pr-4">
                                <div className="w-1 h-1 rounded-full bg-[#a89078] shrink-0"></div>
                                <span className="text-[11px] md:text-sm font-bold text-[#2d1b10] uppercase tracking-wide truncate">{s.title}</span>
                              </div>
                              <span className="text-[10px] md:text-xs text-[#a89078] font-light italic whitespace-nowrap">{s.price}</span>
                            </motion.div>
                          ))}

                          <div className="border-t border-[#ede3da] pt-6 mt-6 flex justify-between items-baseline">
                            <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#a89078]">Investment</span>
                            <span className="text-2xl md:text-3xl font-serif text-[#2d1b10]">LKR {totals.price}</span>
                          </div>
                        </div>
                      </div>

                      {/* Calendar Sync Status Feedback */}
                      {syncStatus !== 'idle' && (
                        <div className="max-w-md mx-auto text-center py-4 px-6 rounded-2xl border text-xs md:text-sm font-medium transition-all shadow-sm bg-white border-[#ede3da] space-y-1">
                          {syncStatus === 'syncing' && (
                            <div className="text-[#a89078] flex items-center justify-center gap-3 py-1">
                              <span className="w-4 h-4 border-2 border-[#a89078] border-t-transparent rounded-full animate-spin"></span>
                              <span className="font-semibold uppercase tracking-wider text-[10px]">Syncing sanctuary calendar...</span>
                            </div>
                          )}
                          {syncStatus === 'success' && (
                            <div className="text-[#2b5c3f] flex flex-col items-center gap-1">
                              <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-[10px] text-[#2b5c3f]">
                                <Check size={12} className="stroke-[3px]" /> Event Auto-Synced
                              </div>
                              <p className="text-[11px] text-[#5c7a65] font-light italic">
                                Your business calendar has been automatically updated with a 2-hour reminder!
                              </p>
                            </div>
                          )}
                          {syncStatus === 'error' && (
                            <div className="text-[#842029] flex flex-col items-center gap-1">
                              <div className="font-bold uppercase tracking-wider text-[10px] text-[#842029]">
                                ⚠️ Sync Notice
                              </div>
                              <p className="text-[11px] text-[#a04e56] font-light italic">
                                Background sync was attempted. Please check your calendar in a few moments if the event is not visible yet.
                              </p>
                            </div>
                          )}
                          {syncStatus === 'no_url' && (
                            <div className="text-[#5c4a3e] flex flex-col items-center gap-1">
                              <div className="font-bold uppercase tracking-wider text-[10px] text-[#a89078]">
                                💡 Setup Auto-Sync
                              </div>
                              <p className="text-[11px] text-[#8c786a] font-light italic">
                                Configure VITE_GOOGLE_SCRIPT_URL in .env to automate booking entries & alerts!
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex flex-col gap-3 pt-4">
                        <a
                          href={generateWhatsAppLink()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full px-8 py-6 bg-[#25D366] text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#128C7E] transition-all flex items-center justify-center gap-4 active:scale-95 shadow-xl"
                        >
                          <MessageCircle size={18} /> Send via WhatsApp
                        </a>
                        <button
                          onClick={() => navigate('/')}
                          className="w-full px-8 py-5 text-[#a89078] rounded-full text-[10px] font-bold uppercase tracking-widest hover:text-[#2d1b10] transition-all active:scale-95"
                        >
                          Return Home
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Booking;
