import './App.css';
import Header from './components/Header';
import Home from './components/home/Home';
import Login from './components/Login/Login';
import Signup from './components/Login/SignUp';
import FriendsPage from './components/Friends/FriendsPage';
import ProfileBar from './components/ProfileBar';
import AddFriend from './components/Friends/AddFriend';
import Pending from './components/Friends/Pending';
import Requests from './components/Friends/Requests';
import PersonalDates from './components/Calendar/PersonalDates';
import GroupsPage from './components/Groups/GroupsPage';
import { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch('/profile')
      .then((res) => {
        if (res.ok) {
          res.json().then((session) => setUser(session))
        } 
        else {
          setUser(null);
        }
      });
  }, []);
  
  const router = createBrowserRouter([
    {
      path:"/*",
      element: <h1>404 not found</h1>
    },
    {
      path: "/",
      element: 
      <div>
        <Header user={user} setUser={setUser}/>
        <Home user={user}/>
      </div>
    },
    {
      path:"/login",
      element: 
        <div>
          <Header user={user} setUser={setUser}/>
          <Login setUser={setUser}/>
        </div>
    },
    {
      path: "/signup",
      element: 
        <div>
          <Header user={user} setUser={setUser}/>
          <Signup setUser={setUser}/>
        </div>
    },
    {
      path: "/personalcalander",
      element:
        <div>
          <Header user={user} setUser={setUser}/>
          <PersonalDates user={user} />
        </div>
    },
    {
      path: "/friends",
      element:
        <div>
          <Header user={user} setUser={setUser}/>
          <div className="sidebarcontainer">
            <ProfileBar />
            <FriendsPage user={user}/>
          </div>
        </div>
    },
    {
      path: "/addfriend",
      element:
        <div>
          <Header user={user} setUser={setUser}/>
          <div className="sidebarcontainer">
            <ProfileBar />
            <AddFriend user={user}/>
          </div>
        </div>
    },
    {
      path: "/pending",
      element:
        <div>
        <Header user={user} setUser={setUser}/>
          <div className="sidebarcontainer">
            <ProfileBar />
            <Pending />
          </div>
        </div>
    },
    {
      path: "/requests",
      element:
        <div>
        <Header user={user} setUser={setUser}/>
          <div className="sidebarcontainer">
            <ProfileBar />
            <Requests />
          </div>
        </div>
    },
    {
      path: "/groups",
      element:
        <div>
        <Header user={user} setUser={setUser}/>
            <GroupsPage />
        </div>
    }
  ]);
  
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
