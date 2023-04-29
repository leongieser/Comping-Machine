import Image from 'next/image'
import fetcher from '../../libs/fetcher'
import { useSession } from 'next-auth/react'


export default function profile() {
  const { data: session } = useSession()
  console.log(session);
  // const { data, error, isLoading } = useSWR(`/api/authTest/`, fetcher)

  // if (error) return <div>{error.message}</div>


  // if (!data) return <div>Loading...</div>

  // console.log("data from authTest: ", data);

  return (
    <div>
      {/* <Image src={data.user.image} width={30} height={30} alt="Picture of the author" /></div> */}
      <p>logged in</p>
    </div>
  )
}
