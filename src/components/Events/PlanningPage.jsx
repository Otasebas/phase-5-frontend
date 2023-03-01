import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

function PlanningPage(){

    const {id} = useParams()

    const [event, setEvent] = useState({})
    const [timeStart, setTimeStart] = useState("")
    const [timeEnd, setTimeEnd] = useState("")
    const [nameOfEvent, setNameOfEvent] = useState("")
    const [description, setDescription] = useState("")

    const navigate = useNavigate()

    useEffect(()=>{
        fetch(`/events/${id}`)
        .then(req => req.json())
        .then(res => {
            setEvent(res)
            setTimeStart(res.start_time)
            setTimeEnd(res.end_time)
        })

    },[id])

    function handleSave(){
        fetch(`/saveevent/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name_of_event": nameOfEvent,
                "start_time": timeStart,
                "end_time": timeEnd,
                "description": description,
            })
        })
        .then(req => {
            if(req.ok){
                req.json().then((session) => {
                    setEvent(session)
                    navigate(`/saved/${session.id}`)
                })
            }
        })
    }

    function handleRemove(){
        fetch(`/personaldates/${id}`,{ method: 'DELETE' })
            .then(()=>{
                navigate("/")
            })
    }

    return(
        <div className="sidebarcontainer">
          <div className="third">
            <div className="loginLabel">Time Start </div>
                    <br />
                <input className="loginInput" type="time" value={timeStart} onChange={(e)=>{setTimeStart(e.target.value)}}/>
                    <br />
                <div className="loginLabel">
                    Time End
                </div>  
                    <br />
                <input className="loginInput" type="time" value={timeEnd} onChange={(e)=>{setTimeEnd(e.target.value)}}/>
                <br />
                <button className="loginButton" onClick={handleRemove} > Back </button>
          </div>
          <div className="middlethird">
          </div>
          <div className="third">
            <div className="loginLabel" >Event Name:</div>
                <br />
                <input className="loginInput" type="text" value={nameOfEvent} onChange={(e)=>{setNameOfEvent(e.target.value)}}/>
                <br />
            <div className="loginLabel">Description of Event:</div>
            <br />
            <input className="loginInput" type="text" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
            <div>{description.length}/ 150</div>
            <br />
            <button  className="loginButton" onClick={handleSave} > Save </button>
          </div>
        </div>
    )
}

export default PlanningPage