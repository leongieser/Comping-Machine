
import Image from 'next/image'
import logo from '/public/CM-logo2.png';
import { signIn } from 'next-auth/react'
import realLogo from "/public/asdasd.svg"
import logoTransparent from "/public/asdasd2.svg"
import easterEgg from "/public/ahmad.svg"
function LandingPage() {

  //TODO Styling
  return (
  <div className='flex flex-col justify-center items-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
    <Image src={logoTransparent} width={1500} height={1500} alt="comping-machine-logo"/>
    <h1 className='mt-12 mb-12'>Jam right in your browser</h1>
    <button className="bg-zinc-200  border-white opacity-30 w-52 h-16 rounded-xl font-semibold text-xl" onClick={() => signIn( undefined, { callbackUrl: '/playground' })}>Get started</button>
  </div>
  )
}

export default LandingPage
