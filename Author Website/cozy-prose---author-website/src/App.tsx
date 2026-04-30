import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Instagram, BookOpen, ExternalLink, Mail } from 'lucide-react';
import { BLOG_CATEGORIES, BLOG_ENTRIES, BOOKS_DATA, ABOUT_CONTENT } from './content';
import authorPhoto from './assets/author-photo.jpg';

const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about'>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [selectedBlogCategory, setSelectedBlogCategory] = useState('All');
  const [activeBookIndex, setActiveBookIndex] = useState(0);

  const [blogPage, setBlogPage] = useState(1);
  const BLOGS_PER_PAGE = 4;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => setFormStatus('success'), 1500);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedBlogCategory(cat);
    setBlogPage(1);
  };

  const filteredBlog = selectedBlogCategory === 'All' 
    ? BLOG_ENTRIES 
    : BLOG_ENTRIES.filter(post => post.category === selectedBlogCategory);

  const totalPages = Math.ceil(filteredBlog.length / BLOGS_PER_PAGE);
  const currentBlogs = filteredBlog.slice((blogPage - 1) * BLOGS_PER_PAGE, blogPage * BLOGS_PER_PAGE);

  const navigateTo = (page: 'home' | 'about') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen selection:bg-terracotta selection:text-white bg-parchment text-charcoal">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 bg-parchment/90 backdrop-blur-sm border-b border-charcoal">
        <div className="max-w-6xl mx-auto px-10 h-24 flex justify-between items-baseline">
          <button 
            onClick={() => navigateTo('home')}
            className="text-4xl md:text-5xl font-serif font-light tracking-tighter italic hover:opacity-70 transition-opacity text-left bg-transparent border-none cursor-pointer p-0"
          >
            Briar Lux
          </button>
          
          <div className="hidden md:flex gap-10 font-sans text-xs uppercase tracking-[0.2em] font-medium">
            <button onClick={() => navigateTo('home')} className="hover:line-through decoration-terracotta decoration-2 bg-transparent border-none cursor-pointer">The Bookshelf</button>
            <button onClick={() => navigateTo('home')} className="hover:line-through decoration-terracotta decoration-2 bg-transparent border-none cursor-pointer">The Inkwell</button>
            <button onClick={() => navigateTo('about')} className="hover:line-through decoration-terracotta decoration-2 bg-transparent border-none cursor-pointer">Author</button>
            <button onClick={() => navigateTo('home')} className="hover:line-through decoration-terracotta decoration-2 bg-transparent border-none cursor-pointer">Letters</button>
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden self-center p-2 text-charcoal bg-transparent border-none cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-parchment border-b border-charcoal overflow-hidden"
            >
              <div className="flex flex-col p-10 space-y-6 font-sans text-sm uppercase tracking-widest text-center">
                <button onClick={() => navigateTo('home')} className="hover:italic uppercase tracking-widest text-sm bg-transparent border-none cursor-pointer">The Bookshelf</button>
                <button onClick={() => navigateTo('home')} className="hover:italic uppercase tracking-widest text-sm bg-transparent border-none cursor-pointer">The Inkwell</button>
                <button onClick={() => navigateTo('about')} className="hover:italic uppercase tracking-widest text-sm bg-transparent border-none cursor-pointer">Author</button>
                <button onClick={() => navigateTo('home')} className="hover:italic uppercase tracking-widest text-sm bg-transparent border-none cursor-pointer">Letters</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence mode="wait">
        {currentPage === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <main className="pt-24">
              {/* Hero Section */}
              <section id="about" className="py-20 px-10">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    whileHover={{ y: -8 }}
                    className="md:col-span-5 h-full flex flex-col group"
                  >
                    <div className="bg-paper-tan p-12 aspect-[3/4] relative border border-charcoal shadow-artistic mb-8 flex flex-col justify-end overflow-hidden">
                      <span className="absolute top-8 left-8 text-[10px] uppercase font-sans tracking-[0.3em] opacity-60">Latest Release</span>
                      <div className="relative z-10 transition-transform duration-500 group-hover:translate-y-[-4px]">
                        <h2 className="text-5xl font-serif mb-4 leading-tight">{BOOKS_DATA[0].title}</h2>
                        <p className="font-sans text-sm leading-relaxed opacity-80 mb-8 max-w-sm">
                          {BOOKS_DATA[0].synopsis.split('.')[0]}.
                        </p>
                        <a href="#books" className="bg-charcoal text-white font-sans text-[10px] uppercase tracking-widest py-4 px-8 w-max hover:bg-terracotta transition-colors shadow-lg active:scale-95 inline-block text-center no-underline">
                          Read the Details
                        </a>
                      </div>
                      <motion.img 
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.8 }}
                        src={BOOKS_DATA[0].img} 
                        className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale group-hover:opacity-20 transition-all"
                        alt="Background"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="md:col-span-7 h-full flex flex-col md:pl-12 md:border-l border-charcoal/10"
                  >
                    <div className="mb-16">
                      <p className="text-4xl md:text-5xl leading-tight italic font-serif text-charcoal/90 mb-6">
                        "{ABOUT_CONTENT.quote}"
                      </p>
                      <div className="h-px w-20 bg-terracotta mb-6" />
                      <p className="font-sans text-[10px] uppercase tracking-[0.4em] mb-4">About the Author</p>
                      <p className="text-xl font-serif leading-relaxed text-charcoal/80 max-w-xl">
                        {ABOUT_CONTENT.shortBio}
                      </p>
                      <button 
                        onClick={() => navigateTo('about')}
                        className="mt-8 font-sans text-[10px] uppercase tracking-widest underline underline-offset-8 hover:text-terracotta transition-colors bg-transparent border-none cursor-pointer p-0"
                      >
                        Read her full story
                      </button>
                    </div>

                    <div className="mt-auto flex items-center gap-12">
                       <div className="w-32 h-32 rounded-full overflow-hidden border border-charcoal grayscale">
                          <img src={authorPhoto} alt="Author Portrait" className="w-full h-full object-cover" />
                       </div>
                       <div className="space-y-2">
                          <p className="font-serif italic text-2xl">Penning the next mystery...</p>
                          <p className="font-sans text-[10px] uppercase tracking-widest text-charcoal/40">Status: Chapters 1-14 Complete</p>
                       </div>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* The Bookshelf Enhanced */}
              <section id="books" className="py-24 border-y border-charcoal">
                <div className="max-w-6xl mx-auto px-10">
                  <header className="flex flex-col md:flex-row justify-between md:items-baseline mb-16 border-b border-charcoal/20 pb-8 gap-4">
                    <h2 className="text-6xl font-serif italic">The Bookshelf</h2>
                    <div className="flex gap-4">
                       {BOOKS_DATA.map((book, bIdx) => (
                          <button 
                            key={bIdx}
                            onClick={() => setActiveBookIndex(bIdx)}
                            className={cn("font-sans text-[10px] uppercase tracking-widest px-4 py-2 border transition-all cursor-pointer", activeBookIndex === bIdx ? "bg-charcoal text-white border-charcoal" : "bg-transparent border-charcoal/20 hover:border-charcoal")}
                          >
                            {book.title.split(' ')[0]}
                          </button>
                       ))}
                    </div>
                  </header>

                  <AnimatePresence mode="wait">
                    <motion.div 
                       key={activeBookIndex}
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, x: -20 }}
                       className="grid md:grid-cols-12 gap-16"
                    >
                       <div className="md:col-span-5">
                          <motion.div 
                            whileHover={{ y: -12, rotate: -1, scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            className="bg-paper-tan p-8 border border-charcoal shadow-artistic cursor-pointer"
                          >
                             <img src={BOOKS_DATA[activeBookIndex].img} alt={BOOKS_DATA[activeBookIndex].title} className="w-full aspect-[2/3] object-cover grayscale-0 shadow-2xl" referrerPolicy="no-referrer" />
                          </motion.div>
                       </div>
                       
                       <div className="md:col-span-7 space-y-12">
                          <div>
                             <h3 className="text-5xl font-serif italic mb-2 leading-tight">{BOOKS_DATA[activeBookIndex].title}</h3>
                             <div className="flex gap-8 font-sans text-[10px] uppercase tracking-widest opacity-40 mb-8 font-bold">
                                <span>{BOOKS_DATA[activeBookIndex].genre}</span>
                                <span>Released {BOOKS_DATA[activeBookIndex].year}</span>
                             </div>
                             <p className="text-2xl font-serif leading-relaxed text-charcoal/80 italic border-l-4 border-terracotta pl-8 py-2">
                                "{BOOKS_DATA[activeBookIndex].synopsis}"
                             </p>
                             {BOOKS_DATA[activeBookIndex].purchaseUrl && (
                               <div className="pt-4">
                                 <a 
                                   href={BOOKS_DATA[activeBookIndex].purchaseUrl} 
                                   target="_blank" 
                                   rel="noopener noreferrer"
                                   className="bg-charcoal text-white font-sans text-[10px] uppercase tracking-widest py-4 px-10 transition-all hover:bg-terracotta shadow-lg active:scale-95 inline-block no-underline"
                                 >
                                   Buy Now
                                 </a>
                               </div>
                             )}
                          </div>

                          <div className="bg-white border border-charcoal/10 p-10 shadow-sm">
                             <h4 className="font-sans text-[10px] uppercase tracking-[0.4em] mb-8 font-bold text-terracotta">Reader Reviews</h4>
                             <div className="space-y-8">
                                {BOOKS_DATA[activeBookIndex].reviews.map((rev, rIdx) => (
                                   <div key={rIdx} className="border-b border-charcoal/5 pb-6 last:border-0 last:pb-0">
                                      <div className="flex justify-between items-center mb-2">
                                         <span className="font-serif italic text-lg">{rev.author}</span>
                                         <div className="flex text-terracotta">
                                            {[...Array(5)].map((_, i) => (
                                               <svg key={i} className={cn("w-3 h-3 fill-current", i >= rev.rating && "opacity-20")} viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                                            ))}
                                         </div>
                                      </div>
                                      <p className="font-serif italic text-charcoal/60 leading-relaxed">"{rev.text}"</p>
                                   </div>
                                ))}
                             </div>
                          </div>
                       </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </section>

              {/* The Inkwell Enhanced */}
              <section id="blog" className="py-24">
                <div className="max-w-6xl mx-auto px-10">
                  <div className="flex flex-col md:flex-row justify-between md:items-end mb-16 gap-8">
                     <div>
                        <h2 className="text-6xl font-serif italic mb-4">The Inkwell</h2>
                        <p className="font-sans text-xs leading-relaxed text-charcoal/40 uppercase tracking-[0.3em]">Monthly musings on the art of the slow mystery.</p>
                     </div>
                     <div className="flex flex-wrap gap-2">
                        {BLOG_CATEGORIES.map(cat => (
                           <button 
                              key={cat}
                              onClick={() => handleCategoryChange(cat)}
                              className={cn("px-4 py-2 font-sans text-[10px] uppercase tracking-widest border transition-all cursor-pointer", selectedBlogCategory === cat ? "bg-terracotta text-white border-terracotta" : "bg-transparent border-charcoal/10 hover:border-charcoal")}
                           >
                              {cat}
                           </button>
                        ))}
                     </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                     <AnimatePresence mode="popLayout">
                        {currentBlogs.map((post) => (
                           <motion.div 
                              key={post.title}
                              initial={{ opacity: 0, scale: 0.98 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.98 }}
                              layout
                              className="bg-white border border-charcoal/10 p-10 hover:shadow-artistic transition-all group flex flex-col h-full"
                           >
                              <div className="flex justify-between items-baseline mb-6 border-b border-charcoal/5 pb-4">
                                 <span className="text-[10px] font-sans uppercase tracking-[0.2em] font-bold text-terracotta">{post.category}</span>
                                 <span className="text-[10px] font-sans uppercase tracking-[0.2em] opacity-40">{post.date}</span>
                              </div>
                              <h4 className="text-3xl font-serif mb-4 leading-tight group-hover:italic transition-all">{post.title}</h4>
                              <p className="font-serif italic text-charcoal/60 leading-relaxed mb-8 flex-grow">"{post.excerpt}"</p>
                              <div className="flex flex-col mt-auto pt-6 border-t border-charcoal/5 gap-4">
                                 <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-sans uppercase tracking-[0.1em] opacity-30 italic">By Briar L.</span>
                                    <button className="font-sans text-[10px] uppercase tracking-widest underline underline-offset-8 hover:text-terracotta transition-colors bg-transparent border-none cursor-pointer">Read Entry</button>
                                 </div>
                                 <div className="flex items-center justify-end gap-4 border-t border-charcoal/5 pt-4">
                                    <span className="text-[10px] font-sans uppercase tracking-widest opacity-20 mr-auto">Share post</span>
                                    <button 
                                      onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                                      className="text-charcoal/40 hover:text-terracotta transition-colors"
                                      title="Share on Twitter"
                                    >
                                       <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                                    </button>
                                    <button 
                                      onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                                      className="text-charcoal/40 hover:text-terracotta transition-colors"
                                      title="Share on Facebook"
                                    >
                                       <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                    </button>
                                    <button 
                                      onClick={() => {
                                        navigator.clipboard.writeText(window.location.href);
                                        // Silent feedback is better for this aesthetic, but maybe a tooltip or small text change
                                      }}
                                      className="text-charcoal/40 hover:text-terracotta transition-colors"
                                      title="Copy Link"
                                    >
                                       <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                                    </button>
                                 </div>
                              </div>
                           </motion.div>
                        ))}
                     </AnimatePresence>
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="mt-16 flex items-center justify-center gap-8 border-t border-charcoal/5 pt-12">
                      <button 
                        disabled={blogPage === 1}
                        onClick={() => setBlogPage(prev => Math.max(1, prev - 1))}
                        className="font-sans text-[10px] uppercase tracking-widest flex items-center gap-2 hover:text-terracotta disabled:opacity-20 transition-all bg-transparent border-none cursor-pointer"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        Previous Page
                      </button>
                      
                      <div className="flex gap-4">
                         {[...Array(totalPages)].map((_, i) => (
                            <button 
                              key={i}
                              onClick={() => setBlogPage(i + 1)}
                              className={cn(
                                "w-8 h-8 rounded-full font-sans text-[10px] transition-all flex items-center justify-center border bg-transparent cursor-pointer",
                                blogPage === i + 1 ? "bg-charcoal text-parchment border-charcoal" : "border-transparent hover:border-charcoal/20"
                              )}
                            >
                               {i + 1}
                            </button>
                         ))}
                      </div>

                      <button 
                        disabled={blogPage === totalPages}
                        onClick={() => setBlogPage(prev => Math.min(totalPages, prev + 1))}
                        className="font-sans text-[10px] uppercase tracking-widest flex items-center gap-2 hover:text-terracotta disabled:opacity-20 transition-all bg-transparent border-none cursor-pointer"
                      >
                        Next Page
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </button>
                    </div>
                  )}
                </div>
              </section>

              {/* Letters Section Enhanced */}
              <section id="contact" className="py-24 border-t border-charcoal">
                <div className="max-w-6xl mx-auto px-10">
                  <div className="grid md:grid-cols-2 gap-20">
                    <div className="flex flex-col justify-center">
                      <h2 className="text-6xl font-serif italic mb-8">Send a Letter</h2>
                      <p className="text-xl font-serif leading-relaxed text-charcoal/70 mb-8 italic">
                        I answer every letter personally, written from my walnut desk by the window. Whether you're a reader, a reviewer, or a fellow tea-drinker, I'd love to hear from you.
                      </p>
                      <div className="flex gap-8 font-sans text-[10px] uppercase tracking-[0.2em] opacity-50">
                        <span className="border-r border-charcoal/20 pr-8">Oakhaven Cottage</span>
                        <span>The Cotswolds, UK</span>
                      </div>
                    </div>

                    <div className="bg-paper-tan p-12 border border-charcoal shadow-artistic transition-all">
                      {formStatus === 'success' ? (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="h-full flex flex-col items-center justify-center text-center py-10"
                        >
                          <div className="w-20 h-20 rounded-full border border-charcoal flex items-center justify-center mb-6">
                             <svg className="w-10 h-10 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 13l4 4L19 7" /></svg>
                          </div>
                          <h3 className="text-4xl font-serif italic mb-4">Post Received</h3>
                          <p className="font-serif italic text-charcoal/60 max-w-xs">The ink is drying on your message. I look forward to reading it over my next cup of tea.</p>
                          <button onClick={() => setFormStatus('idle')} className="mt-8 font-sans text-[10px] uppercase tracking-widest underline underline-offset-4 bg-transparent border-none cursor-pointer">Send another letter</button>
                        </motion.div>
                      ) : (
                        <form className="grid grid-cols-1 sm:grid-cols-2 gap-8" onSubmit={handleContactSubmit}>
                          <div className="flex flex-col space-y-1">
                            <label className="text-[10px] uppercase tracking-widest opacity-40">Your Name</label>
                            <input required type="text" className="bg-transparent border-b border-charcoal py-3 text-lg font-serif italic focus:outline-none focus:border-terracotta transition-colors" />
                          </div>
                          <div className="flex flex-col space-y-1">
                            <label className="text-[10px] uppercase tracking-widest opacity-40">Your Email</label>
                            <input required type="email" className="bg-transparent border-b border-charcoal py-3 text-lg font-serif italic focus:outline-none focus:border-terracotta transition-colors" />
                          </div>
                          <div className="sm:col-span-2 flex flex-col space-y-1">
                            <label className="text-[10px] uppercase tracking-widest opacity-40">The Subject</label>
                            <input required type="text" className="bg-transparent border-b border-charcoal py-3 text-lg font-serif italic focus:outline-none focus:border-terracotta transition-colors" />
                          </div>
                          <div className="sm:col-span-2 flex flex-col space-y-1">
                            <label className="text-[10px] uppercase tracking-widest opacity-40">A note for the hearth...</label>
                            <textarea required rows={4} className="bg-transparent border-b border-charcoal py-3 text-lg font-serif italic focus:outline-none focus:border-terracotta transition-colors resize-none"></textarea>
                          </div>
                          <button 
                            disabled={formStatus === 'submitting'}
                            type="submit" 
                            className="sm:col-span-2 mt-4 bg-charcoal text-white py-5 font-sans text-xs uppercase tracking-[0.3em] font-bold hover:bg-terracotta transition-all shadow-lg active:scale-95 disabled:opacity-50 cursor-pointer"
                          >
                            {formStatus === 'submitting' ? 'Postage Processing...' : 'Send Postage'}
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* Newsletter */}
              <section className="py-24 bg-charcoal text-parchment">
                <div className="max-w-4xl mx-auto px-10 text-center">
                  <span className="font-sans text-[10px] uppercase tracking-[0.5em] opacity-40 mb-6 block">Postal Subscription</span>
                  <h2 className="text-5xl font-serif italic mb-8">Join the Inner Circle</h2>
                  <p className="text-xl font-serif opacity-70 mb-12 italic max-w-xl mx-auto leading-relaxed">
                    Receive seasonal updates, rare excerpts, and announcements of new mysteries delivered quietly to your inbox once a month.
                  </p>
                  <form className="flex flex-col sm:flex-row gap-6 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                    <input 
                      type="email" 
                      placeholder="email@example.com" 
                      className="flex-1 bg-transparent border-b border-parchment/30 pb-4 font-serif italic text-xl focus:outline-none focus:border-parchment transition-colors" 
                    />
                    <button className="bg-terracotta text-white px-10 py-4 font-sans text-[10px] uppercase tracking-[0.2em] font-bold shadow-xl hover:bg-white hover:text-charcoal transition-all cursor-pointer">
                      Registry
                    </button>
                  </form>
                </div>
              </section>
            </main>
          </motion.div>
        ) : (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <main className="pt-40 px-10 pb-24">
              <div className="max-w-4xl mx-auto">
                 <div className="flex flex-col md:flex-row gap-16 items-start mb-24">
                    <div className="md:w-1/3 w-full">
                       <div className="bg-paper-tan p-6 border border-charcoal shadow-artistic rotate-2">
                          <img src={authorPhoto} alt="Author Portrait" className="w-full aspect-[3/4] object-cover border border-charcoal/20" />
                       </div>
                       <div className="mt-12 space-y-6">
                          <div className="border-t border-charcoal/10 pt-6 text-left">
                             <p className="font-sans text-[10px] uppercase tracking-[0.3em] opacity-40 mb-2 font-bold text-terracotta">Preferred Tea</p>
                             <p className="font-serif italic text-xl">{ABOUT_CONTENT.preferredTea}</p>
                          </div>
                          <div className="border-t border-charcoal/10 pt-6 text-left">
                             <p className="font-sans text-[10px] uppercase tracking-[0.3em] opacity-40 mb-2 font-bold text-terracotta">Writing Nook</p>
                             <p className="font-serif italic text-xl">{ABOUT_CONTENT.writingNook}</p>
                          </div>
                       </div>
                    </div>
                    
                    <div className="md:w-2/3">
                       <h2 className="text-7xl font-serif italic mb-12 leading-tight">Between the lines of a quiet life...</h2>
                       <div className="space-y-8 font-serif text-xl leading-relaxed text-charcoal/80">
                          {ABOUT_CONTENT.fullStory.map((paragraph, pIdx) => (
                            <p key={pIdx}>{paragraph}</p>
                          ))}
                          <div className="italic border-l-2 border-terracotta pl-10 py-4 my-12 bg-white/30 p-6 shadow-sm border-r-0 border-t-0 border-b-0">
                            <p className="italic text-2xl">"{ABOUT_CONTENT.quoteLarge}"</p>
                          </div>
                       </div>
                       
                       <button 
                         onClick={() => navigateTo('home')}
                         className="mt-16 bg-charcoal text-white py-4 px-10 font-sans text-xs uppercase tracking-widest hover:bg-terracotta transition-all shadow-lg active:scale-95 cursor-pointer"
                       >
                         Back to the library
                       </button>
                    </div>
                 </div>
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-16 border-t border-charcoal/10 px-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-sans uppercase tracking-[0.3em] opacity-40">
          <div className="text-center md:text-left">
            <span className="block mb-2 font-bold text-terracotta opacity-100">© 2026 Briar Lux Fiction</span>
            <a href="#" className="hover:line-through decoration-terracotta transition-all flex items-center gap-2 justify-center md:justify-start">
               Represented by Ink & Quill Agency <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          
          <div className="flex gap-10 items-center">
            <a href="#" className="group flex items-center gap-2 hover:line-through decoration-terracotta no-underline text-charcoal transition-all">
              <Instagram className="w-4 h-4 group-hover:text-terracotta" />
              <span>Instagram</span>
            </a>
            <a href="#" className="group flex items-center gap-2 hover:line-through decoration-terracotta no-underline text-charcoal transition-all">
              <BookOpen className="w-4 h-4 group-hover:text-terracotta" />
              <span>Goodreads</span>
            </a>
            <a href="#" className="group flex items-center gap-2 hover:line-through decoration-terracotta no-underline text-charcoal transition-all">
              <Mail className="w-4 h-4 group-hover:text-terracotta" />
              <span>Newsletter</span>
            </a>
            <a href="#" className="hover:line-through decoration-terracotta no-underline text-charcoal ml-4">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
