import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useParams } from 'react-router-dom';
import './team.css';
import axios from 'axios';
import Navbar from './navbar/Navbar';
import General from './General';
import Calendar from './Calendar';
import Stadium from './Stadium';
import Squad from './Squad';
import Stats from './Stats';
import Staff from './Staff';
import Honours from './Honours';

const Team = () => {

  const params = useParams();

  const [team, setTeam] = useState({});

  const getParam = () => {
    axios.get(`http://127.0.0.1:5001/teams/${params.id}`)
    .then(response => response.data)
    .then(response => { console.log(response); setTeam(response); })
    .catch((error) => console.log(error));
  }

  useEffect(() => {
    getParam();
    const currentLink = (window.location.pathname.split("/")[3]);
    const navbarItem = (currentLink === undefined) ? "general" : (currentLink === "calendar") ? "calendar" : (currentLink === "stadium") ? "stadium" : (currentLink === "squad") ? "squad" : (currentLink === "staff") ? "staff" : (currentLink === "stats") ? "stats" : "honours";
    console.log(navbarItem);
    for (const item of document.getElementsByClassName("team__navbar__menu-item")) { item.classList.remove("active-navbar"); if (item.innerText === navbarItem.toUpperCase()) item.classList.add("active-navbar"); }
  }, [window.location.pathname])

  if (Object.keys(team) !== 0) return (
    <>
      <div>Team</div>
      <img id = "team__venue" src = { team.venue_img } />
      <div className="team__name">
        { team["name"] }
      </div>
      <Navbar />
      <Routes>
        <Route path = "/" element = {<General team = { team } />} />
        <Route path = "/calendar" element = {<Calendar team = { team } />} />
        <Route path = "/stadium" element = {<Stadium team = { team } />} />
        <Route path = "/staff" element = {<Staff team = { team } />} />
        <Route path = "/squad" element = {<Squad team = { team } />} />
        <Route path = "/stats" element = {<Stats team = { team } />} />
        <Route path = "/honours" element = {<Honours team = { team } />} />
      </Routes>
    </>
  )
}

export default Team