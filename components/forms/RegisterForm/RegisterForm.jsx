'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from "next-auth/react";
import RegisterSubForm1 from './RegisterSubForm1';
import RegisterSubForm2 from './RegisterSubForm2';


const RegisterForm = () => {

  // States
  const[currentForm, setCurrentForm] = useState(1)
  const[formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  // Constants
  const maxForm = 2

  // Routers
  const router = useRouter()
  
  // Handlers
  const handleNext = () => {
    if (currentForm < maxForm) {
      setCurrentForm(currentForm + 1)
    } 
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const response = await signIn('register', {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation
      })

      // if (!response.error) {
      //   console.log('Registration successful')
      //   router.push('/dashboard')
      // } else {
      //   console.error('Registration failed')
      // }
      router.push('/dashboard')
    } catch(error) {
      console.error(error.message)
    }
  }

  // Form rendering
  
  const renderForm = () => {
    switch(currentForm){
      case 1:
        return<RegisterSubForm1 handleNext={handleNext} handleChange={handleChange} formData={formData}/>;
      case 2: 
        return <RegisterSubForm2 handleChange={handleChange} formData={formData}/>;
      default:
        return null;
    }
  }

  return <form className='mainForm' onSubmit={handleSubmit}>{renderForm()}</form>
}

export default RegisterForm