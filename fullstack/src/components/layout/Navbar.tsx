import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import useUser from '../../../Hooks/useUser';
import Image from 'next/image'
import realLogo from "/public/asdasd.svg"

function Navbar() {
  const { user, loading } = useUser()



  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-zinc-100/40 flex flex-row justify-between h-16">
       <Image className="ml-4" src={realLogo} alt="logo" width={86} height={86}></Image>
      <div className="p-0 mr-2 text-gray-200">

        <ul className='flex flex-row justify-between'>

          <li className='flex items-center mr-2'><Link className="text-gray-200 flex items-center p-3 border border-slate-700 rounded-2xl h-8 bg-zinc-800" href={"/profile"}>Profile</Link></li>
          <li className='flex items-center mr-2'>
            <button className="flex items-center p-3 border border-slate-700 rounded-2xl h-8 bg-zinc-800" onClick={() => signOut({ callbackUrl: '/' })}>
              Log Out
            </button>
          </li>
          <li className='flex items-center p-2'>

          { loading ?
          <div className="animate-pulse">
            <div className="rounded-full bg-gray-200 h-12 w-12"></div>
          </div>
          :
          <Image className="rounded-full " src={user?.image} width={42} height={42} alt="user avatar"></Image>
        }

          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar