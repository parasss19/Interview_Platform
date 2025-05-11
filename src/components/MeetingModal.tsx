"use client"

import { useState } from "react";
import { DialogContent, DialogTitle, Dialog, DialogHeader } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import useMeeting from "@/hooks/useMeeting";

interface MeetingModalpropType {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    isJoinMeeting: boolean;
}
const MeetingModal = ({isOpen, onClose, title, isJoinMeeting} : MeetingModalpropType ) => {
  const [meetingUrl, setMeetingUrl] = useState("");   //track state for meeting url
  const {createMeeting, joinMeeting} = useMeeting();

  const clickHandler = () => {
    //user paste meeting url while joining meet
    if(isJoinMeeting){
      const meetingId = meetingUrl.split("/").pop();  //extract the url from input
      if(meetingId){
        return joinMeeting(meetingId);
      }
    }
    else{
      createMeeting();
    }
    setMeetingUrl("");
    onClose(); 
  }
 
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="">
        
        <DialogHeader>
            <DialogTitle className="font-[poppins] text-xl">{title}</DialogTitle>
        </DialogHeader>

        <div>
            {/* if user click on join meeting */}
            {isJoinMeeting && (
                <Input
                  placeholder="Paste meeting link here..."
                  value={meetingUrl}
                  onChange={(e) => setMeetingUrl(e.target.value)}
                />
            )}
            {/* buttons for cancel or Join/Start meeting */}
            <div className="pt-4 flex gap-2 justify-end font-[poppins]">
              <Button 
                className="bg-red-400 hover:bg-red-400" 
                onClick={onClose}
              >
                Cancel
              </Button>

              <Button 
                onClick={clickHandler} 
                disabled={isJoinMeeting && !meetingUrl.trim()}    //if user dont write any url in input than Join btn is disabled
                className="bg-emerald-600 hover:bg-emerald-600"
              >
                {isJoinMeeting ? "Join Meeting" : "Start Meeting"}
              </Button>
            </div>
        </div>

      </DialogContent>
    </Dialog>
  )
}

export default MeetingModal