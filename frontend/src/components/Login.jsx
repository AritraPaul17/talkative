import React, { useContext, useState } from 'react'
import ButtonLoader from '../helpers/ButtonLoader';
import { toast } from 'react-toastify';
import { port } from '../utils/apis';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Login = () => {
  const { getUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();
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
    const { email, password } = formData;
    if (email.length < 3 || password.length < 4) {
      toast.error('Invalid Username/Password.', toastOptions);
      return;
    }

    const backendPort = `${port}/api/auth/login`;
    setIsLoading(true);
    try {
      const userData = await fetch(backendPort, {
        credentials: 'include',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email, password
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
      getUser();
      navigate('/');
    }catch(err){
      toast.error("Some internal error occured.",toastOptions);
      setIsLoading(false)
    }
  };
  return (
    <div >
      <form onSubmit={handleSubmit} className="space-y-4 pl-3 pr-3 pb-3">

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
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-2 block w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className={`w-full font-medium cursor-pointer ${isLoading?"bg-red-600":"bg-green-600"} text-lg text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            disabled={isLoading}
          >
            {isLoading ? <ButtonLoader /> : "Log In"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
