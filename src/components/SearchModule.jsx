import React, {useState} from 'react'
import { toast } from 'sonner';
import useResult from '../store/result.store';
import Loader from './Loader';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"




const SearchModule = () => {
   const [startDate, setStartDate] = useState("");
   const [endDate, setEndDate] = useState("");
   const [loading, setLoading] = useState(false);
   const setResults = useResult((state) => state.setResults)
   const handleSearch = async (e) => {
       e.preventDefault();
       try {
          setLoading(true)
          if(!startDate || !endDate){
               throw new Error("All fields are required")
          }
          if(startDate <= endDate){

          const response = await fetch(`https://api.rajshreeplays.com/api/v1/game-results/search-result?startDate=${startDate}&endDate=${endDate}`)
          if(!response.ok){
               const err = await response.json();
               throw err;
            }
            const result = await response.json();
            setResults(result.data);
            toast.success("Result fetched successfully");
            setStartDate("");
            setEndDate("");
          }
          else {
               throw new Error("end date should not be less than start date")
          }
       } catch (error) {
            toast.error(error.message);
       }
       finally{
            setLoading(false)
       }
     
   }
   

  return (
    <section className='px-4 w-screen py-5'>
        <form className='w-full flex flex-col gap-3 md:flex-row md:gap-5 md:items-center'>
            <div className='w-full flex
             flex-col gap-2'>
                 <label htmlFor="startDate" className='font-semibold text-lg font-serif text-blue-700'>
                       Start Date
                 </label>
                 <input onChange={(e) => {
                      setStartDate(e.target.value)
                 }} value={startDate} className='px-4 py-2 outline-none rounded placeholder:text-blue-700 w-full' type="date" name="" id="startDate" required />
                <DatePicker className='px-4 py-2 outline-none rounded-md min-w-full' showIcon selected={startDate}  onChange={(date)=> {setStartDate(date)}}
                />

            </div>
            <div className='w-full flex
            flex-col gap-2'>
               <label htmlFor='endDate' className='font-semibold text-lg font-serif text-blue-700'>
                    End Date
               </label>
               <input onChange={(e) => {
                   setEndDate(e.target.value)
               }} value={endDate} className='px-4 py-2 outline-none rounded placeholder:text-blue-700 w-full' type="date" name="" id="endDate" required />
            </div>
            <button onClick={handleSearch} disabled={loading} type='button' className='disabled:bg-red-200 cursor-pointer transition-all duration-400 ease-linear hover:bg-red-400 block w-full bg-red-500 py-2 rounded text-white capitalize tracking-widest mt-3 md:w-full md:py-2 md:px-3 md:self-end'>
                 check Result
            </button>
        </form>
         <Loader loading={loading} />
    </section>
  )
}

export default SearchModule