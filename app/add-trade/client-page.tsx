"use client";

import { useState, useEffect } from "react";
import { TradeInputForm } from "@/components/custom/TradeInputForm";
import { SkeletonForm } from "@/components/custom/loading/TradeInputLoading";
import { addTrade } from "@/lib/serverActions/addTradeActions";
import { useRouter } from 'next/navigation';

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

  const onSubmit = async (e : any) => {
    e.preventDefault();
    if (inputForm.averageExitPrice.trim() === "") {
      console.log('Trade Open');
    }

    try {
      const result = await addTrade(inputForm);
      if (!result) {
        alert("Failed to add the trade, please try again.");
      } else {
        localStorage.setItem("old-draft", JSON.stringify(inputForm));
        localStorage.removeItem("draft");
        router.push("/");
      }
    } catch (error) {
      console.error('Error adding trade:', error);
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
