import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GroupInvites(){

    const [invites, setInvites] = useState([])

    useEffect(() => {
        fetch('/profile')
        .then((res) => {
            if (res.ok) {
            res.json().then((session) => setInvites(session.group_invites))
            } 
            else {
            setInvites(null);
            }
        });
    }, []);


    return(
        <div className="friendcontainer">
            {invites.map(request =>{
                return(
                    <EachRequests key={request} setInvites={setInvites} invites={invites} request={request}/>
                )
            })}
        </div>
    )
}

export default GroupInvites

function EachRequests({request, setInvites, invites}){

    const navigate = useNavigate("")

    function handleRemove(){
        fetch(`/removeinvite/${request.id}`, { method: 'DELETE' })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const newpendinglist = invites.filter(newpending => {
              return newpending.id !== request.id
            })
            setInvites(newpendinglist);
        })
    }

    function handleAccept(){
        fetch(`/acceptinvite/${request.id}`, { method: 'PATCH' })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const newpendinglist = invites.filter(newpending => {
              return newpending.request_id !== request.request_id
            })
            setInvites(newpendinglist)
            navigate(`/group/${request.group_id}`)
        })
    }

    return(
        <div className="friend">
            <div className="friendbox">
                <h1 >{request.group_name}</h1>
                <h3 >Creator: {request.creator.username}</h3>
            </div>
            <button onClick={handleAccept} className="friendbox_button"> Accept </button>
            <button onClick={handleRemove} className="friendbox_button"> Decline </button>
        </div>
    )
}