"use server";
import { auth } from "@/app/auth";
import connectDB from "@/db/connect";
import { Instruments, Setups, Trade } from "@/db/models";
import { roundToNearest } from "../commonFunctions";

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

export async function getInstruments() {
  await connectDB();

  const instruments = await Instruments.findOne();
  console.log(instruments);
  // return instruments
  return [];
}

export async function getUserConstants() {
  await connectDB();
  const instruments = await Instruments.find();
  const setups = await Setups.find();
  let instrumentsExist = true;
  let setupsExist = true;
  if (instruments.length === 0) {
    console.log("Instruments length ");
    instrumentsExist = false;
  }
  if (setups.length === 0) {
    console.log("Setups length ");
    setupsExist = false;
  }

  return {
    instruments: instrumentsExist ? instruments[0].instruments : [],
    setups: setupsExist ? setups[0].setups : [],
  };
}

export async function addInstrument(instrument: string) {
  try {
    // Check if any instruments exist

    await connectDB();
    const existingInstruments = await Instruments.findOne();

    if (existingInstruments) {
      // Update existing instruments array
      existingInstruments.instruments.push(instrument);

      // Save the updated document
      const updatedDocument = await existingInstruments.save();
      console.log(
        "Instruments updated successfully:",
        updatedDocument.instruments
      );
      return updatedDocument.instruments;
    } else {
      // Create a new document if there are no existing instruments
      const newInstrument = new Instruments({ instruments: [instrument] });
      const savedInstrument = await newInstrument.save();
      console.log(
        "Instruments added successfully:",
        savedInstrument.instruments
      );
      return savedInstrument.instruments;
    }
  } catch (error) {
    console.error("Error adding or updating instrument:", error);
    return false;
  }
}

export async function addTradeSetup(setup: string) {
  try {
    // Check if any trade setups exist
    await connectDB();
    const existingSetups = await Setups.findOne();

    if (existingSetups) {
      // Update existing setups array
      existingSetups.setups.push(setup);

      // Save the updated document
      const updatedDocument = await existingSetups.save();
      console.log("Trade Setups updated successfully:", updatedDocument.setups);
      return updatedDocument.setups;
    } else {
      // Create a new document if there are no existing trade setups
      const newSetup = new Setups({ setups: [setup] });
      const savedSetup = await newSetup.save();
      console.log("Trade Setups added successfully:", savedSetup.setups);
      return savedSetup.setups;
    }
  } catch (error) {
    console.error("Error adding or updating trade setup:", error);
    return false;
  }
}

export async function addTrade(data: inputData) {
  // console.log(props)
  // const data = props.data
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return false;
  }
  try {
    console.log(data);
    let status = "closed";
    let net = 0;
    let profitLoss = "profit";

    if (data.averageExitPrice == "" || data.averageExitPrice === null) {
      status = "open";
    } else {
      const parsedEntryPrice = parseFloat(data.averageEntryPrice);
      const parsedExitPrice = parseFloat(data.averageExitPrice);
      const parsedNoOfLots = parseInt(data.noOfLots); // Use parseInt for integers
      const parsedQuantityPerLot = parseFloat(data.quantityPerLot);

      const quantity = parsedNoOfLots * parsedQuantityPerLot;

      if (data.type === "long") {
        net = (parsedExitPrice - parsedEntryPrice) * quantity;
      } else if (data.type === "short") {
        net = (parsedEntryPrice - parsedExitPrice) * quantity;
      } else {
        throw new Error('Invalid trade type. Must be "long" or "short".');
      }
      if (net <= 0) {
        profitLoss = "loss";
      }
    }
    // const dataForDb = {
    //   longShort: data.type,
    //   profitLoss: status === "closed" ? profitLoss : null,
    //   net ,
    //   user: user?.id, // Replace with actual user logic
    //   tradeDate: data.date, // Assuming date is in a parseable format
    //   instrument: data.instrument,
    //   setup: data.setup,
    //   stopLoss: parseFloat(data.stopLossPrice) || null, // Handle potential empty string
    //   target: parseFloat(data.targetPrice) || null, // Handle potential empty string
    //   entryAvg: parseFloat(data.averageEntryPrice),
    //   exitAvg: parseFloat(data.averageExitPrice) || null, // Handle potential empty string
    //   lots: parseInt(data.noOfLots),
    //   lotSize: parseFloat(data.quantityPerLot) || null, // Handle potential empty string
    //   status: status, // Replace with logic to determine status (e.g., "open", "closed")
    //   goodBad: data.goodBadTrade, // Assuming "goodBadTrade" maps to "good" or "bad"
    //   tags: [], // Initialize as an empty array if no tags are provided
    //   createdAt: new Date(), // Assuming you want to use moment.js for current timestamp
    //   exitReason: status === "closed" ? data.exitReason : "",
    // };
    const dataForDb = {
      longShort: data.type,
      profitLoss: status === "closed" ? profitLoss : null,
      net: roundToNearest(net, 2), // Round net to nearest 2 digits
      user: user?.id, // Replace with actual user logic
      tradeDate: data.date, // Assuming date is in a parseable format
      instrument: data.instrument,
      setup: data.setup,
      stopLoss: roundToNearest(parseFloat(data.stopLossPrice) || null, 3),
      target: roundToNearest(parseFloat(data.targetPrice) || null, 3),
      entryAvg: roundToNearest(parseFloat(data.averageEntryPrice) || null, 3),
      exitAvg: roundToNearest(parseFloat(data.averageExitPrice) || null, 3),
      lots: parseInt(data.noOfLots),
      lotSize: parseFloat(data.quantityPerLot),
      status: status, // Replace with logic to determine status (e.g., "open", "closed")
      goodBad: data.goodBadTrade, // Assuming "goodBadTrade" maps to "good" or "bad"
      tags: [], // Initialize as an empty array if no tags are provided
      createdAt: new Date(), // Assuming you want to use moment.js for current timestamp
      exitReason: status === "closed" ? data.exitReason : "",
    };

    console.log(dataForDb);

    await connectDB();
    const newTrade = new Trade(dataForDb);
    console.log(newTrade);
    await newTrade.save();
    return true;
    console.log("Data inserted successfully!");
  } catch (error) {
    console.error("Error inserting data:", error);
    return false;
  }
}

export async function editTrade({
  data,
  _id,
}: {
  data: inputData;
  _id: string;
}) {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user) {
      return false;
    }
    console.log(data);
    let status = "closed";
    let net = 0;
    let profitLoss = "profit";

    if (data.averageExitPrice === "" || data.averageExitPrice === null) {
      status = "open";
    } else {
      const parsedEntryPrice = parseFloat(data.averageEntryPrice);
      const parsedExitPrice = parseFloat(data.averageExitPrice);
      const parsedNoOfLots = parseInt(data.noOfLots); // Use parseInt for integers
      const parsedQuantityPerLot = parseFloat(data.quantityPerLot);

      const quantity = parsedNoOfLots * parsedQuantityPerLot;

      if (data.type === "long") {
        net = (parsedExitPrice - parsedEntryPrice) * quantity;
      } else if (data.type === "short") {
        net = (parsedEntryPrice - parsedExitPrice) * quantity;
      } else {
        throw new Error('Invalid trade type. Must be "long" or "short".');
      }
      if (net <= 0) {
        profitLoss = "loss";
      }
    }
    // const dataForDb = {
    //   longShort: data.type,
    //   profitLoss: status === "closed" ? profitLoss : null,
    //   net,
    //   user: user?.id, // Replace with actual user logic
    //   tradeDate: data.date, // Assuming date is in a parseable format
    //   instrument: data.instrument,
    //   setup: data.setup,
    //   stopLoss: parseFloat(data.stopLossPrice) || null, // Handle potential empty string
    //   target: parseFloat(data.targetPrice) || null, // Handle potential empty string
    //   entryAvg: parseFloat(data.averageEntryPrice),
    //   exitAvg: parseFloat(data.averageExitPrice) || null, // Handle potential empty string
    //   lots: parseInt(data.noOfLots),
    //   lotSize: parseFloat(data.quantityPerLot) || null, // Handle potential empty string
    //   status: status, // Replace with logic to determine status (e.g., "open", "closed")
    //   goodBad: data.goodBadTrade, // Assuming "goodBadTrade" maps to "good" or "bad"
    //   tags: [], // Initialize as an empty array if no tags are provided
    //   createdAt: new Date(), // Assuming you want to use moment.js for current timestamp
    //   exitReason: status === "closed" ? data.exitReason : "",
    // };

    const dataForDb = {
      longShort: data.type,
      profitLoss: status === "closed" ? profitLoss : null,
      net: roundToNearest(net, 2), // Round net to nearest 2 digits
      user: user?.id, // Replace with actual user logic
      tradeDate: data.date, // Assuming date is in a parseable format
      instrument: data.instrument,
      setup: data.setup,
      stopLoss: roundToNearest(parseFloat(data.stopLossPrice) || null, 3),
      target: roundToNearest(parseFloat(data.targetPrice) || null, 3),
      entryAvg: roundToNearest(parseFloat(data.averageEntryPrice) || null, 3),
      exitAvg: roundToNearest(parseFloat(data.averageExitPrice) || null, 3),
      lots: parseInt(data.noOfLots),
      lotSize: parseFloat(data.quantityPerLot),
      status: status, // Replace with logic to determine status (e.g., "open", "closed")
      goodBad: data.goodBadTrade, // Assuming "goodBadTrade" maps to "good" or "bad"
      tags: [], // Initialize as an empty array if no tags are provided
      createdAt: new Date(), // Assuming you want to use moment.js for current timestamp
      exitReason: status === "closed" ? data.exitReason : "",
    };

    console.log("dataForDb :", dataForDb);

    await connectDB();
    const newTrade = await Trade.findOneAndUpdate(
      { _id }, // Filter: Find document with the matching _id
      dataForDb, // Update object with changes to be applied
      { new: true } // Option: Return the updated document (optional)
    );
    console.log("updated trade :", newTrade);
    return true;
  } catch (error) {
    console.error("Error inserting data:", error);
    return false;
  }
}

export async function deleteTrade({ _id }: { _id: string }) {
  try {
    console.log("trying to delete the trade")
    const session = await auth(); // Assuming `auth` returns a session object
    const user = session?.user;
    const userId = user?.id

    if (!user) {
      return false; // Handle unauthorized deletion
    }

    await connectDB();

    // Find the document to delete, filtering by both user and _id
    const deletedTrade = await Trade.findOneAndDelete({
      user: userId,
      _id, // Document's ID
    });

    if (!deletedTrade) {
      console.error(
        `Trade with _id: ${_id} and user: ${user} not found for deletion.`
      );
      return false; // Handle document not found case
    }

    console.log(
      `Trade with _id: ${_id} and user: ${user} successfully deleted.`
    );
    return true; // Indicate successful deletion
  } catch (error) {
    console.error(`Error deleting trade with _id: ${_id} `, error);
    return false; // Handle errors
  }
}
