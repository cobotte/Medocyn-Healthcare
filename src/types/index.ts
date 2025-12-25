export interface Department {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  specialties: string[];
}

export interface DoctorAvailability {
  days: string[];
  slots: string[];
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  slug: string;
  departmentId: string;
  specialty: string;
  experienceYears: number;
  education: string[];
  bio: string;
  availability: DoctorAvailability;
  rating: number;
  reviewCount: number;
  languages: string[];
  imageUrl: string;
}

export interface HealthPackage {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  price: number;
  discountPrice: number;
  description: string;
  features: string[];
  idealFor: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  readTime: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
  featured: boolean;
}

