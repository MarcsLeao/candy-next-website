import { ReactNode } from "react"

type MainProps = {
    children: ReactNode
}

export function Main({children} : MainProps) {
  return (
    <main className="flex flex-col h-screen w-full">
        {children}
    </main>
  )
}
