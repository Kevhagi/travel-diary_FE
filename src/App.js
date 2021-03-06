import React, { useEffect, useContext }from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

//Pages
import Home from './pages/Home'
import Profile from './pages/Profile'
import Bookmark from './pages/Bookmark'
import Journey from './pages/Journey'
import AddJourney from './pages/AddJourney'
import EditJourney from './pages/EditJourney'

//Global style
import './App.css'

//UseContext
import { UserContext } from "./context/userContext"

//API
import { API, setAuthToken } from "./config/api";

//Private Route
import PrivateRoute from './PrivateRoute'

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [state, dispatch] = useContext(UserContext);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 400) {
        return dispatch({
          type: "AUTH_ERROR"
        });
      }
  
      let payload = response.data.user

      payload.token = localStorage.token;
      
      dispatch({
        type: "USER_SUCCESS",
        payload
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkUser()
  }, [])

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/journey/:id" element={<Journey />} />
        <Route exact path="/profile/" element={<Profile />} />
        <Route exact path="/" element={<PrivateRoute />}> 
          <Route exact path="/bookmark/" element={<Bookmark />} />
          <Route exact path="/add-journey/" element={<AddJourney />} />
          <Route exact path="/edit-journey/:id" element={<EditJourney />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
