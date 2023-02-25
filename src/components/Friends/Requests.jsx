import { useState } from "react";
import { useEffect } from "react";

function Requests(){

    const [user, setUser] = useState([])

    useEffect(() => {
        fetch('/profile')
        .then((res) => {
            if (res.ok) {
            res.json().then((session) => setUser(session.request))
            } 
            else {
            setUser(null);
            }
        });
    }, []);


    return(
        <div className="friendcontainer">
            {user.map(request =>{
                return(
                    <EachRequests key={request} setUser={setUser} user={user} request={request}/>
                )
            })}
        </div>
    )
}

export default Requests

function EachRequests({request, setUser, user}){

    function handleRemove(){
        fetch(`/remove/${request.request_id}`, { method: 'DELETE' })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const newpendinglist = user.filter(newpending => {
              return newpending.request_id !== request.request_id
            })
            setUser(newpendinglist);
        })
    }

    function handleAccept(){
        fetch(`/accept/${request.request_id}`, { method: 'PATCH' })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const newpendinglist = user.filter(newpending => {
              return newpending.request_id !== request.request_id
            })
            setUser(newpendinglist);
        })
    }

    return(
        <div className="friend">
            <h1 className="friendbox">{request.username}</h1>
            <button onClick={handleAccept} className="friendbox_button"> Accept </button>
            <button onClick={handleRemove} className="friendbox_button"> Decline </button>
        </div>
    )
}