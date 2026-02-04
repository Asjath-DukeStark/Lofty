
import React from 'react';
import { Service, ServiceCategory, Testimonial } from './types';

export const SERVICES: Service[] = [
  // --- FACIAL & SKIN ---
  {
    id: 'f1',
    title: 'Clear Skin Facial',
    description: 'A deep cleaning treatment that makes your skin look bright and fresh. Perfect for getting a healthy glow before a big event.',
    price: 'LKR 9500',
    duration: '60 min',
    category: ServiceCategory.FACIAL,
    image: '/images/facial-skin.jpg',
    isPopular: true
  },
  {
    id: 'f2',
    title: 'Deep Hydration Treatment',
    description: 'A relaxing facial that adds moisture back into your skin. Your face will feel soft, smooth, and very hydrated.',
    price: 'LKR 11000',
    duration: '75 min',
    category: ServiceCategory.FACIAL,
    image: '/images/deep-hydration.jpg'
  },
  {
    id: 'f3',
    title: 'Luxury Gold Facial',
    description: 'Our premium anti-aging treatment using real gold leaf and pearl extract to lift your skin and give you a beautiful glow.',
    price: 'LKR 22500',
    duration: '90 min',
    category: ServiceCategory.FACIAL,
    image: '/images/luxury-gold.jpg',
    isPopular: true
  },

  // --- MAKEUP ARTISTRY ---
  {
    id: 'm1',
    title: 'Special Occasion Makeup',
    description: 'Professional makeup for a night out or a party. We focus on showing off your natural beauty with a clean, modern look.',
    price: 'LKR 8500',
    duration: '60 min',
    category: ServiceCategory.MAKEUP,
    image: '/images/special-occasion.jpg',
    isPopular: true
  },
  {
    id: 'm2',
    title: 'Full Glam Makeup',
    description: 'Heavy or detailed makeup for big events like galas or photoshoots. Designed to look perfect in photos and last all night.',
    price: 'LKR 14000',
    duration: '90 min',
    category: ServiceCategory.MAKEUP,
    image: '/images/full-glam.jpg'
  },

  // --- HAIR DESIGN ---
  {
    id: 'h1',
    title: 'Signature Haircut',
    description: 'A professional haircut designed specifically for your face shape. Includes a relaxing scalp massage.',
    price: 'LKR 7500',
    duration: '75 min',
    category: ServiceCategory.HAIR,
    image: '/images/signature-haircut.jpg',
    isPopular: true
  },
  {
    id: 'h2',
    title: 'Soft Curls Treatment',
    description: 'A hair styling service that gives you natural-looking, bouncy curls that move perfectly and look soft.',
    price: 'LKR 18000',
    duration: '180 min',
    category: ServiceCategory.HAIR,
    image: '/images/soft-curls.jpg'
  },

  // --- NAILS & HANDS ---
  {
    id: 'n1',
    title: 'Classic Clean Manicure',
    description: 'Elegant and clean nails. Includes cuticle care, hand scrub, and a perfect finish in your favorite color.',
    price: 'LKR 5500',
    duration: '60 min',
    category: ServiceCategory.NAILS,
    image: '/images/classic-manicure.jpg'
  },

  // --- BRIDAL ---
  {
    id: 'b1',
    title: 'Full Wedding Package',
    description: 'Everything you need for your big day. Includes hair and makeup trials and full styling on your wedding day.',
    price: 'LKR 55000',
    duration: '300 min',
    category: ServiceCategory.BRIDAL,
    image: '/images/wedding-package.jpg',
    isPopular: true
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
