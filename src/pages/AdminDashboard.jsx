import React, { useEffect, useState, useMemo, use } from 'react'
import Loader from '../components/Loader';
import {toast} from 'sonner';
import useAdminResult  from '../store/Admin.resultstore';
import useAdmin from '../store/Admin';
import ResultTable from '../components/ResultTable';
import { shallow } from 'zustand/shallow';
import { useNavigate } from 'react-router-dom';



const AdminDashboard = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const setAdminResults = useAdminResult((state) => state.setAdminResults);
    const adminResults = useAdminResult((state) => state.adminResults);
    const navigate = useNavigate();
    const isLoggedIn = useAdmin((state) => state.isLoggedIn, shallow);
    const setIsLoggedIn = useAdmin((state) => state.setIsLoggedIn, shallow);
    const setAdmin = useAdmin((state) => state.setAdmin, shallow);
    useEffect(() => {
         const fetchAllResults = async() => {     
               try {
                    setLoading(true);
                    const response = await fetch("https://api.rajshreeplays.com/api/v1/game-results/get-result", {
                          method: "GET",
                          headers: {
                                "Content-Type": "application/json",
                    },
                    credentials: "include",
                    })
                    if(!response.ok){
                          const err = await response.json();
                          throw err;
                    }
                    const  data = await response.json();
                    setAdminResults(data.data);
               } catch (error) {
                     setError(error);   
                     if(error.statusCode === 401){
                           setIsLoggedIn(false);
                           toast.error("Session expired, please login again");
                           return;
                     }
                     toast.error(error.message)                
               }
               finally {
                    setLoading(false)
               }
            }

         fetchAllResults();
     }, [isLoggedIn]);
  return (
    <section className='p-5 h-full w-full relative'>
        {loading && <Loader loading={loading} position="absolute" />}
         {
           adminResults.length > 0 ? (
             <ResultTable results = {adminResults} />
           
           ): (
                  <div className='w-full h-full flex items-center justify-center'>
                        <h1 className='text-2xl font-serif text-gray-500'>{error?.message || "No Results Found"}</h1>
                  </div>
           )
         }   
    </section>
  )
}

export default AdminDashboard