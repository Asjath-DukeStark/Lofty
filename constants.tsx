
import React from 'react';
import { Service, ServiceCategory, Testimonial } from './types';

export const SERVICES: Service[] = [
  // --- SKIN CARE SERVICES ---
  {
    id: 's0',
    title: 'Skin Care Advice',
    slug: 'skin-care-advice',
    description: 'Expert consultation and personalized advice for your skincare routine.',
    price: 'Free',
    duration: '-',
    category: ServiceCategory.SKIN,
    image: '/images/new_services/skin-care-advice-lofty-beauty-parlor-akkaraipattu.jpg',
    altText: 'Professional Skin Care Advice at Lofty Beauty Parlor in Akkaraipattu'
  },
  {
    id: 's1',
    title: 'Clean Up',
    slug: 'clean-up',
    description: 'A quick yet effective deep cleansing treatment to refresh your skin.',
    price: 'LKR 3000',
    duration: '30 min',
    category: ServiceCategory.SKIN,
    image: '/images/new_services/clean-up-lofty-beauty-parlor-akkaraipattu.jpg',
    altText: 'Professional Clean Up at Lofty Beauty Parlor in Akkaraipattu'
  },
  {
    id: 's2',
    title: 'Normal Facial',
    slug: 'normal-facial',
    description: 'A classic facial treatment to maintain healthy and glowing skin.',
    price: 'LKR 3600',
    duration: '45 min',
    category: ServiceCategory.SKIN,
    image: '/images/new_services/normal-facial-lofty-beauty-parlor-akkaraipattu.jpg',
    altText: 'Professional Normal Facial at Lofty Beauty Parlor in Akkaraipattu'
  },
  {
    id: 's3',
    title: 'Whitening Facial',
    slug: 'whitening-facial',
    description: 'Designed to brighten your complexion and even out skin tone.',
    price: 'LKR 4500',
    duration: '80 min',
    category: ServiceCategory.SKIN,
    image: '/images/new_services/whitening-facial-lofty-beauty-parlor-akkaraipattu.jpg',
    isPopular: true,
    altText: 'Professional Whitening Facial at Lofty Beauty Parlor in Akkaraipattu'
  },
  {
    id: 's4',
    title: 'High-Frequency Special Facial',
    slug: 'high-frequency-special-facial',
    description: 'Advanced treatment using high-frequency technology for skin rejuvenation.',
    price: 'LKR 4000',
    duration: '45 min',
    category: ServiceCategory.SKIN,
    image: '/images/new_services/high-frequency-special-facial-lofty-beauty-parlor-akkaraipattu.jpg',
    altText: 'Professional High-Frequency Special Facial at Lofty Beauty Parlor in Akkaraipattu'
  },
  {
    id: 's5',
    title: 'Pimple Treatment',
    slug: 'pimple-treatment',
    description: 'Targeted care to reduce breakouts and soothe irritated skin.',
    price: 'LKR 5000',
    duration: '60 min',
    category: ServiceCategory.SKIN,
    image: '/images/new_services/pimple-treatment-lofty-beauty-parlor-akkaraipattu.jpg',
    altText: 'Professional Pimple Treatment at Lofty Beauty Parlor in Akkaraipattu'
  },
  {
    id: 's6',
    title: 'Acne Treatment (High-Frequency)',
    slug: 'acne-treatment-high-frequency',
    description: 'Professional acne care combined with high-frequency technology for optimal results.',
    price: 'LKR 5000',
    duration: '60 min',
    category: ServiceCategory.SKIN,
    image: '/images/new_services/acne-treatment-high-frequency-lofty-beauty-parlor-akkaraipattu.jpg',
    altText: 'Professional Acne Treatment (High-Frequency) at Lofty Beauty Parlor in Akkaraipattu'
  },
  {
    id: 's7',
    title: 'Pigmentation Treatment',
    slug: 'pigmentation-treatment',
    description: 'Helps reduce the appearance of dark spots and uneven pigmentation.',
    price: 'LKR 5500',
    duration: '60 min',
    category: ServiceCategory.SKIN,
    image: '/images/new_services/pigmentation-treatment-lofty-beauty-parlor-akkaraipattu.jpg',
    altText: 'Professional Pigmentation Treatment at Lofty Beauty Parlor in Akkaraipattu'
  },
  {
    id: 's8',
    title: 'Galvanic Treatment',
    slug: 'galvanic-treatment',
    description: 'Uses galvanic current to deeply nourish and hydrate the skin layers.',
    price: 'LKR 6500',
    duration: '60 min',
    category: ServiceCategory.SKIN,
    image: '/images/new_services/galvanic-treatment-lofty-beauty-parlor-akkaraipattu.jpg',
    altText: 'Professional Galvanic Treatment at Lofty Beauty Parlor in Akkaraipattu'
  },
  {
    id: 's9',
    title: 'Dark Spot Removal',
    slug: 'dark-spot-removal',
    description: 'Precision treatment focused on eliminating stubborn dark spots.',
    price: 'LKR 4500',
    duration: '30 min',
    category: ServiceCategory.SKIN,
    image: '/images/new_services/dark-spot-removal-lofty-beauty-parlor-akkaraipattu.jpg',
    altText: 'Professional Dark Spot Removal at Lofty Beauty Parlor in Akkaraipattu'
  },
  {
    id: 's10',
    title: 'Gold Facial',
    slug: 'gold-facial',
    description: 'Indulge in luxury with our gold-infused anti-aging treatment.',
    price: 'LKR 6000',
    duration: '90 min',
    category: ServiceCategory.SKIN,
    image: '/images/new_services/gold-facial-lofty-beauty-parlor-akkaraipattu.jpg',
    isPopular: true,
    altText: 'Professional Gold Facial at Lofty Beauty Parlor in Akkaraipattu'
  },
  {
    id: 's11',
    title: 'Pearl Facial',
    slug: 'pearl-facial',
    description: 'Achieve a luminous, iridescent glow with pure pearl extracts.',
    price: 'LKR 7000',
    duration: '90 min',
    category: ServiceCategory.SKIN,
    image: '/images/new_services/pearl-facial-lofty-beauty-parlor-akkaraipattu.jpg',
    altText: 'Professional Pearl Facial at Lofty Beauty Parlor in Akkaraipattu'
  },
  {
    id: 's12',
    title: 'Silver Facial',
    slug: 'silver-facial',
    description: 'A cooling and detoxifying facial for a clear and balanced complexion.',
    price: 'LKR 7000',
    duration: '90 min',
    category: ServiceCategory.SKIN,
    image: '/images/new_services/silver-facial-lofty-beauty-parlor-akkaraipattu.jpg',
    altText: 'Professional Silver Facial at Lofty Beauty Parlor in Akkaraipattu'
  },
  {
    id: 's13',
    title: 'Hydra facial',
    slug: 'hydra-facial',
    description: 'Advanced medical-grade treatment that cleanses, detoxifies, exfoliates, and hydrates.',
    price: 'LKR 13000',
    duration: '120 min',
    category: ServiceCategory.SKIN,
    image: '/images/new_services/hydra-facial-lofty-beauty-parlor-akkaraipattu.jpg',
    altText: 'Professional Hydra facial at Lofty Beauty Parlor in Akkaraipattu'
  },

  // --- HAIR CARE SERVICES ---
  {
    id: 'h1',
    title: 'Hair Cutting (All Types)',
    slug: 'hair-cutting-all-types',
    description: 'Expert styling tailored to your face shape and personal style.',
    price: 'LKR 300 - 1800',
    duration: '-',
    category: ServiceCategory.HAIR,
    image: '/images/new_services/hair-cutting-all-types-lofty-beauty-parlor-akkaraipattu.jpg',
    isPopular: true,
    altText: 'Professional Hair Cutting (All Types) at Lofty Beauty Parlor in Akkaraipattu'
  },
  {
    id: 'h2',
    title: 'Shampoo & Conditioner',
    slug: 'shampoo-conditioner',
    description: 'Deep cleansing and intense conditioning for silky smooth hair.',
    price: 'LKR 3500',
    duration: '45 min',
    category: ServiceCategory.HAIR,
    image: '/images/new_services/shampoo-conditioner-lofty-beauty-parlor-akkaraipattu.jpg',
    altText: 'Professional Shampoo & Conditioner at Lofty Beauty Parlor in Akkaraipattu'
  },
  {
    id: 'h3',
    title: 'Dandruff Treatment',
    slug: 'dandruff-treatment',
    description: 'Targeted scalp care to eliminate dandruff and soothe itching.',
    price: 'LKR 5000',
    duration: '90 min',
    category: ServiceCategory.HAIR,
    image: '/images/new_services/dandruff-treatment-lofty-beauty-parlor-akkaraipattu.jpg',
    altText: 'Professional Dandruff Treatment at Lofty Beauty Parlor in Akkaraipattu'
  },
  {
    id: 'h4',
    title: 'Hot Oil Massage',
    slug: 'hot-oil-massage',
    description: 'A traditional and relaxing treatment to nourish roots and improve circulation.',
    price: 'LKR 5000',
    duration: '90 min',
    category: ServiceCategory.HAIR,
    image: '/images/new_services/hot-oil-massage-lofty-beauty-parlor-akkaraipattu.jpg',
    altText: 'Professional Hot Oil Massage at Lofty Beauty Parlor in Akkaraipattu'
  },
  {
    id: 'h5',
    title: 'Hair Spa',
    slug: 'hair-spa',
    description: 'The ultimate rejuvenation for tired and damaged hair.',
    price: 'LKR 5000',
    duration: '60 min',
    category: ServiceCategory.HAIR,
    image: '/images/new_services/hair-spa-lofty-beauty-parlor-akkaraipattu.jpg',
    isPopular: true,
    altText: 'Professional Hair Spa at Lofty Beauty Parlor in Akkaraipattu'
  },
  {
    id: 'h6',
    title: 'Henna Treatment',
    slug: 'henna-treatment',
    description: 'Natural coloring and conditioning for healthy, vibrant hair.',
    price: 'LKR 5500',
    duration: '120 min',
    category: ServiceCategory.HAIR,
    image: '/images/new_services/henna-treatment-lofty-beauty-parlor-akkaraipattu.jpg',
    altText: 'Professional Henna Treatment at Lofty Beauty Parlor in Akkaraipattu'
  },
  {
    id: 'h7',
    title: 'Hair Coloring',
    slug: 'hair-coloring',
    description: 'Professional color application, from subtle highlights to bold transformations.',
    price: 'LKR 4000 - 9000',
    duration: '120 min',
    category: ServiceCategory.HAIR,
    image: '/images/new_services/hair-coloring-lofty-beauty-parlor-akkaraipattu.jpg',
    altText: 'Professional Hair Coloring at Lofty Beauty Parlor in Akkaraipattu'
  },
  {
    id: 'h8',
    title: 'Perming',
    slug: 'perming',
    description: 'Add long-lasting volume and curls with our expert perming service.',
    price: 'LKR 8000',
    duration: '150 min',
    category: ServiceCategory.HAIR,
    image: '/images/new_services/perming-lofty-beauty-parlor-akkaraipattu.jpg',
    altText: 'Professional Perming at Lofty Beauty Parlor in Akkaraipattu'
  },
  {
    id: 'h9',
    title: 'Hair Ironing',
    slug: 'hair-ironing',
    description: 'Achieve sleek, perfectly straight hair with a professional finish.',
    price: 'LKR 18000 - 25000',
    duration: '240 min',
    category: ServiceCategory.HAIR,
    image: '/images/new_services/hair-ironing-lofty-beauty-parlor-akkaraipattu.jpg',
    altText: 'Professional Hair Ironing at Lofty Beauty Parlor in Akkaraipattu'
  },

  // --- HAND & FOOT CARE ---
  {
    id: 'n1',
    title: 'Manicure',
    slug: 'manicure',
    description: 'Elegant hand care including shape, cuticle work, and perfect polish.',
    price: 'LKR 5500',
    duration: '45 min',
    category: ServiceCategory.HAND_FOOT,
    image: '/images/new_services/manicure-lofty-beauty-parlor-akkaraipattu.jpg',
    altText: 'Professional Manicure at Lofty Beauty Parlor in Akkaraipattu'
  },
  {
    id: 'n2',
    title: 'Pedicure',
    slug: 'pedicure',
    description: 'The ultimate foot pamper including soak, scrub, and artistic finish.',
    price: 'LKR 6500',
    duration: '45 min',
    category: ServiceCategory.HAND_FOOT,
    image: '/images/new_services/pedicure-lofty-beauty-parlor-akkaraipattu.jpg',
    altText: 'Professional Pedicure at Lofty Beauty Parlor in Akkaraipattu'
  },

  // --- MAKEUP SERVICES ---
  {
    id: 'm1',
    title: 'Normal Makeup',
    slug: 'normal-makeup',
    description: 'A fresh and clean look for your everyday special moments.',
    price: 'LKR 3000',
    duration: '45 min',
    category: ServiceCategory.MAKEUP,
    image: '/images/new_services/normal-makeup-lofty-beauty-parlor-akkaraipattu.jpg',
    altText: 'Professional Normal Makeup at Lofty Beauty Parlor in Akkaraipattu'
  },
  {
    id: 'm2',
    title: 'Air Brush Makeup',
    slug: 'air-brush-makeup',
    description: 'High-definition, long-lasting makeup application for a flawless finish.',
    price: 'LKR 25000',
    duration: '180 min',
    category: ServiceCategory.MAKEUP,
    image: '/images/new_services/air-brush-makeup-lofty-beauty-parlor-akkaraipattu.jpg',
    altText: 'Professional Air Brush Makeup at Lofty Beauty Parlor in Akkaraipattu'
  },
  {
    id: 'm3',
    title: 'Mehndi Makeup',
    slug: 'mehndi-makeup',
    description: 'Vibrant and festive makeup perfect for your Mehndi celebrations.',
    price: 'LKR 16000',
    duration: '120 min',
    category: ServiceCategory.MAKEUP,
    image: '/images/new_services/mehndi-makeup-lofty-beauty-parlor-akkaraipattu.jpg',
    altText: 'Professional Mehndi Makeup at Lofty Beauty Parlor in Akkaraipattu'
  },
  {
    id: 'm4',
    title: 'Wedding Makeup',
    slug: 'wedding-makeup',
    description: 'A timeless and breathtaking look for your most special day.',
    price: 'LKR 22000',
    duration: '180 min',
    category: ServiceCategory.MAKEUP,
    image: '/images/new_services/wedding-makeup-lofty-beauty-parlor-akkaraipattu.jpg',
    isPopular: true,
    altText: 'Professional Wedding Makeup at Lofty Beauty Parlor in Akkaraipattu'
  },
  {
    id: 'm5',
    title: 'Walima Makeup',
    slug: 'walima-makeup',
    description: 'Elegant and sophisticated makeup for your Walima reception.',
    price: 'LKR 18000',
    duration: '150 min',
    category: ServiceCategory.MAKEUP,
    image: '/images/new_services/walima-makeup-lofty-beauty-parlor-akkaraipattu.jpg',
    altText: 'Professional Walima Makeup at Lofty Beauty Parlor in Akkaraipattu'
  },

  // --- BRIDAL & WEDDING SERVICES ---
  {
    id: 'b1',
    title: 'Rental Bridal Dress & Bouquet',
    slug: 'rental-bridal-dress-bouquet',
    description: 'A curated selection of premium bridal gowns and matching floral arrangements.',
    price: 'Available',
    duration: '-',
    category: ServiceCategory.BRIDAL,
    image: '/images/new_services/rental-bridal-dress-bouquet-lofty-beauty-parlor-akkaraipattu.jpg',
    altText: 'Professional Rental Bridal Dress & Bouquet at Lofty Beauty Parlor in Akkaraipattu'
  },
  {
    id: 'b2',
    title: 'Saree Wearing (7 Methods)',
    slug: 'saree-wearing-7-methods',
    description: 'Professional saree draping in seven elegant traditional and modern styles.',
    price: 'LKR 3000',
    duration: '60 min',
    category: ServiceCategory.BRIDAL,
    image: '/images/new_services/saree-wearing-7-methods-lofty-beauty-parlor-akkaraipattu.jpg',
    altText: 'Professional Saree Wearing (7 Methods) at Lofty Beauty Parlor in Akkaraipattu'
  },
  {
    id: 'b3',
    title: 'Customised Bouquet',
    slug: 'customised-bouquet',
    description: 'Bespoke floral arrangements tailored to your wedding theme.',
    price: 'LKR 5000 - 9000',
    duration: '-',
    category: ServiceCategory.BRIDAL,
    image: '/images/new_services/customised-bouquet-lofty-beauty-parlor-akkaraipattu.jpg',
    altText: 'Professional Customised Bouquet at Lofty Beauty Parlor in Akkaraipattu'
  },
  {
    id: 'b4',
    title: 'Bridal Car Decoration',
    slug: 'bridal-car-decoration',
    description: 'Elegant and festive floral styling for your bridal car.',
    price: 'LKR 1000 - 18000',
    duration: '-',
    category: ServiceCategory.BRIDAL,
    image: '/images/new_services/bridal-car-decoration-lofty-beauty-parlor-akkaraipattu.jpg',
    altText: 'Professional Bridal Car Decoration at Lofty Beauty Parlor in Akkaraipattu'
  },
  {
    id: 'b5',
    title: 'Wedding Cake',
    slug: 'wedding-cake',
    description: 'Designer wedding cakes that taste as beautiful as they look.',
    price: 'LKR 3000 - 20000',
    duration: '-',
    category: ServiceCategory.BRIDAL,
    image: '/images/new_services/wedding-cake-lofty-beauty-parlor-akkaraipattu.jpg',
    isPopular: true,
    altText: 'Professional Wedding Cake at Lofty Beauty Parlor in Akkaraipattu'
  },

  // --- MARAVA SERVICES ---
  {
    id: 'v1',
    title: 'Marava (Box Making)',
    slug: 'marava-box-making',
    description: 'Exquisite traditional Marava boxes, custom-made with intricate detail.',
    price: 'LKR 8000 - 100000',
    duration: '-',
    category: ServiceCategory.MARAVA,
    image: '/images/new_services/marava-box-making-lofty-beauty-parlor-akkaraipattu.jpg',
    altText: 'Professional Marava (Box Making) at Lofty Beauty Parlor in Akkaraipattu'
  },
  {
    id: 'v2',
    title: 'Marava Rental',
    slug: 'marava-rental',
    description: 'A selection of premium Marava boxes available for your ceremony.',
    price: 'LKR 500 - 5000',
    duration: '-',
    category: ServiceCategory.MARAVA,
    image: '/images/new_services/marava-rental-lofty-beauty-parlor-akkaraipattu.jpg',
    altText: 'Professional Marava Rental at Lofty Beauty Parlor in Akkaraipattu'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Alexandra Von S.',
    text: 'A very peaceful place in Colombo. The Clear Skin Facial is the best treatment I have ever had.',
    rating: 5
  },
  {
    id: 't2',
    name: 'Sophie L.',
    text: 'They really understand hair. My color and cut have never looked more healthy and bright.',
    rating: 5
  }
];

export const CONTACT_INFO = {
  address: '73/2 AVV Road, Akkaraipattu 19, Sri Lanka',
  phone: '+94 764336212',
  email: 'loftybeautyparlorandcare@gmail.com',
  hours: [
    { day: 'Mon - Fri', time: '09:00 - 19:00' },
    { day: 'Sat', time: '10:00 - 17:00' },
    { day: 'Sun', time: 'By Appointment Only' }
  ],
  socials: {
    instagram: 'https://instagram.com/loft_beauty_parlor',
    facebook: 'https://www.facebook.com/profile.php?id=100064346132290'
  }
};
