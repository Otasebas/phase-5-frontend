import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

function EvenSideBar(){

    const navigate = useNavigate()

    const [user, setUser] = useState([])
    const [notificationRequests, setNotificationRequests] = useState(false)

    useEffect(() => {
        fetch('/profile')
            .then((res) => {
                if (res.ok) {
                    res.json().then((session) => {
                        setUser(session)
                        if(session.event_invites.length > 0){
                            setNotificationRequests(true)
                        }
                    })
                } 
                else {
                    setUser(null);
                }
            });
    }, []);

    function handleCreateEvent(){
        navigate("/")
    }

    function handleAllEvent(){
        navigate("/events")
    }
    
    function handleInviteEvent(){
        navigate("/invitedevent")
    }

    return(
        <div className="profileContainer">
            <div className="upper50">
                <button onClick={handleCreateEvent} className="profile-button" > Create Event </button>
                <button onClick={handleAllEvent} className="profile-button" > Events </button>
                <button onClick={handleInviteEvent} className={notificationRequests ? 'profile-button-notif' : "profile-button"} > Invites </button>
            </div>
            <div className="profileBottom">
                <h3>username: {user.username}</h3>
                <h1>{user.nickname}</h1>
            </div>
        </div>
    )
}

export default EvenSideBar