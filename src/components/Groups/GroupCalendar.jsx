import Calendar from "react-calendar"
import { useState, useEffect } from "react"
import { differenceInCalendarDays } from 'date-fns';
import { useParams } from "react-router-dom";

function GroupCalendar(){

    const {id} = useParams()

    const [value, setValue] = useState(new Date())
    const [personalDates, setPersonalDates] = useState([])

    useEffect(()=>{
        fetch(`/friend_groups/${id}`)
        .then(req => req.json())
        .then(res => {
            setPersonalDates(res.group_calendar)
            console.log(res.group_calendar)
        })
    },[])

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
        <div className="groupCalendar">
            <Calendar 
            onChange={setValue} 
            value={value} 
            className="entirepersonalcalendar"
            tileClassName={tileClassName}
            />
            <div className="listofpersonaleventinfo"> 
                {personalDates.map(event =>{
                    if ((new Date(event.date)).toString() === value.toString()){
                        return(
                            <div className='event' key={event.id}>
                                <p>{event.name_of_event}</p>
                                <p>{event.start_time} - {event.end_time}</p>
                                <p>{event.description}</p>
                            </div>
                        );
                    }
                    return null
                })}
            </div>
        </div>
    )
}

export default GroupCalendar