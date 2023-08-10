import MainTitle from '@components/logos/MainTitle'
import NavBar from '@components/navigation/NavBar'
import React from 'react'

const Home = () => {
  return (
    <>
      <div className='flex items-center justify-between px-10 py-4 text-white bg-blue-700'>
        <MainTitle />
        <NavBar />
      </div>
    </>
  )
}

export default Home