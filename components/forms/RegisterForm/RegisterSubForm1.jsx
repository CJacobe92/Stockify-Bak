import React from 'react'

const RegisterSubForm1 = ({handleNext, handleChange, formData}) => {

  return (
    <div>
      <div className='mainForm__group'>
        <label htmlFor="firstname">Firstname</label>
        <input 
          type="text" 
          name="firstname" 
          value={formData.firstname}
          onChange={handleChange}/>
      </div>
      <div className='mainForm__group'>
        <label htmlFor="lastname">Lastname</label>
        <input 
          type="text" 
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}/>
      </div>
      <button onClick={handleNext} type="button" className='mainForm__btn'>Next</button>
    </div>
  )
}

export default RegisterSubForm1