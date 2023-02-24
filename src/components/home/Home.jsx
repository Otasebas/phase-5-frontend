import FriendBar from "./FriendBar"
import { useNavigate } from "react-router-dom"

function Home({user}){
    
    const navigate = useNavigate()

    function handleLogIn(){
        navigate("/login")
    }

    function handleSignUp(){
        navigate("signup")
    }
    
    return(
        <div className="sidebarcontainer">
            <FriendBar />
            {user ? (
                <div className="bigscreen"> Logged in </div>
            ):(
                <div className="bigscreen">
                    <h1> Log In Or Sign Up Now To Plan An Event!</h1>
                    <button onClick={handleLogIn} className="header-button"> Log in </button>
                    <h3 onClick={handleSignUp}> Sign up </h3>
                </div>
            )}
        </div>
    )
}

export default Home