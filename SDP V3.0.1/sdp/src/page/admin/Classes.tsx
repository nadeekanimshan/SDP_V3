import { useEffect, useState } from "react";
import { UseAxios } from "../../hook/useAxios";
import { FaEdit, FaTrash, FaSearch, FaPlus } from "react-icons/fa";

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

export default function ClassManagement() {
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [search, setSearch] = useState("");
  const [filteredClasses, setFilteredClasses] = useState<ClassType[]>([]);
  const [formData, setFormData] = useState<Partial<ClassType>>({});
  const [showModal, setShowModal] = useState(false);

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
    if (formData.id) {
      await UseAxios(`classes/${formData.id}`, "PUT", formData);
    } else {
      await UseAxios("classes", "POST", formData);
    }
    fetchClasses();
    setShowModal(false);
    setFormData({});
  };

  return (
    <div className="flex-1 bg-gray-900 p-6">
      <h1 className="text-2xl font-bold mb-4 text-white">Classes</h1>

      {/* Add Button */}
      <div className="mb-4 flex justify-end">
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-purple-700"
          onClick={() => {
            setFormData({});
            setShowModal(true);
          }}
        >
          <FaPlus /> Add Class
        </button>
      </div>

      {/* Search Bar */}
      <form
        className="max-w-md mx-auto mb-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <label
          htmlFor="class-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <FaSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="search"
            id="class-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
            placeholder="Search classes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>

      {/* Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
              <tr
                key={cls.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {cls.name}
                </th>
                <td className="px-6 py-4">
                  {cls.description?.slice(0, 40)}...
                </td>
                <td className="px-6 py-4">{cls.duration}</td>
                <td className="px-6 py-4">{cls.day}</td>
                <td className="px-6 py-4">{cls.startTime}</td>
                <td className="px-6 py-4">
                  {cls.installments_count} x {cls.installments_price}
                </td>
                <td className="px-6 py-4">{cls.full_price}</td>
                <td className="px-6 py-4 flex gap-3">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => {
                      setFormData(cls);
                      setShowModal(true);
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(cls.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {filteredClasses.length === 0 && (
              <tr className="bg-white dark:bg-gray-800">
                <td
                  colSpan={8}
                  className="px-6 py-4 text-center text-gray-600 dark:text-gray-300"
                >
                  No Classes Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal (Simple Example) */}
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
  <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-96 space-y-4">
      <h2 className="text-xl font-semibold">
        {formData.id ? "Update Class" : "Add Class"}
      </h2>

      {formData.name ? <span className="text-gray-500">Class Name</span> : <span className="text-gray-500"></span>}
      <input
        className="w-full border border-gray-300 rounded px-3 py-2"
        placeholder="Class Name"
        value={formData.name || ""}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      {formData.description ? <span className="text-gray-500">Description</span> : <span className="text-gray-500"></span>}
      <textarea
        className="w-full border border-gray-300 rounded px-3 py-2"
        placeholder="Description"
        value={formData.description || ""}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />

      <span className="text-gray-500">Duration</span>
      <select
        className="w-full border border-gray-300 rounded px-3 py-2"
        value={formData.duration || ""}
        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
      >
        <option value="">Select Duration</option>
        <option value="1h">1h</option>
        <option value="1h 30min">1h 30min</option>
        <option value="2h">2h</option>
      </select>

      <span className="text-gray-500">Day</span>
      <select
        className="w-full border border-gray-300 rounded px-3 py-2"
        value={formData.day || ""}
        onChange={(e) => setFormData({ ...formData, day: e.target.value })}
      >
        <option value="">Select Day</option>
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      <span className="text-gray-500">Start Time</span>
      <input
        type="time"
        className="w-full border border-gray-300 rounded px-3 py-2"
        placeholder="Start Time"
        value={formData.startTime || ""}
        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
      />

      <span className="text-gray-500">End Time</span>
      <input
        type="time"
        className="w-full border border-gray-300 rounded px-3 py-2"
        placeholder="End Time"
        value={formData.endTime || ""}
        onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
      />

      <span className="text-gray-500">Installments Count</span>
      <select
        className="w-full border border-gray-300 rounded px-3 py-2"
        value={formData.installments_count || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            installments_count: Number(e.target.value),
            full_price: (
              Number(e.target.value) * Number(formData.installments_price || 0)
            ).toFixed(2),
          })
        }
      >
        <option value="">Select Installments Count</option>
        <option value="3">3</option>
        <option value="6">6</option>
        <option value="12">12</option>
      </select>

      {formData.installments_price ? <span className="text-gray-500">Installment Price</span> : <span className="text-gray-500"></span>}
      <input
        type="number"
        className="w-full border border-gray-300 rounded px-3 py-2"
        placeholder="Installment Price"
        value={formData.installments_price || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            installments_price: e.target.value,
            full_price: (
              Number(e.target.value) * Number(formData.installments_count || 0)
            ).toFixed(2),
          })
        }
      />

      <span className="text-gray-500">Full Price</span>
      <input
        type="number"
        className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
        placeholder="Full Price"
        value={formData.full_price || ""}
        disabled
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
)}

    </div>
  );
}
