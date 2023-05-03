import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import useUser from '../../../Hooks/useUser';
import Image from 'next/image'

function Navbar() {
  const { user } = useUser()

  console.log({user});

  return (
    <nav className="bg-red-200 flex flex-row justify-end">
      <div className="p-0 mr-2">
        <ul className='flex flex-row'>
          <li className='flex items-center mr-2'><Link className="flex items-center p-3 border border-slate-700 rounded-2xl h-8" href={"/profile"}>Profile</Link></li>
          <li className='flex items-center mr-2'>
            <button className="flex items-center p-3 border border-slate-700 rounded-2xl h-8" onClick={() => signOut({ callbackUrl: '/' })}>
              Log Out
            </button>
          </li>
          <li className='flex items-center p-2 '>
            {/*TODO apply loading state to image */ }
            <Image className="rounded-full" src={user?.image} width={48} height={48} alt="user avatar"></Image>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar