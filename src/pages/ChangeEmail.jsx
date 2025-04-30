import React, { useState } from 'react'
import Loader from '../components/Loader';
import { toast } from 'sonner';
import useAdmin from '../store/Admin';

const ChangeEmail = () => {
   const [newEmail, setNewEmail] = useState('');
   const [loading, setLoading] = useState(false);

   const setIsLoggedIn = useAdmin((state) => state.setIsLoggedIn);
   const setAdmin = useAdmin((state) => state.setAdmin);


   const handleEmnailChange = (e) => {
         setNewEmail(e.target.value);
    }

  const handleSubmit = async (e) => {
        e.preventDefault();
        if(newEmail === ""){
            toast.error("Email is required");
            return;
        }
        try {
           setLoading(true);
           const response = await fetch("https://api.rajshreeplays.com/api/v1/auth/change-email", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ newEmail }),
                credentials: "include",
           }) 
            if(!response.ok){
                  const err = await response.json();
                  throw err;
            }
            const data = await response.json();
            toast.success(data.message);
             setNewEmail("");
            setTimeout(() => {
                window.location.reload();
        }, 2000)
        } catch (error) {
          if(error.statusCode === 401){
               toast.error("Session expired, please login again");
               setIsLoggedIn(false);
               setAdmin(null);
               return;
            }
            toast.error(error.message);
        }
        finally{
             setLoading(false);
        }
  }
  
   return (
    <div className="w-full  h-full p-6 bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-700">
      <h2 className="text-2xl font-semibold mb-4">Change Email</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor='newEmail' className="block mb-2">New Email</label>
          <input
            type="email"
            id='newEmail'
            name="newEmail"
            value={newEmail}
            onChange={handleEmnailChange}
            placeholder='example@gmail.com'
            className="w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600"
           required/>
        </div>
        <button
         disabled={loading}
          type="submit"
          className="w-full disabled:bg-gray-400 relative bg-blue-600 text-white p-2 rounded hover:bg-blue-700 dark:hover:bg-blue-500"
        >
          Change Email
          <Loader loading={loading} position='absolute' size={40} />
        </button>
      </form>
    </div>
  )
}

export default ChangeEmail
