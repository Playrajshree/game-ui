import React, { useState } from 'react';
import { FaTimes } from "react-icons/fa";
import { toast } from 'sonner';
import useAdmin from '../store/Admin';
import useAdminResult from '../store/Admin.resultstore';
import { useNavigate } from 'react-router-dom';
const CellEdit = ({setEdit, id}) => {
    console.log(id);
    const [cell, setCell] = useState("");
    const [cellValue, setCellValue] = useState("");
    const navigate = useNavigate();
    const setAdminResults = useAdminResult((state) => state.setAdminResults)
    const setIsLoggedIn = useAdmin((state) => state.setIsLoggedIn)

    
   const handleSave = async (e) => {
        e.preventDefault();
        if( cell == "" || cellValue == "" || id == ""){
            return toast.error("cell and cell value cannot be empty !");
        }
        try {
            const response = fetch("https://api.rajshreeplays.com/api/v1/games-results/update-result", {
                 method: "PATCH",
                 headers: {
                     "Content-Type": "application/json"
                 },
                 body: JSON.stringify({
                    id: id,
                    cell: cell,
                    cellValue: cellValue
                 }),
                 credentials: "include"
            })
            if(!response.ok){
                 const err = await response.json();
                 throw err;
            }
            const data = await response.json();
            setAdminResults(data.data);
            setEdit(false);
            toast.success(data.message);
            
        } catch (error) {
            if(error.statusCide === 401){
                toast.error("Session expired");
                setIsLoggedIn(false);
                return setTimeout(() => {
                    navigate("/auth/login")
                }, 1000)
            }
            toast.error(error.message);
        }
   }


  return (
    <div className='absolute top-0 left-0 dark:bg-[rgba(0,0,0,0.1)] bg-[rgba(255,255,255,0.2)] w-full max-h-[850px] flex justify-center z-50'>
        <div className='bg-white p-10 dark:bg-[#131824] max-h-[350px] mt-36 md:mt-48 w-[650px] rounded-[10px] relative shadow'>
              <button onClick={() => setEdit(false)} className='absolute dark:text-[#ccc] top-0 right-0 p-4 text-2xl cursor-pointer transition-all duration-200 ease-linear hover:text-red-500'>
                    <FaTimes  />
              </button>
              <form  className='mt-5 flex flex-col gap-3'>
                 <div className='flex flex-col gap-3'>
                 <label htmlFor='cell'  className="text-base font-medium dark:text-white text-black capitalize">
                       select cell
                  </label>
                  <select  id='cell' name='cell' className='border-2 border-black px-3 py-2 outline-none rounded-md' value={cell} onChange={(e) => setCell(e.target.value)} required>
                       <option value="">--Select cell--</option>
                       <option value="A10">A10</option>
                       <option value="B11">B11</option>
                       <option value="C12">C12</option>
                       <option value="D13">D13</option>
                       <option value="E14">E14</option>
                       <option value="F15">F15</option>
                       <option value="G16">G16</option>
                       <option value="H17">H17</option>
                       <option value="I18">I18</option>
                       <option value="J19">J19</option>
                  </select>
                 </div>
                 <div className='flex flex-col gap-3'>
                 <label htmlFor='cell'  className="text-base font-medium dark:text-white text-black capitalize">
                       cell value
                  </label>
                  <input type="text" onChange={(e) => setCellValue(e.target.value)} value={cellValue} maxLength={2} required placeholder='Enter cell value' className='px-3 py-2 rounded-md outline-none border-2 border-black' />
                 </div>
                 <button className='bg-blue-400 capitalize tracking-wide py-2 rounded-md text-white mt-5'>
                      save
                 </button>
              </form>
        </div>       
    </div>
  )
}

export default CellEdit
