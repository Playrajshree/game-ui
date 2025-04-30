import React, { Children, useState } from 'react'
import { Link } from "react-router-dom";
import useAdmin from "../store/Admin";
import useAdminResult from "../store/Admin.resultstore";
import { useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';


const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dropdownActiveIndex, setDropdownActiveIndex] = useState(0);
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const setAdminResults = useAdminResult((state) => state.setAdminResults, shallow);
   const setAdmin = useAdmin((state) => state.setAdmin, shallow);
  const setIsLoggedIn = useAdmin((state) => state.setIsLoggedIn, shallow);

  const handleLogout = async () => {
      try {
        const response = await fetch("https://api.rajshreeplays.com/api/v1/auth/logout", {
          method: "POST",
          credentials: "include",
        });
        console.log("hdjahjkhdfjkshdjkshdjkshdjks");
        if (!response.ok) {
             const err = await response.json();
             throw err   
           }
        setIsLoggedIn(false);
        setAdmin(null);
        setAdminResults([]);
        navigate("/auth/login");
      } catch (error) {
         if(error.statusCode === 401){
              setIsLoggedIn(false);
              toast.error("Session expired, please login again");
              return;
          } 
          toast.error(error.message || "Logout failed!");
      }
    };

  return (
    <div className='flex flex-col gap-2'>
    {[
      { name: "Dashboard", path: "/admin/dashboard" },
      { name: "Add result", path: "/admin/add-result" },
      { name: "Settings", children: [
        { name: "Profile", path: "/admin/profile" },
        { name: "Change Password", path: "/admin/change-password" },
        { name: "Change Email", path: "/admin/change-email" },
        { name: "Logout"},
      ] },
    ].map((item, index) => {if(item.name === "Settings"){
          return (
          <button id="drodownBtn" onClick={(e) => {
            e.stopPropagation();
            setActiveIndex(index)
            if(e.target.matches("button")){
              setDropdown(!dropdown)
            }
          }}
           key={index}
            className={`text-base text-left outline-none border-none dark:text-white text-[#757C91] tracking-wider w-full block px-4 py-2 ${activeIndex === index ? "bg-transparent" : ""}`}
         >
           {item.name}
               <div className={`bg-white dark:bg-[#161616] ${dropdown ? "max-h-[300px] mt-4" : "max-h-0 mt-0"} overflow-hidden transition-all duration-500 ease-linear`}>
                  {item.children.map((child, childIndex) => {
                    if(child.name !== "Logout"){ 
                       return (
                        <Link onClick={() => setDropdownActiveIndex(childIndex)}
                        key={childIndex}
                        to={child.path}
                        className={`text-base font-semibold dark:text-white text-[#757C91] tracking-wider w-full block px-4 py-2 ${dropdownActiveIndex=== childIndex ? "bg-green-100 dark:bg-[#626262]" : ""}`}
                      >
                        {child.name}
                      </Link>
                       )
                   }
                   else {
                      return (<span key={childIndex}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleLogout();
                        }}
                        className="text-base font-semibold bg-red-500 text-white tracking-wider w-full block px-4 py-2 mt-2 text-left"
                      >
                        Logout
                      </span>)
                   }
               })}             
                 </div>
         </button>
          )
      }
       else {
           return (<Link onClick={() => setActiveIndex(index)}
           key={index}
           to={item.path}
           className={`text-base font-semibold dark:text-white text-[#757C91] tracking-wider w-full block px-4 py-2 ${activeIndex === index ? "bg-blue-100 dark:bg-[#b6b5b2]" : ""}`}
         >
           {item.name}
         </Link>
    )}
      }    )}
  </div>
  )
}

export default Sidebar
