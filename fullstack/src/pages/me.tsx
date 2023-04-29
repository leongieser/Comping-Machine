import { useSession } from "next-auth/react"
import fetcher from '../../libs/fetcher'
import useSWR from 'swr'
import {useEffect} from "react"
import Layout from "../components/layout/MainLayout"

export default function MePage() {
  // const [jamSessionData, setJamSessionData] = useState({})

  const data = {
    message: "mimimmim"
  }
  // const { data, error } = useSWR('/api/protected', fetcher)

  // if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>


  return (

      <pre>{JSON.stringify(data, null, 2)}</pre>

  )
}






