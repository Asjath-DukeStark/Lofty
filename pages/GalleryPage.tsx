
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const GALLERY_IMAGES = [
    {
        src: '/images/gallery/aesthetic-makeup-beauty-portfolio.jpg',
        alt: 'Professional Makeup & Beauty Portfolio - Lofty Beauty Parlor',
        title: 'Makeup Artistry',
        category: 'Makeup'
    },
    {
        src: '/images/gallery/eyebrow-threading-artist-studio.jpg',
        alt: 'Eyebrow Threading & Shaping - Precision Brow Art',
        title: 'Precision Brows',
        category: 'Threading'
    },
    {
        src: '/images/gallery/hair-salon-styling-session.jpg',
        alt: 'Advanced Hair Styling & Personal Branding',
        title: 'Hair Styling',
        category: 'Hair'
    },
    {
        src: '/images/gallery/professional-threading-service.jpg',
        alt: 'Expert Threading Techniques',
        title: 'Threading Expert',
        category: 'Threading'
    },
    {
        src: '/images/gallery/lofty-beauty-parlor-interior-1.jpg',
        alt: 'Lofty Beauty Parlor - Elegant Interior & Ambiance',
        title: 'Main Salon',
        category: 'Interior'
    },
    {
        src: '/images/gallery/lofty-beauty-parlor-interior-2.jpg',
        alt: 'Relaxing Facial Treatment Room',
        title: 'Treatment Room',
        category: 'Interior'
    },
    {
        src: '/images/gallery/lofty-beauty-facial-treatment.jpg',
        alt: 'Rejuvenating Facial Treatments',
        title: 'Facial Therapy',
        category: 'Skin Care'
    },
    {
        src: '/images/gallery/lofty-beauty-hair-treatment.jpg',
        alt: 'Keratin & Deep Conditioning Hair Treatments',
        title: 'Hair Care',
        category: 'Hair'
    },
];

const Gallery: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#fcfaf7] pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-[#a89078] uppercase tracking-[0.8em] text-xs font-bold mb-4 block">
                        Our Portfolio
                    </span>
                    <h1 className="text-5xl md:text-8xl font-serif text-[#2d1b10] mb-8 italic">
                        Visual <br /> <span className="not-italic font-light opacity-80">Stories</span>
                    </h1>
                    <div className="h-[1px] w-12 bg-[#a89078]/50 mx-auto" />
                </motion.div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {GALLERY_IMAGES.map((image, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2d1b10]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <p className="text-[#fcfaf7] font-serif text-xl italic mb-1">{image.title}</p>
                                <div className="flex items-center gap-2 text-[#a89078] text-[10px] uppercase tracking-widest">
                                    <MapPin size={12} /> {image.category}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Gallery;
