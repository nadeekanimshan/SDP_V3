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
    setSelectedMonths([]);
    setShowDropdown(false);
    console.log("Downloading for:", selectedMonths);
    handleDownload(selectedMonths);
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex flex-col gap-2">
        {/* Dropdown toggle button */}
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 text-white text-xl flex items-center gap-2"
        >
          Select Month(s)
        </button>

        {/* Dropdown content */}
        {showDropdown && (
          <div className="absolute mt-2 bg-gray-800 border border-gray-600 rounded shadow-lg z-50 p-4 max-h-64 overflow-y-auto w-60">
            {/* Month checkboxes */}
            {monthsList.map((month) => (
              <label key={month} className="flex items-center gap-2 text-white mb-1">
                <input
                  type="checkbox"
                  checked={selectedMonths.includes(month)}
                  onChange={() => handleMonthChange(month)}
                />
                {month}
              </label>
            ))}

            {/* Close button */}
            <button
              onClick={() => setShowDropdown(false)}
              className="mt-3 bg-red-600 px-3 py-1 rounded text-white hover:bg-red-700 w-full"
            >
              Close
            </button>
          </div>
        )}

        {/* Download button */}
        <button
          onClick={handleDownloadReport}
          disabled={selectedMonths.length === 0}
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 text-white flex items-center gap-2 disabled:opacity-50"
        >
          <FaDownload />
          Download Report for Selected Months
        </button>
      </div>
    </div>
  );
};

export default DownloadMonthReport;
