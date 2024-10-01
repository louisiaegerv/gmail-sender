import SignInButton from './components/SignInButton'
import ComposePage from './compose/page'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]/route'

export default async function Home() {

  const session = await getServerSession(authOptions)

  // if (!session) {}

  return (
    <div className={`flex flex-col md:flex-row w-full h-screen items-center
      ${!session ? 'flex-col': ''}
    `}>
      <div className={`h-screen flex flex-col items-center justify-center bg-gray-100 
        ${!session ? 'w-full' : 'md:w-1/2 w-full'}`
      }>
        <h1 className="text-4xl font-bold mb-8">Gmail Email Sender</h1>
        <SignInButton />
      </div>
      {session ? 
        <div className='md:w-1/2 w-full'>
          <ComposePage></ComposePage>
        </div>
        : ''
        }    
    </div>
  )
}