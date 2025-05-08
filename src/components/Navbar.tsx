import Link from "next/link";
import { ModeToggle } from "./ModeToggle"
import { SignedIn, UserButton } from "@clerk/nextjs"
import DashboardBtn from "./DashboardBtn";

function Navbar() {
  return (
    <nav className="border-b">
        <div className="flex h-16 items-center px-4 mx-auto">
          {/* logo */}
          <Link href="/" className="mr-6 hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="logo-icon" className="w-28 h-28"/>
          </Link>

          {/* right side */}
          <SignedIn>
            <div className="flex items-center space-x-4 ml-auto">
              {/*dashboard btn and ModeToggle is created separately as comp coz it should be client comp(coz its using hooks) */}
              <DashboardBtn/>
              <ModeToggle/> 
              {/*UserButton is clerk provided*/}
              <UserButton/>
            </div>
          </SignedIn>
        </div>
    </nav>
  )
}

export default Navbar