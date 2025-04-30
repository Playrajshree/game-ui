import { create } from "zustand";

const useAdminResult = create((set) => ({
     adminResults: [],
     setAdminResults: (newResults)=> (set((state) =>({
        adminResults: [...newResults]
     }))),
     removeAdminResult: (id) => (set((state) => ({
         adminResults: state.adminResults.filter((result) => result._id !== id)
     })))
}))

export default useAdminResult;