import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <div>
      <Link href='/about' className='m-2'>About</Link>
      <Link href='/login' className='m-2'>Login</Link>
    </div>
  )
}

export default NavBar