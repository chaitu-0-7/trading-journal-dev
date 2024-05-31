"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./TableUtils";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation';
import { deleteTrade } from "@/lib/serverActions/addTradeActions";

export type openTrade = {
  longShort: string;
  tradeDate: Date;
  instrument: string;
  setup: string;
  entryAvg: number;
  stopLoss: number;
  target: number;
  goodBad: string;
};
export const hiddenColumns = ["entryAvg", "stopLoss", "target", "_id"];
export type closedTrade = {
  longShort: string;
  tradeDate: Date;
  instrument: string;
  setup: string;
  entryAvg: number;
  stopLoss: number;
  target: number;
  goodBad: string;
  net: number;
  exitReason: string;
};

const ActionsDropdown = ({ row }: { row: Row<openTrade> }) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            const id = row.getValue("_id");
            router.push(`/edit-trade/${id}`);
          }}
        >
          <Pencil1Icon className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={async () => {
          if(confirm("Do you want to delete the trade ?")){
            const id:string = row.getValue("_id");
            await deleteTrade({_id : id})
            router.refresh()
          }
          
          

        }}>
          <TrashIcon className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const capitalizeWords = (text: string) => {
  return text.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};
function calculateRiskAndReward(row: Row<openTrade>) {
  const entry = parseFloat(row.getValue("entryAvg"));
  const stopLoss = parseFloat(row.getValue("stopLoss"));
  const target = parseFloat(row.getValue("target"));
  const longShort = row.getValue("longShort");

  let risk = 0;
  let reward = 0;

  if (longShort === "long") {
    risk = entry - stopLoss;
    reward = target - entry;
  } else {
    risk = stopLoss - entry;
    reward = entry - target;
  }

  return (reward / risk).toFixed(2);
}

export const openTradeColumns: ColumnDef<openTrade>[] = [
  {
    accessorKey: "instrument",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Instrument" />
    ),
    cell: ({ row }) => {
      const instrument: string = row.getValue("instrument");
      return <div className="w-24 max-h-12 flex justify-center items-center">{capitalizeWords(instrument)}</div>;
    },
  },
  {
    accessorKey: "setup",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Setup" />
    ),
    cell: ({ row }) => {
      const setup: string = row.getValue("setup");
      return <div className="w-24 max-h-12 flex justify-center items-center">{capitalizeWords(setup)}</div>;
    },
  },
  {
    accessorKey: "tradeDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const dateObj: string = row.getValue("tradeDate");

      const formattedDate = format(dateObj, "dd-MM-yyyy ");

      return <div className="w-24 max-h-12 flex justify-center items-center">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "riskReward",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Risk/Reward" />
    ),
    cell: ({ row }) => {
      return <div className="w-24 max-h-12 flex justify-center items-center">{calculateRiskAndReward(row)}</div>;
    },
  },
  {
    accessorKey: "longShort",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Long/Short" />
    ),
    cell: ({ row }) => {
      const longShort: string = row.getValue("longShort");
      return <div className="w-24 max-h-12 flex justify-center items-center">{capitalizeWords(longShort)}</div>;
    },
  },
  {
    accessorKey: "entryAvg",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Avg Entry" />
    ),
  },
  {
    accessorKey: "goodBad",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Good or Bad Trade" />
    ),
    cell: ({ row }) => {
      return <div className="w-24 max-h-12 flex justify-center items-center">{capitalizeWords(row.getValue("goodBad"))}</div>;
    },
  },
  {
    accessorKey: "stopLoss",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="StopLoss" />
    ),
  },
  {
    accessorKey: "target",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Target" />
    ),
  },
  {
    accessorKey: "_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;
      return <ActionsDropdown row={row}/>;
    },
  },
];

export const closedTradeColumns: ColumnDef<closedTrade>[] =  [
  {
    accessorKey: "instrument",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Instrument" />
    ),
    cell: ({ row }) => {
      const instrument: string = row.getValue("instrument");
      return <div className="w-24 max-h-12 flex justify-center items-center">{capitalizeWords(instrument)}</div>;
    },
  },
  {
    accessorKey: "setup",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Setup" />
    ),
    cell: ({ row }) => {
      const setup: string = row.getValue("setup");
      return <div className="w-24 max-h-12 flex justify-center items-center">{capitalizeWords(setup)}</div>;
    },
  },
  {
    accessorKey: "tradeDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const dateObj: string = row.getValue("tradeDate");

      const formattedDate = format(dateObj, "dd-MM-yyyy ");

      return <div className="w-24 max-h-12 flex justify-center items-center">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "riskReward",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Risk/Reward" />
    ),
    cell: ({ row }) => {
      return <div className="w-24 max-h-12 flex justify-center items-center">{calculateRiskAndReward(row)}</div>;
    },
  },
  {
    accessorKey: "longShort",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Long/Short" />
    ),
    cell: ({ row }) => {
      const longShort: string = row.getValue("longShort");
      return <div className="w-24 max-h-12 flex justify-center items-center">{capitalizeWords(longShort)}</div>;
    },
  },
  {
    accessorKey: "entryAvg",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Avg Entry" />
    ),
  },
  {
    accessorKey: "goodBad",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Good or Bad Trade" />
    ),
    cell: ({ row }) => {
      return <div className="w-24 max-h-12 flex justify-center items-center">{capitalizeWords(row.getValue("goodBad"))}</div>;
    },
  },
  {
    accessorKey: "stopLoss",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="StopLoss" />
    ),
  },
  {
    accessorKey: "net",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Profit/Loss" />
    ),
    cell: ({ row }) => {
      const netValue :number = row.getValue("net");
      const backgroundClass = netValue > 0
      ? "bg-emerald-400 dark:bg-emerald-500" // Positive (brighter green, darker teal)
      : "bg-red-500 dark:bg-red-600"; 

    return (
      <div
        className={`w-24 max-h-12 rounded-md shadow-md flex justify-center items-center ${backgroundClass}`}
      >
        {netValue}
      </div>
    );
  },
  },
  {
    accessorKey: "exitReason",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Exit Reason" />
    ),
  },
  {
    accessorKey: "target",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Target" />
    ),
  },
  {
    accessorKey: "_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;
      return <ActionsDropdown row={row}/>;
    },
  },
];