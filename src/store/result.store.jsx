import { create } from "zustand";

const useResult = create((set) => ({
    results: [],
    resultHistory: {
          startDate: "",
          endDate: "",
          history: [] 
    },
    setResults: (newResults) => {
       set(() => ({results: [...newResults]}))
    },
    setResultHistory: (startDate, endDate, history) => {
        set(() => (
            {
                resultHistory: {
                    startDate: startDate,
                    endDate: endDate,
                    history: [...history]
                }
            }
        ))
    }
}))




export default useResult;