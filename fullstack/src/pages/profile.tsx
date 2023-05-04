import Image from 'next/image'
import fetcher from '../../libs/fetcher'
import { useSession } from 'next-auth/react'
import Navbar from 'bring/components/layout/Navbar';
import Layout from 'bring/components/layout/MainLayout';
import useUser from '../../Hooks/useUser';




export default function profile() {
  const { user, loading } = useUser()

  const userTracks = [
    {id: 1, name:'FIRST TRACK'},
    {id: 2, name:'second'},
    {id: 3, name:'ANOTHA ONE'}
  ]
  // const { data, error, isLoading } = useSWR(`/api/authTest/`, fetcher)

  // if (error) return <div>{error.message}</div>


  // if (!data) return <div>Loading...</div>

  // console.log("data from authTest: ", data);

  return (
<Layout>
  <Navbar/>
  <div className="relative">
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mt-20 ml-80 mr-80 h-[800px] z-0"></div>
    <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center rounded bg-zinc-200  ml-80 mr-80 h-[800px] z-10 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100">
    <div className="h-[500px] w-2/4 opacity-80 bg-gray-950 rounded-lg p-7">
          <h4 className="text-xl text-fuchsia-600 mb-2">Your Sessions:</h4>
          <ul className="list-style-dot px-5 ">
            {userTracks && userTracks.map(track => {
              return <li className="
              text-sky-200 opacity-90 px-2 py-1 list-[square] ml-10 hover:text-fuchsia-500">
                <div>
                  <a href={`/session/${track.id}`}><h4>{track.name}</h4></a>
                </div>
              </li>
            }

            )}
          </ul>
        </div>


      <div className="absolute top-0 right-0 flex flex-col-reverse items-center mr-6 mt-6">
        <div className="text-xl font-semibold">{user?.name}</div>
        { loading ?
          <div className="animate-pulse">
            <div className="rounded-full bg-gray-200 h-12 w-12"></div>
          </div>
          :
          <Image className="rounded-full " src={user?.image} width={86} height={86} alt="user avatar"></Image>
        }
      </div>
    </div>
  </div>
</Layout>
  )
}
