import { useEffect, useState } from 'react';
import { UseAxios } from '../../hook/useAxios';
import { FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { Dialog } from '@headlessui/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  // Delete confirmation popup state
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; user: User | null }>({ open: false, user: null });

  // Password validation state
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validatePassword = (pwd: string): string => {
    if (pwd.length < 6) return 'Password must be at least 6 characters.';
    
    return '';
  };

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
    setPasswordError('');
    setConfirmPassword('');
    setConfirmPasswordError('');
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
    try {
      if (modalUser) {
        await UseAxios(`users/${modalUser.id}`, "PUT", {
          ...formData,
          typeId: Number(formData.typeId),
        });
        toast.success('User updated successfully.');
      } else {
        const { email, password, firstName, lastName, contactNumber, address, city, district, typeId } = formData;
        if (!email || !password || !firstName || !lastName || !contactNumber || !address || !city || !district || !typeId) {
          toast.error('Please fill in all required fields.');
          return;
        }
        // Password validation
        const pwdErr = validatePassword(password);
        if (pwdErr) {
          setPasswordError(pwdErr);
          return;
        }
        if (password !== confirmPassword) {
          setConfirmPasswordError('Passwords do not match.');
          return;
        }
        await UseAxios('users', "POST", {
          ...formData,
          typeId: Number(formData.typeId),
        });
        toast.success('User added successfully.');
      }
      setIsModalOpen(false);
      setConfirmPassword('');
      setPasswordError('');
      setConfirmPasswordError('');
      fetchUsers();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to save user.');
    }
  };

  const handleRestoreUser = async (userId: number) => {
    try {
      await UseAxios(`users/${userId}`, "PUT", { deleteStatus: false });
      setIsModalOpen(false);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteUser = (user: User) => {
    setDeleteConfirm({ open: true, user });
  };

  const confirmDelete = async () => {
    const user = deleteConfirm.user;
    if (!user) return;
    setDeleteConfirm({ open: false, user: null });

    if (user.deleteStatus) {
      await UseAxios(`users/${user.id}/permanent`, "DELETE");
    } else {
      await UseAxios(`users/${user.id}`, "DELETE");
    }
    fetchUsers();
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
                
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => openEditModal(user)}
                    className="text-amber-400 hover:text-amber-300"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="text-rose-400 hover:text-rose-300"
                    title={user.deleteStatus ? "Permanently Delete" : "Delete"}
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
              {/* password - only on add */}
              {!modalUser && (
                <>
                  <div>
                    <input
                      type="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData({ ...formData, password: val });
                        setPasswordError(val ? validatePassword(val) : '');
                        if (confirmPassword) {
                          setConfirmPasswordError(val !== confirmPassword ? 'Passwords do not match.' : '');
                        }
                      }}
                      className={`w-full border rounded-lg px-3 py-2 bg-slate-700/50 text-white placeholder-slate-400 ${passwordError ? 'border-rose-500' : 'border-slate-600'}`}
                    />
                    {passwordError && <p className="text-rose-400 text-xs mt-1">{passwordError}</p>}
                    {!passwordError && formData.password && (
                      <p className="text-emerald-400 text-xs mt-1">✓ Password looks good</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => {
                        const val = e.target.value;
                        setConfirmPassword(val);
                        setConfirmPasswordError(val !== formData.password ? 'Passwords do not match.' : '');
                      }}
                      className={`w-full border rounded-lg px-3 py-2 bg-slate-700/50 text-white placeholder-slate-400 ${confirmPasswordError ? 'border-rose-500' : 'border-slate-600'}`}
                    />
                    {confirmPasswordError && <p className="text-rose-400 text-xs mt-1">{confirmPasswordError}</p>}
                    {!confirmPasswordError && confirmPassword && (
                      <p className="text-emerald-400 text-xs mt-1">✓ Passwords match</p>
                    )}
                  </div>
                </>
              )}
              <select value={formData.typeId} onChange={(e) => setFormData({ ...formData, typeId: e.target.value })} className="w-full border border-slate-600 rounded-lg px-3 py-2 bg-slate-700/50 text-white">
                <option value="">Select User Type</option>
                {userTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4 flex justify-between items-center gap-2">
              <div>
                {/* Show restore button only for deleted users in edit mode */}
                {modalUser?.deleteStatus && (
                  <button
                    onClick={() => handleRestoreUser(modalUser.id)}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-500 flex items-center gap-2"
                  >
                    ↩ Restore to Active
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500">Cancel</button>
                <button onClick={handleFormSubmit} className="px-4 py-2 bg-amber-500 text-slate-900 rounded-lg font-medium hover:bg-amber-400">{modalUser ? 'Update' : 'Add'}</button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      <ToastContainer position="top-right" autoClose={3000} />

      {/* Delete Confirmation Popup */}
      {deleteConfirm.open && deleteConfirm.user && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-sm p-6">
            {/* Icon */}
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-rose-500/20 mx-auto mb-4">
              <FaTrash className="text-rose-400 text-xl" />
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-white text-center mb-2">
              {deleteConfirm.user.deleteStatus ? 'Permanently Delete User' : 'Delete User'}
            </h3>

            {/* Message */}
            <p className="text-slate-300 text-sm text-center mb-1">
              {deleteConfirm.user.deleteStatus
                ? 'This will permanently remove'
                : 'Are you sure you want to delete'}
            </p>
            <p className="text-white font-semibold text-center mb-4">
              {deleteConfirm.user.firstName} {deleteConfirm.user.lastName}
            </p>
            {deleteConfirm.user.deleteStatus && (
              <p className="text-rose-400 text-xs text-center mb-4 bg-rose-500/10 rounded-lg py-2 px-3">
                ⚠ This action cannot be undone.
              </p>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm({ open: false, user: null })}
                className="flex-1 py-2 px-4 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2 px-4 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-500 transition-colors"
              >
                {deleteConfirm.user.deleteStatus ? 'Delete Permanently' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
