// import { useState, useEffect } from "react"
// import { useSession } from "next-auth/react"
// import Layout from "../components/layout"
// import AccessDenied from "../components/access-denied"

// export default function ProtectedPage() {
//   const { data: session } = useSession()
//   const [content, setContent] = useState()

//   // Fetch content from protected route
//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch("/api/examples/protected")
//       const json = await res.json()
//       if (json.content) {
//         setContent(json.content)
//       }
//     }
//     fetchData()
//   }, [session])

//   // If no session exists, display access denied message
//   if (!session) {
//     return (
//       <Layout>
//         <AccessDenied />
//       </Layout>
//     )
//   }

//   // If session exists, display content
//   return (
//     <Layout>
//       <h1>Protected Page</h1>
//       <p>
//         <strong>{content ?? "\u00a0"}</strong>
//       </p>
//     </Layout>
//   )
// }


import fetcher from '../../libs/fetcher'
import useSWR from 'swr'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

export default function profile() {
  const { data: session } = useSession()
  // const { data, error, isLoading } = useSWR(`/api/authTest/`, fetcher)

  // if (error) return <div>{error.message}</div>


  // if (!data) return <div>Loading...</div>

  // console.log("data from authTest: ", data);

  return (
    <div>
      {/* <Image src={data.user.image} width={30} height={30} alt="Picture of the author" /></div> */}
      <p>{session.user.name}</p>
    </div>
  )
}
