import React, { useContext, useState } from 'react';
import ButtonLoader from '../helpers/ButtonLoader';
import { port } from '../utils/apis';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext';

//react icons
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const { getUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const toastOptions = {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;
    if (username.length < 3 || username.length > 12) {
      toast.error('Username length should be minimum 3 & maximum 12.', toastOptions);
      return;
    }
    if (password.length < 4) {
      toast.error('password length should be atleast 4.', toastOptions);
      return;
    }
    if (password != confirmPassword) {
      toast.error('password and confirmPassword is not matching.', toastOptions)
      return;
    }
    const backendPort = `${port}/api/auth/signup`
    setIsLoading(true);
    try {
      const userData = await fetch(backendPort, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username, email, password
        }),
      })
      const result = await userData.json();
      if (!result.success) {
        setIsLoading(false);
        toast.error(result.message, toastOptions);
        return;
      }
      
      
      localStorage.setItem("Talkative",result.authtoken);
      
      toast.success(result.message, toastOptions);
      setIsLoading(false)
      navigate('/setavatar');
      getUser();
    } catch (err) {
      toast.error("Some internal error occured.", toastOptions);
      setIsLoading(false)
    }
  };

  return (
    <div>

      <form onSubmit={handleSubmit} className="space-y-4 pl-3 pr-3 pb-3">
        {/* Username Field */}
        <div>
          <label htmlFor="username" className="block text-lg font-medium text-gray-300">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-2 block w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-lg font-medium text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-2 block w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-lg font-medium text-gray-300">
            Password
          </label>
          <div className='mt-2 block w-full relative'>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full h-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            {showPassword ? <FaEye className='absolute top-2.5 right-3 text-lg cursor-pointer' onClick={() => setShowPassword(false)} /> :
              <FaEyeSlash className='absolute top-2.5 right-3 text-lg cursor-pointer' onClick={() => setShowPassword(true)} />}
          </div>

        </div>
        {/* Confirm Password Field */}
        <div>
          <label htmlFor="password" className="block text-lg font-medium text-gray-300">
            Confirm Password
          </label>
          <div className='mt-2 block w-full relative'>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            {showConfirmPassword ? <FaEye className='absolute top-2.5 right-3 text-lg cursor-pointer' onClick={() => setShowConfirmPassword(false)} /> :
              <FaEyeSlash className='absolute top-2.5 right-3 text-lg cursor-pointer' onClick={() => setShowConfirmPassword(true)} />}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className={`w-full font-medium cursor-pointer ${isLoading ? "bg-red-600" : "bg-green-600"} text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            disabled={isLoading}
          >
            {isLoading ? <ButtonLoader /> : "Sign Up"}
          </button>
        </div>
      </form>

    </div>
  );
};

export default SignUp
