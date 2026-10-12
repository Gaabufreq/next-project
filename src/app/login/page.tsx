'use client'
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // hook

  const router = useRouter()
  const session = useSession()
  console.log(session?.data?.user)

  // fetching API,s

  const handleSignIn=async(e:React.FormEvent) => {
    e.preventDefault()
try {
  const result = await signIn('credentials',{
  email,password
  });
  console.log(result)
  alert('User login successfully')
} catch (error) {
  console.log(error)

  }
}



  return (
    <div className='min-h-screen  bg-black flex justify-center items-center text-white px-4' >
      <div className=" w-full max-w-md border-2 border-white rounded-2xl p-8 shadow-lg bg-gray-800 ">
        <h1 className='text-3xl font-semibold text-center mb-6 ' >Welcome Back</h1>
        <form className="space-y-6" onSubmit={handleSignIn}>
              <div>
              <label id='email' className='block mb-1 font-medium'>Email</label>
              <input type="email" id='email' placeholder='Enter your email' className='w-full border-b border-white py-2 px-1 bg-gray-800 text-white outline-none placeholder-gray-300' onChange={(e)=> setEmail(e.target.value) } value={email} />
            </div>
            <div>
              <label id='password' className='block mb-1 font-medium'>Password</label>
              <input type="password" id='password' placeholder='Enter your password' className='w-full border-b border-white py-2 px-1 bg-gray-800 text-white outline-none placeholder-gray-300' onChange={(e)=> setPassword(e.target.value) } value={password} />
            </div>
            <p className='text-sm text-center mt-1 cursor-pointer ' onClick={()=>router.push('/register')} >Create an account ? <span className='text-blue-500 hover:underline ' >Sign Up</span></p> 

            <button className=' w-full py-2 px-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors ' >Login</button>

              </form>

            <div className=" flex items-center gap-2 justify-center my-4 ">
              <hr className=' grow border-gray-500 ' />
              <span>Or</span>
              <hr className=' grow border-gray-500 ' />
            </div>

            <button className='w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-400 rounded-lg bg-white text-black hover:bg-gray-100 trasition-colors ' ><FcGoogle /><span>Sign In With Google </span></button>


      </div>
    </div>
  )
}


export default Login
