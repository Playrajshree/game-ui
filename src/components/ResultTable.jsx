import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { toast } from 'sonner';

import { dateFormatter } from '../utils/formateDate';
import useAdminResult from '../store/Admin.resultstore';



const ResultTable = ({results}) => {
      const [canDelete, setCanDelete] = useState(true);
      const [isDisabled, setIsDisabled] = useState(false);
       const removeAdminResult = useAdminResult((state) => state.removeAdminResult);
       const { pathname } = useLocation();


      const handleDelete = async (id) => {
            if(!canDelete) {
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
              if(!response.ok){
                     const err = await response.json();
                     throw err;
              }
              const data = await response.json();
              if(data.status === true)
                {
                   toast.success(data.message);
                   removeAdminResult(id);

                 }
           } catch (error) {
              if(error.statusCode === 401){
                     setIsLoggedIn(false);
                     toast.error("Session expired, please login again !");
                     return;
              }
              toast.error(error);
           }
           finally{
               setIsDisabled(false);
                setCanDelete(true);
           }
      }
       if(pathname == "/admin/dashboard"){
             return ( <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent">
                <table className="min-w-[800px] w-full bg-white dark:bg-gray-900 border-collapse border-2 border-blue-700 dark:border-gray-700">
                  <thead className="uppercase text-xs md:text-sm lg:text-base font-serif bg-blue-100 dark:bg-gray-800">
                    <tr>
                      {["Date", "Time", "A11", "B12", "C13", "D14", "E15", "F16", "G17", "H18", "I19", "Action"].map((heading, idx) => (
                        <th
                          key={idx}
                          className="border-2 border-blue-700 dark:border-gray-700 p-2 text-center text-blue-900 dark:text-gray-100"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-xs md:text-sm lg:text-base">
                    {results.map((result, index) => (
                      <tr
                        key={index}
                        className="hover:bg-blue-50 dark:hover:bg-gray-800 transition"
                      >
                        <td className="border-2 border-blue-700 dark:border-gray-700 text-center dark:text-gray-100 p-2">
                          {dateFormatter(result.date.split("T")[0])}
                        </td>
                        <td className="border-2 border-blue-700 dark:border-gray-700 text-center dark:text-gray-100 p-2">
                          {result.time}
                        </td>
                        <td className="border-2 border-blue-700 dark:border-gray-700 dark:text-gray-100 text-center p-2">{result.A11}</td>
                        <td className="border-2 border-blue-700 dark:border-gray-700 dark:text-gray-100 text-center p-2">{result.B12}</td>
                        <td className="border-2 border-blue-700 dark:border-gray-700 dark:text-gray-100 text-center p-2">{result.C13}</td>
                        <td className="border-2 border-blue-700 dark:border-gray-700 dark:text-gray-100 text-center p-2">{result.D14}</td>
                        <td className="border-2 border-blue-700 dark:border-gray-700 dark:text-gray-100 text-center p-2">{result.E15}</td>
                        <td className="border-2 border-blue-700 dark:border-gray-700 dark:text-gray-100 text-center p-2">{result.F16}</td>
                        <td className="border-2 border-blue-700 dark:border-gray-700 dark:text-gray-100 text-center p-2">{result.G17}</td>
                        <td className="border-2 border-blue-700 dark:border-gray-700 dark:text-gray-100 text-center p-2">{result.H18}</td>
                        <td className="border-2 border-blue-700 dark:border-gray-700 dark:text-gray-100 text-center p-2">{result.I19}</td>
                        <td className="border-2 border-blue-700 dark:border-gray-700 dark:text-gray-100 text-center p-2">
                          <button
                            type="button"
                            disabled={isDisabled}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(result._id);
                            }}
                            className="text-red-500 disabled:bg-gray-400 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600 transition"
                          >
                            <MdDelete size={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>);
       }

  return (
    <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent">
                <table className="min-w-[800px] w-full bg-white dark:bg-gray-900 border-collapse border-2 border-blue-700 dark:border-gray-700">
                  <thead className="uppercase text-xs md:text-sm lg:text-base font-serif bg-blue-100 dark:bg-gray-800">
                    <tr>
                      {["Date", "Time", "A11", "B12", "C13", "D14", "E15", "F16", "G17", "H18", "I19"].map((heading, idx) => (
                        <th
                          key={idx}
                          className="border-2 border-blue-700 dark:border-gray-700 p-2 text-center text-blue-900 dark:text-gray-100"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-xs md:text-sm lg:text-base">
                    {results.map((result, index) => (
                      <tr
                        key={index}
                        className="hover:bg-blue-50 dark:hover:bg-gray-800 transition"
                      >
                        <td className="border-2 border-blue-700 dark:border-gray-700 text-center dark:text-gray-100 p-2">
                          {dateFormatter(result.date.split("T")[0])}
                        </td>
                        <td className="border-2 border-blue-700 dark:border-gray-700 text-center dark:text-gray-100 p-2">
                          {result.time}
                        </td>
                        <td className="border-2 border-blue-700 dark:border-gray-700 dark:text-gray-100 text-center p-2">{result.A11}</td>
                        <td className="border-2 border-blue-700 dark:border-gray-700 dark:text-gray-100 text-center p-2">{result.B12}</td>
                        <td className="border-2 border-blue-700 dark:border-gray-700 dark:text-gray-100 text-center p-2">{result.C13}</td>
                        <td className="border-2 border-blue-700 dark:border-gray-700 dark:text-gray-100 text-center p-2">{result.D14}</td>
                        <td className="border-2 border-blue-700 dark:border-gray-700 dark:text-gray-100 text-center p-2">{result.E15}</td>
                        <td className="border-2 border-blue-700 dark:border-gray-700 dark:text-gray-100 text-center p-2">{result.F16}</td>
                        <td className="border-2 border-blue-700 dark:border-gray-700 dark:text-gray-100 text-center p-2">{result.G17}</td>
                        <td className="border-2 border-blue-700 dark:border-gray-700 dark:text-gray-100 text-center p-2">{result.H18}</td>
                        <td className="border-2 border-blue-700 dark:border-gray-700 dark:text-gray-100 text-center p-2">{result.I19}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>)
}

export default ResultTable