
import { DeviceSettings, useCall, VideoPreview } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react"
import { Card } from "./ui/card";
import { CameraIcon, MicIcon, SettingsIcon } from "lucide-react";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";

export const MeetingSetup = ({onSetupComplete}: {onSetupComplete: () => void}) => {
  
  const [isCameraOff, setIsCameraOff] = useState(true);
  const [isMicOff, setIsMicOff] = useState(true);

  const call = useCall();  //we can get call prop as we passed it in our MeetingPage, <StreamCall call={call}>
  
  if(!call) return null;

  //for toggling camera
  useEffect(() => {
    const toggleCamera = async () => {
      try {
        if(isCameraOff) await call.camera.disable();
        else await call.camera.enable();
      } 
      catch (error) {
        console.error("Camera access failed" , error);
      }
    }
    toggleCamera();
  }, [isCameraOff, call.camera])
  
  //for toggling microphone
  useEffect(() => {
    const toggleMic = async () => {
     try {
      if(isMicOff) await call.microphone.disable();
      else await call.microphone.enable();
     } 
     catch (error) {
      console.error("Mic access failed" , error);
     }
    }
    toggleMic();
  }, [isMicOff, call.microphone])

  //when user click on join meeting btn(in meetingpage)
  const handleJoin = async () => {
    await call.join();   //start the meeting
    onSetupComplete();   //call onSetupComplete() func which make setIsSetupComplete(true) i.e setup is done, now render <MeetingPage/>
  } 

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-[1200px] mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> 
          {/* Left - VideoPrivew part */}
          <Card className="flex flex-col md:col-span-1 p-4 shadow-lg">
            <div className="font-[poppins] flex flex-col items-center justify-center">
              <h1 className="text-xl font-semibold ">Camera Preview</h1>
              <p className="text-sm text-muted-foreground">Make Sure you are well Dressed</p>
            </div>

            <div className="relative mt-4 min-h-[400px] overflow-hidden bg-muted/50">
              <div className="absolute inset-0 flex justify-center">
                <VideoPreview className="h-full w-full"/>
              </div>
            </div>
          </Card>
          

          {/* Right- Meeting Setup */}
          <Card className="shadow-lg p-4">
            <div className="h-full flex flex-col">
              
              {/* MEETING DETAILS  */}
              <div className="flex flex-col justify-center items-center font-[poppins] ">
                <h2 className="text-xl font-semibold mb-1">Meeting Details</h2>
                <p className="text-sm text-muted-foreground break-all">Call_ID :{call.id}</p>
              </div>

              <div className="mt-5">  
                {/* Camera Controls */}
                <div className="flex justify-between gap-3 mb-4">
                  <div className="flex gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <CameraIcon className="h-5 w-5 text-primary text-green-400"/>
                    </div>
                    <div>
                      <p className="font-[poppins] font-medium">Camera</p>
                      <p className="text-sm text-muted-foreground">{isCameraOff ? "Off" : "On"}</p>
                    </div>
                  </div>

                  <Switch
                    checked={!isCameraOff}
                    onCheckedChange={(checked) => setIsCameraOff(!checked)}
                  />
                </div>

                {/* Mic Controls */}
                <div className="flex justify-between gap-3 mb-4">
                  <div className="flex gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MicIcon className="h-5 w-5 text-primary text-green-400"/>
                    </div>
                    <div>
                      <p className="font-[poppins] font-medium">Microphone</p>
                      <p className="text-sm text-muted-foreground">{isMicOff ? "Off" : "On"}</p>
                    </div>
                  </div>

                  <Switch
                    checked={!isMicOff}
                    onCheckedChange={(checked) => setIsMicOff(!checked)}
                  />
                </div>

                {/* Device Setting */}
                <div className="flex justify-between gap-3">
                  <div className="flex gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <SettingsIcon className="h-5 w-5 text-primary text-green-400"/>
                    </div>
                    <div>
                      <p className="font-[poppins] font-medium">Settings</p>
                      <p className="text-sm text-muted-foreground">Configure Devices</p>
                    </div>
                  </div>

                  <div>
                    <DeviceSettings/>
                  </div>
                </div>
              </div>

              {/* Join meeting btn */}
              <Button 
                className="w-full mt-12 md:mt-40"
                onClick={handleJoin}
              >
               Join Meeting
              </Button>

            </div>
          </Card>
        </div>

      </div>
    </div>
  )
}
