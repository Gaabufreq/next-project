
'use client'

import { signOut, useSession } from 'next-auth/react'
import React, { useContext, useState } from 'react'
import Image from 'next/image'
import { HiOutlinePencilSquare } from 'react-icons/hi2'
import { useRouter } from 'next/navigation'
import { userDataContext } from '@/context/UserContext'

function Page() {
  const { data: session, status } = useSession()
  const contextData = useContext(userDataContext)
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // Context updated ho to use karo, warna session fallback
  const user = contextData?.user ?? session?.user

  const handleSignOut = async () => {
    setLoading(true)

    try {
      await signOut()
    } catch (error) {
      console.error('Sign out failed:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-black text-white">
      {user ? (
        <div className="w-full max-w-md border-2 border-white rounded-2xl p-8 shadow-lg text-center relative flex flex-col items-center">
          <HiOutlinePencilSquare
            size={22}
            color="white"
            className="absolute right-5 top-5 cursor-pointer"
            onClick={() => router.push('/edit')}
          />

          {user.image && (
            <div className="relative w-25 h-25 border-2 border-white rounded-full overflow-hidden">
              <Image
                src={user.image}
                fill
                sizes="100px"
                alt="User profile"
              />
            </div>
          )}

          <h1 className="text-xl font-semibold my-4">
            Welcome {user.name ?? 'User'}
          </h1>

          <button
            className="w-full px-4 py-2 bg-white text-black cursor-pointer rounded-sm hover:bg-gray-200 transition-colors font-semibold disabled:opacity-50"
            onClick={handleSignOut}
            disabled={loading}
          >
            {loading ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
      ) : (
        <div className="text-white text-2xl">
          Please sign in
        </div>
      )}
    </div>
  )
}

export default Page
