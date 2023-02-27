import Calendar from "react-calendar"
import { useState, useEffect } from "react"
import { differenceInCalendarDays } from 'date-fns';

function GroupCalendar(){

    const [value, setValue] = useState(new Date())
    const [personalDates, setPersonalDates] = useState([])

    function isSameDay(a, b) {
        return differenceInCalendarDays(a, b) === 0;
    }

    function tileClassName({ date, view }) {
        
        const personalEventDates = 
        personalDates.map(event =>{
            return(
                new Date(event.date)
            )
        })

        // Add class to tiles in month view only
        if (view === 'month') {
          
            // Check if a date React-Calendar wants to check is on the list of dates to add class to
          if (personalEventDates.find(dDate => isSameDay(dDate, date))) {
            return 'myClassName';
          }
        }
    }

    return(
        <Calendar 
        onChange={setValue} 
        value={value} 
        className="entirepersonalcalendar"
        tileClassName={tileClassName}
        />
    )
}

export default GroupCalendar