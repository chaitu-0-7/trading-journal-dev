import { auth, signIn, signOut } from "@/app/auth";
import Link from "next/link";
import { Button } from "../ui/button";
import UserButton from "./UserMenu";

export default async function  NavBar() {
    const session = await auth()
    const user = session?.user;

    return(
      <header className="z-50 top-0 sticky px-4 w-full h-16 border-b shadow-sm bg-background/80 backdrop-blur-md flex items-center gap-2 print:hidden">
      <nav className="mx-auto md:px-10 px-4 py-4 flex h-14 w-full items-center justify-between gap-3">
        <Link href="/" className="text-2xl font-bold">
          Journal
        </Link>
        <div className="flex items-center space-x-5">
          {user && (
            <span className="mr-5">
              <AddTradeButton />
            </span>
          )}
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