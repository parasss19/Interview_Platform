import StreamClientProvider from "@/components/providers/StreamClientProvider"
import { ReactNode } from "react"

function layout ({children} : {children: ReactNode}) {
  return (
    <StreamClientProvider>
        {children}
    </StreamClientProvider>
  )
}
export default layout;

//why app/(root)/layout.tsx
// Centralized logic: The Stream client setup only happens once.
// Code reuse: You don't have to wrap every page individually.
// Consistency: Every page inside this layout will have the same streaming context.

// What app/(root)/layout.tsx Does
// It takes in children — the content of the route being rendered (e.g., page.tsx in /home, /recording, schedule, meetings).
// It wraps those children inside <StreamClientProvider>, which:
//   -Initializes a Stream Video client with "user data" and "token".
//   -Shows a loader until the client is ready.
//   -Provides the Stream context (via <StreamVideo>) to all child components/pages.