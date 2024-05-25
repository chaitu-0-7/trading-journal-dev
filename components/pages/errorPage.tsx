import Link from "next/link";
import { Button } from "../ui/button";

export const ErrorPage = ({ message }:{message: string}) => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-4">Oops! Something went wrong.</h1>
        <p className="text-xl text-center mb-6">{message || 'We encountered an error. Please try again later.'}</p>
        <Link href={"/"}>
        <Button>Return to Home</Button>
        </Link>
      </div>
    );
  };