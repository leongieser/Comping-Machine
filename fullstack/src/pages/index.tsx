import { useRouter } from 'next/router';
import Layout from "../components/layout"
import { signIn, useSession } from 'next-auth/react'
export default function IndexPage() {
  const router = useRouter()
  // const { data: session } = useSession()

  //TODO signIn vs router.push("")
  //!what?
  // const handleGetStarted = async (e:React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault()
  //   const res = await signIn()
  //   if {res.error} {
  //      return <div>Please try again</div>
  //  } else {
  //   router.push('/me')
  // }




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
}
