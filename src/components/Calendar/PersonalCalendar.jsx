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
    
    // const personalEvents = [
    //     {
    //         "id": 1,
    //         "date": "2023, 2, 12",
    //         "name_of_event": "Matt's Birthday",
    //         "start_time": "18:00",
    //         "end_time": "22:00"
    //     },
    //     {
    //         "id": 2,
    //         "date": "2023, 2, 18",
    //         "name_of_event": "Ash's Birthday",
    //         "start_time": "18:00",
    //         "end_time": "22:00"
    //     },
    //     {
    //         "id": 3,
    //         "date": "2023, 2, 4",
    //         "name_of_event": "Sam's Birthday",
    //         "start_time": "18:00",
    //         "end_time": "22:00"
    //     },
    //     {
    //         "id": 4,
    //         "date": "2023, 2, 4",
    //         "name_of_event": "Sam's Birthday",
    //         "start_time": "22:00",
    //         "end_time": "24:00"
    //     }
        
    // ]

    useEffect(()=>{
        fetch("/personal_calendars")
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
        fetch("/personal_calendars",{
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
                "user_id": user.id
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
        fetch(`/personal_calendars/${event.id}`,{ method: 'DELETE' })
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

// {personalDates.map(date =>{
//     const specificDate = new Date(date.date);
//     if (specificDate.toString() === value.toString()){
//         return(
//             <div key={specificDate.id}>
//             <p>{specificDate.name_of_event}</p>
//             <p>{specificDate.start_time} - {specificDate.end_time}</p>
//             </div>
//         );
//     }
// return null;
// })}