import React, { useState, useEffect } from 'react'
import useResult from '../store/result.store';
import { toast } from 'sonner';
import Loader from '../components/Loader';
import ResultTable from '../components/ResultTable';
import { dateFormatter } from '../utils/formateDate';
import longDateFormater from '../utils/longDateFormater';


const Home = () => {
    const results = useResult((state) => state.results);
    const [error, setError] = useState(null);
    const [date, setDate] = useState(new Date().toLocaleDateString("en-CA"));
    const setResults = useResult((state) => state.setResults);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchResults = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://api.rajshreeplays.com/api/v1/game-results/get-currentresult?date=${date}`);
                if (!response.ok) {
                    const err = await response.json();
                    setError(err.message);
                    throw err;
                }
                const results = await response.json();
                setResults(results.data);
                toast.success("Result fetched successfully");
            }
            catch (error) {
                toast.error(error.message);
            }
            finally {
                setLoading(false);
            }
        }
          fetchResults();
          const interval =    setInterval(() => {
            fetchResults();
        }
        , 10 * 60 * 1000); // 20 minutes
        return () => {
            clearInterval(interval);
        }
    }
    , [date, setResults]);
   console.log()
    return (
        <section className='w-full h-full px-4 py-4 overflow-x-hidden'>
         
            <div className='w-full'>
                {
                    results.length > 0 ? (
                        // <ResultTable rows={results.map((data) => ({
                        //     ...data,
                        //     date: data.date ? dateFormatter(data.date.split("T")[0]) : data.date,
                        //   }))}
                        //   columns={Object.keys(results[0])
                        //     .filter(
                        //       (col) =>
                        //         col !== "_id" &&
                        //         col !== "createdAt" &&
                        //         col !== "updatedAt" &&
                        //         col !== "creatorId" &&
                        //         col !== "__v"
                        //     )
                        //     .map((col) => ({
                        //       field: col,
                        //       headerName: col.toUpperCase(),
                        //       headerAlign: 'center',
                        //       align: 'center',
                        //       minWidth: 100, // ensures responsiveness
                        //       flex: 1,
                        //       sortable: false, // disables sort arrows
                        //       resizable: false, // disables resizing
                        //       headerClassName: 'text-center',
                        //       cellClassName: 'text-center',
                        //     }))} />
                        // <Table
                        // rows={results.map((data) => ({
                        //   ...data,
                        //   date: data.date ? dateFormatter(data.date.split("T")[0]) : data.date,
                        // }))}
                        // columns={Object.keys(results[0])
                        //   .filter(
                        //     (col) =>
                        //       col !== "_id" &&
                        //       col !== "createdAt" &&
                        //       col !== "updatedAt" &&
                        //       col !== "creatorId" &&
                        //       col !== "__v"
                        //   )
                        //   .map((col) => ({
                        //     field: col,
                        //     headerName: col.toUpperCase(),
                        //     headerAlign: 'center',
                        //     align: 'center',
                        //     minWidth: 100, // ensures responsiveness
                        //     flex: 1,
                        //     sortable: false, // disables sort arrows
                        //     resizable: false, // disables resizing
                        //     headerClassName: 'text-center',
                        //     cellClassName: 'text-center',
                        //   }))}
                        // />
                        <ResultTable results={results} />
                    ) : (
                        <div className='w-full h-full flex items-center justify-center'>
                             <h1 className='text-2xl font-serif text-gray-500 mt-20'>{error?.message || 'No Results Found'}</h1>
                        </div>
                    )
                }

            </div>
            <Loader loading={loading} />
        </section>
    )
}

export default Home