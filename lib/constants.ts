export const tradeInputConstants = {
  type: [
    {
      value: "long",
      label: "Long",
    },
    {
      value: "short",
      label: "Short",
    },
  ],
  setup: [
    "double top",
    "double bottom",
    "head and shoulder",
    "inverted head and shoulder",
    "trendline breakout",
    "trendline breakdown",
  ],
  inputs: [
    {
      label: "Average Entry Price",
      type: "number",
      placeholder: "Average Entry Price",
      name: "averageEntryPrice",
    },
    {
      label: "Stop Loss Price",
      type: "number",
      placeholder: "Stop Loss Price",
      name: "stopLossPrice",
    },
    {
      label: "Target Price",
      type: "number",
      placeholder: "Target Price",
      name: "targetPrice",
    },
    {
      label: "Average Exit Price",
      type: "number",
      placeholder: "Average Exit Price",
      name: "averageExitPrice",
    },
    {
      label: "No of Lots",
      type: "number",
      placeholder: "No of Lots",
      name: "noOfLots",
    },
    {
      label: "Quantity per lot",
      type: "number",
      placeholder: "Quantity per lot",
      name: "quantityPerLot",
    },
  ],
  goodBadOptions: [
    { value: "good", label: "Good Trade" },
    { value: "bad", label: "Bad Trade" },
  ],
};
