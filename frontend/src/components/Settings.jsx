import React, { useContext } from 'react'
import { PageContext } from '../contexts/PageContext';

import { MdLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';

const Settings = () => {
    const {setShowLogout} = useContext
    (PageContext)
  return (
    <div className='w-full h-full flex justify-end gap-4 items-center px-3'>
      <Link to={`/profile`} ><CgProfile title='View profile'  className='cursor-pointer text-xl '/> </Link>
      <MdLogout title='Logout' className='cursor-pointer text-xl ' onClick={()=>setShowLogout(true)}/>
    </div>
  )
}

export default Settings
