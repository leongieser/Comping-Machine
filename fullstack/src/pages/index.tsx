import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import LandingPage from 'bring/components/LandingPage';

export default function IndexPage() {
  const router = useRouter()
  const session = useSession()
  const { data } = session

  console.log("indexPage", {data});

  if(data) router.push('/playground')

  return <LandingPage />
}

