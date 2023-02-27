import { useState } from "react"

function EachFriend({friend, guests, setGuests}){

    const [choice, setChoice] = useState(false)

    function handleClick(){
        Guests(!choice)
        setChoice(!choice)
    }

    function Guests(choice){
        if(choice === true ){
            setGuests(guests => [...guests, friend])
        }
        else{
            const newGuestList = guests.filter(guest =>{
                return guest.id !== friend.id
            })
            setGuests(newGuestList)
        }
    }

    return(
        <div onClick={handleClick} className={choice ? ('evenfriendlistselected'):('evenfriendlist')} >
            <div className="friendnameinvite" >{friend.nickname}</div>
            {choice ? (
                <div className="friendnameinviteclick">o</div>
            ):(
                <div className="friendnameinviteclick">x</div>
            )}
        </div>
    )
}

export default EachFriend
