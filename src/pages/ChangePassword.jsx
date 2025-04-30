import React, { useState } from 'react';
import { toast } from "sonner";
import Loader from '../components/Loader';
import useAdmin from '../store/Admin';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const setIsLoggedIn = useAdmin((state) => state.setIsLoggedIn);
  // const setAdmin = useAdmin((state) => state.setAdmin);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = formData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return toast.error('All fields are required.');
    }
     if(currentPassword === newPassword){
          return toast.error("New password cannot be same as current password");
      }
    if (newPassword !== confirmPassword) {
         return toast.error('New passwords do not match.');
    }

    try {
         setLoading(true);
         const response = await fetch("https://api.rajshreeplays.com/api/v1/auth/change-password", {
               method: "PATCH",
               headers: {
                   "Content-Type": "application/json",
               },
               body: JSON.stringify({
                    newPassword,
               }),
               credentials: "include",
         });
         if(!response.ok){
             const err = await response.json();
             throw err;
          }
          const data = await response.json();
          toast.success(data.message); 
        setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        });
    } catch (error) {
         if(error.statusCode === 401){
             setIsLoggedIn(false);
             toast.error("Session expired, please login again");
              // setAdmin(null);
              return;
         }
          toast.error(error.message);
    }
    finally{
        setLoading(false);
    }
  };

  return (
    <div className="w-full  h-full p-6 bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-700">
      <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            placeholder='*******'
            className="w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600"
           required minLength={6} maxLength={12} />
        </div>
        <div>
          <label className="block mb-2">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder='*******'
            className="w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600"
          required minLength={6} maxLength={12}/>
        </div>
        <div>
          <label className="block mb-2">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder='*******'
            className="w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600"
          required minLength={6} maxLength={12}/>
        </div>
        <button
         disabled={loading}
          type="submit"
          className="w-full disabled:bg-gray-400 relative bg-blue-600 text-white p-2 rounded hover:bg-blue-700 dark:hover:bg-blue-500"
        >
          Change Password
          <Loader loading={loading} position='absolute' size={40} />
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;