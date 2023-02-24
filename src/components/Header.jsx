import { useNavigate } from "react-router-dom"

function Header({user, setUser}){

    const navigate = useNavigate()

    function handleLogin(){
        navigate("/login")
    }

    function handleHome(){
        navigate("/")
    }

    function handleFriends(){
        navigate("/friends")
    }

    function handleDelete(e){
        e.preventDefault()
        if(window.confirm("Are you sure you want to remove friend?")){
            setUser(null)
            fetch(`/logout`,{ method: 'DELETE' })
            .then(req => req.json())
            .then()
            .catch(error => console.error("Error:", error));
            navigate("/")
        }
    }

    return(
        <div className="header-bar">
            <div className="image-container">
                <img onClick={handleHome} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPMAAADQCAMAAADlEKeVAAAAA1BMVEXuI1tGFj9tAAAASElEQVR4nO3BAQ0AAADCoPdPbQ43oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+DcZAAAFpTHXUAAAAAElFTkSuQmCC" alt="logo"></img>
            </div>
            
                {user ? (
                    <div className="button-container">
                        <button className="header-button">Calander</button>
                        <button className="header-button">Groups</button>
                        <button className="header-button">Events</button>
                        <button onClick={handleFriends} className="header-button">Friends</button>
                        <button onClick={handleDelete} className="header-button"> Log Out </button>
                    </div>
                ):(
                    <button onClick={handleLogin} className="header-button"> Log in </button>
                )}
            
        </div>
    )
}

export default Header