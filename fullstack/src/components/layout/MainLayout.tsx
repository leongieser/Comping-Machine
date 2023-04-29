import type { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="w-screen h-screen overflow-hidden">{children}</main>
  )
}
