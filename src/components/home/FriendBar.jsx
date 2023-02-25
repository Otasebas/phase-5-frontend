import { useEffect } from "react"
import { useState } from "react"

function FriendBar(){

    const [user, setUser] = useState({})
    const [friends, setFriends] = useState([])

    useEffect(() => {
        fetch('/profile')
            .then((res) => {
                if (res.ok) {
                    res.json().then((session) =>{
                        setUser(session)
                        setFriends(session.friends)
                    })
                } 
                else {
                    setUser(null);
                }
            });
    }, []);

    return(
        <div className="friends">
            <div className="upper75">
                {friends.map(friend =>{
                    return(
                        <EachFriend key={friend.id} friend={friend}/>
                    )
                })}
            </div>
                {user ?(
                    <div className="profileBottom">
                    <h3>username: {user.username}</h3>
                    <h1>{user.nickname}</h1>
                </div>
                ):(
                    null
                )}
        </div>
    )
}

export default FriendBar

function EachFriend({friend}){
    return(
        <div className="friendprofiles">{friend.username}</div>
    )
}