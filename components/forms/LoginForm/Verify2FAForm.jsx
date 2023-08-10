'use client'

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'

const Verify2FAForm = () => {

  const {data: session} = useSession();
  const inputRefs = Array.from({ length: 6 }, () => useRef(null))
  const [digits, setDigits] = useState({
    digit0: '',
    digit1: '',
    digit2: '',
    digit3: '',
    digit4: '',
    digit5: ''
  })
  
  const router = useRouter();
  
  const handleChange = (index, e) => {
    const {name, value} = e.target
    
    if(value.length === 1 && index < inputRefs.length - 1){
      inputRefs[index + 1].current.focus();
    }
    setDigits({...digits, [name]: value})
  }
  
  const handleKeyDown = (index, e) => {
    const value = e.target.value
    
    if(e.key === 'Backspace' && index > 0 && value.length === 0 ){
      inputRefs[index - 1].current.focus(); 
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const otp = Object.values(digits).join('')
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
    <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center p-4 bg-white rounded-md shadow-lg'>
        <h1 className='mb-2 text-3xl font-bold text-orange-700'>Stockify</h1>
        <p className='w-full m-2 text-2xl font-bold text-center text-gray-700'>Two-factor authentication</p>
        <p className='m-2 text-sm font-bold text-gray-700'>Verification code:</p>
        <div className='flex flex-row my-2'>
          {
            inputRefs && inputRefs.map((ref, index) => 
            <input 
              key={index}
              type="text"
              name={`digit${index}`}
              value={digits.value}
              maxLength='1' 
              ref={ref} 
              className='otp__input'
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}/>  
          )}
        </div>
        
       <button type='submit' className='w-full p-2 m-2 text-white bg-orange-700'>Verify</button>
       <p className='m-2 text-xs text-center text-gray-500'>Open your authenticator app and enter the code for Stockify.</p>
    </form>
  )
}

export default Verify2FAForm