import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import useAdminResult from '../store/Admin.resultstore';
import longDateFormater from '../utils/longDateFormater';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import CellEdit from './CellEdit';





const ResultTable = ({ results }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(true);
  const removeAdminResult = useAdminResult((state) => state.removeAdminResult);
  const [id, setId] = useState("");
  const { pathname } = useLocation();



  const handleDelete = async (id) => {
      const confirmDelete = window.confirm("Are sure you want to delete this ?");
    if(!confirmDelete){
        return 
    }
    if (!canDelete) {
      return;
    }
    try {
      setIsDisabled(true);
      setCanDelete(false);
      const response = await fetch(`https://api.rajshreeplays.com/api/v1/game-results/delete-result/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
      if (!response.ok) {
        const err = await response.json();
        throw err;
      }
      const data = await response.json();
      if (data.status === true) {
        toast.success(data.message);
        removeAdminResult(id);

      }
    } catch (error) {
      if (error.statusCode === 401) {
        setIsLoggedIn(false);
        toast.error("Session expired, please login again !");
        return;
      }
      toast.error(error);
    }
    finally {
      setCanDelete(true);
    }

  }

  if (pathname == "/admin/dashboard") {
    return (<div className="w-full relative">
      <table className='w-full border-[1px] bg-black border-collapse text-center'>
        <thead className='bg-red-500'>
          <tr className='text-white text-[8px] md:text-[12px] xl:text-[16px] font-semibold'>
            {["DATE", "TIME", "A10", "B11", "C12", "D13", "E14", "F15", "G16", "H17", "I18", "J19", "ACTION"].map((heading, index) => {
              return <th key={index} className='py-1 border-[1px] w-[31px]'>
                {heading === "DATE" ? "Date" : heading === "TIME" ? "Time" : heading}
              </th>
            })}
          </tr>
        </thead>
        <tbody>
          {
            results.map((result, index) => {
              return <tr data-id={result._id} key={index} className='text-[8px] md:text-[12px] xl:text-[16px]'>
                <td data-cell="date" className='text-white w-[31px] border-[1px]'>
                  {longDateFormater(result.date.split("T")[0])}
                </td>
                <td data-cell="time" className='w-[31px] border-[1px] text-yellow-500'>
                  {result.time}
                </td>
                <td data-cell="A10" className='w-[31px] border-[1px] text-yellow-500'>
                  {result.A11}
                </td>
                <td data-cell="B11" className='w-[31px] border-[1px] text-yellow-500'>
                  {result.B12}
                </td>
                <td data-cell="C12" className='w-[31px] border-[1px] text-yellow-500'>
                  {result.C13}
                </td>
                <td data-cell="D13" className='w-[31px] border-[1px] text-yellow-500'>
                  {result.D14}
                </td>
                <td data-cell="E14" className='w-[31px] border-[1px] text-yellow-500'>
                  {result.E15}
                </td>
                <td data-cell="F15" className='w-[31px] border-[1px] text-yellow-500'>
                  {result.F16}
                </td>
                <td data-cell="G16" className='w-[31px] border-[1px] text-yellow-500'>
                  {result.G17}
                </td>
                <td data-cell="H17" className='w-[31px] border-[1px] text-yellow-500'>
                  {result.H18}
                </td>
                <td data-cell="I18" className='w-[31px] border-[1px] text-yellow-500'>
                  {result.I19}
                </td>
                <td data-cell="J19" className='w-[31px] border-[1px] text-yellow-500'>
                  {result.A11}
                </td>
                <td className='w-[31px] border-[1px]'>
                  <div className='flex justify-center items-center gap-1'>
                    <button className='text-green-500' onClick={(e) => {
                      setIsEdit(true)
                      setId(result._id)
                    }}>
                      <FaEdit />
                    </button>
                    <button className='text-red-500' onClick={() => {
                           handleDelete(result._id);
                    }}>
                      <MdDelete />
                    </button>
                  </div>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
      {isEdit && <CellEdit setEdit={setIsEdit} id={id} />}
    </div>);
  }

  return (
    <div className='w-full'>
      {/* <div className='w-full grid grid-cols-12 bg-red-500'>
        {["DATE", "TIME", "A10", "B11", "C12", "D13", "E14", "F15", "G16", "H17", "I18", "J19"].map((heading, idx) => (
          <div key={idx} className={`w-[31px] md:w-full text-center text-[8px] md:text-[12px] xl:text-[16px] dark:text-gray-100 py-1 dark:border-gray-700 text-white border-r-[0.25px] border-b-[0.25px]`}>
            {heading == "DATE" ? "Date" : heading == "TIME" ? "Time" : heading}
          </div>
        ))}
      </div>
      <div className='h-full grid grid-cols-12'>
        <div className='w-full' style={{
          gridColumn: "span 1"
        }}>
           {Array.from({length: 41}, (_, index) => {
               return <div key={index + 1} className={`w-[31px] md:w-full text-center text-[8px] md:text-[12px] xl:text-[16px] py-1 dark:border-gray-700 text-white !text-wrap border-b-[0.25px] border-r-[0.25px]`}>
                  { screenSize ? dateFormatter(results[0].date.split("T")[0]): longDateFormater(results[0].date.split("T")[0])}
              </div>
           })}
        </div>
        <div className='w-full' style={{
          gridColumn: "span 1"
        }}>
          {[
            "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45",
            "11:00", "11:20", "11:40", "12:00", "12:20", "12:40", "13:00", "13:20",
            "13:40", "14:00", "14:20", "14:40", "15:00", "15:20", "15:40", "16:00",
            "16:20", "16:40", "17:00", "17:20", "17:40", "18:00", "18:20", "18:40",
            "19:00", "19:20", "19:40", "20:00", "20:20", "20:40", "21:00", "21:20",
             "21:40"
          ].map((time, index) => (
            <div key={index} className={`w-[31px] md:w-full text-center text-[8px] md:text-[12px] xl:text-[16px] dark:text-gray-100 py-1 dark:border-gray-700 text-yellow-500 border-b-[0.25px] border-r-[0.25px]`}>
              {time}
            </div>
           ))}
        </div>
        <table className='w-full text-yellow-500 border-0 border-collapse' style={{
          gridColumn: "span 10"
        }}>
             {results.map((result) => {
                  return <tr className='grid grid-cols-10 text-center text-[8px] md:text-[12px] xl:text-[16px]'>
                        <td className='border-b-[1px] border-r-[0.25px] border-t-0 py-1 w-[31px] md:w-full'>{result.A11}</td>
                        <td className='border-b-[1px] border-r-[0.25px] border-t-0 py-1 w-[31px] md:w-full'>{result.B12}</td>
                        <td className='border-b-[1px] border-r-[0.25px] border-t-0 py-1 w-[31px] md:w-full'>{result.C13}</td>
                        <td className='border-b-[1px] border-r-[0.25px] border-t-0 py-1 w-[31px] md:w-full'>{result.D14}</td>
                        <td className='border-b-[1px] border-r-[0.25px] border-t-0 py-1 w-[31px] md:w-full'>{result.E15}</td>
                        <td className='border-b-[1px] border-r-[0.25px] border-t-0 py-1 w-[31px] md:w-full'>{result.F16}</td>
                        <td className='border-b-[1px] border-r-[0.25px] border-t-0 py-1 w-[31px] md:w-full'>{result.G17}</td>
                        <td className='border-b-[1px] border-r-[0.25px] border-t-0 py-1 w-[31px] md:w-full'>{result.H18}</td>
                        <td className='border-b-[1px] border-r-[0.25px] border-t-0 py-1 w-[31px] md:w-full'>{result.I19}</td>
                        <td className='border-b-[1px] border-r-[0.25px] border-t-0 py-1 w-[31px] md:w-full'>{result.I19}</td>
                  </tr>
             })}
        </table>
      </div> */}
      <table className='w-full border-[1px] bg-black border-collapse text-center'>
        <caption className='mb-4'>
          <span className='tracking-wider text-[10px] md:text-lg font-semibold text-blue-700'> Result of the day:{longDateFormater(results[0].date.split("T")[0])} </span>
        </caption>
        <thead className='bg-red-500'>
          <tr className='text-white text-[8px] md:text-[12px] xl:text-[16px] font-semibold'>
            {["DATE", "TIME", "A10", "B11", "C12", "D13", "E14", "F15", "G16", "H17", "I18", "J19"].map((heading, index) => {
              return <th key={index} className='py-1 border-[1px] w-[31px]'>
                {heading === "DATE" ? "Date" : heading === "TIME" ? "Time" : heading}
              </th>
            })}
          </tr>
        </thead>
        <tbody>
          {
            results.map((result, index) => {
              return <tr key={index} className='text-[8px] md:text-[12px] xl:text-[16px]'>
                <td className='text-white w-[31px] border-[1px]'>
                  {longDateFormater(result.date.split("T")[0])}
                </td>
                <td className='w-[31px] border-[1px] text-yellow-500'>
                  {result.time}
                </td>
                <td className='w-[31px] border-[1px] text-yellow-500'>
                  {result.A11}
                </td>
                <td className='w-[31px] border-[1px] text-yellow-500'>
                  {result.B12}
                </td>
                <td className='w-[31px] border-[1px] text-yellow-500'>
                  {result.C13}
                </td>
                <td className='w-[31px] border-[1px] text-yellow-500'>
                  {result.D14}
                </td>
                <td className='w-[31px] border-[1px] text-yellow-500'>
                  {result.E15}
                </td>
                <td className='w-[31px] border-[1px] text-yellow-500'>
                  {result.F16}
                </td>
                <td className='w-[31px] border-[1px] text-yellow-500'>
                  {result.G17}
                </td>
                <td className='w-[31px] border-[1px] text-yellow-500'>
                  {result.H18}
                </td>
                <td className='w-[31px] border-[1px] text-yellow-500'>
                  {result.I19}
                </td>
                <td className='w-[31px] border-[1px] text-yellow-500'>
                  {result.A11}
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  )

}

export default ResultTable