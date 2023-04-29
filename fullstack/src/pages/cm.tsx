import { useSession } from 'next-auth/react'
import Layout from 'bring/components/layout/MainLayout';
import Navbar from 'bring/components/layout/NavBar';
import CMApp from 'bring/components/App';

export default function CompingMachine() {

  const session = useSession()
  const {data} = session
  console.log("cm", {data});

  // if(!data) router.push("/")


  return (
    <Layout>
      <Navbar/>
      <CMApp/>
    </Layout>
  )
}

