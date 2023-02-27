import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GroupsBar(){

    const [user, setUser] = useState({})
    const [groups, setGroups] = useState([])
    const [notificationRequests, setNotificationRequests] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        fetch('/profile')
            .then((res) => {
                if (res.ok) {
                    res.json().then((session) =>{
                        setUser(session)
                        if(session.group_invites.length > 0){
                            setNotificationRequests(true)
                        }
                    })
                } 
                else {
                    setUser(null);
                }
            });
    }, []);

    useEffect(()=>{
        fetch("/membergroups")
        .then(req => req.json())
        .then(res => setGroups(res))
    },[])

    function handleGroupCreation(){
        navigate("/groups")
    }

    function handleGroup(id){
        navigate(`/group/${id}`)
    }

    function handleGroupInvites(){
        navigate("/invites")
    }

    return(
            <div className="friends">
                <div className="upper25">
                    <button onClick={handleGroupCreation} className="group-button" > Create a Group </button>
                    <button onClick={handleGroupInvites} className={notificationRequests ? 'profile-button-notif' : "profile-button"} > Group Invites </button>
                </div>
                <div className="middle50">
                        {groups.map(group =>{
                            return (
                                <div key={group.id} onClick={()=>handleGroup(group.id)} className="friendprofiles">{group.group_name}</div>
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

export default GroupsBar