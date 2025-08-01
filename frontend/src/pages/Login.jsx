import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../api/axios.js'
import { AuthContext } from '../context/AuthContext';
import { useStore } from '../store/store.js';

export default function LoginForm() {
  const { login } = useStore();
  const navigate = useNavigate();
  const [apiToken, setApiToken] = useState('');
  const { setAuthData } = useContext(AuthContext);

  const handleLogin = async (event) => {
    event.preventDefault();
    setAuthData({ apiToken });
    sessionStorage.setItem('userapi', apiToken)
    navigate('/home');

  };


  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center '>

      <form
        onSubmit={handleLogin}
        className="max-w-md mx-auto mt-12 p-8 bg-white rounded-lg shadow-lg"
      >
        <h1 className="text-3xl text-black font-bold mb-4 text-center">Login</h1>
        <p className="text-gray-600 mb-4">Please enter your API Key to continue.</p>
        <label
          htmlFor="apiKey"
          className="block mb-2 text-gray-700 font-semibold"
        >
          API Key:
        </label>
        <input
          type="text"
          id="apiKey"
          value={apiToken}
          onChange={(e) => setApiToken(e.target.value)}
          placeholder="Enter your API Key"
          required
          className="w-full px-3 py-2 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
