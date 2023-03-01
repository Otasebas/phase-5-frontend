import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import GroupCalendar from "./GroupCalendar";

function GroupInfo({user}){

    const {id} = useParams()

    const[groupInfo, setGroupInfo] = useState({})
    const[members, setMembers] = useState([])
    const[creator, setCreator] = useState(false)
    const[friends, setFriends] = useState([])

    useEffect(()=>{
        fetch(`/friend_groups/${id}`)
        .then(req => req.json())
        .then(res => {
            setGroupInfo(res)
            setMembers(res.members)
            setFriends(user.friends.filter(friend => {
                return !res.members.filter(member => {
                    return member.id === friend.id
                }).length
            }))
            if (res.creator === user.username){
                setCreator(true)
            }
        })
    },[])

    return(
        <>
            {creator ? (
                <div className="groupinfocontainer">
                <div className="groupinfo50">
                    <h1 className="groupinfoname">Group: {groupInfo.group_name}</h1>
                    <h3 className="groupinfoname">Creator: You</h3>
                    <div className="membercontainer">
                        {(user.username && members.length > 0) &&
                            [...members.filter(friend => friend.username === user.username),...members.filter(friend => friend.username !== user.username)].map(friend => (
                            <OwnerFriend group={id} members={members} setMembers={setMembers} user={user} key={friend.id} member={friend} />
                            ))
                        }
                    </div>
                    <GroupCalendar />
                </div>
                <div className="groupinfo50darker">
                    <div className="friendbox_button"> Invite Friends! </div>
                    {friends.map(friend =>{
                        return(
                            <InviteFriend key={friend.id} group={id} friend={friend}/>
                        )
                    })}
                </div>
            </div>
            ):(
                <div className="groupinfocontainer">
                    <div className="groupinfo50">
                        <h1 className="groupinfoname">Group: {groupInfo.group_name}</h1>
                        <h3 className="groupinfoname">Creator: {groupInfo.creator}</h3>
                        <div className="membercontainer">
                            {(user.username && members.length > 0) &&
                            [...members.filter(friend => friend.username === user.username),...members.filter(friend => friend.username !== user.username)].map(friend => (
                                <Friend user={user} key={friend.id} friend={friend} />
                                ))
                            }
                        </div>
                        <GroupCalendar />
                    </div>
                </div>
            )}
        </>
        
    )
}

export default GroupInfo

function Friend({friend, user}){

    const navigate = useNavigate()

    function handleLeave(){
        if(window.confirm("Are you sure you want to leave?")){
            fetch(`/leave/${friend.member_id}`,{ method: 'DELETE' })
            .then(req => req.json())
            .then()
            .catch(error => console.error("Error:", error));
            navigate("/groups")
        }
    }

    return(
        <div className="friend">
            <h1 className="friendbox">{friend.username}</h1>
            {user.username === friend.username ?(
                <button onClick={handleLeave} className="friendbox_button"> Leave </button>
            ):(
                null
            )}
        </div>
    )
}

function OwnerFriend({member, user, members, setMembers, group}){

    const navigate = useNavigate()

    function handleLeave(){
        if(window.confirm("Are you sure you want to remove friend?")){
            fetch(`/leave/${member.member_id}`,{ method: 'DELETE' })
            .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                const newMemberList = members.filter(newpending => {
                  return newpending.id !== member.id
                })
                setMembers(newMemberList);
            })
            
        }
    }

    function handleGroupDelete(){
        if(window.confirm("Are you sure you want to delete this group?")){
            fetch(`/friend_groups/${group}`,{ method: 'DELETE' })
            .then(()=> {
                navigate("/groups")
            })
        }
    }

    return(
        <div className="friend">
            <h1 className="friendbox">{member.username}</h1>
            {member.username === user.username ?(
                <button onClick={handleGroupDelete} className="friendbox_button"> Delete Group </button>
            ):(
                <button onClick={handleLeave} className="friendbox_button"> Remove </button>
            )}
        </div>
    )
}

function InviteFriend({friend, group}){

    const[sent, setSent] = useState(false)

    function handleInvite(){
        fetch("/invite",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "user_id": friend.id,
                "friend_group_id": parseInt(group),
                "joined": false
            })
        })
        .then(req => req.json())
        .then(()=>{
            setSent(true)
        })
    }

    return (
        <div className="friend">
            <h1 className="friendbox">{friend.username}</h1>
                {sent ?(
                    <button className="friendbox_button_sent"> Sent </button>
                ):(
                    <button onClick={handleInvite} className="friendbox_button"> Invite </button>
                )}
        </div>
      );
}