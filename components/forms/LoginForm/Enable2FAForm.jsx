'use client'

import { fetchConfigureOTP } from '@services/ApiFetch'
import {getSession, signIn} from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Enable2FAForm = () => {
  const[request, setRequest] = useState({uid: '', token: ''})
  const[data, setData] = useState({uri: '', key: '', qrcode: ''})
  const[otp, setOtp] = useState('')
  const router = useRouter();

  useEffect( () => {
    const getQrCode = async () => {
      const session = await getSession();
      const response = await fetchConfigureOTP(session)
      setRequest({...request, uid: session.user.uid, token: session.user.token})
      setData({...data, uri: response.provisioning_uri, key: response.key, qrcode: response.qrcode})
    }
    getQrCode() 
  }, [])

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await signIn('verify_otp', {
        id: request.uid,
        token: request.token,
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

  console.log(request)
  return (
    <form className='flex flex-col w-96' onSubmit={handleSubmit}>
      <h1 className='m-2 text-xl font-bold text-center text-orange-700'>Stockify</h1>
      <h2 className='mx-2 mb-2 font-bold text-center text-gray-700 text-md'>Set up your two factor authentication</h2>
      <p className='mx-2 mb-4 text-sm text-center text-gray-600'>Please help us secure your account by setting up your two factor authentication before signing in to this account.</p>
      <div className='w-full'>
        <div className='flex flex-row'>
          <div className='flex flex-col items-center justify-start'>
            <p className='steps__indicator'>1</p>
            <hr className='steps__line'/>
          </div>
          <div className='p-1 ml-4'>
            <p className='mb-2 font-bold'>Install an authenticator app </p>
            <p className='mb-2 text-xs font-bold'>Recommended:</p>
            <div className='text-xs'>
              <p>Google Authenticator - iOS | Android</p>
              <p>Microsoft Authenticator - iOS | Android</p>
            </div>
          </div>
        </div>

        <div className='flex flex-row'>
          <div className='flex flex-col items-center justify-start'>
            <p className='steps__indicator'>2</p>
            <hr className='steps__line'/>
          </div>
          <div className='p-1 ml-4'>
            <p className='mb-2 font-bold'>Add account</p>
            <div className='text-xs'>
              <p>Scan the QR code or manually enter the following in your Authenticator.</p>
              <div className='my-2 mb-4'>
                <p><b>Name:</b> Stockify</p>
                <p><b>Key:</b> {data.key}</p>
              </div>
              <img src={`data:image/svg+xml;base64,${data.qrcode}`} alt="" width='150' height='150' className='mb-2'/>
            </div>
          </div>
        </div>
        
        <div className='flex flex-row'>
          <div className='flex flex-col items-center justify-start'>
            <p className='steps__indicator'>3</p>
          </div>
          <div className='p-1 ml-4'>
            <p className='mb-2 font-bold'>Enter 6 digit verification code</p>
            <input 
              type="text" 
              name="otp"
              className='w-full p-2 mt-1 border border-gray-500 rounded-sm outline-orange-700'
              onChange={(e) => setOtp(e.target.value)}/>
            <p className='mt-1 text-xs text-gray-500'>Provided by your authenticator (numbers only)</p>
            <button type='submit' className='w-full p-2 mt-4 text-white bg-blue-700 shadow-xl'>Verify</button>
          </div>
        </div>
        
      </div>
 
  
    </form>
  )
}

export default Enable2FAForm