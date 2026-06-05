import { useState, useEffect } from "react";
import { IndianRupee, Search, Filter } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { Pagination } from "@/components/layout/Pagination";

export function FeesTab() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);
  
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCourses = async (query: string, currentPage: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/courses?q=${query}&limit=6&page=${currentPage}`);
      const data = await res.json();
      if (data.data) {
        setCourses(data.data);
        setTotalPages(data.totalPages || 1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    fetchCourses(debouncedSearch, page);
  }, [debouncedSearch, page]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Fee Structures</h2>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search college or course..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64"
          />
        </div>
      </div>
      
      <p className="text-gray-600">Compare tuition fees, duration, and seat availability across different institutions and courses.</p>

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : courses.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No courses found matching your search.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {courses.map((course, i) => (
            <div key={course.id || i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 relative overflow-hidden hover:border-indigo-100 hover:shadow-md transition-all">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <IndianRupee className="w-24 h-24" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{course.college?.name}</h3>
              <p className="text-indigo-600 font-medium text-sm mb-4">{course.name}</p>
              
              <ul className="space-y-4 relative z-10">
                <li className="flex justify-between items-center border-b border-gray-50 pb-2 text-sm">
                  <span className="text-gray-600">Level & Duration</span>
                  <span className="font-bold text-gray-900">{course.level} • {course.duration}</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-50 pb-2 text-sm">
                  <span className="text-gray-600">Available Seats</span>
                  <span className="font-bold text-gray-900">{course.seats}</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-50 pb-2 text-sm">
                  <span className="text-gray-600">Total Fees</span>
                  <span className="font-bold text-indigo-600 text-lg">₹{course.fees.toLocaleString()}</span>
                </li>
              </ul>
              
              <div className="mt-4 flex gap-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">{course.college?.type}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && courses.length > 0 && (
        <Pagination 
          currentPage={page} 
          totalPages={totalPages} 
          onPageChange={setPage} 
        />
      )}
    </div>
  );
}
