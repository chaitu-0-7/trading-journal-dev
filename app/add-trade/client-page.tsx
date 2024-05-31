"use client";

import { useState, useEffect } from "react";
import { TradeInputForm } from "@/components/custom/TradeInputForm";
import { SkeletonForm } from "@/components/custom/loading/TradeInputLoading";
import { addTrade } from "@/lib/serverActions/addTradeActions";
import { useRouter } from 'next/navigation';
import { toast } from "sonner";

export default function TradeInputClient({ initialFormData, userConstants }: {initialFormData : any, userConstants : any}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [inputForm, setInputForm] = useState(initialFormData);

  useEffect(() => {
    const draftFromStorage = localStorage.getItem("draft");
    if (draftFromStorage !== null) {
      try {
        const draftObject = JSON.parse(draftFromStorage);
        setInputForm(draftObject);
        setLoading(false);
      } catch (error) {
        console.error("Error parsing draft from localStorage:", error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // await new Promise((resolve) => setTimeout(resolve, 120000));

    try {
      const result = await addTrade(inputForm);
      if (!result) {
        alert("Failed to add the trade, please try again.");
        return false
      } else {
        localStorage.setItem("old-draft", JSON.stringify(inputForm));
        localStorage.removeItem("draft");
        toast.success("Trade added succesfully")
        router.push("/");
        return true
      }
    } catch (error) {
      toast.error("Trade has not been created")
      console.error('Error adding trade:', error);
      return false
    }
  };

  return (
    <>
      {loading ? (
        <SkeletonForm />
      ) : (
        <TradeInputForm
          formData={inputForm}
          setFormData={setInputForm}
          onSubmit={onSubmit}
          userConstants={userConstants}
        />
      )}
    </>
  );
}
