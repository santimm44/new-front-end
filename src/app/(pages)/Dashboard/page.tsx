import React from 'react'
import { loggedInData } from '@/lib/DataServices'

const page = () => {
    console.log(loggedInData);
  return (
    <div className='h-screen'>
    <div className=''>
        Dashboard Page
    </div>
    </div>
  )
}

export default page