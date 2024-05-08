import { Skeleton } from "@/components/ui/skeleton";

const PreviewSkeleton = () => {
    const classNameElements = "h-52 w-52 bg-white shadow-md rounded-lg p-4 flex flex-col justify-between m-2";
    return (
      <div className="grid lg:grid-cols-3 grid-cols-1 justify-items-center gap-4 ">
        <div className={classNameElements}>
          <div className="text-base font-bold mb-1">
            <Skeleton className="w-20 h-5 rounded-lg" /> {/* Type */} 
            <Skeleton className="w-12 h-5 rounded-lg" /> {/* Date */}
          </div>
          <div className="flex flex-col space-y-1 text-sm">
            <div className="flex flex-row space-x-2">
              <Skeleton className="w-24 h-5 rounded-lg" /> {/* Instrument */}
            </div>
            <div className="flex flex-row space-x-2">
              <Skeleton className="w-20 h-5 rounded-lg" /> {/* Setup */}
            </div>
            <div className="flex flex-row space-x-2 text-xs">
              <Skeleton className="w-24 h-5 rounded-lg" /> {/* Good or Bad Trade */}
            </div>
            <div className="flex flex-row space-x-2 text-xs">
              <Skeleton className="w-12 h-5 rounded-lg" /> {/* Lots */}
            </div>
            <div className="flex flex-row space-x-2 text-xs">
              <Skeleton className="w-16 h-5 rounded-lg" /> {/* Quantity Per Lot */}
            </div>
          </div>
        </div>
        <div className={classNameElements}>
          <div className="grid grid-cols-2 gap-2">
            <div className=" shadow-md rounded-md flex flex-col justify-center items-center h-20 w-20">
              <Skeleton className="w-12 h-5 rounded-lg mb-2" /> {/* Entry */}
              <Skeleton className="w-16 h-5 rounded-lg" /> {/* Entry Price */}
            </div>
            <div className=" shadow-md rounded-md flex flex-col justify-center items-center h-20 w-20">
              <Skeleton className="w-12 h-5 rounded-lg mb-2" /> {/* Exit */}
              <Skeleton className="w-16 h-5 rounded-lg" /> {/* Exit Price */}
            </div>
            <div className=" shadow-md rounded-md flex flex-col justify-center items-center h-20 w-20">
              <Skeleton className="w-12 h-5 rounded-lg mb-2" /> {/* Stoploss */}
              <Skeleton className="w-16 h-5 rounded-lg" /> {/* Stoploss Price */}
            </div>
            <div className=" shadow-md rounded-md flex flex-col justify-center items-center h-20 w-20">
              <Skeleton className="w-12 h-5 rounded-lg mb-2" /> {/* Target */}
              <Skeleton className="w-16 h-5 rounded-lg" /> {/* Target Price */}
            </div>
          </div>
        </div>
        <div className={classNameElements}>
          <div className="rounded-lg p-2 flex flex-col justify-center items-center h-full w-full">
            <Skeleton className="w-full h-10 rounded-md mb-4" /> {/* Profit/Loss */}
            <Skeleton className="w-full h-8 rounded-md mb-4" /> {/* Risk */}
            <Skeleton className="w-full h-8 rounded-md mb-4" /> {/* Reward */}
            <Skeleton className="w-full h-8 rounded-md mb-4" />
            </div>
            </div>
            </div>
)
}  

export const SkeletonForm = () => {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <form className="shadow-sm rounded-md border border-gray-200 p-6 md:w-3/4 lg:w-3/5 mx-auto">
            <fieldset className="space-y-4">
              <legend className="text-xl font-bold mb-4">
                Trade Details
                </legend>
  
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="w-full md:w-1/2 lg:w-1/2">
                  <Skeleton className="w-full h-10 rounded-lg mb-4 mt-2" /> {/* Type of Trade */}
                </div>
                <div className="w-full md:w-1/2">
                  <Skeleton className="w-full h-10 rounded-lg mb-4 mt-2" /> {/* Good or Bad Trade */}
                </div>
                <div className="w-full md:w-1/2">
                  <Skeleton className="w-full h-10 rounded-lg mb-4 mt-2" /> {/* Date of Trade */}
                </div>
              </div>
  
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="w-full md:w-1/2 lg:w-1/2">
                  <Skeleton className="w-full h-10 rounded-lg mb-8 mt-2" /> {/* Instrument */}
                </div>
                <div className="w-full md:w-1/2">
                  <Skeleton className="w-full h-10 rounded-lg mb-8 mt-2" /> {/* Setup for the trade */}
                </div>
              </div>
  
              {/* Add more Skeleton elements for other form fields */}
              <div className="flex flex-col space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (<div key={index}>
                    <Skeleton className="w-48 h-6 rounded-md" />
                    <Skeleton className="w-full h-10 rounded-lg" />
                </div>
                  
                ))}
              </div>

              <PreviewSkeleton />
  
              <Skeleton className="w-24 mx-auto mt-5 h-10 rounded-lg" /> {/* Submit Button */}
            </fieldset>
          </form>
        </div>
      </div>
    );
  };