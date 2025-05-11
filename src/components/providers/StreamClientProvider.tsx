"use client"

import { ReactNode, useEffect, useState } from "react"
import {StreamVideo, StreamVideoClient} from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import LoaderUI from "../LoaderUI";
import { streamTokenProvider } from "@/actions/streamTokenProvider";


const StreamClientProvider = ({children}: {children: ReactNode}) => {
  const [streamClient, setStreamClient] = useState<StreamVideoClient>();
  const {user, isLoaded} = useUser();

  useEffect(() => {
    if(!isLoaded || !user) return;  //if user is not authenticated

    const client = new StreamVideoClient({
      apiKey : process.env.NEXT_PUBLIC_STREAM_API_KEY!,
      
      //user data
      user: {
        id : user?.id,
        name: (user?.firstName || ("")) + "" + (user?.lastName || "") || user?.id, 
        image: user?.imageUrl, 
      },

      tokenProvider : streamTokenProvider,
    });

    setStreamClient(client);

  }, [user, isLoaded])


  if(!streamClient) {
    return <LoaderUI/>
  }

  return (
    <StreamVideo client={streamClient}>
      {children}
    </StreamVideo>
  )
}

export default StreamClientProvider


//(user?.firstName || "") = returns first name if it exists, otherwise an empty string
// + "": just concatenates an empty string..... 
//(user?.lastName || "") = returns last name if it exists, otherwise an empty string
//So the total becomes: firstName + lastName ,If both are empty strings ("" + ""), the result is "".
// || user?.id so if the name is empty, fallback to user.id.