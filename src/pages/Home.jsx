import React, { useState, useEffect } from 'react'
import useResult from '../store/result.store';
import { toast } from 'sonner';
import Loader from '../components/Loader';
import ResultTable from '../components/ResultTable';

import { dateFormatter } from '../utils/formateDate';
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
        , 20 * 60 * 1000); // 20 minutes
        return () => {
            clearInterval(interval);
        }
    }
    , [date, setResults]);

    return (
        <section className='w-full h-full px-4 py-4 overflow-x-hidden'>
            <p className='text-center tracking-wide mt-5 font-semibold text-blue-700 mb-4'>Result of the day: {dateFormatter(date)}</p>
            <div className='w-full md:w-full md:max-w-full overflow-x-auto lg:overflow-hidden flex justify-start items-stretch'>
                {
                    results.length > 0 ? (
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