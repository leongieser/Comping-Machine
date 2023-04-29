import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import LandingPage from 'bring/components/LandingPage';

export default function Index() {
  const router = useRouter()
  const session = useSession()
  const { data } = session

  console.log("indexPage", {data});

  if(data) router.push('/cm')

<<<<<<< HEAD
  return <LandingPage />
=======


  return (
    // <Layout>
    //   <button onClick={() => signIn()}>Login</button>
    // </Layout>
<>



         <div className=''>
          <h1 className='mb-12'>Comping machineeeeee motherfucker send it</h1>
          <button className="w-52" onClick={() => signIn()}>Get started NOW!!</button>
        </div>

</>
  )
>>>>>>> aa24ea492b31b9ddd1ee0ee21ba2aaba8ef58079
}

