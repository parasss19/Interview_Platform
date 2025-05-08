import { useUser } from "@clerk/nextjs"
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";


export const useRole = () => {
   const {user} = useUser();   
   
   //fetch the user using clerkId through our defined query(getUserByClerkId) in convex/users 
   const userData = useQuery(api.users.getUserByClerkId, {
    clerkId : user?.id || "", 
   })

   //if user is neither candidate nor interviewer
   const isLoading = userData === undefined

   return {
    isLoading,
    isInterviewer: userData?.role === "interviewer",
    isCandidate: userData?.role === "candidate",
   }
}
