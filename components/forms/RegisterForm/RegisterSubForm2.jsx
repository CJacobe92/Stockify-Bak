import React from 'react'

const RegisterSubForm2 = ({handleChange, formData}) => {
  
  return (
    <div>
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
      <div className='mainForm__group'>
        <label htmlFor="password_confirmation">Confirm Password</label>
        <input 
          type="password" 
          name="password_confirmation" 
          value={formData.password_confirmation}
          onChange={handleChange}/>
      </div>
      <button type="submit" className='mainForm__btn'>Register</button>
    </div>
  )
}

export default RegisterSubForm2