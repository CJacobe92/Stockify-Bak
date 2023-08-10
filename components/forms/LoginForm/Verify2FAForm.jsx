'use client'

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Verify2FAForm = () => {

  const {data: session} = useSession();
  const[otp, setOtp] = useState('')
  const router = useRouter();
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await signIn('verify_otp', {
        id: session.user.uid,
        token:session.user.token,
        otp: otp,
        redirect: false
      })

      if(!response.error){
        router.push('/dashboard')
        console.log('otp verification successful')
        console.log(response)
      } else {
        console.error(response)
      }

    } catch(error) {
      console.error(error.message)
    } 
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <p>Two factor authentication is enabled on this account</p>
      <p>Please enter your one time pin to continue</p>
      <input 
        type="text" 
        name="otp" 
        onChange={(e) => setOtp(e.target.value)}
        className='border border-black'/>
      <button type='submit' className='text-white bg-orange-700'>Verify</button>
    </form>
  )
}

export default Verify2FAForm