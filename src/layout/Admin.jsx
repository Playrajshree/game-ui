import { useEffect, useState } from "react";
import { FaMoon, FaBars } from "react-icons/fa";
import { MdOutlineWbSunny } from "react-icons/md";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { toast } from "sonner";
import Sidebar from "../components/Sidebar"; // adjust the path if needed
import useAdmin from "../store/Admin"; // adjust the path if needed
import useAdminResult from "../store/Admin.resultstore"; // adjust the path if needed

const Admin = () => {
  const [dropdown, setDropdown] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const isLoggedIn = useAdmin((state) => state.isLoggedIn, shallow);
  const setIsLoggedIn = useAdmin((state) => state.setIsLoggedIn, shallow);
  const setAdmin = useAdmin((state) => state.setAdmin, shallow);
  const admin = useAdmin((state) => state.admin, shallow);
  const setAdminResults = useAdminResult((state) => state.setAdminResults, shallow);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", true);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", false);
    }
  }, [darkMode]);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("https://api.rajshreeplays.com/api/v1/auth/get-profile", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials:  "include",
        });

        if (!response.ok) {
          const err = await response.json();
          throw err;
        }

        const data = await response.json();
        setError(null);
        setAdmin(data.data);
        setIsLoggedIn(true);
        navigate("/admin/dashboard");

      } catch (error) {
        setError(error);
        setIsLoggedIn(false);
        if(error.statusCode === 401){
              toast.error("Session expired, please login again");
              error.message ="⏰ Session has expired! Please log in again.";
              setTimeout(() => {
                navigate("/auth/login");
              }
              , 2000);
              setAdmin([]);
              setAdminResults([]);
              return;
        }
        toast.error(error.message || "Something went wrong!");
      }
    };
    fetchProfile();
  }, []);


  return (
    <main className="bg-[#f1f8f9] h-screen relative">
      {/* HEADER */}
      <header className={`dark:bg-[#141824] border-b border-blue-700 h-16 w-full bg-white`}>
        <nav className="flex items-center justify-between px-5 h-full">
          <h2 className="tracking-wider dark:text-white text-[#757C91] font-bold text-lg">rajshreeplays</h2>
          <div className="flex gap-6 items-center">
            <button
              className="dark:bg-[#222834] dark:hover:bg-[#637EBE] bg-[#FFF3E2] transition-all duration-500 group hover:bg-orange-500 py-2 px-2 rounded-full"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? (
                <FaMoon className="text-blue-700 text-lg group-hover:text-white" />
              ) : (
                <MdOutlineWbSunny className="text-orange-400 group-hover:text-white text-lg" />
              )}
            </button>
            <button className="md:hidden" onClick={() => setDropdown(!dropdown)}>
              <FaBars className="dark:text-white text-[#757C91] text-2xl" />
            </button>
            <p className="hidden md:block">
              {isLoggedIn ? (
                <img src={admin?.profilePicture} alt="Profile" className="w-12 h-12 object-cover rounded-full" />
              ) : (
                <Link
                  to="/auth/login"
                  className="text-base font-semibold dark:text-white text-[#757C91] tracking-wider block px-4 py-2 transition-all duration-500 dark:hover:text-blue-500 hover:text-blue-500"
                >
                  Login
                </Link>
              )}
            </p>
          </div>
        </nav>
      </header>

      {/* DROPDOWN NAV MOBILE */}
      <div
        className={`overflow-hidden transition-all w-full duration-500 ease-linear ${
          dropdown ? "max-h-[400px] md:max-h-[300px]" : "max-h-0"
        } bg-white dark:bg-[#0c1f28] md:hidden`}
      >
        <Sidebar />        
      </div>

      {/* MAIN SECTION */}
      <section
        className="grid grid-cols-1 md:grid-cols-[auto,1fr]"
        style={{ minHeight: "calc(100vh - 4rem)" }}
      >
        {/* SIDEBAR DESKTOP */}
        <div className="hidden dark:bg-[#141824] bg-white md:block w-[250px] h-full border-r border-blue-700">
          <Sidebar />
        </div>

        {/* MAIN CONTENT */}
        <div className="dark:bg-[#0F111A] bg-[#f1f8f9] w-full h-full">       
              {error === null ? (<Outlet />) : (
                <div className="w-full h-full flex items-center justify-center">
                  <h1 className="text-2xl font-serif text-gray-500">{error?.message || "No Results Found"}</h1>
                </div>
              )}
        </div>
      </section>
    </main>
  );
};

export default Admin;