"use client"

import LoaderUI from "@/components/LoaderUI";
import { MeetingRoom } from "@/components/MeetingRoom";
import { MeetingSetup } from "@/components/MeetingSetup";
import useGetCallById from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import { useState } from "react";


const MeetingPage = () => {
  const {id} = useParams();
  const {isLoaded} = useUser();
  const {call, isCallLoading} = useGetCallById(id);  //our custom hook 
  
  const [isSetupComplete, setIsSetupComplete] = useState(false);


  //if user and call is not loaded then render our loader comp
  if(!isLoaded || isCallLoading) return <LoaderUI/>

  //if useGetCallById hook return undefined i.e no call found
  if(!call){
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-2xl font-semibold font-[poppins]">Meeting not found</p>
      </div>
    )
  }
  
  //this fun is called when user click on join meet after completing setup(logic defined in MeetingSetup comp)
  const onSetupComplete = () => {
    setIsSetupComplete(true)
  }

  return (
    <StreamCall call={call}>
      <StreamTheme>
        
        {!isSetupComplete 
          ?(
            <MeetingSetup onSetupComplete = {onSetupComplete}/>
          ) 
          :(
            <MeetingRoom/>
          )
        }
      </StreamTheme>
    </StreamCall>
  )
}

export default MeetingPage;