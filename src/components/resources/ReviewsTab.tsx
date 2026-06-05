import { useState, useEffect } from "react";
import { Star, ThumbsUp, X } from "lucide-react";
import { Pagination } from "@/components/layout/Pagination";

export function ReviewsTab() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [formData, setFormData] = useState({
    collegeId: "",
    author: "",
    rating: "5",
    title: "",
    content: "",
  });

  const fetchReviews = async (currentPage: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/reviews?limit=5&page=${currentPage}`);
      const data = await res.json();
      if (data.data) {
        setReviews(data.data);
        setTotalPages(data.totalPages || 1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchColleges = async () => {
    try {
      const res = await fetch('/api/colleges?limit=500&sortBy=name');
      const data = await res.json();
      if (data.data) {
        setColleges(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReviews(page);
  }, [page]);

  useEffect(() => {
    fetchColleges();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ collegeId: "", author: "", rating: "5", title: "", content: "" });
        fetchReviews(); // Refresh
      } else {
        alert("Failed to submit review");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Student Reviews</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          Write a Review
        </button>
      </div>
      
      <p className="text-gray-600">Read authentic reviews from current students and alumni about campus life, academics, and placements.</p>

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid gap-6 mt-8">
          {reviews.length === 0 ? (
            <p className="text-gray-500 text-center py-10">No reviews found. Be the first to write one!</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900">{review.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-medium text-gray-700">{review.author}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <p className="text-sm text-indigo-600 font-medium">{review.college?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className={`w-4 h-4 ${idx < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">{review.content}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                  <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span>Helpful</span>
                  </button>
                </div>
              </div>
            ))
          )}
          
          <Pagination 
            currentPage={page} 
            totalPages={totalPages} 
            onPageChange={setPage} 
          />
        </div>
      )}

      {/* Write Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Write a Review</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Select College</label>
                <select 
                  required
                  value={formData.collegeId}
                  onChange={(e) => setFormData({...formData, collegeId: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">-- Choose a College --</option>
                  {colleges.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Your Name</label>
                  <input 
                    type="text" required
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    placeholder="John Doe"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Rating</label>
                  <select 
                    required
                    value={formData.rating}
                    onChange={(e) => setFormData({...formData, rating: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Good</option>
                    <option value="3">3 - Average</option>
                    <option value="2">2 - Poor</option>
                    <option value="1">1 - Terrible</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Review Title</label>
                <input 
                  type="text" required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., Great Placements but strict academics"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Review Content</label>
                <textarea 
                  required rows={4}
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  placeholder="Share your detailed experience..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                ></textarea>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-50 rounded-lg">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50">
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
