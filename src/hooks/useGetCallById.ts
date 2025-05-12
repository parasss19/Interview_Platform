import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

const useGetCallById = (id: string | string[]) => {
    const [isCallLoading, setIsCallLoading] = useState(true);
    const [call, setCall] = useState<Call>();

    const client = useStreamVideoClient();

  //Runs once when the 'client' or 'id' changes.
  useEffect(() => {
    if(!client) return;
    
    const getCall = async() => {
      try {
        //Will query the API for calls matching the given filters.
        const {calls} = await client.queryCalls({
          filter_conditions: {id}
        })
        if (calls.length > 0) setCall(calls[0]);
      } 
      catch (error) {
        console.error(error);
        setCall(undefined);   //when user join with invalide meetingurl 
      }
      finally{
        setIsCallLoading(false);
      }
    }
    getCall();
  }, [client, id])
  
  return {call, isCallLoading};
}

export default useGetCallById


//The custom React hook useGetCallById is used to retrieve a specific video call by
//its ID from the Stream Video API, using the @stream-io/video-react-sdk. 

//It return 2 things
//1 call: the fetched call object (or undefined if not found).
//2 isCallLoading: a boolean to indicate if the call is still being fetched.