
export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  category: ServiceCategory;
  image: string;
  isPopular?: boolean;
  slug?: string;
  altText?: string;
}

export enum ServiceCategory {
  SKIN = 'Skin Care',
  HAIR = 'Hair Care',
  HAND_FOOT = 'Hand & Foot Care',
  MAKEUP = 'Makeup Services',
  BRIDAL = 'Bridal & Wedding',
  MARAVA = 'Marava Services'
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
}
