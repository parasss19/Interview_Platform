import { Clock, Code2, Calendar, Users } from "lucide-react";

export const INTERVIEW_CATEGORY = [
  { id: "upcoming", title: "Upcoming Interviews", variant: "outline" },
  { id: "completed", title: "Completed", variant: "secondary" },
  { id: "succeeded", title: "Succeeded", variant: "default" },
  { id: "failed", title: "Failed", variant: "destructive" },
] as const;

export const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

export const QUICK_ACTIONS = [
  {
    icon: Code2,
    title: "New Call",
    description: "Start an instant call",
    color: "primary",
    gradient: "from-primary/10 via-primary/5 to-transparent",
  },
  {
    icon: Users,
    title: "Join Interview",
    description: "Enter via invitation link",
    color: "purple-500",
    gradient: "from-purple-500/10 via-purple-500/5 to-transparent",
  },
  {
    icon: Calendar,
    title: "Schedule",
    description: "Plan upcoming interviews",
    color: "blue-500",
    gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
  },
  {
    icon: Clock,
    title: "Recordings",
    description: "Access past interviews",
    color: "orange-500",
    gradient: "from-orange-500/10 via-orange-500/5 to-transparent",
  },
];

export type QuickActionType = (typeof QUICK_ACTIONS)[number];

//explain above line
//1 (typeof QUICK_ACTIONS)
// This type looks like:
// {
//   icon: LucideIcon;
//   title: string;
//   description: string;
//   color: string;
//   gradient: string;
// }[]
//2 [number]
// Extracts the type of an individual item in that array.It’s the same as doing:
// QUICK_ACTIONS[0]


export interface CodeQuestion {
  title: string;
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints?: string[];
}

//testing que render on intial render
export const CODING_QUESTIONS: CodeQuestion[] = [
  {
    title: "Test Question",
    description:
      "Question will be provided shortly",
    examples: [
      {
        input: "Test input",
        output: "Test output",
        explanation: "Test",
      },
      {
        input: "Test input",
        output: "Test output",
        explanation: "Test",
      },  
    ],
    constraints: [
      "constraint 1",
      "constraint 2",
      "constraint 3",
      "constraint 4",
    ],
  },
];

export const LANGUAGES = [
  { id: "cpp", name: "C++", icon: "/Cpp.png" },
  { id: "javascript", name: "JavaScript", icon: "/JavaScript.png" },
  { id: "python", name: "Python", icon: "/Python.png" },
  { id: "java", name: "Java", icon: "/Java.png" },
] as const;

export type LanguageId = "cpp" | "javascript" | "python" | "java";

export const starterCodeMap: Record<LanguageId, string> = {
  javascript: `// write your JavaScript code here`,
  python: `# write your Python code here`,
  cpp: `// write your C++ code here`,
  java: `// write your Java code here`,
};