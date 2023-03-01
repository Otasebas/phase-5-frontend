import { Calendar } from 'react-calendar';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
// import { differenceInCalendarDays } from 'date-fns';
import { format } from 'date-fns'
import EachFriend from './EachFriend';

function HomeCalendar(){

    const navigate = useNavigate()

    const [value, setValue] = useState(new Date())

    const [friends, setFriends] = useState([])
    const [guests, setGuests] = useState([])

    const [groups, setGroups] = useState([])
    const [choosenGroups, setChosenGuests] = useState({})

    const [errors, setErrors] = useState([])

    useEffect(() => {
        fetch('/profile')
            .then((res) => {
                if (res.ok) {
                    res.json().then((session) =>{
                        setFriends(session.friends)
                    })
                } 
                else {
                    setFriends(null);
                }
            });
    }, []);

    useEffect(()=>{
        fetch("/membergroups")
        .then(req => req.json())
        .then(res => setGroups(res))
    },[])

    function handleClick(){
        fetch("/createevent",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "date": value,
                "invites_friends": guests,
                "invites_groups": choosenGroups.members
            })
        })
        .then(req =>{
            if(req.ok){
                req.json().then(res =>{
                    navigate(`/saved/${res.id}`)
                })
            }
            else{
                req.json().then(res => {
                    setErrors(res.error)
                })
            }
        })
    }


    //Calendar stuff
    // format(new Date(2023, 2, 12), 'yyyy-MM-dd')
    // const plans = [new Date(2023, 2, 2), new Date(2023, 2, 5)]

    // const datesToAddClassTo = [new Date(2023, 1, 2), new Date(2023, 1, 5)];

    // function isSameDay(a, b) {
    //     return differenceInCalendarDays(a, b) === 0;
    // }

    // function tileClassName({ date, view }) {
    //     // Add class to tiles in month view only
    //     if (view === 'month') {
    //       // Check if a date React-Calendar wants to check is on the list of dates to add class to
    //       if (datesToAddClassTo.find(dDate => isSameDay(dDate, date))) {
    //         return 'myClassName';
    //       }
    //     }
    // }

    function onCalendar(nextDate){
        setValue(nextDate)

    }
      

    return(
        <div className='bigscreen'>
            <div className="eventcontainer">
                <Calendar 
                    // tileClassName={tileClassName} 
                    className="entirecalendar" 
                    onChange={onCalendar} 
                    value={value} 
                />
                <div className="listoffriends"> 
                    <div className='listoffriendsandgroups' > Friends: </div>
                    {friends.map(friend =>{
                        return(
                            <EachFriend guests={guests} setGuests={setGuests} key={friend.id} friend={friend}/>
                        )
                    })}
                    <div className='listoffriendsandgroups' > Groups: </div>
                    {groups.map(group =>{
                        return(
                            <EachGroup guests={choosenGroups} setGuests={setChosenGuests} key={group.id} friend={group}/>
                        )
                    })}
                </div>
            </div>
            <div className="listofeventinfo"> Event Info:
                <div>{format(value, "EEE-MMMM-io-yyyy")}</div>
                <div> Guests: 
                    {guests.map(guest=>{
                        return(
                            ` ${guest.username},`
                        )
                    })}
                </div>
                <div> Group: 
                    <span> {choosenGroups.group_name}</span>
                </div>
            </div>
            {errors}
            <button onClick={handleClick} className='planeventbutton'> Plan Event! </button>
        </div>
    )
}

export default HomeCalendar

function EachGroup({friend, guests, setGuests}){

    const [choice, setChoice] = useState(()=>{
        if (guests===friend){
            return true
        }
        else{
            return false
        }
    })

    function handleClick(){
        setChoice(!choice)
        setGuests(friend)

        if(choice){
            setGuests({})
        }
    }


    return(
        <div onClick={handleClick} className={choice ? ('evenfriendlistselected'):('evenfriendlist')} >
            <div className="friendnameinvite" >{friend.group_name}</div>
            {choice ? (
                <div className="friendnameinviteclick">o</div>
            ):(
                <div className="friendnameinviteclick">x</div>
            )}
        </div>
    )
}