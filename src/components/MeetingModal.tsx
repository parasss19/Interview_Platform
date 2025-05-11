"use client"

import { useState } from "react";
import { Dialog, DialogHeader } from "./ui/dialog";
import { DialogContent, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface MeetingModalpropType {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    isJoinMeeting: boolean;
}
const MeetingModal = ({isOpen, onClose, title, isJoinMeeting} : MeetingModalpropType ) => {
  const [meetingUrl, setMeetingUrl] = useState("");   //track state for meeting url

  const createMeeting = () => {

  }  

  const handleStartMeet = () => {

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
                onClick={handleStartMeet} 
                disabled={isJoinMeeting && !meetingUrl.trim()}
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