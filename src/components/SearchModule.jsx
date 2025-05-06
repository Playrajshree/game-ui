import React, { useState } from 'react'
import { toast } from 'sonner';
import useResult from '../store/result.store';
import Loader from './Loader';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';



const SearchModule = () => {
     const [startDate, setStartDate] = useState(null);
     const [endDate, setEndDate] = useState(null);
     const [loading, setLoading] = useState(false);
     const setResultHistory = useResult((state) => state.setResultHistory);
     const navigate = useNavigate();
     const handleSearch = async (e) => {
          e.preventDefault();
          try {
               setLoading(true)
               if (!startDate || !endDate) {
                    throw new Error("All fields are required")
               }
               if (startDate <= endDate) {
                    const startDateFormatted = dayjs(startDate).format("YYYY-MM-DD");
                    const endDateFormatted = dayjs(endDate).format("YYYY-MM-DD");
                    const response = await fetch(`https://api.rajshreeplays.com/api/v1/game-results/search-result?startDate=${startDateFormatted}&endDate=${endDateFormatted}`, {
                         method: "GET",
                         headers: {
                              "Content-Type": "application/json",
                         }
                    })

                    if (!response.ok) {
                         const err = await response.json();
                         throw err;
                    }
                    const result = await response.json();
                    setResultHistory(startDateFormatted, endDateFormatted,result.data);
                    toast.success("Result fetched successfully");
                    setStartDate(null);
                    setEndDate(null);
                    navigate("/result-history");
                  
               }
               else {
                    throw new Error("end date should not be less than start date")
               }
          } catch (error) {
               toast.error(error.message);
          }
          finally {
               setLoading(false)
          }

     }
     return (
          <section className='px-4 w-full max-w-[1170px] mx-auto py-5'>
               <form className='w-full flex flex-col gap-3 md:flex-row md:gap-5 md:items-center'>
                    <div className='w-full flex
             flex-col gap-2'>
                         <label htmlFor="startDate" className='font-semibold text-lg font-serif text-blue-700'>
                              Start Date
                         </label>
                         <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker className='w-full bg-white rounded'
                                   value={startDate}
                                   onChange={(newValue) => {
                                          setStartDate(newValue)
                                   }}
                                  format="DD/MM/YYYY"
                                  sx={{
                                      "& div": {
                                           padding: "5px"
                                      }
                                  }}
                              />
                         </LocalizationProvider>
                    </div>
                    <div className='w-full flex
            flex-col gap-2'>
                         <label htmlFor='endDate' className='font-semibold text-lg font-serif text-blue-700'>
                              End Date
                         </label>
                         <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                   className='w-full bg-white rounded'
                                   value={endDate}
                                   onChange={(newValue) => {
                                        setEndDate(newValue);
                                   }}
                                   format="DD/MM/YYYY"
                                   sx={{
                                        "& div": {
                                             padding: "5px"
                                        }
                                   }}   
                              />
                         </LocalizationProvider>
                    </div>
                    <button onClick={handleSearch} disabled={loading} type='button' className='disabled:bg-red-200 cursor-pointer transition-all duration-400 ease-linear hover:bg-red-400 block w-full bg-red-500 rounded text-white capitalize tracking-widest mt-3 md:w-full  p-[8px] md:self-end'>
                         check Result
                    </button>
               </form>
               <Loader loading={loading} />
          </section>
     )
}

export default SearchModule