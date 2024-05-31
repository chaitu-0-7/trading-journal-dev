"use client"
import { TradeInputForm } from "@/components/custom/TradeInputForm";
import { editTrade } from "@/lib/serverActions/addTradeActions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface inputData {
    type: string;
    date: any;
    instrument: string;
    setup: string;
    averageEntryPrice: string;
    stopLossPrice: string;
    targetPrice: string;
    averageExitPrice: string;
    noOfLots: string;
    quantityPerLot: string;
    goodBadTrade: string;
    status: string;
    exitReason: string;
  }

const EditClientComp = ({data, userConstants}:{data : any, userConstants : any }) => {
    const router = useRouter()
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          const result = await editTrade({data: inputForm, _id: data._id}); // Assuming addTrade is an async function
          if(!result){
            alert("Failed to add the trade please try again.")
            toast.error("Failed to update the trade")
            return false
          }
          else{
            // Success: Redirect using Next.js router
          localStorage.setItem("old-draft", JSON.stringify(inputForm));
          localStorage.removeItem("draft");
          toast.success("Updated the trade")
          router.push("/")
          return true
          }
        } catch (error) {
          console.error('Error adding trade:', error);
          toast.error("Failed to update the trade")
          return false
          // Handle errors appropriately (e.g., display an error message)
        }
      };
    const myObject = {
        type: data?.longShort, // Add missing properties with appropriate types
        date: data?.tradeDate, // Assuming you have a date string
        instrument: data?.instrument,
        setup: data?.setup,
        averageEntryPrice: data?.entryAvg,
        stopLossPrice: data?.stopLoss,
        targetPrice: data?.target,
        averageExitPrice: data?.exitAvg, // Set values for all properties
        noOfLots: data?.lots,
        quantityPerLot: data?.lotSize,
        goodBadTrade: data?.goodBad,
        status: data?.status,
        exitReason: data?.exitReason,
      };
    const [inputForm, setInputForm] = useState(myObject);
  return (
    <div><TradeInputForm formData={inputForm} setFormData={setInputForm} onSubmit={onSubmit} userConstants={userConstants}/></div>
  )
}

export default EditClientComp