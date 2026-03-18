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
            note: ""
        });
    };

    const filteredEvents = events.filter((event : any) => event.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="flex-1 dark:bg-gray-900 p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-white">Event Management</h1>
                <button className="bg-purple-600 text-white px-4 py-2 rounded flex items-center gap-2"
                    onClick={
                        () => {
                            resetForm();
                            setShowModal(true);
                        }
                }>
                    <FaPlus/>
                    Add Event
                </button>
            </div>

            <form className="max-w-md mx-auto mb-6"
                onSubmit={
                    (e) => e.preventDefault()
                }
                // Prevents form reload
            >
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <FaSearch className="w-4 h-4 text-gray-500 dark:text-gray-400"/>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500" placeholder="Search event..."
                        value={search}
                        onChange={
                            (e) => setSearch(e.target.value)
                        }/>
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                        Search
                    </button>
                </div>
            </form>


            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                    <tbody> {
                        filteredEvents.map((event : any) => (
                            <tr key={
                                    event.id
                                }
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {
                                    event.title
                                } </th>
                                <td className="px-6 py-4">
                                    {
                                    event.description ?. slice(0, 40)
                                }...
                                </td>
                                <td className="px-6 py-4">
                                    {
                                    new Date(event.startDate).toLocaleDateString()
                                } </td>
                                <td className="px-6 py-4">
                                    {
                                    new Date(event.time).toLocaleTimeString()
                                } </td>
                                <td className="px-6 py-4">
                                    {
                                    event.location
                                }</td>
                                <td className="px-6 py-4 flex gap-3">
                                    <button className="text-blue-100 hover:text-blue-200"
                                        onClick={
                                            () => {
                                                setFormData(event);
                                                setShowModal(true);
                                            }
                                    }>
                                        <FaEdit/>
                                    </button>
                                    <button className="text-red-100 hover:text-red-200"
                                        onClick={
                                            () => handleDelete(event.id)
                                    }>
                                        <FaTrash/>
                                    </button>
                                </td>
                            </tr>
                        ))
                    }

                        {
                        filteredEvents.length === 0 && (
                            <tr className="bg-white dark:bg-gray-800">
                                <td colSpan={6}
                                    className="px-6 py-4 text-center text-gray-600 dark:text-gray-300">
                                    No Events Found
                                </td>
                            </tr>
                        )
                    } </tbody>
                </table>
            </div>


            {/* Modal */}
            {
            showModal && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-lg">
                        <h2 className="text-xl font-bold mb-4">
                            {
                            formData.id ? "Edit Event" : "Add Event"
                        } </h2>
                        <form onSubmit={handleSubmit}
                            className="space-y-4">
                            <div>
                                <label className="block font-semibold">Title *</label>
                                <input type="text" className="border rounded px-3 py-2 w-full"
                                    value={
                                        formData.title
                                    }
                                    onChange={
                                        (e) => setFormData({
                                            ...formData,
                                            title: e.target.value
                                        })
                                    }
                                    required/>
                            </div>
                            <div>
                                <label className="block font-semibold">Description</label>
                                <textarea className="border rounded px-3 py-2 w-full"
                                    value={
                                        formData.description || ""
                                    }
                                    onChange={
                                        (e) => setFormData({
                                            ...formData,
                                            description: e.target.value
                                        })
                                    }/>
                            </div>
                            <div>
                                <label className="block font-semibold">Start Date *</label>
                                <input type="date" className="border rounded px-3 py-2 w-full"
                                    value={
                                        formData.startDate.slice(0, 10)
                                    }
                                    onChange={
                                        (e) => setFormData({
                                            ...formData,
                                            startDate: e.target.value
                                        })
                                    }
                                    required/>
                            </div>
                            <div>
                                <label className="block font-semibold">Time *</label>
                                <input type="time" className="border rounded px-3 py-2 w-full"
                                    value={
                                        formData.time ? formData.time.slice(11, 16) : ""
                                    }
                                    onChange={
                                        (e) => setFormData({
                                            ...formData,
                                            time: `2025-01-01T${
                                                e.target.value
                                            }:00.000Z`
                                        })
                                    }
                                    required/>
                            </div>
                            <div>
                                <label className="block font-semibold">Location</label>
                                <input type="text" className="border rounded px-3 py-2 w-full"
                                    value={
                                        formData.location || ""
                                    }
                                    onChange={
                                        (e) => setFormData({
                                            ...formData,
                                            location: e.target.value
                                        })
                                    }/>
                            </div>

                            <div className="flex justify-end gap-2">
                                <button type="button" className="px-4 py-2 bg-gray-300 rounded"
                                    onClick={
                                        () => setShowModal(false)
                                }>
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        } </div>
    );
}
