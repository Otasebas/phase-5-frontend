import { Calendar } from 'react-calendar';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { differenceInCalendarDays } from 'date-fns';
import { format } from 'date-fns'

function HomeCalendar(){

    const navigate = useNavigate()

    const [value, setValue] = useState(new Date())

    const [friends, setFriends] = useState([])
    const [guests, setGuests] = useState([])

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

    function handleClick(){
        navigate("/")
    }


    //Calendar stuff
    // format(new Date(2023, 2, 12), 'yyyy-MM-dd')
    // const plans = [new Date(2023, 2, 2), new Date(2023, 2, 5)]

    const datesToAddClassTo = [new Date(2023, 1, 2), new Date(2023, 1, 5)];

    function isSameDay(a, b) {
        return differenceInCalendarDays(a, b) === 0;
    }

    function tileClassName({ date, view }) {
        // Add class to tiles in month view only
        if (view === 'month') {
          // Check if a date React-Calendar wants to check is on the list of dates to add class to
          if (datesToAddClassTo.find(dDate => isSameDay(dDate, date))) {
            return 'myClassName';
          }
        }
    }

    function onCalendar(nextDate){
        setValue(nextDate)

    }
      

    return(
        <div className='bigscreen'>
            <div className="eventcontainer">
                <Calendar 
                    tileClassName={tileClassName} 
                    className="entirecalendar" 
                    onChange={onCalendar} 
                    value={value} 
                />
                <div className="listoffriends"> 
                    <div className='evenfriendlistselected' > Friends: </div>
                    {friends.map(friend =>{
                        return(
                            <EachFriend guests={guests} setGuests={setGuests} key={friend.id} friend={friend}/>
                        )
                    })}
                </div>
            </div>
            <div className="listofeventinfo"> Event Info:
                <div>{value.toString()}</div>
                <div> Guests: 
                    {guests.map(guest=>{
                        return(
                            ` ${guest.username},`
                        )
                    })}
                </div>
            </div>
            <button onClick={handleClick} className='planeventbutton'> Plan Event! </button>
        </div>
    )
}

export default HomeCalendar

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
            <div>{friend.username}</div>
            {choice ? (
                <div >o</div>
            ):(
                <div >x</div>
            )}
        </div>
    )
}