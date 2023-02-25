import FriendBar from "../home/FriendBar"
import PersonalCalander from './PersonalCalendar.jsx';

function PersonalDates({user}){

    return(
        <div className="sidebarcontainer">
            <FriendBar />
            <PersonalCalander user={user}/>
        </div>
    )
}

export default PersonalDates