import { useState } from "react";
import { FaDownload } from "react-icons/fa";

const monthsList = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DownloadMonthReport = ({ handleDownload }: { handleDownload: (selectedMonths: string[]) => void }) => {
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMonthChange = (month: string) => {
    setSelectedMonths(prev =>
      prev.includes(month)
        ? prev.filter(m => m !== month)
        : [...prev, month]
    );
  };

  const handleDownloadReport = () => {
    if (selectedMonths.length === 0) {
      alert("Please select at least one month");
      return;
    }
    console.log("Downloading for:", selectedMonths);
    handleDownload(selectedMonths);
    setSelectedMonths([]);
    setShowDropdown(false);
  };

  return (
    <div className="relative inline-block text-left w-full max-w-md">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <FaDownload className="text-emerald-500 text-2xl" />
          <h3 className="text-xl font-bold text-white">Student Report</h3>
        </div>

        {/* Info text */}
        <p className="text-slate-400 text-sm mb-4">
          Select one or more months to generate attendance report
        </p>

        {/* Dropdown toggle button */}
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="w-full bg-emerald-600 px-4 py-3 rounded-lg hover:bg-emerald-700 text-white font-medium flex items-center justify-center gap-2 transition-colors"
        >
          Select Month(s) & Download
        </button>

        {/* Selected months display */}
        {selectedMonths.length > 0 && (
          <div className="mt-3 p-3 bg-slate-700/50 rounded-lg">
            <p className="text-xs text-slate-400 mb-2">Selected:</p>
            <div className="flex flex-wrap gap-2">
              {selectedMonths.map(month => (
                <span key={month} className="bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded text-sm">
                  {month}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Dropdown content with maximum z-index */}
        {showDropdown && (
          <div className="absolute left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-[9999] p-4 max-h-80 overflow-y-auto">
            <p className="text-white font-medium mb-3">Select Months:</p>
            
            {/* Month checkboxes in grid */}
            <div className="grid grid-cols-2 gap-2">
              {monthsList.map((month) => (
                <label key={month} className="flex items-center gap-2 text-white p-2 hover:bg-slate-700/50 rounded cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedMonths.includes(month)}
                    onChange={() => handleMonthChange(month)}
                    className="w-4 h-4 accent-emerald-500"
                  />
                  <span className="text-sm">{month}</span>
                </label>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 mt-4 pt-3 border-t border-slate-700">
              <button
                onClick={() => setShowDropdown(false)}
                className="flex-1 bg-slate-600 px-3 py-2 rounded-lg text-white hover:bg-slate-500 transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleDownloadReport}
                disabled={selectedMonths.length === 0}
                className="flex-1 bg-emerald-600 px-3 py-2 rounded-lg text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Download ({selectedMonths.length})
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadMonthReport;
