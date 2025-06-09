import React, { useContext } from 'react'
import { port } from '../utils/apis';
import { PageContext } from '../contexts/PageContext';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Logout = () => {
    const {getUser} = useContext(UserContext);
    const {setShowLogout} = useContext(PageContext);

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

    const handleLogout = async () => {
        const backendPort = `${port}/api/auth/logout`
        try {
            const userData = await fetch(backendPort, {
                credentials: 'include',
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const result = await userData.json();            
            if (!result.success) {
                toast.error(result.message, toastOptions);
                return;
            }
            localStorage.removeItem("Talkative");
            toast.success(result.message, toastOptions);
            getUser();
            navigate('/authuser');
        } catch (err) {
            toast.error("Some internal error occured.", toastOptions);
            setIsLoading(false)
        }finally{
            setShowLogout(false)
        }
    }

    return (
        <div className='min-h-screen min-w-screen bg-transparent backdrop-blur-md absolute top-0 left-0 flex justify-center items-center'>
            <div className='h-28 w-64 rounded-xl bg-white relative'>
                <p className='text-black text-lg p-2'>Do, You want to logout ?</p>
                <div className='flex justify-end gap-2 absolute right-2 bottom-2'>
                    <button className="btn btn-dash btn-success text-md font-semibold" onClick={()=>setShowLogout(false)}>Cancel</button>
                    <button className="btn btn-dash btn-error text-md font-semibold" onClick={handleLogout}>Confirm</button>
                </div>
            </div>
        </div>
    )
}

export default Logout
