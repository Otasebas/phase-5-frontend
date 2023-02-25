import { useState } from "react"

function AddFriend({user}){

    const[username, setUsername] = useState("")
    const[errors, setErrors] = useState("")

    function handleRequest(e){
        e.preventDefault()
        fetch("/request",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "requestor_id": user.id,
                "friends?": false
            })
        })
        .then(req => {
            if(req.ok){
                req.json().then(setErrors("Request Sent!"))
            }
            else{
                req.json().then((session) => {
                    setErrors(session.error)
                })
            }
        })
    }

    return(
        <div className="friendcontainer">
            {errors ? (
                <div className="signupErrors">{errors}</div>
            ) : (
                null
            )}
    <form onSubmit={handleRequest}>
        <label className="loginLabel">
            Friend Username:
            <br />
            <input className="loginInput" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <button className="loginButton" type="submit">Send Friend Request</button>
    </form>
</div>
    )
}

export default AddFriend