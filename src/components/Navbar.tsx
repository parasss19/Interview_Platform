import Link from "next/link";
import { ModeToggle } from "./ModeToggle"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import DashboardBtn from "./DashboardBtn";
import { Button } from "./ui/button";

function Navbar() {
  return (
    <nav className="border-b">
        <div className="flex h-16 items-center px-4 mx-auto">
          {/* logo */}
          <Link href="/" className="mr-6 hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="logo-icon" className="w-28 "/>
          </Link>

          {/* right side */}

          {/* Signed in user */}
          <SignedIn>
            <div className="flex items-center space-x-4 ml-auto">
              {/*dashboard btn and ModeToggle is created separately as comp coz it should be client comp(coz its using hooks) */}
              <DashboardBtn/>
              <ModeToggle/> 
              {/*UserButton is clerk provided*/}
              <UserButton/>
            </div>
          </SignedIn>

          {/* Not Signed in user */}
          <SignedOut>
            <div className="flex items-center space-x-4 ml-auto font-[poppins]">
              <SignUpButton mode="modal">
                <Button variant="ghost" className="bg-green-500 hover:bg-green-400 font-semibold">Signup</Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button variant="ghost" className="border border-slate-400 hover:border-red-500 font-semibold">SignIn</Button>
              </SignInButton>
              <ModeToggle />
            </div>
          </SignedOut>

        </div>
    </nav>
  )
}

export default Navbar