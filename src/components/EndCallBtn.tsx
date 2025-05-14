import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "../../convex/_generated/api";
import toast from "react-hot-toast";
import { Button } from "./ui/button";

const EndCallBtn = () => {
  const call = useCall();
  const router = useRouter();

  const {useLocalParticipant} = useCallStateHooks();
  const localParticipant = useLocalParticipant();    //The user who is currently in the call

  //Backend query
  const updateInterviewStatus = useMutation(api.interviews.updateInterviewStatus);   //we use our mutation we defined in convex/interviews.ts
  
  //Fetches the interview document from the backend by using the call ID from Stream.
  const interview = useQuery(api.interviews.getInterviewByStreamCallId, {
    streamCallId : call?.id || "",
  });

  //If the call is not active or interview data is not loaded yet,then End call btn is not shown i.e component returns nothing.
  if(!call || !interview) return null;

  //Check if User is Meeting Owner
  const createdById = call?.state?.createdBy?.id;   //id of creator of meeting
  const userId = localParticipant?.userId;         //id of current user
  const isMeetingOwner = userId === createdById ? true : false;  //Compares the current user’s ID with the creator’s ID of the meeting.

  //If the current user is not the meeting owner, they don’t see the “End Meeting” button.
  if(!isMeetingOwner) return null; 

  //End Call Logic
  const endCall = async () => {
    try {
      await call.endCall();

      //Updates the interview's status to "completed" in the Convex backend via your mutation
      await updateInterviewStatus({
        id: interview._id,
        status: "completed"
      });

      router.push("/");
      toast.success("Meeting ended for everyone");
    } catch (error) {
      console.log(error);
      toast.error("Failed to end meeting");
    }
  }
  

  return (
    <Button variant={"destructive"} onClick={endCall}>
      End Meeting
    </Button>
  )
}

export default EndCallBtn;   