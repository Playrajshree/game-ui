import { create } from "zustand";

const useResult = create((set) => ({
    results: [],
    setResults: (newResults) => {
       set(() => ({results: [...newResults]}))
    }
}))




export default useResult;