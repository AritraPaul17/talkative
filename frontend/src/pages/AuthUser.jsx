import React, { useState } from 'react'
import SignUp from '../components/SignUp';
import Login from '../components/Login';

const AuthUser = () => {
  const [tab, setTab] = useState("signup");

  return (
    <div className='bg-gray-900 min-h-screen min-w-screen flex justify-center pt-5'>
      <div className=''>
        <div className='bg-gray-700 p-3 md:p-4 rounded-xl mb-3'>
          <h1 className='text-2xl md:text-3xl text-white font-bold mb-2'>Welcome to Talkative</h1>
        </div>

        {/* tab button */}
        <div className='bg-gray-700 rounded-lg'>
          <div className='flex p-1'>
            <button className={`w-1/2 text-xl font-semibold text-white p-2 cursor-pointer rounded-xl ${tab == "signup" ? "bg-gray-900" : ""} `}
              onClick={() => setTab("signup")}>
              Sign Up
            </button>

            <button className={`w-1/2 text-xl font-semibold text-white p-2 cursor-pointer rounded-xl ${tab == "login" ? "bg-gray-900" : ""} `}
              onClick={() => setTab("login")}>
              Login
            </button>

          </div>

          {/* sign up / login component */}
          <div className='w-full pt-3'>
            {tab === "signup" ? <SignUp /> : <Login />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthUser
