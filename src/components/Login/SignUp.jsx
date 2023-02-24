import FriendBar from "../home/FriendBar"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Signup({setUser}){

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [nickName, setNickname] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState()

    function handleSignUp(e){
            e.preventDefault()
            fetch("/signup",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": username,
                    "password": password,
                    "email": email,
                    "phone_number": `+${phoneNumber}`,
                    "nickname": nickName,
                    "password_confirmation": confirmPassword
                })
            })
            .then(req => {
                if(req.ok){
                    req.json().then((session) => {
                         setUser(session)
                        navigate("/")
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
        <div className="sidebarcontainer">
            <FriendBar/>
            <div className="logincontainerall">
            {errors ? (
                errors.map(error=>{
                    return(
                        <div className="signupErrors" >{error}</div>
                    )
                })
            ):(
                null
            )}
                <form onSubmit={handleSignUp}>
                    <label className="loginLabel">
                        Username:
                    <br />
                            <input className="loginInput" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </label>
                <br />
                <label className="loginLabel">
                        Email:
                    <br />
                            <input className="loginInput" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </label>
                <br />
                    <label className="loginLabel">
                        Password:
                    <br />
                            <input className="loginInput" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </label>
                <br />
                <label className="loginLabel">
                        PhoneNumber:
                    <br />
                            <input className="loginInput" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                    </label>
                <br />
                <label className="loginLabel">
                        Confirm Password:
                    <br />
                            <input className="loginInput" type="tel" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </label>
                <br />
                
                <label className="loginLabel">
                        NickName:
                    <br />
                            <input className="loginInput" type="text" value={nickName} onChange={(e) => setNickname(e.target.value)}/>
                    </label>
                <br />
                    <button className="loginButton" type="submit">Sign Up!</button>
                </form>
            </div>
        </div>
    )
}

export default Signup