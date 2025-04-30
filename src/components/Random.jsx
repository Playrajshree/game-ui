import { useState, useEffect } from 'react';

// Helper functions
function getRandomDate() {
  const start = new Date(2023, 0, 1);
  const end = new Date();
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0]; // 'YYYY-MM-DD'
}

function getRandomTime() {
  const hours = String(Math.floor(Math.random() * 24)).padStart(2, '0');
  const minutes = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  return `${hours}:${minutes}`;
}

function getRandomValue() {
  return Math.floor(Math.random() * 100); // Random number between 0-99
}

export default function RandomTable() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const randomData = Array.from({ length: 100 }, (_, index) => ({
      _id: index + 1,
      date: getRandomDate(),
      time: getRandomTime(),
      A11: getRandomValue(),
      B12: getRandomValue(),
      C13: getRandomValue(),
      D14: getRandomValue(),
      E15: getRandomValue(),
      F16: getRandomValue(),
      G17: getRandomValue(),
      H18: getRandomValue(),
      I19: getRandomValue(),
    }));

    setResults(randomData);
  }, []);

  const handleDelete = (id) => {
    setResults((prev) => prev.filter((item) => item._id !== id));
  };

  const isDisabled = false; // You can control this based on your app logic

  const dateFormatter = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString();
  };

  return (
    <div className="w-full overflow-x-auto overflow-y-auto absolute h-screen scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent">
      <table className="min-w-[800px] w-full bg-white dark:bg-gray-900 border-collapse border-2 border-blue-700 dark:border-gray-700">
        <thead className="uppercase text-xs md:text-sm lg:text-base font-serif bg-blue-100 dark:bg-gray-800">
          <tr>
            {["Date", "Time", "A11", "B12", "C13", "D14", "E15", "F16", "G17", "H18", "I19", "Action"].map((heading, idx) => (
              <th
                key={idx}
                className="border-2 border-blue-700 dark:border-gray-700 p-2 text-center text-blue-900 dark:text-gray-100"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-xs md:text-sm lg:text-base">
          {results.map((result, index) => (
            <tr
              key={index}
              className="hover:bg-blue-50 dark:hover:bg-gray-800 transition"
            >
              <td className="border-2 border-blue-700 dark:border-gray-700 text-center dark:text-gray-100 p-2">
                {dateFormatter(result.date)}
              </td>
              <td className="border-2 border-blue-700 dark:border-gray-700 text-center dark:text-gray-100 p-2">
                {result.time}
              </td>
              <td className="border-2 border-blue-700 dark:border-gray-700 dark:text-gray-100 text-center p-2">{result.A11}</td>
              <td className="border-2 border-blue-700 dark:border-gray-700 dark:text-gray-100 text-center p-2">{result.B12}</td>
              <td className="border-2 border-blue-700 dark:border-gray-700 dark:text-gray-100 text-center p-2">{result.C13}</td>
              <td className="border-2 border-blue-700 dark:border-gray-700 dark:text-gray-100 text-center p-2">{result.D14}</td>
              <td className="border-2 border-blue-700 dark:border-gray-700 dark:text-gray-100 text-center p-2">{result.E15}</td>
              <td className="border-2 border-blue-700 dark:border-gray-700 dark:text-gray-100 text-center p-2">{result.F16}</td>
              <td className="border-2 border-blue-700 dark:border-gray-700 dark:text-gray-100 text-center p-2">{result.G17}</td>
              <td className="border-2 border-blue-700 dark:border-gray-700 dark:text-gray-100 text-center p-2">{result.H18}</td>
              <td className="border-2 border-blue-700 dark:border-gray-700 dark:text-gray-100 text-center p-2">{result.I19}</td>
              <td className="border-2 border-blue-700 dark:border-gray-700 dark:text-gray-100 text-center p-2">
                <button
                  type="button"
                  disabled={isDisabled}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(result._id);
                  }}
                  className="text-red-500 disabled:bg-gray-400 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600 transition"
                >
                  {/* Example delete icon */}
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}