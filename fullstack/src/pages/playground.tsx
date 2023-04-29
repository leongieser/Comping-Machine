import { useSession } from 'next-auth/react'
import Layout from 'bring/components/layout/MainLayout';
import Navbar from 'bring/components/layout/NavBar';
import { use } from 'react';
import InstrumentLayout from 'bring/components/layout/InstrumentLayout';


//TODO appropriate name for container
export default function playgroundPage() {

  const session = useSession()
  const {data} = session
  console.log("cm", {data});

  // if(!data) router.push("/")

  // useEffect fetch all the settings for cmapp and pass them to zustand store

  return (
    <Layout>
      <Navbar/>
      <InstrumentLayout/>
    </Layout>
  )
}

