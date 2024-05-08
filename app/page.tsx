"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
    Home
    <Link href={"/add-trade"}>
    <Button>
      Add-trade
    </Button>
    </Link>
    </>
    
  );
}
