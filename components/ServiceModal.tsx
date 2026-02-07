
import React, { useEffect } from 'react';
import { Service } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Tag, ArrowRight, Sparkle, LayoutGrid } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ServiceModalProps {
    service: Service | null;
    isOpen: boolean;
    onClose: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, isOpen, onClose }) => {
    const navigate = useNavigate();

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleBookNow = () => {
        if (service) {
            onClose(); // Close modal first
            navigate('/booking', { state: { serviceId: service.id } });
        }
    };

    return (
        <AnimatePresence>
            {isOpen && service && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-[#2d1b10]/40 backdrop-blur-[12px] z-[100] cursor-pointer"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                            className="bg-[#fcfaf7]/90 backdrop-blur-3xl backdrop-saturate-150 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-white/40 pointer-events-auto relative flex flex-col md:flex-row overflow-hidden"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur rounded-full text-[#2d1b10] hover:bg-[#2d1b10] hover:text-white transition-all shadow-sm"
                            >
                                <X size={20} />
                            </button>

                            {/* Image Section */}
                            <div className="w-full md:w-5/12 lg:w-1/2 h-64 md:h-auto relative shrink-0">
                                <img
                                    src={service.image}
                                    alt={service.altText || service.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#2d1b10]/50 to-transparent" />
                                {service.isPopular && (
                                    <div className="absolute top-6 left-6 bg-[#fcfaf7] text-[#2d1b10] px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                                        <Sparkle size={10} className="text-[#a89078]" /> Best Seller
                                    </div>
                                )}
                            </div>

                            {/* Content Section */}
                            <div className="w-full md:w-7/12 lg:w-1/2 p-6 md:p-10 lg:p-12 flex flex-col h-full overflow-y-auto">
                                <div className="mb-6">
                                    <div className="flex items-center gap-2 text-[#a89078] mb-3">
                                        <LayoutGrid size={12} />
                                        <span className="font-bold uppercase tracking-[0.2em] text-[10px]">
                                            {service.category}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-serif text-[#2d1b10] mb-4 leading-tight italic">
                                        {service.title}
                                    </h2>
                                    <div className="h-0.5 w-16 bg-[#a89078]/30" />
                                </div>

                                <p className="text-[#5c4a3e] text-sm md:text-base leading-relaxed font-light italic mb-8 grow">
                                    {service.description}
                                </p>

                                <div className="grid grid-cols-2 gap-4 mb-8 border-y border-[#ede3da] py-6">
                                    <div>
                                        <div className="flex items-center gap-2 text-[#a89078] mb-1">
                                            <Clock size={12} />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">Duration</span>
                                        </div>
                                        <p className="text-lg md:text-xl font-serif text-[#2d1b10]">{service.duration}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 text-[#a89078] mb-1">
                                            <Tag size={12} />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">Investment</span>
                                        </div>
                                        <p className="text-lg md:text-xl font-serif text-[#2d1b10]">{service.price}</p>
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <button
                                        onClick={handleBookNow}
                                        className="w-full bg-[#2d1b10] text-white px-8 py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-[#3d2b1f] transition-all group shadow-lg hover:shadow-xl active:scale-95 duration-200"
                                    >
                                        <span className="text-xs font-bold uppercase tracking-[0.2em]">Book Appointment</span>
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ServiceModal;
