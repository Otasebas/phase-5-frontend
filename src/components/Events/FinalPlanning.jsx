import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Calendar from "react-calendar"
import { format } from 'date-fns'
import differenceInCalendarDays from "date-fns/differenceInCalendarDays"

function FinalPlanning(){

    const navigate = useNavigate()

    const {id} = useParams()

    const [event, setEvent] = useState({})
    const [value, setValue] = useState(new Date())
    const [timeStart, setTimeStart] = useState("")
    const [timeEnd, setTimeEnd] = useState("")
    const [nameOfEvent, setNameOfEvent] = useState("")
    const [description, setDescription] = useState("")
    const [haventSent, setHaventSent] = useState([])
    const [available, setAvailable] = useState([])

    const [calendarDropDown, setCalendarDropDown] = useState(false)

    useEffect(()=>{
        fetch(`/events/${id}`)
        .then(req => req.json())
        .then(res => {
            setEvent(res)
            setValue(new Date(res.date))
            setTimeStart(res.start_time)
            setTimeEnd(res.end_time)
            setDescription(res.description)
            setNameOfEvent(res.name_of_event)
            setHaventSent(res.havent_sent)
            setAvailable(res.havent_sent.filter(sent =>{
                return (
                    sent.avilability === true
                )
            }))
        })
    },[id])

    function handleSubmit(){
        fetch(`/saveevent/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name_of_event": nameOfEvent,
                "start_time": timeStart,
                "end_time": timeEnd,
                "description": description,
                "date": value
            })
        })
        .then(req => {
            if(req.ok){
                req.json().then((session) => {
                    setEvent(session)
                    navigate(`/event/${session.id}`)
                })
            }
        })
    }

    function handledropDown(e){
        e.preventDefault()
        setCalendarDropDown(!calendarDropDown)
    }

    function isSameDay(a, b) {
        return differenceInCalendarDays(a, b) === 0;
    }

    function tileClassName({ date, view }) {
        
        const personalEventDates = new Date(value)

        // Add class to tiles in month view only
        if (view === 'month') {
          
            // Check if a date React-Calendar wants to check is on the list of dates to add class to
          if (isSameDay(personalEventDates, date)) {
            return 'myClassName';
          }
        }
    }

    function sendInvite(){
        fetch(`/sendinvite/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "available": available
            })
        })
        .then(req => {
            if(req.ok){
                req.json().then((session) => {
                    navigate(`/event/${session.id}`)
                    // console.log(session)
                })
            }
            else{
                req.json().then(session => {
                    console.log(session.error)
                })
            }
        })
    }

    return(
        <div className="sidebarcontainer">
            <div className="halfpage">
                <form onSubmit={handleSubmit}>
                    <div className="loginLabel"> Name of Event </div>
                    <input className="loginInput" onChange={(e)=>setNameOfEvent(e.target.value)} value={nameOfEvent} type="text"/>
                        
                    <div className="loginLabel"> Date </div>
                    <button className="loginButton" onClick={handledropDown}> {format(value, "EEE-MMMM-dd-yyyy")} </button>
                        {calendarDropDown ? (
                            <Calendar
                            className="entirepersonalcalendar" 
                            onChange={setValue}
                            value={value}
                            tileClassName={tileClassName}
                            />
                        ):(
                            null
                        )}

                    <div className="loginLabel"> Time Start </div> 
                
                    <input className="loginInput" type="time" value={timeStart} onChange={(e)=>{setTimeStart(e.target.value)}}/>
                    
                    <div className="loginLabel"> Take End </div>

                    <input className="loginInput" type="time" value={timeEnd} onChange={(e)=>{setTimeEnd(e.target.value)}}/>
                    
                    <div className="loginLabel"> Location </div>
                    <input className="loginInput" type="text"/>
                        
                    <div className="loginLabel"> Decription </div>
                    <input className="loginInput" type="text" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>

                    <button className="loginButton" type="submit"> Edit </button>
                </form>
            </div>
            <div className="otherpage">
                <div className="topofotherpage">
                {haventSent.map(sent =>{
                    return(
                        <div className="friendboxinvites">
                            <div className="friendbox">{sent.nickname}</div>
                            {sent.avilability ? (
                                <button className="friendbox_button"> Avilable </button>
                            ):(
                                <button className="friendbox_button"> Not Avilable </button>
                            )}
                        </div>
                        
                    )
                })}
                </div>
                <div className="bottomofotherpage">
                    <button onClick={sendInvite} className="friendbox_button"> Send Invites! </button>
                </div>
            </div>
        </div>
    )
}

export default FinalPlanning