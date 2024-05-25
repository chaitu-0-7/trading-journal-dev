/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useState, useEffect } from "react";
import { TradeInputForm } from "@/components/custom/TradeInputForm";
import { SkeletonForm } from "@/components/custom/loading/TradeInputLoading";
import { addTrade } from "@/lib/serverActions/addTradeActions";
import { useRouter } from 'next/navigation';
// import { useSession } from "next-auth/react";
// import { ErrorPage } from "@/components/pages/errorPage";

export default function Home() {
  // const session = useSession()
  // const user = session.data?.user
  // console.log("user :", user)
  // if(!user){
  //   console.log("not able to get the user")
  // }
  const router = useRouter()
  const [loading, setLoading] = useState(true);
  const [inputForm, setInputForm] = useState({
    type: "",
    date: "",
    instrument: "",
    setup: "",
    averageEntryPrice: "",
    stopLossPrice: "",
    targetPrice: "",
    averageExitPrice: "",
    noOfLots: "",
    quantityPerLot: "",
    goodBadTrade: "",
    status : "open",
    exitReason : ""
  });

  useEffect(() => {
    const draftFromStorage = localStorage.getItem("draft");
    if (draftFromStorage !== null) {
      try {
        const draftObject = JSON.parse(draftFromStorage);
        setInputForm(draftObject);
        setLoading(false);
        // Use the parsed draftObject
      } catch (error) {
        console.error("Error parsing draft from localStorage:", error);
        // Handle parsing error (optional)
      }
    } else {
      // No draft data found in localStorage, handle the case (optional)
      console.log("No draft found");
      setLoading(false)
    }
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(inputForm.averageExitPrice.trim() === ""){
      console.log('Trade Open')
    }

    try {
      const result = await addTrade(inputForm); // Assuming addTrade is an async function
      if(!result){
        alert("Failed to add the trade please try again.")
      }
      else{
        // Success: Redirect using Next.js router
      localStorage.setItem("old-draft", JSON.stringify(inputForm));
      localStorage.removeItem("draft");
      router.push("/")
      }
    } catch (error) {
      console.error('Error adding trade:', error);
      // Handle errors appropriately (e.g., display an error message)
    }
  };

  return (
    <>
      {loading ? (
        <>
          <SkeletonForm />
        </>
      ) : (
        <TradeInputForm
          formData={inputForm}
          setFormData={setInputForm}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
}
