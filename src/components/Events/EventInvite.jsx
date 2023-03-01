import EvenSideBar from "./EventSideBar"
import { useState,useEffect } from "react"
import format from "date-fns/format"
import { useNavigate } from "react-router-dom"

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
    const [declined, setDeclined] = useState([])

    useEffect(() => {
        fetch('/profile')
        .then((res) => {
            if (res.ok) {
            res.json().then((session) => {
                setUser(session.event_invites)
                setDeclined(session.declined_invites)
            })
            } 
            else {
            setUser(null);
            }
        });
    }, []);


    return(
        <div className="friendcontainer">
            <h1> Pending Events:</h1>
            {user.map(invite =>{
                return(
                    <Invite invite={invite}/>
                )
            })}
            <h1> Declined Events:</h1>
            {declined.map(invite =>{
                return(
                    <DeclinedInvite invite={invite}/>
                )
            })}
        </div>
    )
}

function Invite({invite}){

    const [date, setDate] = useState(new Date(invite.calendar_date.date))

    const navigate = useNavigate()

    function handleAccept(){
        fetch(`/accepteventinvite/${invite.calendar_date.id}`,{
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
                    navigate(`/event/${session.id}`)
                })
            }
        })
    }

    function handleDecline(){
        fetch(`/declineeventinvite/${invite.calendar_date.id}`,{
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
                    console.log(session)
                })
            }
        })
    }

    return(
        <div className="eventinvite">
            <div className="friendbox">
                {invite.calendar_date.name_of_event}
                <br/>
                By {invite.creator.username}
            </div>
            <div className="friendbox">{invite.calendar_date.description}</div>
            <div className="friendbox">
                {format(date, "EEE-MMMM-dd-yyyy")}
                <br/>
                {invite.calendar_date.start_time}-{invite.calendar_date.end_time}</div>
            <div className="friendbox">
                Going:
                <br/> 
                {invite.going.map(members =>{
                    return(
                        <div className="friendbox">{members.username}</div>
                    )
                })}
            </div>
                <button onClick={handleAccept} className="friendbox_button"> Accept </button>
                <br/>
                <button onClick={handleDecline} className="friendbox_button"> Decline </button>
        </div>
    )
}

function DeclinedInvite({invite}){

    const [date, setDate] = useState(new Date(invite.calendar_date.date))

    const navigate = useNavigate()

    function handleAccept(){
        fetch(`/accepteventinvite/${invite.calendar_date.id}`,{
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
                    // navigate(`/event/${session.calendar_date.id}`)
                    console.log(session)
                })
            }
        })
    }

    return(
        <div className="eventinvite">
            <div className="friendbox">
                {invite.calendar_date.name_of_event}
                <br/>
                By {invite.creator.username}
            </div>
            <div className="friendbox">{invite.calendar_date.description}</div>
            <div className="friendbox">
                {format(date, "EEE-MMMM-dd-yyyy")}
                <br/>
                {invite.calendar_date.start_time}-{invite.calendar_date.end_time}</div>
            <div className="friendbox">
                Going:
                <br/> 
                {invite.going.map(members =>{
                    return(
                        <div className="friendbox">{members.username}</div>
                    )
                })}
            </div>
                <button onClick={handleAccept} className="declined_button"> Accept </button>
        </div>
    )
}