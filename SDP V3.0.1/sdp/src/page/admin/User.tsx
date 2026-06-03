import { useEffect, useState } from 'react';
import { UseAxios } from '../../hook/useAxios';
import { FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { Dialog } from '@headlessui/react';

interface UserType {
  id: number;
  name: string;
}

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  typeId: number;
  contactNumber: string;
  address: string;
  city: string;
  district: string;
  deleteStatus: boolean;
  type: UserType;
  password: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [userTypes, setUserTypes] = useState<UserType[]>([]);
  const [selectedTypeId, setSelectedTypeId] = useState<number | ''>('');
  const [deleteStatus, setDeleteStatus] = useState<boolean | ''>('');
  const [search, setSearch] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUser, setModalUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    contactNumber: '',
    address: '',
    city: '',
    district: '',
    typeId: '',
    password: '',
  });

  useEffect(() => {
    fetchUserTypes();
    fetchUsers();
  }, []);

  const fetchUserTypes = async () => {
    const res = await UseAxios('users/types/all', "GET");
    setUserTypes(res.data);
  };

  const fetchUsers = async () => {
    const params: any = {};
    if (selectedTypeId !== '') params.typeId = selectedTypeId;
    if (deleteStatus !== '') params.deleteStatus = deleteStatus;

    console.log("params >    ",params);
    const res = await UseAxios('users', "GET", undefined, params);
    setUsers(res.data);
  };

  const handleFilter = () => {
    fetchUsers();
  };

  const openAddModal = () => {
    setModalUser(null);
    setFormData({
      email: '',
      firstName: '',
      lastName: '',
      contactNumber: '',
      address: '',
      city: '',
      district: '',
      typeId: '',
      password: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setModalUser(user);
    setFormData({
      email: user.email,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      contactNumber: user.contactNumber || '',
      address: user.address || '',
      city: user.city || '',
      district: user.district || '',
      typeId: String(user.typeId),
      password: user.password || '',
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async () => {
    if (modalUser) {
      await UseAxios(`users/${modalUser.id}`, "PUT", {
        ...formData,
        typeId: Number(formData.typeId),
      });
    } else {
      await UseAxios('users', "POST", {
        ...formData,
        typeId: Number(formData.typeId),
      });
    }
    setIsModalOpen(false);
    fetchUsers();
  };

  const handleDeleteUser = async (userId: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      await UseAxios(`users/${userId}`, "DELETE");
      fetchUsers();
    }
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-white">User Management</h1>

      <button onClick={openAddModal} className="bg-amber-500 text-slate-900 px-4 py-2 rounded-lg font-medium hover:bg-amber-400 mb-6 flex items-center gap-2">
        <FaPlus /> Add User
      </button>

      <div className="mb-6 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm text-slate-400 mb-1">User Type:</label>
          <select
            className="px-3 py-2 rounded-lg border border-slate-600 text-white bg-slate-700/50 focus:ring-2 focus:ring-amber-500"
            value={selectedTypeId}
            onChange={(e) =>
              setSelectedTypeId(e.target.value ? Number(e.target.value) : '')
            }
          >
            <option value="">All</option>
            {userTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1">Status:</label>
          <div className="flex items-center gap-4 text-slate-300">
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="status"
                value=""
                checked={deleteStatus === ''}
                onChange={() => setDeleteStatus('')}
              />
              All
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="false"
                checked={deleteStatus === false}
                onChange={() => setDeleteStatus(false)}
              />
              Active
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="true"
                checked={deleteStatus === true}
                onChange={() => setDeleteStatus(true)}
              />
              Deleted
            </label>
          </div>
        </div>

        <button onClick={handleFilter} className="bg-amber-500 text-slate-900 px-4 py-2 rounded-lg font-medium hover:bg-amber-400">
          Filter
        </button>
      </div>

      <div className="mb-6 max-w-md">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input type="search" className="block w-full p-4 pl-10 text-sm text-white rounded-lg bg-slate-700/50 border border-slate-600 placeholder-slate-500 focus:ring-2 focus:ring-amber-500" placeholder="Search by name..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="backdrop-blur-sm bg-slate-800/50 rounded-2xl border border-slate-700/50 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-slate-700/50 text-slate-300">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Contact</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                <td className="px-6 py-4 text-white font-medium">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-6 py-4 text-slate-200">{user.email}</td>
                <td className="px-6 py-4 text-slate-200">{user.contactNumber}</td>
                <td className="px-6 py-4 text-slate-200">{user.type?.name}</td>
                <td className="px-6 py-4">
                  <span className={user.deleteStatus ? "text-rose-400" : "text-emerald-400"}>
                    {user.deleteStatus ? 'Deleted' : 'Active'}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => openEditModal(user)}
                    className="text-amber-400 hover:text-amber-300"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-rose-400 hover:text-rose-300"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr><td colSpan={6} className="text-center py-12 text-slate-500">No users found.</td></tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
      </div>

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Panel className="bg-slate-800 border border-slate-700 text-white p-6 rounded-2xl shadow-xl w-full max-w-md">
            <Dialog.Title className="text-lg font-bold mb-4 text-white">
              {modalUser ? 'Edit User' : 'Add User'}
            </Dialog.Title>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/50 text-white placeholder-slate-400"
              />
              <input type="text" placeholder="First Name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/50 text-white placeholder-slate-400" />
              <input type="text" placeholder="Last Name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/50 text-white placeholder-slate-400" />
              <input type="text" placeholder="Contact Number" value={formData.contactNumber} onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })} className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/50 text-white placeholder-slate-400" />
              <input type="text" placeholder="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/50 text-white placeholder-slate-400" />
              <input type="text" placeholder="City" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/50 text-white placeholder-slate-400" />
              <input type="text" placeholder="District" value={formData.district} onChange={(e) => setFormData({ ...formData, district: e.target.value })} className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/50 text-white placeholder-slate-400" />
              {/* password */}
              {!modalUser && <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/50 text-white placeholder-slate-400" />}
              <select value={formData.typeId} onChange={(e) => setFormData({ ...formData, typeId: e.target.value })} className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/50 text-white">
                <option value="">Select User Type</option>
                {userTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500">Cancel</button>
              <button onClick={handleFormSubmit} className="px-4 py-2 bg-amber-500 text-slate-900 rounded-lg font-medium hover:bg-amber-400">{modalUser ? 'Update' : 'Add'}</button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
