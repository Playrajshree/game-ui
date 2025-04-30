import React from 'react';
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import useAdmin from '../store/Admin';
import { dateFormatter } from '../utils/formateDate';

const Profile = () => {
   const admin = useAdmin((state) => state.admin);
   const isLoggedIn = useAdmin((state) => state.isLoggedIn);
   if(!isLoggedIn){
    return (
       <div className="h-full flex items-center justify-center">
           <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Session expired, please login again</h1>
      </div>
    )
     }

  return (
    <div className="h-full transition-colors duration-300 w-full p-6 bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-700">
    <div className="w-full h-full p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Admin Profile</h2>
      </div>
      <div className="mt-4 text-center">
        <img
          className="w-24 h-24 mx-auto dark:border-gray-600"
          src={admin?.profilePicture}
          alt="Admin Avatar"
        />
        <h3 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-white">{admin.userName}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{admin.email}</p>
        <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200">
          <IoShieldCheckmarkSharp className="w-4 h-4 mr-1" /> Active Admin
        </div>
      </div>

      <div className="mt-6 space-y-2 text-sm text-left text-gray-700 dark:text-gray-300">
        <div><span className="font-medium">Role:</span> {admin.role}</div>
        <div><span className="font-medium">Joined:</span> {dateFormatter(admin.createdAt.split("T")[0])}</div>
      </div>
    </div>
  </div>
  )
}

export default Profile

