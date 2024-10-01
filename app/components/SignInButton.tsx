'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export default function SignInButton() {
  const { data: session } = useSession()

  if (session && session.user) {
    return (
      <div className="flex flex-col items-center">
        <p className="mb-4">Signed in as {session.user.email}</p>
        <div className="flex gap-4">
          <Button onClick={() => signOut()}>Sign out</Button>
        </div>
      </div>
    )
  }

  return <Button onClick={() => signIn('google')}>Sign in with Google</Button>
}