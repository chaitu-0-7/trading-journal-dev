"use client";

// @ts-nocheck

import React, { useState, useEffect } from "react";
import { format, set } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { tradeInputConstants } from "@/lib/constants";
import {
  addInstrument,
  addTradeSetup,
} from "@/lib/serverActions/addTradeActions";
import CustomCreateSelect from "@/components/custom/CustomCreatableSelect";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import PreviewComponent from "@/components/custom/PreviewComponent";
import Spinner from "./loading/Spinner";

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
interface TradeInputConstant {
  value: string;
  label: string;
}

interface TradeInput {
  label: string;
  type: string;
  placeholder: string;
  name: string;
}

interface GoodBadOption {
  value: string;
  label: string;
}

function DatePickerDemo({
  date,
  setDate,
}: {
  date: Date;
  setDate: (date: any) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !Date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          required
        />
      </PopoverContent>
    </Popover>
  );
}

export function TradeInputForm({
  formData,
  setFormData,
  onSubmit,
  userConstants
}: {
  formData: inputData;
  setFormData: any;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<boolean>;
  userConstants : any
}) {
  const [instruments, setInstruments] = useState<string[]>([]);
  const [setups, setSetups] = useState<string[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    stopLossPrice: "",
    targetPrice: "",
    date: "",
    exitReason : ""
  });

  useEffect(() => {
    const fetchData = () => {
      try {
        // const response = await getUserConstants();
        setInstruments(userConstants?.instruments || []);
        setSetups(userConstants?.setups || []);
      } catch (error) {
        console.error("Error fetching constants:", error);
      }
      handleFormUpdate();
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateLocalStorage();
    }, 2000); // Update every 2 second

    handleFormUpdate();
    return () => clearInterval(intervalId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, submitted]);

  const handleFormUpdate = () => {
    //Function to call updatePreview and validateInput so that non null is done simultaneously
    var allFieldsEntered: boolean = true;
    Object.entries(formData).forEach(([key, value]) => {
      if (
        key != "averageExitPrice" &&
        key != "status" &&
        key != "exitReason" &&
        (value === null || value === "" || value === undefined)
      ) {
        allFieldsEntered = false;
      }
    });
    if(!(formData.averageExitPrice === "" || formData.averageExitPrice === null || formData.averageExitPrice === undefined) && formData.exitReason === ""){
      allFieldsEntered = false
      setErrors((prevErrors) => ({
        ...prevErrors,
        exitReason: "Please Select the reason for exit",
      })); 
    }
    else{
      setErrors((prevErrors) => ({
        ...prevErrors,
        exitReason: "",
      })); 
    }
    if (allFieldsEntered) {
      updatePreview();
      validateInput();
    } else {
      setPreviewOpen(false);
    }
  };

  const updateLocalStorage = () => {
    localStorage.setItem("draft", JSON.stringify(formData));
  };

  const validateInput = () => {
    // if type = long, stoploss should be less than average entry price and target price should be greater than average entry price
    // if type = short, stoploss should be greater than average entry price and target price should be less than average entry price
    if (formData.date === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        date: "Please Pick a date",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        date: "",
      }));
    }
    if (formData.type === "long") {
      if (
        Number(formData.stopLossPrice) >= Number(formData.averageEntryPrice)
      ) {
        // setErrors((prevErrors) => ({...prevErrors,stopLossPrice: "Stop loss price should be less than average entry price", }));
        setErrors((prevErrors) => ({
          ...prevErrors,
          stopLossPrice:
            "Stop loss price should be less than average entry price",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          stopLossPrice: "",
        }));
      }
      if (Number(formData.targetPrice) <= Number(formData.averageEntryPrice)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          targetPrice:
            "Target price should be greater than average entry price",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          targetPrice: "",
        }));
      }
    } else {
      if (Number(formData.stopLossPrice) < Number(formData.averageEntryPrice)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          stopLossPrice:
            "Stop loss price should be greater than average entry price",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          stopLossPrice: "",
        }));
      }
      if (Number(formData.targetPrice) > Number(formData.averageEntryPrice)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          targetPrice: "Target price should be less than average entry price",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          targetPrice: "",
        }));
      }
    }
  };

  const updatePreview = () => {
    setPreviewOpen(true);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData: inputData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInstrumentChange = (value: any) => {
    if (!value) {
      // By the time form updates and functin call happens, error is being Thrown. To prevent such cases
      setPreviewOpen(false);
    }
    setFormData((prevData: inputData) => ({
      ...prevData,
      instrument: value?.value,
    }));
  };

  const handleSetupChange = (value: any) => {
    if (!value) {
      // By the time form updates and functin call happens, error is being Thrown. To prevent such cases
      setPreviewOpen(false);
    }
    setFormData((prevData: inputData) => ({
      ...prevData,
      setup: value?.value,
    }));
  };

  const setDate = (date: any) => {
    setFormData((prevData: inputData) => ({
      ...prevData,
      date: date,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateInput();
    if ((formData.averageExitPrice === null || formData.averageExitPrice === "")) {
      setFormData((prevData: any) => ({
        ...prevData,
        setup: "open",
      }));
    }
    setSubmitted(true);
    const res = onSubmit(e);
    console.log("Result from form is :", res)
    if(!res){
      setSubmitted(false)
    }
  };

  const renderTradeInput = (input: TradeInput) => {
    //ts-ignore
    // const draftValue = formData[input.name]
    const draftValue = (formData as { [key: string]: any })[input.name];
    const hasError =
      input.name === "stopLossPrice" || input.name === "targetPrice";
    let step = 0.1;
    if (input.name === "noOfLots" || input.name === "quantityPerLot") {
      step = 1;
    }
    let required = true;
    if (input.name == "averageExitPrice") {
      required = false;
    }
    return (
      <div key={input.label} className="flex flex-col mb-2">
        <label className="text-sm font-medium mb-1">{input.label}</label>
        <div className="flex w-full">
          <Input
            name={input.name}
            type={input.type}
            placeholder={input.placeholder}
            onChange={handleChange}
            required={required}
            min={0}
            step={step}
            max={1000000}
            defaultValue={draftValue}
          />
        </div>
        {hasError &&
          (errors as { [key: string]: any })[input.name].trim() != "" && ( // Conditionally render error component
            <div className="text-xs text-red-500 mt-1">
              {(errors as { [key: string]: any })[input.name] + "*"}
            </div>
          )}
      </div>
    );
  };

  const tradeTypeOptions = tradeInputConstants.type.map((item) => ({
    value: item.value,
    label: item.label,
  }));

  const goodBadOptions = [
    { value: "good", label: "Good Trade" },
    { value: "bad", label: "Bad Trade" },
  ];
  const exitReasonOptions = [
    { value: "targetOrSL", label: "Target or SL hit" },
    { value: "emotional", label: "Emotional" },
  ];

  const resetForm = () => {

    // easy logic just clear the localstorage and reload the page
  localStorage.removeItem("draft");
  window.location.reload()
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form
        method="POST"
        action="/"
        onSubmit={handleSubmit}
        className="shadow-md rounded-lg border border-gray-200 p-6 md:w-3/4 lg:w-3/5 mx-auto"
      >
        <fieldset className="space-y-4">
          <div className="trade-details flex items-center justify-between">
            <legend className="text-xl font-bold mb-2">Trade Details</legend>
            <Button
              className="h-6 px-2 text-xs bg-red-500 hover:bg-red-600 focus:outline-none rounded-md"
              type="button"
              onClick={resetForm}
            >
              Clear
            </Button>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="w-full md:w-1/2 lg:w-1/2">
              <label className="text-sm font-medium mb-1">Type of Trade</label>
              <Select
                // className="w-full bg-white dark:bg-neutral-700 border-2 border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500"
                className="my-react-select-container"
                classNamePrefix="my-react-select"
                defaultValue={tradeTypeOptions.find(
                  (option) => option.value === formData.type
                )}
                options={tradeTypeOptions}
                onChange={(selectedOption: any) => {
                  setFormData((prevData: inputData) => ({
                    ...prevData,
                    type: selectedOption.value,
                  }));
                }}
                placeholder={"Select"}
                required
              />
            </div>

            <div className="w-full md:w-1/2">
              <label className="text-sm font-medium mb-1">
                Good or Bad Trade
              </label>
              <Select
                // className="w-full"
                className="my-react-select-container"
                classNamePrefix="my-react-select"
                options={goodBadOptions}
                defaultValue={goodBadOptions.find(
                  (option) => option.value === formData.goodBadTrade
                )}
                onChange={(selectedOption: any) =>
                  setFormData((prevData: inputData) => ({
                    ...prevData,
                    goodBadTrade: selectedOption.value,
                  }))
                }
                placeholder="Select"
                required
              />
            </div>

            <div className="w-full md:w-1/2">
              <label className="text-sm font-medium mb-1">Date of Trade</label>
              <DatePickerDemo date={formData.date} setDate={setDate} />
              {errors.date != "" && (
                <div className="text-xs text-red-500 mt-1">
                  {errors.date + "*"}
                </div>
              )}
            </div>

            <div className="w-full md:w-1/2">
              <label className="text-sm font-medium mb-1">Exit Reason</label>
              <Select
                // className="w-full"
                className="my-react-select-container"
                classNamePrefix="my-react-select"
                options={exitReasonOptions}
                defaultValue={exitReasonOptions.find(
                  (option) => option.value === formData.exitReason
                )}
                onChange={(selectedOption: any) =>
                  setFormData((prevData: inputData) => ({
                    ...prevData,
                    exitReason: selectedOption.value,
                  }))
                }
                placeholder="Select"
              />
              {errors.exitReason != "" && (
                <div className="text-xs text-red-500 mt-1">
                  {errors.exitReason + " *"}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="w-full md:w-1/2">
              <label className="text-sm font-medium mb-1">Instrument</label>
              <CustomCreateSelect
                selectName="instrument"
                onChange={handleInstrumentChange}
                // work around to display the default value while editing the trade
                options={
                  instruments.length > userConstants.instruments.length
                    ? instruments
                    : userConstants.instruments
                }
                defaultInput={formData.instrument}
                onCreateFunction={(instrument: string) => {
                  instrument = instrument.toLowerCase();
                  setInstruments([...instruments, instrument]);
                  const updatedInstruments = addInstrument(instrument);
                  if (!updatedInstruments) {
                    console.error("Error adding instrument");
                    alert("Error adding instrument. Please try again later.");
                  }
                }}
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="text-sm font-medium mb-1">
                Setup for the trade
              </label>
              <CustomCreateSelect
                options={
                  setups.length > userConstants.setups.length
                    ? setups
                    : userConstants.setups
                }
                selectName="setup"
                onChange={handleSetupChange}
                defaultInput={formData.setup}
                onCreateFunction={(setup: string) => {
                  console.log("Setup is being created:", setup);
                  setup = setup.toLowerCase();
                  setSetups([...setups, setup]);
                  const updatedSetups = addTradeSetup(setup);
                  if (!updatedSetups) {
                    console.error("Error adding setup");
                    alert("Error adding setup. Please try again later.");
                  }
                }}
              />
            </div>
          </div>
          {/* Here's where the form rendering logic continues... */}
          {tradeInputConstants.inputs.map(renderTradeInput)}
          {previewOpen && <PreviewComponent inputData={formData} />}
          <p
            className={`text-red-500 text-xs mt-2 flex justify-center ${
              previewOpen ? "hidden" : ""
            }`}
          >
            Please enter all fields to add the trade
          </p>
          <Button
            type="submit"
            className="w-30 mx-auto mt-5 flex justify-center"
            disabled={!previewOpen || submitted}
          >
            {submitted ? (
              <>
                <span>loading </span>
                <Spinner />
              </>
            ) : (
              <span>Submit</span>
            )}
          </Button>
        </fieldset>
      </form>
    </div>
  );
}
