import Header from "./header"
import Footer from "./footer"
import type { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* <Header /> */}
      <main >{children}</main>
      {/* <main className='flex items-center justify-center'>{children}</main> */}
    </>
  )
}
