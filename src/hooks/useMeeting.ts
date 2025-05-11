import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const useMeeting = () => {
   const router = useRouter();
   const client = useStreamVideoClient();

   const createMeeting = async () => {
    if(!client) return ;
    
    try {
        //generate random unique user id
        const id = crypto.randomUUID();   
        
        //create new call
        const call = client.call("default", id);       //call("call-type", "call-id")
        await call.getOrCreate({
          data: {
            starts_at: new Date().toISOString(),
            custom: {
                description: "Instant Meeting",
            }
          }
        });

        //once call created redirect user to meeting room
        router.push(`/meeting/${call.id}`);
        toast.success("Meeting Created");
    } 
    catch (error) {
        toast.error("Failed to create meeting");
    }
   }

   //joinMeeting func take meeting url as prop
   const joinMeeting = (callId: string) => {
     if(!client) return toast.error("Failed to join. Try again")
    
    router.push(`/meeting/${callId}`);  //redirect to meeting page
   }

   return { createMeeting, joinMeeting }
}

export default useMeeting;