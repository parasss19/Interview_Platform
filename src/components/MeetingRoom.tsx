"use client"

import { CallControls, CallingState, CallParticipantsList, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation"
import { useState } from "react";
import LoaderUI from "./LoaderUI";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { LayoutListIcon, UserIcon } from "lucide-react";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import EndCallBtn from "./EndCallBtn";
import CodeEditor from "./CodeEditor";
import AddQuestionBtn from "./AddQuestionBtn";
import { CodeQuestion } from "@/constants";


export const MeetingRoom = () => {
  const router = useRouter();

  const [layout, setLayout] = useState<"grid" | "speaker">('speaker');   //used for changing layout in meeting room
  const [showParticipants, setShowParticipants] = useState(false);       //used for showing no of participants present in meeting room
  const [question, setQuestion] = useState<CodeQuestion[]>([]);          //State for questions

  const {useCallCallingState} = useCallStateHooks();

  const callingState = useCallCallingState();

  if(callingState != CallingState.JOINED){
    return <LoaderUI/>
  }

  //handleQuestion fun is trigger when AddQuestionBtn.tsx file submit button hit
  const handleAddQuestion = (question : CodeQuestion) => {
    setQuestion((prev) => [...prev, question]);
  }

  return (
  <div className="h-[calc(100vh-4rem-1px)]">
    <ResizablePanelGroup direction="horizontal">
      
      {/* Left Part */}
      <ResizablePanel defaultSize={32} minSize={32} maxSize={60} className="relative">
        {/* Layout and Participants */}
        <div className="absolute inset-0 text-white">
          {layout  == "grid" ? <PaginatedGridLayout/> : <SpeakerLayout/>}

          {showParticipants && (
            <div className="absolute right-0 top-0 h-full bg-background/55 backdrop-blur px-4 py-2 font-[poppins] font-semibold">
              <CallParticipantsList onClose={() => setShowParticipants(false)}/>
            </div>
          )}
        </div>

        {/* Video Controls */}
        <div className="absolute bottom-4 left-0 right-0">
          <div className="flex items-center gap-2 flex-wrap justify-center px-4">
            
            <div className="text-white">
              <CallControls onLeave={() => router.push("/")}/>
            </div>
             
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost" className="size-10 border border-blue-400">
                    <LayoutListIcon className="size-4"/>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="flex flex-col gap-2 font-[poppins] cursor-pointer">
                  <DropdownMenuItem className="border rounded px-2 py-1" onClick={() => setLayout("grid")}>
                    Grid View
                  </DropdownMenuItem>
                  <DropdownMenuItem className="border rounded px-2 py-1" onClick={() => setLayout("speaker")}>
                    Speaker View
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" className="size-10 border border-blue-400" onClick={() => setShowParticipants(!showParticipants)}>
                <UserIcon className="size-4"/>
              </Button>

              {/* End Call btn only for interviewer not shown to candidate */}
              <EndCallBtn/>

              {/* handleAddQuestion to AddQuestionBtn */}
              <AddQuestionBtn addQuestion = {handleAddQuestion}/>
              
            </div>

          </div>
        </div>
      </ResizablePanel>


      {/* Resizable */}
      <ResizableHandle withHandle/>


      {/* Right Part - code editor */}    
      <ResizablePanel>
        <CodeEditor codingQuestion = {question}/>
      </ResizablePanel>

    </ResizablePanelGroup>
  </div>
)}
