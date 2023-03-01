import { Calendar } from 'react-calendar';
import { useState } from "react"
import { differenceInCalendarDays } from 'date-fns';
import { format } from 'date-fns'
import { useEffect } from 'react';

function PersonalCalander({user}){

    const [value, setValue] = useState(new Date())
    const [nameOfEvent, setNameOfEvent] = useState("")
    const [timeStart, setTimeStart] = useState("")
    const [timeEnd, setTimeEnd] = useState("")
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState("")
    const [personalDates, setPersonalDates] = useState([])


    useEffect(()=>{
        fetch("/personaldates")
        .then(res => res.json())
        .then(req => setPersonalDates(req))
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

    function handlePostEvent(){
        fetch("/createpersonalevent",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "date": value,
                "name_of_event": nameOfEvent,
                "start_time": timeStart,
                "end_time": timeEnd,
                "description": description,
            })
        })
        .then(req => {
            if(req.ok){
                req.json().then((session) => {
                    setPersonalDates([...personalDates, session])
                })
            }
            else{
                req.json().then((session) => {
                    setErrors(session.errors)
                })
            }
        })
    }

    function handleRemove(event){
        fetch(`/personaldates/${event.id}`,{ method: 'DELETE' })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const newCalendar = personalDates.filter(date => {
                    return (
                        date.id !== event.id
                    )
                })
                setPersonalDates(newCalendar);
            })
    }


    return(
        <div className="bigscreen">
            <div className="eventcontainer">
                <Calendar 
                onChange={setValue} 
                value={value} 
                className="entirepersonalcalendar"
                tileClassName={tileClassName}
                />
                <div className="listoffriends"> 
                    <div className='evenfriendlistselected' > Personal Plans: </div>
                    <br />
                    <label className='smallLabel'/>
                        Date:
                    <h4 >
                        {format(value, "EEE-MMMM-dd-yyyy")}
                    </h4>
                    <label className='smallLabel'/>
                        Name of Event 
                    <br />
                    <input className='smallLabel' type="text" value={nameOfEvent} onChange={(e)=>setNameOfEvent(e.target.value)}/>
                    <br />
                    <label className='smallLabel'/>
                        Time Start 
                    <br />
                    <input type="time" value={timeStart} onChange={(e)=>{setTimeStart(e.target.value)}}/>
                    <br />
                    <label className='smallLabel'/>
                        Time End  
                    <br />
                    <input type="time" value={timeEnd} onChange={(e)=>{setTimeEnd(e.target.value)}}/>
                    <br />
                    <label className='smallLabel'/>
                        Description  
                    <br />
                    <input className='smallLabel' type="text" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
                    <br />
                    {errors ? (
                        errors.map(error=>{
                            return(
                                <div className="signupErrors" >{error}</div>
                            )
                        })
                    ):(
                        null
                    )}
                    <button className='creatingpersonalevent' onClick={handlePostEvent}> Make Plan </button>
                </div>
            </div>
            <div className="listofpersonaleventinfo"> 
                {personalDates.map(event =>{
                    if ((new Date(event.date)).toString() === value.toString()){
                        return(
                            <div className='event' key={event.id}>
                                <p>{event.name_of_event}</p>
                                <p>{event.start_time} - {event.end_time}</p>
                                <p>{event.description}</p>
                                <button onClick={()=>handleRemove(event)} className='profile-button'> Remove </button>
                            </div>
                        );
                    }
                    return null
                })}
            </div>
        </div>
    )
}

export default PersonalCalander