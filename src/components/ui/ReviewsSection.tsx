'use client';

import React, { useState, useEffect, useRef } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { Star, MessageSquare, Quote, CheckCircle2 } from 'lucide-react';
import { ReviewItem } from '../../types';

const INITIAL_DEMO_REVIEWS: ReviewItem[] = [];

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [formData, setFormData] = useState({ name: '', text: '', rating: 5 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const exactScrollPos = useRef(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    if (!isSupabaseConfigured()) {
      const local = localStorage.getItem('finheist_local_reviews');
      if (local) {
        setReviews([...JSON.parse(local), ...INITIAL_DEMO_REVIEWS]);
      } else {
        setReviews(INITIAL_DEMO_REVIEWS);
      }
      return;
    }

    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('status', 'Approved')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reviews:', error);
      } else {
        // Merge with local demo reviews if real reviews are empty
        setReviews(data && data.length > 0 ? data : INITIAL_DEMO_REVIEWS);
      }
    } catch (err) {
      console.error(err);
      setReviews(INITIAL_DEMO_REVIEWS);
    }
  };

  useEffect(() => {
    let animationFrameId: number;
    const container = scrollContainerRef.current;
    if (!container || reviews.length === 0) return;

    const autoScroll = () => {
      if (!isPaused && container && container.children.length > 0) {
        // Smooth pixel accumulation
        exactScrollPos.current += 1;

        // Reset scroll position when we reach halfway (since we duplicate content)
        if (exactScrollPos.current >= container.scrollWidth / 2) {
          exactScrollPos.current = 0;
        }

        container.scrollLeft = exactScrollPos.current;
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, reviews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name || formData.name.trim().length < 2) {
      setErrorMsg('Please enter a valid name.');
      return;
    }
    if (!formData.text || formData.text.trim().length < 10) {
      setErrorMsg('Please write a slightly longer review (min 10 characters).');
      return;
    }

    setIsSubmitting(true);
    const newReview: ReviewItem = {
      id: 'rev-' + Date.now(),
      client_name: formData.name.trim(),
      review_text: formData.text.trim(),
      rating: formData.rating,
      status: 'Approved',
      created_at: new Date().toISOString()
    };

    try {
      if (isSupabaseConfigured()) {
        const { error } = await supabase.from('reviews').insert([newReview]);
        if (error) throw error;
      } else {
        const existing = localStorage.getItem('finheist_local_reviews');
        const parsed = existing ? JSON.parse(existing) : [];
        localStorage.setItem('finheist_local_reviews', JSON.stringify([newReview, ...parsed]));
      }

      setReviews(prev => [newReview, ...prev]);
      setIsSubmitted(true);
      setFormData({ name: '', text: '', rating: 5 });

      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 animate-gradient-shift z-10" />
      <div className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[120px] opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold font-poppins tracking-tight text-slate-900 mb-6">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-600">Clients Say</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-inter">
            Don't just take our word for it. Discover how we've helped hundreds of businesses achieve complete statutory compliance and financial growth.
          </p>
        </div>

        {/* Marquee Slider */}
        <div className="mb-20 relative w-full overflow-hidden">
          {/* Gradient Fades for Slider edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-hidden py-4 px-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {/* Render Reviews Twice for Infinite Loop Effect */}
            {[...reviews, ...reviews, ...reviews].map((review, i) => (
              <div
                key={`${review.id}-${i}`}
                className="shrink-0 w-[300px] sm:w-[400px] p-6 rounded-3xl bg-white border border-slate-200 shadow-sm relative group hover:border-amber-300 transition-all hover:-translate-y-2 hover:shadow-md"
              >
                <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-100 group-hover:text-amber-500/20 transition-colors" />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-5 h-5 ${idx < review.rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`}
                    />
                  ))}
                </div>
                <p className="text-slate-700 font-inter text-sm sm:text-base leading-relaxed mb-6 min-h-[80px]">
                  "{review.review_text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-amber-600 font-bold font-poppins">
                    {review.client_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold font-poppins text-sm">{review.client_name}</h4>
                    <span className="text-slate-500 text-xs">Verified Client</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Submission Form */}
        <div className="max-w-2xl mx-auto">
          <div className="p-1 sm:p-1.5 rounded-[2rem] bg-gradient-to-br from-amber-500/20 via-slate-200/50 to-white backdrop-blur-xl relative overflow-hidden group shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="bg-white rounded-[1.75rem] p-6 sm:p-10 relative z-10 border border-slate-100">
              <h3 className="text-2xl font-extrabold text-slate-900 font-poppins mb-2 flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-amber-500" /> Leave a Review
              </h3>
              <p className="text-slate-600 text-sm mb-8">We value your feedback. Let us know how we did!</p>

              {isSubmitted ? (
                <div className="py-12 text-center animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Thank You!</h4>
                  <p className="text-slate-600 text-sm">Your review has been successfully submitted and added to our slider.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMsg && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
                      {errorMsg}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Your Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                            className="focus:outline-none transition-transform hover:scale-110"
                          >
                            <Star
                              className={`w-8 h-8 ${star <= formData.rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-100 text-slate-200 hover:text-slate-300'}`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                        placeholder="e.g. Rajesh Sharma"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Your Review</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.text}
                        onChange={e => setFormData(prev => ({ ...prev, text: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors resize-none"
                        placeholder="Tell us about your experience with Fin-Heist..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-white font-bold font-poppins transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
