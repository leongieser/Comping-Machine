
import Image from 'next/image'
import logo from '/public/CM-logo2.png';
import { signIn } from 'next-auth/react'

function LandingPage() {

  //TODO Styling
  return (
  <div className='flex flex-col justify-center items-center h-screen'>
    <Image src={logo} width={200} height={200} alt="comping-machine-logo"/>
    <h1 className='mt-12 mb-12'>Jam right in your browser</h1>
    <button className="w-52 border rounded-md" onClick={() => signIn( undefined, { callbackUrl: '/cm' })}>Get started</button>
  </div>
  )
}

export default LandingPage
