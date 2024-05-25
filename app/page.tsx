/* eslint-disable @next/next/no-img-element */
import connectDB from "@/db/connect";
import { auth } from "./auth";
import { Trade } from "@/db/models";
import { DataTable } from "@/components/table/data-table";
import { openTradeColumns, hiddenColumns, closedTradeColumns } from "@/components/table/Columns";


export default async function Home() {
  const session = await auth()
  const user = session?.user
  let openTrades = []
  let closedTrades = []
  if(user){
    await connectDB()  
    openTrades = await Trade.find({
      user : user.id,
      status : "open"
    }).lean(true)
    
    closedTrades = await Trade.find({
      user : user.id,
      status : "closed"
    }).lean(true)
  }
  return (
    <>
    {user?<></>:<HomePage/>}
    {user?<>
      <OpenTradeTable openTrades={openTrades}/>
      <ClosedTradeTable closedTrades={closedTrades} />
    </>:<></>}  
    </>
  )
}

const OpenTradeTable = ({openTrades}:{openTrades:any}) =>{
  return(
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-medium p-4">Open Trades</h2>
      <DataTable columns={openTradeColumns} data={openTrades} hiddenColumns={hiddenColumns}/>
    </div>
  )
}

const ClosedTradeTable = ({closedTrades}:{closedTrades:any}) =>{
  return(
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-medium p-4">Closed Trades</h2>
      <DataTable columns={closedTradeColumns} data={closedTrades} hiddenColumns={hiddenColumns}/>
    </div>
  )
}



const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto">
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-10">Why Journal Your Trades?</h1>
      <img
        className="w-1/2 mx-auto mb-10"
        src="https://wallpapercave.com/wp/wp8172878.jpg"
        alt="Magnifying glass analyzing a stock chart"
      />
      <p className="text-lg text-gray-700 text-center px-10">
        The financial markets can be a complex and dynamic environment. Making
        informed trading decisions requires discipline, knowledge, and a clear
        understanding of your own behavior. Journaling your trades is a powerful
        tool that can help you achieve all three.
      </p>
      <div className="flex justify-center mt-10">
      <svg viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M810.666667 85.333333h42.666666v426.666667h-42.666666zM320 149.333333h42.666667v362.666667h-42.666667zM170.666667 576h42.666666v362.666667H170.666667zM597.333333 405.333333h42.666667v469.333334h-42.666667z" fill="#546E7A"></path><path d="M768 149.333333h128c23.466667 0 42.666667 19.2 42.666667 42.666667v213.333333c0 23.466667-19.2 42.666667-42.666667 42.666667h-128c-23.466667 0-42.666667-19.2-42.666667-42.666667V192c0-23.466667 19.2-42.666667 42.666667-42.666667zM277.333333 213.333333h128c23.466667 0 42.666667 19.2 42.666667 42.666667v149.333333c0 23.466667-19.2 42.666667-42.666667 42.666667h-128c-23.466667 0-42.666667-19.2-42.666666-42.666667v-149.333333c0-23.466667 19.2-42.666667 42.666666-42.666667z" fill="#4CAF50"></path><path d="M128 640h128c23.466667 0 42.666667 19.2 42.666667 42.666667v149.333333c0 23.466667-19.2 42.666667-42.666667 42.666667H128c-23.466667 0-42.666667-19.2-42.666667-42.666667v-149.333333c0-23.466667 19.2-42.666667 42.666667-42.666667zM554.666667 469.333333h128c23.466667 0 42.666667 19.2 42.666666 42.666667v256c0 23.466667-19.2 42.666667-42.666666 42.666667h-128c-23.466667 0-42.666667-19.2-42.666667-42.666667V512c0-23.466667 19.2-42.666667 42.666667-42.666667z" fill="#F44336"></path></g></svg>
        <p className="text-lg ml-2 font-bold">Benefits of Trade Journaling</p>
      </div>
    </div>
    <div className="min-h-screen flex flex-col items-center justify-center">
      <ul className="list-disc pl-6 text-lg">
        <li>
          Track Your Performance: Analyze your wins, losses, and overall trading
          effectiveness. Identify profitable strategies and areas for improvement.
        </li>
        <li>
          Develop Trading Discipline: Review your past decisions to understand
          your emotional state during trades. Use this awareness to make more
          rational choices in the future.
        </li>
        <li>
          Refine Your Trading Strategy: By analyzing past trades, you can refine
          your entry and exit points, risk management strategies, and overall
          trading approach.
        </li>
        <li>
          Identify Recurring Mistakes: Recognize patterns in your past errors
          and actively work on avoiding them in the future. Journaling helps
          you learn from your mistakes.
        </li>
        <li>
          Build Confidence: Consistent journaling builds confidence in your
          trading abilities. By tracking your progress and identifying
          improvements, you gain trust in your decision-making process.
        </li>
      </ul>
      <p>
        Journaling your trades is an ongoing process, not a one-time event.
        Developing a consistent habit of recording your trades will empower you
        to become a more disciplined and successful trader in the long run.
      </p>
    </div>
    </div>
  )
}

