"use client"

import { ReactNode, useState } from "react"
import {StreamVideoClientOptions} from "@stream-io/video-react-sdk";
import { useRole } from "@/hooks/useRole";


const StreamClientProvider = ({children}: {children: ReactNode}) => {
  const [streamVideoClient, setStreamVideoClient] = useState<StreamVideoClientOptions>();
  const {user, isLoaded} = useRole();
  

  return (
    <div>
        
    </div>
  )
}

export default StreamClientProvider