"use client"
import CustomCreateSelect from "@/components/custom/CustomCreatableSelect"
import { tradeInputConstants } from "@/lib/constants"

export default function Page(){
    const options = tradeInputConstants.setup
    return(
        <div>
            <CustomCreateSelect 
            options={options}
            defaultInput= {"double bottom"}
            onCreateFunction={()=>{console.log("Created")}}
            selectName="test-select"
            onChange={()=>{console.log("Created")}}
            />
        </div>
    )
}