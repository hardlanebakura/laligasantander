import React from 'react';
import './navbar.css';
import { Link, useParams } from 'react-router-dom';


const Navbar = () => {
    
  const params = useParams();

  return (
    <div id = "team__navbar">
        <Link to = { "/teams/" + params.id } ><div className="team__navbar__menu-item">General</div></Link>
        <Link to = { "/teams/" + params.id + "/calendar" } ><div className="team__navbar__menu-item">Calendar</div></Link>
        <Link to = { "/teams/" + params.id + "/stadium"  } ><div className="team__navbar__menu-item">Stadium</div></Link>
        <Link to = { "/teams/" + params.id + "/squad"  } ><div className="team__navbar__menu-item">Squad</div></Link>
        <Link to = { "/teams/" + params.id + "/staff"  } ><div className="team__navbar__menu-item">Staff</div></Link>
        <Link to = { "/teams/" + params.id + "/stats"  } ><div className="team__navbar__menu-item">Stats</div></Link>
        <Link to = { "/teams/" + params.id + "/honours"  } ><div className="team__navbar__menu-item">Honours</div></Link>
    </div>
  )
}

export default Navbar