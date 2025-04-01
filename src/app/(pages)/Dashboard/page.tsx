import React from 'react'
import { loggedInData } from '@/lib/DataServices'

const page = () => {
    console.log(loggedInData);
  return (
    <div className=''>
        Dashboard
    </div>

  )
}

export default page