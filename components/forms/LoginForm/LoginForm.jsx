'use client'

import React, { useState } from 'react'
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

const LoginForm = () => {

  // States
  const[formData, setFormData] = useState({email:'', password:''})

  // Router
  const router = useRouter()
  const {data: session} = useSession();

  // Handlers
  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await signIn('login', {
        email: formData.email,
        password: formData.password,
        redirect: false
      });
  
      if (!response.error && session.user.otp_enabled === 'false') {
        console.log('Login successful');
        console.log(response); // Log the session object
        router.push('/enable2fa');
        console.log(session.user)
      } else if (!response.error && session.user.otp_enabled === 'true') {
        router.push('/verify2fa ')
      } else {
        console.error(response)
      }
    } catch (error) {
      console.error('Error while logging in:', error.message);
    }
  };
  

  return (
    <form className='mainForm' onSubmit={handleSubmit}>
      <div className='mainForm__group'>
        <label htmlFor="Email">Email</label>
        <input 
          type="email" 
          name="email" 
          value={formData.email}
          onChange={handleChange}/>
      </div>
      <div className='mainForm__group'>
        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          name="password"
          value={formData.password}
          onChange={handleChange}/>
      </div>
      <button type="submit" className='mainForm__btn'>Login</button>
    </form>
  )
}

export default LoginForm