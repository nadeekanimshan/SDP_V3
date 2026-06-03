import { useState } from 'react';
import { UseAxios } from '../../hook/useAxios';
import { SYSTEM_KEY } from '../../config/Constent';
import { toast, ToastContainer } from 'react-toastify';

export default function Profile() {
  const [firstName, setFirstName] = useState(localStorage.getItem(SYSTEM_KEY.FIRST_NAME) || '');
  const [lastName, setLastName] = useState(localStorage.getItem(SYSTEM_KEY.LAST_NAME) || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (newPassword && newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }
    if (newPassword && !currentPassword) {
      toast.error('Current password is required to change password');
      return;
    }
    setIsLoading(true);
    try {
      const data: Record<string, string> = { first_name: firstName, last_name: lastName };
      if (newPassword) {
        data.current_password = currentPassword;
        data.new_password = newPassword;
      }
      const res = await UseAxios('auth/profile', 'PUT', data);
      localStorage.setItem(SYSTEM_KEY.FIRST_NAME, res.first_name);
      localStorage.setItem(SYSTEM_KEY.LAST_NAME, res.last_name);
      toast.success('Profile updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-lg">
        <div className="backdrop-blur-sm bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
          <h2 className="text-2xl font-bold text-white mb-2">Profile Settings</h2>
          <p className="text-slate-400 mb-6">Update your name and password</p>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">First Name</label>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Last Name</label>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500" required />
            </div>

            <div className="pt-4 border-t border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-3">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Current Password</label>
                  <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500" placeholder="Leave blank to keep current password" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">New Password</label>
                  <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500" placeholder="Min 6 characters" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Confirm New Password</label>
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500" />
                </div>
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-lg disabled:opacity-50 transition-colors">
              {isLoading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
