"use client"

import { useState } from "react";
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { CodeQuestion } from "@/constants";
import { z } from "zod";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

type AddQuestionBtnProps = {
  addQuestion: (q: CodeQuestion) => void;
};

//Zod schema
const questionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description : z.string().min(1, "Description is required"),
  examples:z.array(
    z.object({
      input: z.string().min(1, "Example input is required"),
      output: z.string().min(1, "Example output is required"),
      explanation: z.string().optional(),
    })
  ).min(1, "At least one example is required"),
  constraints: z.string().optional(),
})


const AddQuestionBtn = ({addQuestion}: AddQuestionBtnProps) => {

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    constraints: "",
  })
  const [examples, setExamples] = useState([{input: "", output: "", explanation: ""}]);


  //logic to show add question btn only to the interviewer not candidate
  const call = useCall();
  const {useLocalParticipant} = useCallStateHooks();
  const localParticipant = useLocalParticipant();    //The user who is currently in the call

  //Fetches the interview document from the backend by using the call ID from Stream.
  const interview = useQuery(api.interviews.getInterviewByStreamCallId, {
    streamCallId : call?.id || "",
  });
  
  //If the call is not active,then AddQuestion btn is not shown
  if(!call) return null;
  
  //Check if User is Meeting Owner
  const createdById = call?.state?.createdBy?.id;   //id of creator of meeting
  const userId = localParticipant?.userId;         //id of current user
  const isMeetingOwner = userId === createdById ? true : false;  //Compares the current user’s ID with the creator’s ID of the meeting.
  
  //If the current user is not the meeting owner, they don’t see the “Add Question” button.
  if(!isMeetingOwner) return null; 



  const handleSubmit = () => {
    //zod validation check
    const result = questionSchema.safeParse({...form, examples});
   
    //if validation failed
    if(!result.success){
      const errormessage = result.error.errors[0]?.message || "All fields are required";
      toast.error(errormessage);
      setExamples([ {input: "",output:"", explanation:"" } ])  //remove all added example in dialog
      return;
    }
    
    //if validation succeed
    const newQuestion: CodeQuestion = {
      title: form.title,
      description: form.description,
      examples,
      constraints: form.constraints.split("\n"),
    }
    addQuestion(newQuestion);

    
    //Clear form only after successful submission
    setForm({
     title: "",
     description: "",
     constraints: "",
    });

    //remove all added example in dialog
    setExamples([ {input: "",output:"", explanation:"" } ])

    // Close dialog
    setOpen(false);
  }

  //when i click on plus icon then this func add the new obj of example(create new input, output, explanation field)
  const addNewExampleField = () => {
    setExamples((prev) => [
      ...prev, 
      {input: "", output:"", explanation:""}
    ])
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant={"destructive"} className="px-2 font-[poppins]"> Add Que </Button>
      </DialogTrigger>

      <DialogContent className="pt-12 font-[poppins] ">
        <ScrollArea className="h-[65vh] pr-4">
          <div className="flex flex-col gap-4 justify-center">
            <Input
              placeholder="Provide Question name || Question-1"
              value={form.title}
              onChange={(e) => setForm({...form, title:e.target.value})}
            />

            <Textarea
              placeholder="Description of Problem"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            
            {/* To add multiple examples */}
            {examples.map((example, index) =>(
            <>
              <Textarea
                placeholder={`Example Input: ${index+1}`}
                value={example.input}
                onChange={(e) => {
                  const newExample = [...examples];
                  newExample[index].input = e.target.value;
                  setExamples(newExample);
                }}
              />
              <Textarea
                placeholder={`Example Ouput: ${index+1}`}
                value={example.output}
                onChange={(e) => {
                  const newExample = [...examples];
                  newExample[index].output = e.target.value;
                  setExamples(newExample);
                }}
              />
              <Textarea
                placeholder="Explanation (optional)"
                value={example.explanation}
                onChange={(e) => {
                  const newExample = [...examples];
                  newExample[index].explanation = e.target.value;
                  setExamples(newExample);
                }}
              />
            </>
            ))}

            {/* Add Another Example */}
            <Button 
              variant="ghost" 
              onClick={addNewExampleField}
              className="text-sm text-blue-600 flex items-center gap-1 mb-4"
            >
             <Plus size={16}/>  
            </Button>
         
            <Textarea
              placeholder="Constraints (newline separated- optional)"
              value={form.constraints}
              onChange={(e) => setForm({ ...form, constraints: e.target.value })}
            />

            <Button variant="outline" onClick={handleSubmit} > Submit </Button>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default AddQuestionBtn