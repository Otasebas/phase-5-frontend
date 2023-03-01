import { useState } from "react"
import { useEffect } from "react"

function FriendsPage(){

    const [user, setUser] = useState([])

  useEffect(() => {
    fetch('/profile')
      .then((res) => {
        if (res.ok) {
          res.json().then((session) => setUser(session.friends))
        } 
        else {
          setUser(null);
        }
      });
  }, []);

    return(       
            <div className="friendcontainer">
            
                    {user.map(friend =>{
                        return(
                            <Friend user={user} setUser={setUser} key={friend.id} friend={friend}/>
                        )
                    })}
                
                 
            </div>
    )
}

export default FriendsPage

function Friend({friend, user, setUser}){

    function handleUnFriend(){
        if(window.confirm("Are you sure you want to remove friend?")){
            fetch(`/remove/${friend.request_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(()=>{
                    const newfriendlist = user.filter((allCard =>{
                        return (allCard.request_id !== friend.request_id)
                    }))
                setUser(newfriendlist)
            })
        }
    }

    return(
        <div className="friend">
            <h1 className="friendbox">{friend.username}</h1>
            <button onClick={handleUnFriend} className="friendbox_button"> Unfriend </button>
        </div>
    )
}