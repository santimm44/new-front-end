import React from 'react'
import { loggedInData } from '@/lib/DataServices'

const page = () => {
    console.log(loggedInData);
  return (
    <div className='bg-slate-100'>Dashboard Page</div>
  )
}

export default page