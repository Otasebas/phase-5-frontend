import EvenSideBar from "./EventSideBar"
import { useState,useEffect } from "react"
import format from "date-fns/format"

function EventInvite(){

    return(
        <div className="sidebarcontainer">
            <EvenSideBar />
            <EachInvite />
        </div>
    )
}

export default EventInvite

function EachInvite(){

    const [user, setUser] = useState([])

    useEffect(() => {
        fetch('/profile')
        .then((res) => {
            if (res.ok) {
            res.json().then((session) => {
                setUser(session.event_invites)
            })
            } 
            else {
            setUser(null);
            }
        });
    }, []);


    return(
        <div className="bigscreen">
            {user.map(invite =>{
                return(
                    <Invite key={invite.id} invite={invite}/>
                )
            })}
        </div>
    )
}

function Invite({invite}){

    const [date, setDate] = useState(new Date(invite.date))

    return(
        <div>
            <div>{invite.name_of_event}</div>
            <div>By {invite.creator}</div>
            <div>{invite.description}</div>
            <div>{format(date, "EEE-MMMM-dd-yyyy")}</div>
            <div>{invite.start_time}-{invite.end_time}</div>
            <button> Accept </button>
            <button> Decline </button>
        </div>
    )
}