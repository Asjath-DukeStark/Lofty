
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SERVICES } from '../constants';
import { ArrowRight, Clock, Tag, ChevronLeft, Sparkle, CheckCircle2, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ServiceDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const service = SERVICES.find(s => s.slug === slug);
    const [showSuccessToast, setShowSuccessToast] = React.useState(false);

    useEffect(() => {
        if (service) {
            document.title = `${service.title} - Lofty Beauty Parlor Akkaraipattu`;
            // Update meta description
            let metaDescription = document.querySelector('meta[name="description"]');
            if (!metaDescription) {
                metaDescription = document.createElement('meta');
                metaDescription.setAttribute('name', 'description');
                document.head.appendChild(metaDescription);
            }
            metaDescription.setAttribute('content', `Professional ${service.title} at Lofty Beauty Parlor in Akkaraipattu. ${service.description}`);
        }
    }, [service]);

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fcfaf7]">
                <div className="text-center">
                    <h2 className="text-2xl font-serif text-[#2d1b10] mb-4">Service Not Found</h2>
                    <button
                        onClick={() => navigate('/services')}
                        className="text-[#a89078] hover:text-[#2d1b10] underline"
                    >
                        Back to Menu
                    </button>
                </div>
            </div>
        );
    }

    const handleReserve = () => {
        navigate('/booking', { state: { serviceId: service.id } });
    };

    return (
        <div className="min-h-screen bg-[#fcfaf7] pt-24 pb-20">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-7xl mx-auto px-4 md:px-8"
            >
                <button
                    onClick={() => navigate('/services')}
                    className="flex items-center gap-2 text-[#a89078] hover:text-[#2d1b10] transition-colors mb-8 group"
                >
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="uppercase tracking-widest text-xs font-bold">Back to Menu</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="aspect-[4/5] lg:aspect-square rounded-[3rem] overflow-hidden shadow-2xl relative"
                    >
                        <img
                            src={service.image}
                            alt={service.altText || service.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2d1b10]/40 to-transparent opacity-60" />

                        {service.isPopular && (
                            <div className="absolute top-8 left-8 bg-[#fcfaf7] text-[#2d1b10] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg flex items-center gap-2">
                                <Sparkle size={14} className="text-[#a89078]" /> Best Seller
                            </div>
                        )}
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col justify-center h-full pt-8 lg:pt-20"
                    >
                        <div className="mb-6">
                            <span className="text-[#a89078] font-bold uppercase tracking-[0.4em] text-xs block mb-4">
                                {service.category}
                            </span>
                            <h1 className="text-5xl md:text-7xl font-serif text-[#2d1b10] mb-8 leading-tight italic">
                                {service.title}
                            </h1>
                            <div className="h-0.5 w-24 bg-[#a89078]/30 mb-8" />
                        </div>

                        <p className="text-[#5c4a3e] text-lg md:text-xl leading-relaxed font-light italic mb-12 max-w-xl">
                            {service.description}
                        </p>

                        <div className="grid grid-cols-2 gap-8 mb-16 border-y border-[#ede3da] py-8">
                            <div>
                                <div className="flex items-center gap-3 text-[#a89078] mb-2">
                                    <Clock size={16} />
                                    <span className="text-xs font-bold uppercase tracking-widest">Duration</span>
                                </div>
                                <p className="text-2xl font-serif text-[#2d1b10]">{service.duration}</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-3 text-[#a89078] mb-2">
                                    <Tag size={16} />
                                    <span className="text-xs font-bold uppercase tracking-widest">Investment</span>
                                </div>
                                <p className="text-2xl font-serif text-[#2d1b10]">{service.price}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <button
                                onClick={handleReserve}
                                className="w-full md:w-auto bg-[#2d1b10] text-white px-10 py-6 rounded-2xl flex items-center justify-center gap-4 hover:bg-[#3d2b1f] transition-all group shadow-xl hover:shadow-2xl"
                            >
                                <span className="text-xs font-bold uppercase tracking-[0.3em]">Book Appointment</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <p className="text-center md:text-left text-[10px] text-[#a89078] uppercase tracking-widest opacity-60">
                                Exclusive service at Lofty Beauty Parlor, Akkaraipattu
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default ServiceDetail;
