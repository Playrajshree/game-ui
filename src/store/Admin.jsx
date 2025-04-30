import { create } from "zustand";

const useAdmin = create((set) => ({
     isLoggedIn: false,
     admin: {},
     setIsLoggedIn: (status) => {
        set(() => ({isLoggedIn: status}))
     },
     setAdmin: (admin) => {
        set(() => ({admin: admin}))
     }
}));

export default useAdmin;