"use client"

import ActionCard from "@/components/ActionCard";
import { QUICK_ACTIONS } from "@/constants";
import { useRole } from "@/hooks/useRole";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { HandshakeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import MeetingModal from "@/components/MeetingModal";


export default function Home() {
  const router = useRouter();

  const {isCandidate, isInterviewer, isLoading} = useRole();

  const interviews = useQuery(api.interviews.getMyInterviews);

  const [showModal, setShowModal] = useState(false);                //for open and closing modal
  const [modalType, setModalType] = useState<"start" | "join">();   //to determine whether user want to 'start' or 'join' the call

  const handleQuickActions = (title: string) => {
    switch(title){
      //for 'join' or 'start' new call we show modal
      case "New Call":
        setModalType("start");
        setShowModal(true);
        break;
      case "Join Interview":
        setModalType("join");
        setShowModal(true);
        break;

      //for 'recording' or 'Schedule' page we redirect user
      default: 
        router.push(`/${title.toLowerCase()}`)
    }
  }


  return (
    <div className="container max-w-7xl mx-auto p-6">
      {/* WELCOME SECTION */}
      <div className="rounded-lg bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 border shadow-sm mb-10 font-[poppins]">
        <div className="flex gap-3 items-center">
         <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Welcome Back</h1>
         <span><HandshakeIcon size={30}/></span>
        </div>
        
        <p className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent mt-2">
          {isInterviewer 
            ? "Manage your interviews and review candidates effectively"
            : "Access your upcoming interviews and preparations"
          }
        </p>
      </div>

      {/* Modal */}
      <MeetingModal 
        isOpen = {showModal}
        onClose={() => setShowModal(false)}
        title = {modalType === "join" ? "Join Meeting" : "Start Meeting"}
        isJoinMeeting = {modalType === "join" ? true : false }
      />


      {/* If user is interviewer */}
      {isInterviewer 
        ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {QUICK_ACTIONS.map((action) => (
                  <ActionCard 
                    key={action.title} 
                    action={action} 
                    onClick = {() => handleQuickActions(action.title)}
                  />
                ))}
              </div>
            </>
          )
          
        // If user is candidate 
        : (
            <>
              <div className="">
                candidate
              </div>
            </>
          )
      }


    </div>
  );
}
