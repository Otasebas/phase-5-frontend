import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"

function ProfileBar(){

    const navigate = useNavigate()

    const [user, setUser] = useState([])
    const [notificationRequests, setNotificationRequests] = useState(false)

    useEffect(() => {
        fetch('/profile')
            .then((res) => {
                if (res.ok) {
                    res.json().then((session) => {
                        setUser(session)
                        if(session.request.length > 0){
                            setNotificationRequests(true)
                        }
                    })
                } 
                else {
                    setUser(null);
                }
            });
    }, []);

    function handleAddFriend(){
        navigate("/addfriend")
    }

    function handlePending(){
        navigate("/pending")
    }

    function handleRequests(){
        navigate("/requests")
    }

    function handleFriends(){
        navigate("/friends")
    }

    return(
        <div className="profileContainer">
            <div className="upper50">
                <button onClick={handleFriends} className="profile-button" > Friends </button>
                <button onClick={handleAddFriend} className="profile-button" > Add Friend </button>
                <button onClick={handlePending} className="profile-button" > Pending </button>
                <button onClick={handleRequests} className={notificationRequests ? 'profile-button-notif' : "profile-button"} > Requests </button>
            </div>
            <div className="profileBottom">
                <h3>username: {user.username}</h3>
                <h1>{user.nickname}</h1>
            </div>
        </div>
    )
}

export default ProfileBar