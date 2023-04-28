import { useRouter } from 'next/router';
import Layout from "../components/layout"
import { signIn } from 'next-auth/react'
export default function IndexPage() {
  const router = useRouter()

  // cosnt handleGetStarted = () => {
  //   signIn()
  //   router.push('/comping-machine')


  //   compMachine

  //   return (

  //   )
  // }

  return (
    // <Layout>
    //   <button onClick={() => signIn()}>Login</button>
    // </Layout>

        <div className='h-screen flex flex-col justify-center items-center'>
          <h1 className='mb-12'>Comping machineeeeee motherfucker send it</h1>
          <button className="w-52" onClick={() => signIn()}>Get started</button>
        </div>

  )
}
