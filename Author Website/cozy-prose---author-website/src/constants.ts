import { Book, BlogPost } from './types';

export const BOOKS: Book[] = [
  {
    id: '1',
    title: "The Kettle's Secret",
    description: "In the quiet village of Oakhaven, a century-old mystery steeped in family legends resurfaces. When Briar inherits her grandmother's teashop, she finds more than just loose leaf tea—she finds a diary hidden beneath the floorboards that suggests the village's most famous resident didn't die of natural causes.",
    coverImage: "https://images.unsplash.com/photo-1594631252845-29fc458695d7?auto=format&fit=crop&q=80&w=800",
    genre: "Cozy Mystery",
    releaseDate: "Oct 2025",
    purchaseUrl: "#"
  },
  {
    id: '2',
    title: "Lavender & Lace",
    description: "A story of second chances and the power of heritage. Sophie returns to her childhood home in Provence to save her family's struggling lavender farm. What she didn't expect was to find her first love, Marc, presiding over the neighboring vineyard—and holding a secret that could change her life forever.",
    coverImage: "https://images.unsplash.com/photo-1533604130634-19c28593cc3d?auto=format&fit=crop&q=80&w=800",
    genre: "Contemporary Romance",
    releaseDate: "June 2025",
    purchaseUrl: "#"
  },
  {
    id: '3',
    title: "Midnight at the Teashop",
    description: "When the clock strikes twelve, the Oakhaven Teashop transforms. In this upcoming tale of whimsey and magic, readers will follow the journey of a young apprentice who discovers that every tea blend has a memory of its own.",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800",
    genre: "Magical Realism",
    releaseDate: "Winter 2026",
    isUpcoming: true
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: "Spring Inspiration & Garden Notes",
    excerpt: "The first crocuses are blooming in Oakhaven, and with them comes a surge of new plot ideas...",
    content: "There's something about the transition from winter to spring that sparks a specific type of creativity. As I spend my mornings tending to the lavender and sipping a hot Earl Grey, I find the characters for my next book whispering their secrets more clearly. In this post, I share some of the research photos I've taken for the upcoming sequel to 'Lavender & Lace'.",
    date: "April 15, 2026",
    category: "Life & Writing"
  },
  {
    id: '2',
    title: "Cover Reveal: Midnight at the Teashop",
    excerpt: "I am absolutely thrilled to finally share the artwork for my next magical realism novel!",
    content: "Working with the illustrators for 'Midnight at the Teashop' has been a dream. We wanted to capture that precise moment between waking and dreaming. The sapphire blues and gold leaf details on the teapot are exactly how I imagined them. Stay tuned for pre-order details!",
    date: "March 20, 2026",
    category: "News"
  }
];
