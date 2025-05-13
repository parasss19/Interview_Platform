import type { Metadata } from "next";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "./globals.css";
import ConvexClerkProvider from "@/components/providers/ConvexClerkProvider";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import LandingPage from "@/components/LandingPage";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Interview Platform",
  description: "Interview Platform web application"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider 
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen">
              <Navbar/>
              
              {/* Show home page if signed in */}
              <SignedIn>
               <main className="px-4 sm:px-6 lg:px-8">{children}</main>
              </SignedIn>

              {/* Show landing page if signed out */}
              <SignedOut>
                <LandingPage />
              </SignedOut>
              
            </div>
          </ThemeProvider>
          <Toaster/>
        </body>
      </html>
    </ConvexClerkProvider>
  );
}
