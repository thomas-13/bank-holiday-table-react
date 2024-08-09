import Axios from "axios";
import { useState, useEffect } from "react";
import { EventsTable } from "../components/holidayTable";

export const BankHolidays = () => {
    const [regions, setRegions] = useState({})
    const [selectedDivision, setSelectedDivision] = useState(null);
    const [events, setEvents] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          Axios.get("https://www.gov.uk/bank-holidays.json").then((res)=>{
            console.log(res.data)
            setRegions(res.data)
        })
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);
  
    const handleDropdownChange = (division) => {
        if(division!=="default"){
            setSelectedDivision(division);
            setEvents(regions[division].events);
        }
    };
  
    return (
      <>
        <h1>Bank Holiday List</h1>
        <div className="divisions">
        <h2>Divisions:</h2>
        <select
            value={selectedDivision}
            onChange={(e) => handleDropdownChange(e.target.value)}
        >
            <option value="default" style={{color:"gray"}}>Select Division</option>
            {Object.keys(regions).map((key) => (
            <option key={key} value={key}>
                {key.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </option>
            ))}
        </select>
        </div>
        {selectedDivision &&
        <div className="divisionTable">
            <h2>  Holidays in {selectedDivision?.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h2>
            <div><EventsTable events={events} /></div>
        </div>
        }
      </>
    );
  };