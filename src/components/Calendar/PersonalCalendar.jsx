import { Calendar } from 'react-calendar';
import { useState } from "react"
import { differenceInCalendarDays } from 'date-fns';
import { isWithinInterval } from "date-fns";

function PersonalCalander(){

    const [value, setValue] = useState(new Date())

    const datesToAddClassTo = [new Date(2023, 1, 2), new Date(2023, 1, 5)]

    function tileDisabled({ date, view }) {
        // Disable tiles in month view only
        if (view === 'month') {
          // Check if a date React-Calendar wants to check is on the list of disabled dates
          return datesToAddClassTo.find(dDate => isSameDay(dDate, date));
        }
    }

    function isSameDay(a, b) {
        return differenceInCalendarDays(a, b) === 0;
    }

    function isWithinRange(date, range) {
        return isWithinInterval(date, { start: range[0], end: range[1] });
      }
      
      function isWithinRanges(date, ranges) {
        return ranges.some(range => isWithinRange(date, range));
      }

    return(
        <div className="bigscreen">
            <div className="eventcontainer">
                <Calendar 
                onChange={setValue} 
                value={value} 
                className="entirepersonalcalendar"
                tileDisabled={tileDisabled}
                />
                <div>
                </div>
            </div>
        </div>
    )
}

export default PersonalCalander