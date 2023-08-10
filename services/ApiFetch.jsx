
export const fetchConfigureOTP = async(session) => {
  try {
      const id = session.user.uid
      const token = session.user.token
      const baseURL = `${process.env.NEXT_PUBLIC_URL}/api/v1/auth/configure_otp/${id}`
      const requestOption = {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': token
          }
      }

      const response = await fetch(baseURL, requestOption)
     
      if (response.ok) {
          return await response.json()
      } else {
          console.error('Failed to fetch')
      }
  } catch(error) {
      console.error(error)
  }
}
