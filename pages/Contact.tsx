
import React, { useState, useEffect } from 'react';
import { CONTACT_INFO } from '../constants';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageLoader from '../components/PageLoader';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitializing(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = CONTACT_INFO.phone.replace(/[^0-9]/g, '');
    const wsMessage = `Hello Lofty Beauty! I'd like to send a request.\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Message:* ${message}`;
    const link = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(wsMessage)}`;
    window.open(link, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-32">
      <AnimatePresence mode="wait">
        {isInitializing ? (
          <PageLoader key="loader" label="Establishing Access" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-20">
              <span className="text-[#a89078] uppercase tracking-[0.5em] text-[10px] font-bold mb-4 block">Access</span>
              <h1 className="text-5xl md:text-7xl font-serif mb-8 text-[#2d1b10] italic">The Connection</h1>
              <p className="text-[#5c4a3e] max-w-2xl mx-auto text-lg leading-relaxed font-light opacity-80">
                Questions about a specific ritual or private booking? Our concierge is available for personalized assistance.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              {/* Contact Info */}
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { icon: Phone, label: "Call Us", value: CONTACT_INFO.phone },
                    { icon: Mail, label: "Email Us", value: CONTACT_INFO.email },
                    { icon: MapPin, label: "Find Us", value: CONTACT_INFO.address, full: true }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`bg-[#fcfaf7]/60 backdrop-blur-[20px] backdrop-saturate-150 p-10 rounded-[2.5rem] border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all ${item.full ? 'md:col-span-2' : ''}`}
                    >
                      <div className="w-14 h-14 bg-[#fcfaf7] rounded-2xl flex items-center justify-center text-[#2d1b10] border border-[#ede3da] mb-8">
                        <item.icon size={24} strokeWidth={1.5} />
                      </div>
                      <h3 className="font-bold uppercase tracking-[0.3em] text-[10px] text-[#a89078] mb-3">{item.label}</h3>
                      <p className="text-[#2d1b10] font-serif text-lg italic break-all">{item.value}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#fcfaf7]/60 backdrop-blur-[20px] backdrop-saturate-150 rounded-[3rem] shadow-[0_30px_80px_-20px_rgba(45,27,16,0.15)] p-10 md:p-16 border border-white/20"
              >
                <h2 className="text-3xl font-serif mb-10 text-[#2d1b10]">Send a Request</h2>

                {submitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-8 py-20">
                    <div className="w-24 h-24 bg-[#f7f1eb] text-[#2d1b10] rounded-full flex items-center justify-center shadow-xl">
                      <CheckCircle2 size={40} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-3xl font-serif">Ritual Received</h3>
                    <p className="text-[#5c4a3e] font-light opacity-80 leading-relaxed">Thank you. Our artisans will respond within one business day.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#a89078]">Full Name</label>
                        <input
                          required
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-[#fcfaf7] border border-[#ede3da] rounded-2xl px-8 py-5 outline-none focus:ring-1 focus:ring-[#2d1b10] font-light"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#a89078]">Phone Number</label>
                        <input
                          required
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-[#fcfaf7] border border-[#ede3da] rounded-2xl px-8 py-5 outline-none focus:ring-1 focus:ring-[#2d1b10] font-light"
                          placeholder="+94 7X XXX XXXX"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#a89078]">Message</label>
                      <textarea
                        required
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-[#fcfaf7] border border-[#ede3da] rounded-3xl px-8 py-6 outline-none focus:ring-1 focus:ring-[#2d1b10] resize-none font-light"
                        placeholder="How can we assist your beauty journey?"
                      ></textarea>
                    </div>
                    <button type="submit" className="w-full bg-[#2d1b10] text-white py-6 rounded-2xl font-bold uppercase tracking-[0.3em] text-[11px] flex items-center justify-center gap-4 hover:bg-[#3d2b1f] transition-all shadow-2xl active:scale-95">
                      Dispatch Message <Send size={18} strokeWidth={1.5} />
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;
