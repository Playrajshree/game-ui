import React from 'react'
import useResult from '../store/result.store'
import longDateFormater from '../utils/longDateFormater';

const ResultHistory = () => {
     const resultHistory = useResult((state) => state.resultHistory);


  return (
    <div className='mx-4 mt-4 h-auto'>
         {resultHistory.history.length > 0 ? (<table className='w-full border-[1px] bg-black border-collapse text-center'>
               <caption className='mb-4'>
                    <span className='tracking-wider text-[10px] md:text-lg font-semibold text-blue-700'>Result from: {longDateFormater(resultHistory.startDate)} to {longDateFormater(resultHistory.endDate)} </span>
               </caption>
               <thead className='bg-red-500'>
                     <tr className='text-white text-[8px] md:text-[12px] xl:text-[16px] font-semibold'>
                          {["DATE", "TIME", "A10", "B11", "C12", "D13", "E14", "F15", "G16", "H17", "I18", "J19"].map((heading, index) => {
                               return <th key={index} className='py-1 border-[1px] w-[31px]'>
                                      {heading === "DATE" ? "Date": heading === "TIME" ? "Time":heading}
                                  </th>
                          })}
                     </tr>
               </thead>
               <tbody>
                     {
                      resultHistory.history.map((hist, index) => {
                           return <tr key={index} className='text-[8px] md:text-[12px] xl:text-[16px]'>
                                   <td className='text-white w-[31px] border-[1px]'>
                                       {longDateFormater(hist.date.split("T")[0])}
                                   </td>
                                   <td className='w-[31px] border-[1px] text-yellow-500'>
                                       {hist.time}
                                   </td>
                                   <td className='w-[31px] border-[1px] text-yellow-500'>
                                       {hist.A11}
                                   </td>
                                   <td className='w-[31px] border-[1px] text-yellow-500'>
                                       {hist.B12}
                                   </td>
                                   <td className='w-[31px] border-[1px] text-yellow-500'>
                                       {hist.C13}
                                   </td>
                                   <td className='w-[31px] border-[1px] text-yellow-500'>
                                       {hist.D14}
                                   </td>
                                   <td className='w-[31px] border-[1px] text-yellow-500'>
                                       {hist.E15}
                                   </td>
                                   <td className='w-[31px] border-[1px] text-yellow-500'>
                                       {hist.F16}
                                   </td>
                                   <td className='w-[31px] border-[1px] text-yellow-500'>
                                       {hist.G17}
                                   </td>
                                   <td className='w-[31px] border-[1px] text-yellow-500'>
                                       {hist.H18}
                                   </td>
                                   <td className='w-[31px] border-[1px] text-yellow-500'>
                                       {hist.I19}
                                   </td>
                                   <td className='w-[31px] border-[1px] text-yellow-500'>
                                       {hist.A11}
                                   </td>
                                 </tr>
                      })
                     }       
               </tbody>
         </table>): (
             <div className='w-full h-full flex items-center justify-center'>
             <h1 className='text-2xl font-serif text-gray-500 mt-20'>{'No Results Found'}</h1>
        </div>
         )}     
    </div>
  )
}

export default ResultHistory
