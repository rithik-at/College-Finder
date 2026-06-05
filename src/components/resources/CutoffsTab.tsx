import { useState, useEffect } from "react";
import { TrendingUp, Download, ArrowDownUp } from "lucide-react";

export function CutoffsTab() {
  const exams = ["JEE Main", "JEE Advanced", "GATE", "BITSAT"];
  const [activeExam, setActiveExam] = useState("JEE Main");
  const [cutoffs, setCutoffs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCutoffs = async (exam: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/cutoffs?exam=${exam}&limit=50`);
      const data = await res.json();
      if (data.data) {
        setCutoffs(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCutoffs(activeExam);
  }, [activeExam]);

  const handleDownload = () => {
    if (cutoffs.length === 0) return;
    const headers = ["College", "Type", "Course", "Category", "Year", "Closing Rank"];
    const csvRows = [headers.join(",")];

    cutoffs.forEach(c => {
      const row = [
        `"${c.college?.name}"`,
        c.college?.type,
        `"${c.course}"`,
        c.category,
        c.year,
        c.closingRank
      ];
      csvRows.push(row.join(","));
    });

    const csvData = csvRows.join("\n");
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cutoffs_${activeExam.replace(" ", "_").toLowerCase()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Cutoff Trends</h2>
        <button 
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download Reports
        </button>
      </div>
      
      <p className="text-gray-600">Analyze past year opening and closing ranks for top colleges to predict your admission chances accurately.</p>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {exams.map((exam) => (
          <button 
            key={exam} 
            onClick={() => setActiveExam(exam)}
            className={`whitespace-nowrap px-4 py-2 rounded-full border text-sm font-medium transition-colors ${activeExam === exam ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-200 bg-white text-gray-700 hover:border-indigo-500 hover:text-indigo-600'}`}
          >
            {exam}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-6">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div>
            <h3 className="font-bold text-gray-900">{activeExam} Cutoffs</h3>
            <p className="text-sm text-gray-500 mt-1">General Category • Latest Year</p>
          </div>
          <TrendingUp className="text-indigo-500 w-5 h-5" />
        </div>
        
        {loading ? (
          <div className="flex justify-center p-12">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : cutoffs.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No cutoffs found for {activeExam}.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-white text-gray-600 font-medium border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">College</th>
                  <th className="px-6 py-4">Course</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Closing Rank</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-gray-800">
                {cutoffs.map((c, i) => (
                  <tr key={c.id || i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-indigo-700">{c.college?.name}</td>
                    <td className="px-6 py-4 text-gray-600">{c.course}</td>
                    <td className="px-6 py-4">{c.category}</td>
                    <td className="px-6 py-4 font-medium">{c.closingRank.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
