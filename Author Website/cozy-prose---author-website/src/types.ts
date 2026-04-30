export interface Book {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  genre: string;
  releaseDate: string;
  purchaseUrl?: string;
  isUpcoming?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  image?: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
  role: 'reader' | 'reviewer' | 'media' | 'other';
}
