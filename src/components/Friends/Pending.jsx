import { useEffect, useState } from "react";

function Pending(){

    const [user, setUser] = useState([])

  useEffect(() => {
    fetch('/profile')
      .then((res) => {
        if (res.ok) {
          res.json().then((session) => setUser(session.pending))
        } 
        else {
          setUser(null);
        }
      });
  }, []);


    return(
        <div className="friendcontainer">
            {user.map(pending =>{
                return(
                    <EachPending user={user} setUser={setUser} key={pending.id} pending={pending}/>
                )
            })}
        </div>
    )
}

export default Pending

function EachPending({pending, setUser, user}){

    function handleRemoveRequest() {
        fetch(`/remove/${pending.request_id}`, { method: 'DELETE' })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const newpendinglist = user.filter(newpending => {
              return newpending.request_id !== pending.request_id
            })
            setUser(newpendinglist);
        })
       
    }

    

    return(
        <div className="friend">
            <h1 className="friendbox">{pending.username}</h1>
            <button className="friendbox_button"> Pending... </button>
            <button onClick={handleRemoveRequest} className="friendbox_button"> Remove Rquest </button>
        </div>
    )
}