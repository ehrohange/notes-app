import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI';

const HomePage = () => {
    const {isRateLimited, setIsRateLimited} = useState(false);
  return (
    <div className='min-h-screen'>
      <Navbar />
      <RateLimitedUI />
      {isRateLimited && <RateLimitedUI />}
    </div>
  )
}

export default HomePage