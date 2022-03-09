import React, { useEffect, useContext }from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import './App.css'

import Home from './pages/Home';
import Profile from './pages/Profile'
import Bookmark from './pages/Bookmark'
import Journey from './pages/Journey'
import AddJourney from './pages/AddJourney';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/profile/" element={<Profile />} />
        <Route exact path="/bookmark/" element={<Bookmark />} />
        <Route exact path="/add-journey/" element={<AddJourney />} />
        <Route exact path="/journey/:id" element={<Journey />} />
      </Routes>
    </Router>
  );
}

export default App;
