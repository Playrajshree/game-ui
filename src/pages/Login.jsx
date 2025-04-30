import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Loader from '../components/Loader';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if(email === '' || password === '') {
       toast.error("All fields are required");
      return;
    }
    setLoading(true);
    // Perform login request
    try {
        const response = await fetch("https://api.rajshreeplays.com/api/v1/auth/login", {
          method: "POST",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email,
              password
            }),
            credentials: "include",
        })
        if(!response.ok){
            const err = await response.json();
            console.log(err);
            throw err;
        }
        const data = await response.json();
        toast.success(data.message);
        setEmail('');
        setPassword('');
        // redirect to dashboard
        navigate("/admin");
    } catch (error) {
       toast.error(error.message);
    }
    finally{
        setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 md:rounded-2xl md:shadow-md w-full h-full md:h-auto md:max-w-md">
        <h2 className="text-2xl font-bold mt-6 mb-6 text-center md:mt-">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full disabled:bg-gray-500 relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
          >
            Log In
            <Loader loading={loading} position="absolute" size={40} />
          </button>
        </form>
        <p className='mt-4 text-center text-sm text-gray-600'>
          Don't have an account?{' '}
          <Link to="/auth/register" className="text-blue-600 hover:underline">
               Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login
