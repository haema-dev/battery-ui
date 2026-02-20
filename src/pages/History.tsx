import { useState } from "react";
import { Download, ChevronLeft, ChevronRight, Filter } from "lucide-react";

const History = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock Data Generation
  const historyData = Array.from({ length: 45 }, (_, i) => ({
    line: i % 3 === 0 ? "Line A" : i % 3 === 1 ? "Line B" : "Line C",
    id: `BID-${10000 + i}`,
    timestamp: `2026-02-20 10:${String(i % 60).padStart(2, "0")}:00`,
    photoId: `PID-${9000 + i}`,
    defectType: i % 5 === 0 ? "Scratch" : i % 5 === 1 ? "Dent" : "None",
    status: i % 5 === 0 || i % 5 === 1 ? "DEFECT" : "NORMAL",
  }));

  const totalPages = Math.ceil(historyData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = historyData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="bg-[#1e293b] rounded-xl border border-gray-700 p-5 flex justify-between items-center shadow-lg">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-3 bg-gray-900/50 px-4 py-2 rounded border border-gray-700">
            <span className="text-xs font-bold text-gray-400 uppercase">
              From
            </span>
            <input
              type="date"
              defaultValue="2026-02-20"
              className="bg-transparent text-sm text-white outline-none font-mono"
            />
          </div>
          <span className="text-gray-600 font-bold">-</span>
          <div className="flex items-center gap-3 bg-gray-900/50 px-4 py-2 rounded border border-gray-700">
            <span className="text-xs font-bold text-gray-400 uppercase">
              To
            </span>
            <input
              type="date"
              defaultValue="2026-02-20"
              className="bg-transparent text-sm text-white outline-none font-mono"
            />
          </div>
          <button className="bg-gray-800 hover:bg-gray-700 p-2.5 rounded text-gray-400 transition-colors">
            <Filter size={18} />
          </button>
        </div>

        <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded text-sm font-bold flex items-center gap-2 transition-colors shadow-lg shadow-emerald-900/20">
          <Download size={16} /> CSV DOWNLOAD
        </button>
      </div>
      <div className="bg-[#1e293b] rounded-xl border border-gray-700 shadow-xl overflow-hidden flex-1 flex flex-col">
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-800/80 text-gray-400 uppercase font-bold sticky top-0 backdrop-blur-sm z-10">
              <tr>
                <th className="p-5 border-b border-gray-700 w-32">Line</th>
                <th className="p-5 border-b border-gray-700">Battery ID</th>
                <th className="p-5 border-b border-gray-700">Date</th>
                <th className="p-5 border-b border-gray-700">Photo ID</th>
                <th className="p-5 border-b border-gray-700">Defect Type</th>
                <th className="p-5 border-b border-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {currentData.map((item, i) => (
                <tr
                  key={i}
                  className="hover:bg-blue-900/10 transition-colors cursor-pointer group"
                >
                  <td className="p-5 font-mono text-gray-400">{item.line}</td>
                  <td className="p-5 font-mono font-bold text-blue-300 group-hover:text-blue-400 transition-colors">
                    {item.id}
                  </td>
                  <td className="p-5 text-gray-400 font-mono">
                    {item.timestamp}
                  </td>
                  <td className="p-5 text-gray-500 font-mono">
                    {item.photoId}
                  </td>
                  <td className="p-5">
                    {item.defectType !== "None" ? (
                      <span className="bg-red-900/30 text-red-400 border border-red-900/50 px-3 py-1 rounded text-xs font-bold uppercase">
                        {item.defectType}
                      </span>
                    ) : (
                      <span className="text-gray-600">-</span>
                    )}
                  </td>
                  <td className="p-5">
                    <div
                      className={`w-3 h-3 rounded-full ${item.status === "NORMAL" ? "bg-blue-500" : "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"}`}
                    ></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-700 bg-gray-800/50 flex justify-center items-center gap-3">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed text-gray-400"
          >
            <ChevronLeft size={20} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-8 h-8 rounded text-xs font-bold transition-colors ${
                currentPage === page
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50"
                  : "text-gray-400 hover:bg-gray-700"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed text-gray-400"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default History;
