import { useEffect, useState, useCallback } from "react";
import { UseAxios } from "../../hook/useAxios";
import { FaEdit, FaTrash, FaSearch, FaPlus } from "react-icons/fa";

const DURATION_OPTIONS = [
  { value: "1", label: "1h", hours: 1 },
  { value: "1.30", label: "1h 30min", hours: 1.5 },
  { value: "2", label: "2h", hours: 2 },
  { value: "2.30", label: "2h 30min", hours: 2.5 },
  { value: "3", label: "3h", hours: 3 },
  { value: "3.30", label: "3h 30min", hours: 3.5 },
  { value: "4", label: "4h", hours: 4 },
  { value: "4.30", label: "4h 30min", hours: 4.5 },
  { value: "5", label: "5h", hours: 5 },
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface ClassType {
  id: number;
  name: string;
  description?: string;
  duration: string;
  day: string;
  startTime: string;
  endTime?: string;
  installments_count: number;
  installments_price: string;
  full_price: string;
}

function computeEndTime(startTime: string, durationHours: number): string {
  if (!startTime || !durationHours) return "";
  const [h, m] = startTime.split(":").map(Number);
  const totalMins = h * 60 + (m || 0) + durationHours * 60;
  const endH = Math.floor(totalMins / 60) % 24;
  const endM = totalMins % 60;
  return `${String(endH).padStart(2, "0")}:${String(endM).padStart(2, "0")}`;
}

function parseDurationHours(d: string | undefined): number {
  if (!d) return 0;
  const opt = DURATION_OPTIONS.find((o) => o.label === d || o.value === d);
  if (opt) return opt.hours;
  const s = String(d);
  const m = s.match(/(\d+)h\s*30\s*min/i);
  if (m) return parseInt(m[1], 10) + 0.5;
  const m2 = s.match(/(\d+)\s*hour/i);
  if (m2) return parseInt(m2[1], 10);
  const m3 = s.match(/(\d+)h/i);
  if (m3) return parseInt(m3[1], 10);
  return parseFloat(s.replace(/[^0-9.]/g, "")) || 0;
}

export default function ClassManagement() {
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [search, setSearch] = useState("");
  const [filteredClasses, setFilteredClasses] = useState<ClassType[]>([]);
  const [formData, setFormData] = useState<Partial<ClassType>>({});
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  const updateEndTimeFromDuration = useCallback((data: Partial<ClassType>) => {
    const hours = parseDurationHours(data.duration);
    if (data.startTime && hours) {
      const st = String(data.startTime);
      const normalized = st.includes(":") ? st.replace(".", ":") : st;
      const [h, m] = normalized.split(":");
      if (h !== undefined) {
        const end = computeEndTime(`${h.padStart(2, "0")}:${(m || "0").padStart(2, "0")}`, hours);
        return { ...data, endTime: end };
      }
    }
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
    const payload = {
      ...formData,
      day: selectedDays.length > 0 ? selectedDays.join(", ") : formData.day,
    };
    if (formData.id) {
      await UseAxios(`classes/${formData.id}`, "PUT", payload);
    } else {
      await UseAxios("classes", "POST", payload);
    }
    fetchClasses();
    setShowModal(false);
    setFormData({});
    setSelectedDays([]);
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
                <td className="px-6 py-4 text-slate-300">{cls.startTime}</td>
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
        <label className="block text-sm text-slate-300 mb-1">Duration (hours / Day)</label>
        <select className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/50 text-white" value={formData.duration ? (() => {
          const opt = DURATION_OPTIONS.find((o) => o.label === formData.duration || o.value === formData.duration);
          if (opt) return opt.value;
          const hours = parseDurationHours(formData.duration);
          return DURATION_OPTIONS.find((o) => o.hours === hours)?.value ?? formData.duration;
        })() : ""} onChange={(e) => {
          const opt = DURATION_OPTIONS.find((o) => o.value === e.target.value);
          const next = { ...formData, duration: opt?.label ?? e.target.value };
          setFormData(updateEndTimeFromDuration(next));
        }}>
          <option value="">Select Duration</option>
          {DURATION_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
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
        })()} onChange={(e) => {
          const next = { ...formData, startTime: e.target.value };
          setFormData(updateEndTimeFromDuration(next));
        }} />
      </div>
      <div>
        <label className="block text-sm text-slate-300 mb-1">End Time</label>
        <input type="time" className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/30 text-slate-400" value={formData.endTime || ""} readOnly />
      </div>
      <div>
        <label className="block text-sm text-slate-300 mb-1">Installments Count</label>
        <select className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/50 text-white" value={formData.installments_count ?? ""} onChange={(e) => setFormData({ ...formData, installments_count: Number(e.target.value), full_price: (Number(e.target.value) * Number(formData.installments_price || 0)).toFixed(2) })}>
          <option value="">Select</option>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <div><label className="block text-sm text-slate-300 mb-1">Installment Price</label><input type="number" className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/50 text-white" placeholder="Installment Price" value={formData.installments_price || ""} onChange={(e) => setFormData({ ...formData, installments_price: e.target.value, full_price: (Number(e.target.value) * Number(formData.installments_count || 0)).toFixed(2) })} /></div>
      <div><label className="block text-sm text-slate-300 mb-1">Full Price</label><input type="number" className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/30 text-slate-400" value={formData.full_price || ""} disabled /></div>
      <div className="flex gap-2 justify-end pt-2"><button className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500" onClick={closeModal}>Cancel</button><button className="px-4 py-2 bg-amber-500 text-slate-900 rounded-lg font-medium hover:bg-amber-400" onClick={handleSubmit}>{formData.id ? "Update" : "Add"}</button></div>
    </div>
  </div>
)}
    </div>
  );
}
