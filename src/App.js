import React, { useEffect, useContext }from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './pages/Home';
import Profile from './pages/Profile'
import Bookmark from './pages/Bookmark'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/profile/:id" element={<Profile />} />
        <Route exact path="/bookmark/:id" element={<Bookmark />} />
      </Routes>
    </Router>
  );
}

export default App;
