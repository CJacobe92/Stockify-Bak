import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const AuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'login',
      name: 'credentials',
      authorize: async(credentials) => {
        const baseURL = `${process.env.NEXT_PUBLIC_URL}/api/v1/auth/login`
        const payload = {
          email: credentials.email,
          password: credentials.password
        }

        const requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({'auth': payload})
        }

        const response = await fetch(baseURL, requestOptions)

        if (response.ok) {

          const user = {
            uid: response.headers.get('Uid'),
            token: response.headers.get('Authorization'),
            otp_enabled: response.headers.get('otp_enabled')
          }; 
          return user;
        } else {
          return null; // Return null for login failure
        }
      }
    }),
    CredentialsProvider({
      id: 'register',
      name: 'credentials',
      authorize: async(credentials) => {
        const baseURL = `${process.env.NEXT_PUBLIC_URL}/api/v1/users`
        const payload = {
          firstname: credentials.firstname,
          lastname: credentials.lastname,
          email: credentials.email,
          password: credentials.password,
          password_confirmation: credentials.password_confirmation
        }

        const requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({'user': payload})
        }

        const response = await fetch(baseURL, requestOptions)

        if (response.ok) {
          
          const user =  {
            uid: response.headers.get('Uid'),
            token:  response.headers.get('Authorization')
          }
          return user
        } else {
          return null
        }
      }
    }),
    CredentialsProvider({
      id: 'verify_otp',
      name: 'credentials',
      authorize: async(credentials) => {
        const baseURL = `${process.env.NEXT_PUBLIC_URL}/api/v1/auth/verify_otp/${credentials.id}`
        const payload = {
          otp: credentials.otp
        }

        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': credentials.token
        },
          body: JSON.stringify({'auth': payload})
        }

        const response = await fetch(baseURL, requestOptions)

        if (response.ok) {
          const user = {
            uid: response.headers.get('Uid'),
            token: response.headers.get('Authorization'),
            otp_enabled: response.headers.get('otp_enabled')
          }; 
          console.log(credentials.token, credentials.uid, credentials.otp)
          return user;
        } else {
          return null; // Return null for login failure
        }
      }
    })  
  ],
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({token, user}) {
        if (user) {
            token.user = user
        }
        return token
    },
    async session({session, token}) {
        session.user = token.user;
        return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET
}

const handler =  NextAuth(AuthOptions)

export {handler as GET, handler as POST}