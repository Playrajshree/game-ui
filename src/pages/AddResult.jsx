import React, { useState } from 'react';
import { toast } from 'sonner';
import Loader from '../components/Loader';
import useAdmin from '../store/Admin';
import { shallow } from 'zustand/shallow';
import { useNavigate } from 'react-router-dom';

const AddResult = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    A11: '',
    B12: '',
    C13: '',
    D14: '',
    E15: '',
    F16: '',
    G17: '',
    H18: '',
    I19: '',
  });
  const navigate = useNavigate();
  const setIsLoggedIn = useAdmin((state) => state.setIsLoggedIn, shallow);
  const isLoggedIn = useAdmin((state) => state.isLoggedIn, shallow);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value.slice(0, 3);
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error("Session expired, please login again");
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
      return;
    }
    const result = {
      date: date,
      time: time,
      ...inputs,
    }
    if (Object.keys(result).every((key) => result[key] === "")
    ) {
      return toast.error("All fields are required");
    }
    try {
      setLoading(true);
      const response = await fetch("https://api.rajshreeplays.com/api/v1/game-results/add-result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
        credentials: "include",
      });
      if (!response.ok) {
        const err = await response.json();
        throw err;
      }
      const data = await response.json();
      if (data.status) {
        toast.success(data.message);
        setDate("");
        setTime("");
        setInputs({
          A11: '',
          B12: '',
          C13: '',
          D14: '',
          E15: '',
          F16: '',
          G17: '',
          H18: '',
          I19: '',
        });
      }

    } catch (error) {
      if (error.statusCode === 401) {
        setIsLoggedIn(false);
        toast.error("Session expired, please login again");
        return
      }
      toast.error(error.message);
    }
    finally {
      setLoading(false);
    }

  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4">
      {/* Date Input */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="date" className="text-sm font-medium text-gray-700">
          Select Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={handleDateChange}
          className="px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white light:bg-white light:text-black"
          required />
      </div>

      {/* Time Input */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-gray-700" htmlFor="custom-time">Select Time:</label>
        <select id="custom-time" name="custom-time" className='px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white light:bg-white light:text-black' required value={time} onChange={handleTimeChange}>
          <option value="">-- Select a time --</option>
          {[
            "09:00", "09:15", "09:30", "09:45",
            "10:00", "10:15", "10:30", "10:45",
            "11:00", "11:15", "11:30", "11:45", "12:00",
            "12:20", "12:40", "13:00", "13:20", "13:40",
            "14:00", "14:20", "14:40", "15:00", "15:20",
            "15:40", "16:00", "16:20", "16:40", "17:00",
            "17:20", "17:40", "18:00", "18:20", "18:40",
            "19:00", "19:20", "19:40", "20:00", "20:20",
            "20:40", "21:00", "21:20", "21:40"
          ].map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
      </div>

      {/* Input Fields A11 to J19 */}
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(inputs).length > 0 && Object.keys(inputs).map((key) => (
          <div key={key} className="flex flex-col space-y-2" style={{
            gridColumn: key === 'I19' ? 'span 2' : 'span 1',
          }}>
            <label htmlFor={key} className="text-sm font-medium text-gray-700">
              {key}
            </label>
            <input
              type="text"
              id={key}
              value={inputs[key]}
              onChange={(e) => handleInputChange(e, key)}
              maxLength={3}
              className={`px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white light:bg-white light:text-black`}
              placeholder={`Enter ${key}`}
              required />
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="mt-4">
        <button
          disabled={loading}
          type="submit"
          className="w-full overflow-hidden disabled:bg-gray-500 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200 relative"
        >
          Submit
          <Loader loading={loading} position="absolute" size={40} />
        </button>
      </div>
    </form>
  );
};

export default AddResult;