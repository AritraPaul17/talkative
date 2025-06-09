import React, { useContext, useState } from 'react'
import ButtonLoader from '../helpers/ButtonLoader'
import { port } from '../utils/apis'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { images } from '../functions/images'
import { UserContext } from '../contexts/UserContext'

const SetAvatar = () => {
    const { getUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [profilepic, setProfilepic] = useState(images[0]);
    const [profilepicNo, setProfilepicNo] = useState(0);
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

    const handlePic = (pic) => {
        setProfilepic(images[pic]);        
        setProfilepicNo(pic);
    }

    const handleSetProfilePic = async () => {
        const backendPort = `${port}/api/auth/setavatar`;
        const token = localStorage.getItem('Talkative');
        setIsLoading(true);
        try {
            const userData = await fetch(backendPort, {
                credentials: 'include',
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    token:token
                },
                body: JSON.stringify({
                    image:profilepicNo
                }),
            })
            const result = await userData.json();
            if (!result.success) {
                setIsLoading(false);
                toast.error(result.message, toastOptions);
                return;
            }
            toast.success("Profile picture uploaded.", toastOptions);
            setIsLoading(false)
            getUser();
            navigate('/');
        } catch (err) {
            toast.error("Some internal error occured.", toastOptions);
            setIsLoading(false)
        }
    }

    return (
        <div className='bg-gray-900 min-h-screen flex justify-center items-center'>
            <div className='w-full md:w-[50%] border-gray-400 border-2 p-3'>
                <div className='w-20 md:w-36 h-20 md:h-36 m-auto rounded-full flex justify-center items-center border-4 border-emerald-600'>
                    <img src={profilepic} className='w-full h-full rounded-full' />
                </div>

                <div className='mt-2 mb-3 text-center text-3xl font-semibold hover:text-emerald-500 duration-500'>
                    <p>Please select an avatar.</p>
                </div>
                <div className='h-48 md:h-56 overflow-y-scroll p-1 flex flex-wrap gap-3 md:gap-4 border-2 border-fuchsia-700'>
                    {images.map((pic, ind) => {
                        return (
                            <button className='w-24 md:w-36 h-20 md:h-36 m-auto cursor-pointer rounded-full flex justify-center items-center mb-3 mt-2 hover:scale-110' key={ind}>
                                <img src={pic} className='w-full h-full rounded-full' onClick={() => handlePic(ind)} />
                            </button>
                        )
                    })}
                </div>

                {/* set button */}
                <div className='w-full flex mt-2 justify-center pt-2'>
                    <button className={`btn btn-dash btn-secondary rounded-md w-[80%] text-xl font-semibold p-2`}
                        onClick={handleSetProfilePic}
                        disabled={isLoading}
                    >{isLoading ? <ButtonLoader /> : "Set Profile Picture"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SetAvatar
