import connectDB from "@/db/connect";
import { auth } from "./auth";
import { Trade } from "@/db/models";


export default async function Home() {
  const session = await auth()
  const user = session?.user
  let trades = []
  if(user){
    await connectDB()  
    trades = await Trade.find({
      user : user.id
    })
    console.log(trades)
  }
  return (
    <>
    {user ? <TradesTable trades={trades}/> : <></>}
    </>
  )
}



const TradeRow = ({ trade }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'text-yellow-500 bg-yellow-100';
      case 'closed':
        return trade.profitLoss > 0 ? 'text-green-500 bg-green-100' : 'text-red-500 bg-red-100';
      default:
        return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <tr className={`text-left border-b border-gray-200 hover:bg-gray-50 ${getStatusColor(trade.status)}`}>
      <td className="px-4 py-2 font-medium">{trade.instrument}</td>
      <td className="px-4 py-2">{trade.longShort.toUpperCase()}</td>
      <td className="px-4 py-2 text-center">{trade.entryAvg}</td>
      {trade.exitAvg && (
        <td className="px-4 py-2 text-center">{trade.exitAvg}</td>
      )}
      <td className="px-4 py-2 text-center">{trade.lots}</td>
      <td className="px-4 py-2 text-center">{trade.status}</td>
      {trade.profitLoss !== null && (
        <td className={`px-4 py-2 text-center ${trade.profitLoss > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trade.net}
        </td>
      )}
    </tr>
  );
};

const TradesTable = ({ trades }) => {
  return (
    <div className="rounded shadow overflow-x-scroll mx-auto">
      <table className="min-w-full w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-200 text-left font-medium">
            <th className="px-4 py-2">Instrument</th>
            <th className="px-4 py-2">Long/Short</th>
            <th className="px-4 py-2">Entry Avg</th>
            <th className="px-4 py-2">Exit Avg</th>
            <th className="px-4 py-2">Lots</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">P/L</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            <TradeRow key={trade._id} trade={trade} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

