import { useEffect, useState, useCallback } from "react";
import { UseAxios } from "../../hook/useAxios";
import { FaEdit, FaTrash, FaSearch, FaPlus } from "react-icons/fa";
import { format } from "date-fns";
import { toast, ToastContainer } from "react-toastify";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface ClassType {
  id: number;
  name: string;
  description?: string;
  duration: string;
  day: string;
  startTime: string;
  endTime?: string;
  startDate?: string;
  installments_count: number;
  installments_price: string;
  full_price: string;
}

function to12h(time: string): string {
  if (!time) return "-";
  const t = time.replace(".", ":");
  const [hStr, mStr] = t.split(":");
  let h = parseInt(hStr, 10);
  const m = mStr?.padStart(2, "0") ?? "00";
  if (isNaN(h)) return time;
  const period = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${String(h).padStart(2, "0")}:${m} ${period}`;
}

function computeDurationLabel(startTime: string, endTime: string): string {
  if (!startTime || !endTime) return "";
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);
  const startMins = sh * 60 + (sm || 0);
  const endMins = eh * 60 + (em || 0);
  const diff = endMins - startMins;
  if (diff <= 0) return "";
  const hrs = Math.floor(diff / 60);
  const mins = diff % 60;
  if (hrs === 0) return `${mins}min`;
  if (mins === 0) return `${hrs}h`;
  return `${hrs}h ${mins}min`;
}

export default function ClassManagement() {
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [search, setSearch] = useState("");
  const [filteredClasses, setFilteredClasses] = useState<ClassType[]>([]);
  const [formData, setFormData] = useState<Partial<ClassType>>({});
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  const updateEndTimeFromDuration = useCallback((data: Partial<ClassType>) => {
    return data;
  }, []);

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    setFilteredClasses(
      classes.filter((cls) =>
        cls.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, classes]);

  const fetchClasses = async () => {
    const res = await UseAxios("classes", "GET");
    setClasses(res.data);
  };

  const handleDelete = async (id: number) => {
    await UseAxios(`classes/${id}`, "DELETE");
    fetchClasses();
  };

  const handleSubmit = async () => {
    // Normalize startDate to first day of month in YYYY-MM-DD format
    let startDate = formData.startDate || "";
    if (startDate) {
      const d = new Date(startDate);
      // Use UTC to avoid timezone shifting the month
      startDate = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-01`;
    }

    const payload = {
      ...formData,
      day: selectedDays.length > 0 ? selectedDays.join(", ") : formData.day,
      duration: formData.startTime && formData.endTime
        ? computeDurationLabel(formData.startTime, formData.endTime)
        : formData.duration ?? "",
      startDate: startDate || new Date().toISOString().split("T")[0],
    };

    try {
      if (formData.id) {
        await UseAxios(`classes/${formData.id}`, "PUT", payload);
      } else {
        await UseAxios("classes", "POST", payload);
      }
      toast.success(formData.id ? "Class updated successfully" : "Class created successfully");
      fetchClasses();
      setShowModal(false);
      setFormData({});
      setSelectedDays([]);
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || "Failed to save class";
      toast.error(message);
    }
  };

  const openModal = (data?: Partial<ClassType>) => {
    const d = data ?? {};
    setFormData(d);
    setSelectedDays(d.day ? String(d.day).split(/,\s*/).filter(Boolean) : []);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({});
    setSelectedDays([]);
  };

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <ToastContainer position="top-center" autoClose={4000} />
      <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Classes</h1>
        <button className="bg-amber-500 text-slate-900 px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-amber-400" onClick={() => openModal()}>
          <FaPlus /> Add Class
        </button>
      </div>

      <form className="max-w-md mb-6" onSubmit={(e) => e.preventDefault()}>
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input type="search" id="class-search" className="block w-full p-4 pl-10 text-sm text-white border border-slate-600 rounded-lg bg-slate-700/50 placeholder-slate-500 focus:ring-2 focus:ring-amber-500" placeholder="Search classes..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </form>

      <div className="backdrop-blur-sm bg-slate-800/50 rounded-2xl border border-slate-700/50 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-slate-700/50 text-slate-300">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Duration</th>
              <th className="px-6 py-3">Day</th>
              <th className="px-6 py-3">Start Time</th>
              <th className="px-6 py-3">End Time</th>
              <th className="px-6 py-3">Start Month</th>
              <th className="px-6 py-3">Installments</th>
              <th className="px-6 py-3">Full Price</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClasses.map((cls) => (
              <tr key={cls.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">{cls.name}</th>
                <td className="px-6 py-4 text-slate-300">{cls.description?.slice(0, 40)}...</td>
                <td className="px-6 py-4 text-slate-300">{cls.duration}</td>
                <td className="px-6 py-4 text-slate-300">{cls.day}</td>
                <td className="px-6 py-4 text-slate-300">{to12h(cls.startTime)}</td>
                <td className="px-6 py-4 text-slate-300">{cls.endTime ? to12h(cls.endTime) : "-"}</td>
                <td className="px-6 py-4 text-slate-300">
                  {cls.startDate ? format(new Date(cls.startDate), "MMM yyyy") : "-"}
                </td>
                <td className="px-6 py-4 text-slate-300">{cls.installments_count} x {cls.installments_price}</td>
                <td className="px-6 py-4 text-slate-300">{cls.full_price}</td>
                <td className="px-6 py-4 flex gap-3">
                  <button className="text-amber-400 hover:text-amber-300" onClick={() => openModal(cls)}><FaEdit /></button>
                  <button className="text-rose-400 hover:text-rose-300" onClick={() => handleDelete(cls.id)}><FaTrash /></button>
                </td>
              </tr>
            ))}
            {filteredClasses.length === 0 && (
              <tr><td colSpan={8} className="px-6 py-12 text-center text-slate-500">No Classes Found</td></tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
      </div>

      {/* Modal */}
      {/* {showModal && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 space-y-4">
            <h2 className="text-xl font-semibold">
              {formData.id ? "Update Class" : "Add Class"}
            </h2>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Class Name"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Duration"
              value={formData.duration || ""}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
            />
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Day"
              value={formData.day || ""}
              onChange={(e) =>
                setFormData({ ...formData, day: e.target.value })
              }
            />
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Start Time"
              value={formData.startTime || ""}
              onChange={(e) =>
                setFormData({ ...formData, startTime: e.target.value })
              }
            />
            <div className="flex gap-2 justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                onClick={handleSubmit}
              >
                {formData.id ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )} */}

{showModal && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
      <h2 className="text-xl font-bold text-white">{formData.id ? "Update Class" : "Add Class"}</h2>
      <div><label className="block text-sm text-slate-300 mb-1">Class Name</label><input className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/50 text-white" placeholder="Class Name" value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /></div>
      <div><label className="block text-sm text-slate-300 mb-1">Description</label><textarea className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/50 text-white" placeholder="Description" value={formData.description || ""} onChange={(e) => setFormData({ ...formData, description: e.target.value })} /></div>
      <div>
        <label className="block text-sm text-slate-300 mb-1">Days</label>
        <div className="flex flex-wrap gap-3">
          {DAYS.map((d) => (
            <label key={d} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={selectedDays.includes(d)} onChange={() => toggleDay(d)} className="rounded border-slate-500 bg-slate-700 text-amber-500 focus:ring-amber-500" />
              <span className="text-slate-300 text-sm">{d.slice(0, 3)}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm text-slate-300 mb-1">Start Time</label>
          <input type="time" className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/50 text-white" value={(() => {
            const st = formData.startTime || "";
            if (!st) return "";
            if (st.includes("AM") || st.includes("PM")) {
              const [t, p] = st.split(/(?=\s*[AP]M)/i);
              const [h, m] = t.trim().split(":").map(Number);
              let hour = h || 0;
              if (p?.toUpperCase().includes("PM") && hour !== 12) hour += 12;
              if (p?.toUpperCase().includes("AM") && hour === 12) hour = 0;
              return `${String(hour).padStart(2, "0")}:${String(m || 0).padStart(2, "0")}`;
            }
            return st.replace(".", ":");
          })()} onChange={(e) => setFormData({ ...formData, startTime: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">End Time</label>
          <input type="time" className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/50 text-white" value={formData.endTime || ""} onChange={(e) => setFormData({ ...formData, endTime: e.target.value })} />
        </div>
      </div>
      {/* Auto-calculated duration */}
      {formData.startTime && formData.endTime && computeDurationLabel(formData.startTime, formData.endTime) && (
        <div className="flex items-center gap-2 px-3 py-2 bg-amber-500/10 border border-amber-500/30 rounded-lg">
          <span className="text-slate-400 text-sm">Duration:</span>
          <span className="text-amber-400 font-semibold text-sm">{computeDurationLabel(formData.startTime, formData.endTime)}</span>
        </div>
      )}
      <div><label className="block text-sm text-slate-300 mb-1">Installments Count</label>
        <select className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/50 text-white" value={formData.installments_count ?? ""} onChange={(e) => setFormData({ ...formData, installments_count: Number(e.target.value), full_price: (Number(e.target.value) * Number(formData.installments_price || 0)).toFixed(2) })}>
          <option value="">Select</option>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <div><label className="block text-sm text-slate-300 mb-1">Installment Price</label><input type="number" className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/50 text-white" placeholder="Installment Price" value={formData.installments_price || ""} onChange={(e) => setFormData({ ...formData, installments_price: e.target.value, full_price: (Number(e.target.value) * Number(formData.installments_count || 0)).toFixed(2) })} /></div>
      <div><label className="block text-sm text-slate-300 mb-1">Full Price</label><input type="number" className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/30 text-slate-400" value={formData.full_price || ""} disabled /></div>
      <div>
        <label className="block text-sm text-slate-300 mb-1">Class Start Month</label>
        <input
          type="month"
          className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/50 text-white focus:ring-2 focus:ring-amber-500"
          value={formData.startDate ? format(new Date(formData.startDate), "yyyy-MM") : ""}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value ? `${e.target.value}-01` : "" })}
        />
        {formData.startDate && formData.installments_count && (
          <div className="mt-2 p-3 bg-slate-700/30 rounded-lg border border-slate-600/50 space-y-1">
            <p className="text-xs text-slate-400 font-medium">Installment Due Dates Preview:</p>
            {Array.from({ length: Number(formData.installments_count) }, (_, i) => {
              const d = new Date(`${formData.startDate}`);
              d.setMonth(d.getMonth() + i);
              return (
                <p key={i} className="text-xs text-slate-300">
                  Installment {i + 1}: <span className="text-amber-400">{format(d, "MMMM yyyy")}</span>
                </p>
              );
            })}
          </div>
        )}
      </div>
      <div className="flex gap-2 justify-end pt-2"><button className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500" onClick={closeModal}>Cancel</button><button className="px-4 py-2 bg-amber-500 text-slate-900 rounded-lg font-medium hover:bg-amber-400" onClick={handleSubmit}>{formData.id ? "Update" : "Add"}</button></div>
    </div>
  </div>
)}
    </div>
  );
}
