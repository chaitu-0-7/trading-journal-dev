"use client"
import { TradeInputForm } from "@/components/custom/TradeInputForm";
import { editTrade } from "@/lib/serverActions/addTradeActions";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

const EditClientComp = ({data}:{data : any }) => {
    const router = useRouter()
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          const result = await editTrade({data: inputForm, _id: data._id}); // Assuming addTrade is an async function
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
    <div><TradeInputForm formData={inputForm} setFormData={setInputForm} onSubmit={onSubmit} /></div>
  )
}

export default EditClientComp