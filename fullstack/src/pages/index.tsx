import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import LandingPage from 'bring/components/LandingPage';

export default function Index() {
  const router = useRouter()
  const session = useSession()
  const { data } = session

  console.log("indexPage", {data});

  if(data) router.push('/cm')

  return <LandingPage />
}

