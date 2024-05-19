import { auth, signIn, signOut } from "@/app/auth";
import Link from "next/link";
import { Button } from "../ui/button";
import UserButton from "./UserMenu";

export default async function  NavBar() {
    const session = await auth()
    const user = session?.user;

    return(
      <header className="sticky top-0 bg-background">
      <nav className="mx-auto md:px-10 px-4 py-4 flex h-14 w-full items-center justify-between gap-3 border-b border-gray-200">  
      <Link href="/" className="font-bold">
          Journal
        </Link>
        <div className="flex">
          <span className="mr-5">
          {user?<AddTradeButton/>:<></>}
          </span>
          <span>
          {user ? <UserButton user={user} /> : <SignInButton />}
          </span>
        
        </div>
      </nav>
    </header>
    
    )
    
}

function AddTradeButton(){
  return(
    <Link href={"/add-trade"}>
    <Button>
      Add-trade
    </Button>
    </Link>
  )
}

function SignInButton() {
    return (
      <form
        action={async () => {
          "use server";
          await signIn();
        }}
      >
        <Button type="submit">Sign in</Button>
      </form>
    );
  }
