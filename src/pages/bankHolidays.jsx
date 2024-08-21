import Axios from "axios";
import { useState } from "react";
import { HolidayTable } from "../components/holidayTable/holidayTable";
import { useQuery } from "@tanstack/react-query";

export const BankHolidays = () => {
    const [selectedDivision, setSelectedDivision] = useState(null);
    const [holidays, setHolidays] = useState([]);

    const {data, isLoading, isError} =  useQuery({
      queryKey : ["bank"],
      queryFn: ()=>{
        const response  = Axios.get("https://www.gov.uk/bank-holidays.json").then((res)=>res.data);
        return response;
      }
    })

    if(isLoading) return <div>Loading ...</div>
    
    if(isError) return <div>Invalid API!!</div>
  
    const handleDropdownChange = (division) => {
        if(division!=="default"){
            setSelectedDivision(division);
            setHolidays(data[division].events);
        }
    };
  
    return (
      <>
        <h1 title="heading">Bank Holiday List</h1>
        <div className="divisions">
        <h2>Divisions:</h2>
        <select
            onChange={(e) => handleDropdownChange(e.target.value)}
            data-testid="divison-select"
        >
            <option value="default" style={{color:"gray"}}>Select Division</option>
            {Object.keys(data).map((key) => (
            <option key={key} value={key}>
                {key.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </option>
            ))}
        </select>
        </div>
        {selectedDivision &&
        <div className="divisionTable">
            <h2>  Holidays in {selectedDivision?.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h2>
            <div><HolidayTable holidays={holidays} /></div>
        </div>
        }
      </>
    );
  };