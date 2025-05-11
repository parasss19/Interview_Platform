import StreamClientProvider from "@/components/providers/StreamClientProvider"
import { ReactNode } from "react"

export const layout = ({children} : {children: ReactNode}) => {
  return (
    <StreamClientProvider>
        {children}
    </StreamClientProvider>
  )
}

