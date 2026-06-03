import {useEffect, useState} from "react";
import { UseAxios } from "../../hook/useAxios";
import {FaPlus, FaTrash, FaEdit, FaSearch} from "react-icons/fa";

export default function Event() {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        id: null,
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        location: "",
        time: "",
        eventUrl: "",
        note: ""
    });

    const fetchEvents = async () => {
        try {
            const res = await UseAxios("events", "GET");
            setEvents(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleDelete = async (id : number) => {
        if (confirm("Are you sure you want to delete this event?")) {
            try {
                await UseAxios(`events/${id}`, "DELETE");
                fetchEvents();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleSubmit = async (e : any) => {
        e.preventDefault();
        // Basic validation
        if (!formData.title || !formData.startDate || !formData.time) {
            alert("Please fill required fields (Title, Start Date, Time)");
            return;
        }

        try {
            if (formData.id) {
                await UseAxios(`events/${formData.id}`, "PUT", formData);
            } else {
                await UseAxios("events", "POST", formData);
            }
            setShowModal(false);
            fetchEvents();
            resetForm();
        } catch (err) {
            console.error(err);
        }
    };

    const resetForm = () => {
        setFormData({
            id: null,
            title: "",
            description: "",
            startDate: "",
            endDate: "",
            location: "",
            time: "",
            eventUrl: "",
            note: ""
        });
    };

    const filteredEvents = events.filter((event : any) => event.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
            <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-white">Event Management</h1>
                <button className="bg-amber-500 text-slate-900 px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-amber-400"
                    onClick={() => { resetForm(); setShowModal(true); }}>
                    <FaPlus/> Add Event
                </button>
            </div>

            <form className="max-w-md mb-6" onSubmit={(e) => e.preventDefault()}>
                <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-white border border-slate-600 rounded-lg bg-slate-700/50 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent" placeholder="Search event..."
                        value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </form>

            <div className="backdrop-blur-sm bg-slate-800/50 rounded-2xl border border-slate-700/50 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-slate-700/50 text-slate-300">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Start Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Time
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Location
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEvents.map((event: any) => (
                            <tr key={event.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                                <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">{event.title}</th>
                                <td className="px-6 py-4 text-slate-300">{event.description?.slice(0, 40)}...</td>
                                <td className="px-6 py-4 text-slate-300">{new Date(event.startDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-slate-300">
                                    {event.time ? (() => {
                                        const date = new Date(event.time);
                                        const hours = date.getUTCHours().toString().padStart(2, '0');
                                        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
                                        return `${hours}:${minutes}`;
                                    })() : '-'}
                                </td>
                                
                                <td className="px-6 py-4 text-slate-300">{event.location}</td>
                                <td className="px-6 py-4 flex gap-3">
                                    <button className="text-amber-400 hover:text-amber-300" onClick={() => { setFormData(event); setShowModal(true); }}><FaEdit/></button>
                                    <button className="text-rose-400 hover:text-rose-300" onClick={() => handleDelete(event.id)}><FaTrash/></button>
                                </td>
                            </tr>
                        ))}
                        {filteredEvents.length === 0 && (
                            <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-500">No Events Found</td></tr>
                        )}
                    </tbody>
                </table>
                </div>
            </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-lg shadow-xl">
                        <h2 className="text-xl font-bold mb-4 text-white">{formData.id ? "Edit Event" : "Add Event"}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Title *</label>
                                <input type="text" className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/50 text-white focus:ring-2 focus:ring-amber-500" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
                                <textarea className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/50 text-white focus:ring-2 focus:ring-amber-500" value={formData.description || ""} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Start Date *</label>
                                <input type="date" className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/50 text-white focus:ring-2 focus:ring-amber-500" value={formData.startDate?.slice(0, 10) || ""} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Time *</label>
                                <input 
                                    type="time" 
                                    className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/50 text-white focus:ring-2 focus:ring-amber-500" 
                                    value={formData.time ? (formData.time.includes('T') ? formData.time.slice(11, 16) : formData.time) : ""} 
                                    onChange={(e) => {
                                        // Create a proper ISO datetime string for time storage
                                        const timeValue = e.target.value; // Format: "HH:MM"
                                        const isoDateTime = `1970-01-01T${timeValue}:00.000Z`;
                                        setFormData({ ...formData, time: isoDateTime });
                                    }} 
                                    required 
                                />
                                <p className="text-xs text-slate-400 mt-1">Select event time</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Location</label>
                                <input type="text" className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/50 text-white focus:ring-2 focus:ring-amber-500" value={formData.location || ""} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Event URL</label>
                                <input 
                                    type="url" 
                                    placeholder="https://example.com/event-booking" 
                                    className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/50 text-white focus:ring-2 focus:ring-amber-500" 
                                    value={formData.eventUrl || ""} 
                                    onChange={(e) => setFormData({ ...formData, eventUrl: e.target.value })} 
                                />
                                <p className="text-xs text-slate-400 mt-1">Booking/registration link (optional)</p>
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button type="button" className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-amber-500 text-slate-900 rounded-lg font-medium hover:bg-amber-400">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
