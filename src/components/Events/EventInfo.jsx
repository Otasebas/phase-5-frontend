import EvenSideBar from "./EventSideBar"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Calendar from "react-calendar"
import { format } from 'date-fns'
import differenceInCalendarDays from "date-fns/differenceInCalendarDays"
import { useNavigate } from "react-router-dom"

function EventInfo(){
    return(
        <div className="sidebarcontainer">
            <EvenSideBar />
            <SpecificEvent />
        </div>
    )
}

export default EventInfo

function SpecificEvent(){

    const {id} = useParams()

    const naviagte = useNavigate()

    const [event, setEvent] = useState({})
    const [invitee, setInvitee] = useState([])
    const [calendarDropDown, setCalendarDropDown] = useState(false)
    const [value, setValue] = useState(new Date())
    const [eventDate, setEventDate] = useState(new Date())
    const [going, setGoing] = useState([])

    useEffect(()=>{
        fetch(`/anyevent/${id}`)
        .then(req => req.json())
        .then(res => {
            setEvent(res)
            setInvitee(res.invitee_status)
            setEventDate(new Date(res.calendar_date.date))
            setGoing(res.invitee_status)
        })
    },[id])

    function handledropDown(e){
        e.preventDefault()
        setCalendarDropDown(!calendarDropDown)
    }

    function isSameDay(a, b) {
        return differenceInCalendarDays(a, b) === 0;
    }

    function tileClassName({ date, view }) {
        
        const personalEventDates = new Date(eventDate)

        // Add class to tiles in month view only
        if (view === 'month') {
          
            // Check if a date React-Calendar wants to check is on the list of dates to add class to
          if (isSameDay(personalEventDates, date)) {
            return 'myClassName';
          }
        }
    }

    function leave(){
        fetch(`/declineeventinvite/${event.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            })
        })
        .then(req => {
            if(req.ok){
                req.json().then((session) => {
                    naviagte("/invitedevent")
                })
            }
        })
    }

    return(
        <div className="sidebarcontainer">
            <div className="halfpage">
            <form>
                    <div className="loginLabel"> Name of Event </div>
                    <input className="loginInput" value={event.name_of_event} type="text"/>
                        
                    <div className="loginLabel"> Date </div>
                    <button className="loginButton" onClick={handledropDown}> {format(eventDate, "EEE-MMMM-dd-yyyy")} </button>
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
                
                    <input className="loginInput" type="time" value={event.start_time}/>
                    
                    <div className="loginLabel"> Take End </div>

                    <input className="loginInput" type="time" value={event.end_time} />
                    
                    {/* <div className="loginLabel"> Location </div>
                    <input className="loginInput" type="text"/> */}
                        
                    <div className="loginLabel"> Decription </div>
                    <input className="loginInput" type="text" value={event.description}/>

                    {/* <button className="loginButton" type="submit"> Edit </button> */}
                </form>
            </div>
            <div className="otherpage">
                {invitee.map(invite =>{
                    return(
                        <div className="friend">
                            <h1 className="friendbox" >{invite.username}</h1>
                            {invite.attendance === "pending" && (
                                <button className="friendbox_button">Pending...</button>
                            )}
                            {invite.attendance === "accepted" && (
                                <button className="friendbox_button">Accepted</button>
                            )}
                            {invite.attendance === "declined" && (
                                <button className="friendbox_button">Declined</button>
                            )}
                            {invite.attendance === null && (
                                <button onClick={leave} className="friendbox_button">Leave</button>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}