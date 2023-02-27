import { useState } from "react"
import EachFriend from "../home/EachFriend"
import { useNavigate } from "react-router-dom"

function GroupsPage({user}){

    const navigate = useNavigate()

    const [groupName, setGroupName] = useState("")
    const [guests, setGuests] = useState([])
    const [errors, setErrors] = useState([])

    function handleGroup(){
        fetch("/friend_groups",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "user_id": user.id,
                "group_name": groupName,
                "invites": guests
            })
        })
        .then(req => {
            if(req.ok){
                req.json().then((session) => {
                    navigate(`/group/${session.id}`)
                })
            }
            else{
                req.json().then((session) => {
                    setErrors(session.error)
                })
            }
        })
    }

    return(
        <div className='bigscreen'>
            <div className="eventcontainer">
                <div className="">
                    <label className="loginLabel">
                        Name of Group:
                    <br />
                        <input className="groupInput" type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)}/>
                    </label>
                    <br />
                </div>
                <div className="listoffriends"> 
                    <div className='evenfriendlistselected' > Friends: </div>
                    {user.friends ? (
                        user.friends.map(friend =>{
                            return(
                                <EachFriend guests={guests} setGuests={setGuests} key={friend.id} friend={friend}/>
                            )
                        })
                    ):(
                        null
                    )}
                </div>
            </div>
            {errors ? (
                errors.map(error=>{
                    return(
                        <div className="signupErrors" >{error}</div>
                    )
                })
            ):(
                null
            )}
                <div className="listofgroupinfo">
                <div className="loginLabel"> Inviting: 
                    {guests.map(guest=>{
                        return(
                            ` ${guest.username},`
                        )
                    })}
                </div>
                <submit onClick={handleGroup} className='planeventbutton'> Create Group! </submit>
                </div>
        </div>
    )
}

export default GroupsPage