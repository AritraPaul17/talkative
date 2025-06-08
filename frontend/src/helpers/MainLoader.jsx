import React from 'react'

const MainLoader = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
      <span className="loading loading-bars loading-5xl mb-2"></span>
      <p className='text-lime-300 text-2xl'>Please Wait ...</p>
    </div>
  )
}

export default MainLoader
