"use client"

import { CODING_QUESTIONS, LanguageId, LANGUAGES, starterCodeMap } from "@/constants"
import { useEffect, useState } from "react"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AlertCircleIcon, BookIcon, LightbulbIcon } from "lucide-react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import Editor from "@monaco-editor/react";

const CodeEditor = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(CODING_QUESTIONS[0]);
  const [language, setLanguage] = useState<LanguageId>(LANGUAGES[0].id);
  const [code, setCode] = useState("");

  //update question  
  const handleQuestionChange = (questionId: string) => {
    const ques = CODING_QUESTIONS.find((que) => que.id === questionId)!;
    setSelectedQuestion(ques);
  }

  //update starter code code when language changes
  const handleLanguageChange = (newLanguage: LanguageId) => {
    setLanguage(newLanguage);
  }

  //update starter code with language change
  useEffect(() => {
    setCode(starterCodeMap[language]);
  }, [language]);

  return ( 
    <ResizablePanelGroup direction="vertical" className="min-h-[calc-100vh-4rem-1px]">
        
        {/* QUESTION SECTION */}
        <ResizablePanel defaultSize={60} minSize={15}  maxSize={80} >
           <ScrollArea className="h-full">
             
            {/* Header */}
            <div className="max-w-4xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Question Title */}
                <div className="space-y-1">
                  <h2 className="text-xl font-[poppins] tracking-tight font-semibold">{selectedQuestion.title}</h2> 
                </div>
                
                {/* Select question and Language */}
                <div className="flex items-center gap-3"> 
                  {/* Select Question */}
                  <Select value={selectedQuestion.id} onValueChange={handleQuestionChange}>
                    <SelectTrigger className="w-fit p-2 ">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      {CODING_QUESTIONS.map((que) => (
                        <SelectItem key={que.id} value={que.id}>
                          {que.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
               
                  {/* Select Language */}
                  <Select value={language} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue/>
                    </SelectTrigger>

                    <SelectContent>
                      {LANGUAGES.map((lang) => (
                        <SelectItem key={lang.id} value={lang.id}>
                          <div className="flex items-center justify-center gap-2 font-[poppins]">
                            <img src={`/${lang.id}.png`} alt={lang.name} className="size-5 object-contain"/>
                            {lang.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
            </div>

            {/* Question */}
            <div className="mx-2 mx-4xl space-y-3">
              {/* PROBLEM DESC. */}
              <Card>
                <CardHeader className="flex flex-row justc items-center gap-2 font-[poppins] font-medium pt-3">
                  <BookIcon className="size-5 text-primary/80"/>
                  <CardTitle>Problem Description</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p className="whitespace-pre-line">{selectedQuestion.description}</p>
                </CardContent>
              </Card>

              {/* PROBLEM EXAMPLES */}
              <Card>
                <CardHeader className="flex flex-row justc items-center gap-2 font-[poppins] font-medium pt-3">
                  <LightbulbIcon className="size-5"/>
                  <CardTitle>Examples</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="p-4 space-y-4">
                      {selectedQuestion.examples.map((example, index) => (
                        <div key={index} className="space-y-2">
                          <p className="font-medium font-[poppins] text-sm">Example {index+1}</p>
                          <ScrollArea className="h-full w-full rounded-md">
                            <pre className="whitespace-pre-wrap bg-muted/70 p-3 rounded-lg text-sm font-mono">
                              <div>Input: {example.input}</div>
                              <div>Output: {example.output}</div>
                              {example.explanation && (
                                <div className="pt-2 text-muted-foreground">
                                  Explanation: {example.explanation}
                                </div>
                              )}
                            </pre>
                          <ScrollBar orientation="horizontal" />
                          </ScrollArea>
                        </div>
                      ))}
                    </div>
                </CardContent>
              </Card>


              {/* CONSTRAINTS */}
              {selectedQuestion.constraints && (
                <Card>
                   <CardHeader className="flex flex-row justc items-center gap-2 font-[poppins] font-medium pt-3">
                    <AlertCircleIcon className="h-5 w-5 text-blue-500" />
                    <CardTitle>Constraints</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="p-3 rounded-lg bg-muted/70 list-disc list-inside text-sm">
                      {selectedQuestion.constraints.map((constraint, index) => (
                        <li key={index} className="font-mono">{constraint}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
           </div>

          <ScrollBar />
          </ScrollArea>
        </ResizablePanel>

        
        {/* Resizable handle */}
        <ResizableHandle withHandle/>


        {/* code Editor + output(side by side) */}
        <ResizablePanel>
          <ResizablePanelGroup direction="horizontal">
            {/* code part */}
            <ResizablePanel defaultSize={70} minSize={30}>
              <div className="h-full ">
                <Editor
                  height={"100%"}

                  defaultLanguage={language}
                  language={language}
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  options={{
                    minimap: { enabled:true },
                    fontSize: 16,
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 16, bottom: 16 },
                    wordWrap: "on",
                    wrappingIndent: "indent",
                  }}
                />
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Output part */}
            <ResizablePanel minSize={10}>
              Output part
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
       
    </ResizablePanelGroup>
  )
}

export default CodeEditor