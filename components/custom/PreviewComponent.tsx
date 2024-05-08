"use client";


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
    exitReason: string;
  }

export default function PreviewComponent({inputData}:{inputData:inputData}) {

  const calculateProfitLoss = (data : inputData) => {
    const parsedEntryPrice = parseFloat(data.averageEntryPrice);
    const parsedExitPrice = parseFloat(data.averageExitPrice);
    const parsedNoOfLots = parseFloat(data.noOfLots);
    const parsedQuantityPerLot = parseFloat(data.quantityPerLot);
    const parsedStopLoss = parseFloat(data.stopLossPrice);
    const parsedTarget = parseFloat(data.targetPrice);


    const quantity = parsedNoOfLots * parsedQuantityPerLot;

    let profitLoss = 0;
    let risk = 0;
    let reward = 0;
    if (data.type === "long") {
      profitLoss = (parsedExitPrice - parsedEntryPrice) * quantity;
      risk = (parsedEntryPrice - parsedStopLoss) * quantity;
      reward = (parsedTarget - parsedEntryPrice) * quantity;
    } else if (data.type === "short") {
      profitLoss = (parsedEntryPrice - parsedExitPrice) * quantity;
      risk = (parsedStopLoss - parsedEntryPrice) * quantity;
      reward = (parsedEntryPrice - parsedTarget) * quantity;
    }

    console.log()

    return {
      profitLoss: profitLoss.toFixed(2),
      risk: risk.toFixed(2),
      reward: reward.toFixed(2),
      riskRewardRatio: (reward / risk).toFixed(2),
    };
  };

  const renderValue = (value:Number, label:String) => {
    let bgColor = "";
  if (label === "Profit") {
    bgColor = "text-slate-50 bg-green-600 rounded-md shadow-md";
  } else if (label === "Loss") {
    bgColor = "text-slate-50 bg-red-600 rounded-md shadow-md";
  } else {
    bgColor = "text-black"; // Default background color
  }

  return (
    <p
      className={`${bgColor} font-medium text-sm m-0 flex flex-col justify-center items-center h-full w-full`}
    >
      {`${label}: ${value}`}
    </p>


    );
  };

  const { profitLoss, risk, reward, riskRewardRatio } = calculateProfitLoss(inputData);
  const conditionalClasses = "";
  const classNameElements = "h-52 w-52 bg-white shadow-md rounded-lg p-4 flex flex-col justify-between m-2";
  const dateObject = new Date(inputData.date)

  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 justify-items-center gap-4 ">
      <div className={classNameElements}>
        <div className="text-base font-bold mb-1">
          {inputData.type.charAt(0).toUpperCase() + inputData.type.slice(1)} 
          <span className="text-sm font-medium"> trade on </span> 
          <p className="text-sm">{dateObject.toDateString()}</p>
        </div>
        <div className="flex flex-col space-y-1 text-sm">
          <div className="flex flex-row space-x-2">
            <p className="text-gray-500 font-medium">Instrument:</p>
            <p className="font-bold">{inputData?.instrument?.toUpperCase()}</p>
          </div>
          <div className="flex flex-row space-x-2">
            <p className="text-gray-500 font-medium">Setup:</p>
            <p className="font-bold">{inputData?.setup?.charAt(0).toUpperCase() + inputData?.setup?.slice(1)}</p>
          </div>
          <div className="flex flex-row space-x-2 text-xs">
            <p className="font-medium">{inputData?.goodBadTrade?.charAt(0).toUpperCase() + inputData?.goodBadTrade?.slice(1)} trade</p>
          </div>
          {inputData.exitReason!="" && <div className="flex flex-row space-x-2 text-xs">
            <p className="font-medium">Exit Reason: {inputData?.exitReason?.charAt(0).toUpperCase() + inputData?.exitReason?.slice(1)}</p>
          </div>}
          <div className="flex flex-row space-x-2 text-xs">
            <p className="text-gray-500">Lots:</p>
            <p className="font-medium">{inputData?.noOfLots}</p>
          </div>
          <div className="flex flex-row space-x-2 text-xs">
            <p className="text-gray-500">Quantity Per Lot:</p>
            <p className="font-medium">{inputData?.quantityPerLot}</p>
          </div>
        </div>
      </div>
      <div className={classNameElements}>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-orange-200 shadow-md rounded-md flex flex-col justify-center items-center h-20 w-20">
            <p className="text-sm font-medium mb-2">Entry</p>
            <p className="text-sm font-bold">{inputData.averageEntryPrice}</p>
          </div>
          <div className="bg-blue-200 shadow-md rounded-md flex flex-col justify-center items-center h-20 w-20">
            <p className="text-sm font-medium mb-2">Exit</p>
            <p className="text-sm font-bold">{inputData.averageExitPrice}</p>
          </div>
          <div className="bg-red-400 shadow-md rounded-md flex flex-col justify-center items-center h-20 w-20">
            <p className="text-sm font-medium mb-2">Stoploss</p>
            <p className="text-sm font-bold">{inputData.stopLossPrice}</p>
          </div>
          <div className="bg-green-200 shadow-md rounded-md flex flex-col justify-center items-center h-20 w-20">
            <p className="text-sm font-medium mb-2">Target</p>
            <p className="text-sm font-bold">{inputData.targetPrice}</p>
          </div>
        </div>
      </div>
      <div className={classNameElements}>
        <div className={`${conditionalClasses} rounded-lg p-2 flex flex-col justify-center items-center h-full w-full`}>
          {profitLoss === "NaN" ? <p className={`bg-sky-200 rounded-md shadow-md font-medium text-sm m-0 flex flex-col justify-center items-center h-full w-full`}>{`Trade Open`}</p>
          :renderValue(Number(profitLoss), Number(profitLoss) > 0 ? 'Profit' : 'Loss')}
          {/* {renderValue(Number(profitLoss), Number(profitLoss) > 0 ? 'Profit' : 'Loss')} */}
          {renderValue(Number(risk), 'Risk')}
          {renderValue(Number(reward), 'Reward')}
          {renderValue(Number(riskRewardRatio), 'Risk/Reward Ratio')}
        </div>
      </div>
    </div>
  );
}
