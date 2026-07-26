export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  imageUrl?: string;
  category: 'core' | 'specialized' | 'compliance' | 'advisory';
  subServices: string[];
  gradient: string;
  popular?: boolean;
}

export interface FeaturedService {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  ctaText: string;
  iconName: string;
  imageUrl?: string;
  metrics: { label: string; value: string }[];
}

export interface BentoItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  imageUrl?: string;
  colSpan?: number;
  rowSpan?: number;
  badge?: string;
  gradient?: string;
}

export interface ProcessStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  iconName: string;
  imageUrl?: string;
}

export interface LoanCategory {
  id: string;
  title: string;
  description: string;
  maxAmount: string;
  keyRequirement: string;
  iconName: string;
  imageUrl?: string;
  features: string[];
}

export interface TeamMember {
  id: string;
  title_prefix?: string;
  name: string;
  role: string;
  qualifications: string;
  expertise: string[];
  bio: string;
  imageUrl?: string;
  linkedin?: string;
  email?: string;
  isAdvisory?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  rating: number;
  content: string;
  serviceUsed: string;
  location: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  clientType: 'Individual' | 'Salaried Individual' | 'Freelancer' | 'Business Owner' | 'Proprietorship' | 'Partnership' | 'MSME' | 'Startup' | 'Other';
  serviceRequired: string;
  message: string;
}

export interface NewsItem {
  id: string;
  headline: string;
  link: string | null;
  created_at?: string;
}
