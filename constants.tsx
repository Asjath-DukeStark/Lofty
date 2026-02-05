
import React from 'react';
import { Service, ServiceCategory, Testimonial } from './types';

export const SERVICES: Service[] = [
  // --- SKIN CARE SERVICES ---
  {
    id: 's1',
    title: 'Clean Up',
    description: 'A quick yet effective deep cleansing treatment to refresh your skin.',
    price: 'LKR 3000',
    duration: '30 min',
    category: ServiceCategory.SKIN,
    image: '/images/new_services/skin_care_premium.png'
  },
  {
    id: 's2',
    title: 'Normal Facial',
    description: 'A classic facial treatment to maintain healthy and glowing skin.',
    price: 'LKR 3600',
    duration: '45 min',
    category: ServiceCategory.SKIN,
    image: '/images/new_services/skin_care_premium.png'
  },
  {
    id: 's3',
    title: 'Whitening Facial',
    description: 'Designed to brighten your complexion and even out skin tone.',
    price: 'LKR 4500',
    duration: '80 min',
    category: ServiceCategory.SKIN,
    image: '/images/new_services/skin_care.png',
    isPopular: true
  },
  {
    id: 's4',
    title: 'High-Frequency Special Facial',
    description: 'Advanced treatment using high-frequency technology for skin rejuvenation.',
    price: 'LKR 4000',
    duration: '45 min',
    category: ServiceCategory.SKIN,
    image: '/images/new_services/skin_care_premium.png'
  },
  {
    id: 's5',
    title: 'Pimple Treatment',
    description: 'Targeted care to reduce breakouts and soothe irritated skin.',
    price: 'LKR 5000',
    duration: '60 min',
    category: ServiceCategory.SKIN,
    image: '/images/new_services/skin_care_premium.png'
  },
  {
    id: 's6',
    title: 'Acne Treatment (High-Frequency)',
    description: 'Professional acne care combined with high-frequency technology for optimal results.',
    price: 'LKR 5000',
    duration: '60 min',
    category: ServiceCategory.SKIN,
    image: '/images/new_services/skin_care_premium.png'
  },
  {
    id: 's7',
    title: 'Pigmentation Treatment',
    description: 'Helps reduce the appearance of dark spots and uneven pigmentation.',
    price: 'LKR 5500',
    duration: '60 min',
    category: ServiceCategory.SKIN,
    image: '/images/new_services/skin_care_premium.png'
  },
  {
    id: 's8',
    title: 'Galvanic Treatment',
    description: 'Uses galvanic current to deeply nourish and hydrate the skin layers.',
    price: 'LKR 6500',
    duration: '60 min',
    category: ServiceCategory.SKIN,
    image: '/images/new_services/skin_care_premium.png'
  },
  {
    id: 's9',
    title: 'Dark Spot Removal',
    description: 'Precision treatment focused on eliminating stubborn dark spots.',
    price: 'LKR 4500',
    duration: '30 min',
    category: ServiceCategory.SKIN,
    image: '/images/new_services/skin_care_premium.png'
  },
  {
    id: 's10',
    title: 'Gold Facial',
    description: 'Indulge in luxury with our gold-infused anti-aging treatment.',
    price: 'LKR 6000',
    duration: '90 min',
    category: ServiceCategory.SKIN,
    image: '/images/new_services/gold_facial.png',
    isPopular: true
  },
  {
    id: 's11',
    title: 'Pearl Facial',
    description: 'Achieve a luminous, iridescent glow with pure pearl extracts.',
    price: 'LKR 7000',
    duration: '90 min',
    category: ServiceCategory.SKIN,
    image: '/images/new_services/gold_facial.png'
  },
  {
    id: 's12',
    title: 'Silver Facial',
    description: 'A cooling and detoxifying facial for a clear and balanced complexion.',
    price: 'LKR 7000',
    duration: '90 min',
    category: ServiceCategory.SKIN,
    image: '/images/new_services/gold_facial.png'
  },

  // --- HAIR CARE SERVICES ---
  {
    id: 'h1',
    title: 'Hair Cutting (All Types)',
    description: 'Expert styling tailored to your face shape and personal style.',
    price: 'LKR 300 - 1800',
    duration: 'Varies',
    category: ServiceCategory.HAIR,
    image: '/images/new_services/hair_care.png',
    isPopular: true
  },
  {
    id: 'h2',
    title: 'Shampoo & Conditioner',
    description: 'Deep cleansing and intense conditioning for silky smooth hair.',
    price: 'LKR 3500',
    duration: '45 min',
    category: ServiceCategory.HAIR,
    image: '/images/new_services/hair_care_premium.png'
  },
  {
    id: 'h3',
    title: 'Dandruff Treatment',
    description: 'Targeted scalp care to eliminate dandruff and soothe itching.',
    price: 'LKR 5000',
    duration: '90 min',
    category: ServiceCategory.HAIR,
    image: '/images/new_services/hair_care_premium.png'
  },
  {
    id: 'h4',
    title: 'Hot Oil Massage',
    description: 'A traditional and relaxing treatment to nourish roots and improve circulation.',
    price: 'LKR 5000',
    duration: '90 min',
    category: ServiceCategory.HAIR,
    image: '/images/new_services/hair_care_premium.png'
  },
  {
    id: 'h5',
    title: 'Hair Spa',
    description: 'The ultimate rejuvenation for tired and damaged hair.',
    price: 'LKR 5000',
    duration: '60 min',
    category: ServiceCategory.HAIR,
    image: '/images/new_services/hair_care_premium.png',
    isPopular: true
  },
  {
    id: 'h6',
    title: 'Henna Treatment',
    description: 'Natural coloring and conditioning for healthy, vibrant hair.',
    price: 'LKR 5500',
    duration: '120 min',
    category: ServiceCategory.HAIR,
    image: '/images/new_services/hair_care_premium.png'
  },
  {
    id: 'h7',
    title: 'Hair Coloring',
    description: 'Professional color application, from subtle highlights to bold transformations.',
    price: 'LKR 4000 - 9000',
    duration: '120 min',
    category: ServiceCategory.HAIR,
    image: '/images/new_services/hair_care_premium.png'
  },
  {
    id: 'h8',
    title: 'Perming',
    description: 'Add long-lasting volume and curls with our expert perming service.',
    price: 'LKR 8000',
    duration: '150 min',
    category: ServiceCategory.HAIR,
    image: '/images/new_services/hair_care_premium.png'
  },
  {
    id: 'h9',
    title: 'Hair Ironing',
    description: 'Achieve sleek, perfectly straight hair with a professional finish.',
    price: 'LKR 18000 - 25000',
    duration: '240 min',
    category: ServiceCategory.HAIR,
    image: '/images/new_services/hair_care_premium.png'
  },

  // --- HAND & FOOT CARE ---
  {
    id: 'n1',
    title: 'Manicure',
    description: 'Elegant hand care including shape, cuticle work, and perfect polish.',
    price: 'LKR 550',
    duration: '45 min',
    category: ServiceCategory.HAND_FOOT,
    image: '/images/new_services/hand_foot_premium.png'
  },
  {
    id: 'n2',
    title: 'Pedicure',
    description: 'The ultimate foot pamper including soak, scrub, and artistic finish.',
    price: 'LKR 6500',
    duration: '45 min',
    category: ServiceCategory.HAND_FOOT,
    image: '/images/new_services/hand_foot_premium.png'
  },

  // --- MAKEUP SERVICES ---
  {
    id: 'm1',
    title: 'Normal Makeup',
    description: 'A fresh and clean look for your everyday special moments.',
    price: 'LKR 3000',
    duration: '45 min',
    category: ServiceCategory.MAKEUP,
    image: '/images/new_services/makeup_premium.png'
  },
  {
    id: 'm2',
    title: '3 Cultural Makeup',
    description: 'Exquisite makeup styled according to your unique cultural heritage.',
    price: 'Price on Request',
    duration: 'Varies',
    category: ServiceCategory.MAKEUP,
    image: '/images/new_services/makeup_premium.png'
  },
  {
    id: 'm3',
    title: 'Mehndi Makeup',
    description: 'Vibrant and festive makeup perfect for your Mehndi celebrations.',
    price: 'LKR 16000',
    duration: '120 min',
    category: ServiceCategory.MAKEUP,
    image: '/images/new_services/makeup_premium.png'
  },
  {
    id: 'm4',
    title: 'Wedding Makeup',
    description: 'A timeless and breathtaking look for your most special day.',
    price: 'LKR 22000',
    duration: '210 min',
    category: ServiceCategory.MAKEUP,
    image: '/images/new_services/makeup_premium.png',
    isPopular: true
  },
  {
    id: 'm5',
    title: 'Walima Makeup',
    description: 'Elegant and sophisticated makeup for your Walima reception.',
    price: 'LKR 18000',
    duration: '150 min',
    category: ServiceCategory.MAKEUP,
    image: '/images/new_services/makeup_premium.png'
  },

  // --- BRIDAL & WEDDING SERVICES ---
  {
    id: 'b1',
    title: 'Rental Bridal Dress & Bouquet',
    description: 'A curated selection of premium bridal gowns and matching floral arrangements.',
    price: 'Price on Request',
    duration: 'Varies',
    category: ServiceCategory.BRIDAL,
    image: '/images/new_services/makeup_premium.png'
  },
  {
    id: 'b2',
    title: 'Saree Wearing (7 Methods)',
    description: 'Professional saree draping in seven elegant traditional and modern styles.',
    price: 'LKR 3000',
    duration: '60 min',
    category: ServiceCategory.BRIDAL,
    image: '/images/new_services/makeup_premium.png'
  },
  {
    id: 'b3',
    title: 'Customised Bouquet',
    description: 'Bespoke floral arrangements tailored to your wedding theme.',
    price: 'LKR 5000 - 9000',
    duration: 'Varies',
    category: ServiceCategory.BRIDAL,
    image: '/images/new_services/wedding_cake.png'
  },
  {
    id: 'b4',
    title: 'Bridal Car Decoration',
    description: 'Elegant and festive floral styling for your bridal car.',
    price: 'LKR 10000 - 18000',
    duration: 'Varies',
    category: ServiceCategory.BRIDAL,
    image: '/images/new_services/wedding_cake.png'
  },
  {
    id: 'b5',
    title: 'Wedding Cake',
    description: 'Designer wedding cakes that taste as beautiful as they look.',
    price: 'LKR 3000 - 20000',
    duration: 'Varies',
    category: ServiceCategory.BRIDAL,
    image: '/images/new_services/wedding_cake.png',
    isPopular: true
  },

  // --- MARAVA SERVICES ---
  {
    id: 'v1',
    title: 'Marava (Box Making)',
    description: 'Exquisite traditional Marava boxes, custom-made with intricate detail.',
    price: 'LKR 8000 - 100000',
    duration: 'Varies',
    category: ServiceCategory.MARAVA,
    image: '/images/new_services/marava.png'
  },
  {
    id: 'v2',
    title: 'Marava Rental',
    description: 'A selection of premium Marava boxes available for your ceremony.',
    price: 'LKR 500 - 5000',
    duration: 'Varies',
    category: ServiceCategory.MARAVA,
    image: '/images/new_services/marava.png'
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
