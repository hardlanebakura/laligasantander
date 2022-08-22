import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Navbar = () => {
  return (
    <div id = "navbar">
        <div className="navbar__menu-item">
          <Link to = "/news">News</Link>
        </div>
        <div className="navbar__menu-item">
          <Link to = "/players">Players</Link>
        </div>
        <div className="navbar__menu-item">
          <Link to = "/teams">Teams</Link>
        </div>
        <div className="navbar__menu-item">
          <Link to = "/">Statistics</Link>
        </div>
    </div>
  )
}

export default Navbar