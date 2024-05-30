import TradeInputClient from "@/app/add-trade/client-page"
import { getUserConstants } from "@/lib/serverActions/addTradeActions";

export default async function Home() {
  const userConstants = await getUserConstants();

  const initialFormData = {
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
    status: "open",
    exitReason: ""
  };

  return (
    <TradeInputClient
      initialFormData={initialFormData}
      userConstants={userConstants}
    />
  );
}
