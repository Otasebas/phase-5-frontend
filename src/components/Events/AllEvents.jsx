import EvenSideBar from "./EventSideBar"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function AllEvents(){

    return(
        <div className="sidebarcontainer">
            <EvenSideBar />
            <UserEvents />
        </div>
    )
}

export default AllEvents

function UserEvents(){

    const[personalEvents, setPersonalEvents] = useState([])
    const[invitedEvents, setInvitedEvents] = useState([])

    const navigate = useNavigate()

    useEffect(()=>{
        fetch("/events")
        .then(req => req.json())
        .then(res => {
            setPersonalEvents(res.creator_calendar_dates)
            setInvitedEvents(res.attendee_calendar_dates)
        })
    },[])

    function handleEvent(event){
        navigate(`/event/${event}`)
    }

    function handleOwnerEvent(event){
        navigate(`/editevent/${event}`)
    }

    return(
        <div className="friendcontainer">
            <div className="friendboxlabel">
                <h1 className="friendbox"> Your Events </h1>
            </div>
                {personalEvents.map(event =>{
                    return(
                        <div onClick={()=>handleOwnerEvent(event.id)} className="friend">
                            <h1 className="friendbox" >{event.name_of_event}</h1>
                        </div>
                    )
                })}
            <div className="friendboxlabel">
                <h1 className="friendbox"> Invited Events </h1>
            </div>
                {invitedEvents.map(event =>{
                    return(
                        <div onClick={()=>handleEvent(event.id)} className="friend">
                            <h1 className="friendbox" >{event.name_of_event}</h1>
                        </div>
                    )
                })}

        </div>
    )
}