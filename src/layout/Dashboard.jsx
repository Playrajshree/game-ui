import React, { useEffect } from 'react';
import Marquee from "react-fast-marquee";
import { Outlet } from 'react-router-dom';

import SearchModule from '../components/SearchModule';



const Dashboard = () => {
  useEffect(() => {
      const handleResize = (e) => {
           const width = window.innerWidth;
           if(width >= 768){
                document.querySelector("body").classList.add("overflow-x-hidden");
           }
           
      }
       window.addEventListener("resize", handleResize);

       return () => {
         window.removeEventListener("resize", handleResize);
       }
  }, []);
  return (
    <main className='bg-yellow-400 min-h-screen'>
        <Marquee className='px-3 w-screen max-w-[90vw] mx-auto' speed={50} >
              <span className='block py-2 tracking-wider text-blue-500 px-3'>
                 rajshreeplays.com
              </span>
              <span className='block py-2 tracking-wider text-blue-500 px-3'>
                 rajshreeplays.com
              </span>
              <span className='block py-2 tracking-wider text-blue-500 px-3'>
                 rajshreeplays.com
              </span>
              <span className='block py-2 tracking-wider text-blue-500 px-3'>
                 rajshreeplays.com
              </span>
              <span className='block py-2 tracking-wider text-blue-500 px-3'>
                 rajshreeplays.com
              </span>
              <span className='block py-2 tracking-wider text-blue-500 px-3'>
                 rajshreeplays.com
              </span>
              <span className='block py-2 tracking-wider text-blue-500 px-3'>
                 rajshreeplays.com
              </span>
              <span className='block py-2 tracking-wider text-blue-500 px-3'>
                 rajshreeplays.com
              </span>
              <span className='block py-2 tracking-wider text-blue-500 px-3'>
                 rajshreeplays.com
              </span>
              <span className='block py-2 tracking-wider text-blue-500 px-3'>
                 rajshreeplays.com
              </span>
              <span className='block py-2 tracking-wider text-blue-500 px-3'>
                 rajshreeplays.com
              </span>
        </Marquee>
         <section className='p-5 pt-7'>
              <h2 className='text-blue-700 text-center font-bold text-xl tracking-wider font-serif'>
                     Result Chart
              </h2>
         </section>
         <SearchModule />
         <Outlet />
    </main>
  )
}


export default Dashboard