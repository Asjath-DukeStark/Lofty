
export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  category: ServiceCategory;
  image: string;
  isPopular?: boolean;
}

export enum ServiceCategory {
  FACIAL = 'Facial & Skin',
  MAKEUP = 'Makeup Artistry',
  HAIR = 'Hair Design',
  NAILS = 'Nail & Hand',
  GROOMING = 'Grooming & Waxing',
  BRIDAL = 'Bridal & Events'
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
}
