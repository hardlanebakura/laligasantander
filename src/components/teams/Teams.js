import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './teams.css';
import axios from 'axios';

const Teams = () => {

  const [teams, setTeams] = useState([]);

  const getData = () => {
    axios.get("http://127.0.0.1:5001/teams")
    .then(response => response.data)
    .then(response => { console.log(response); setTeams(response); })
    .catch((error) => console.log(error));
  }

  const getTeams = () => {
    console.log(teams);
    return (teams.length > 0) 
    ? <>{ teams.map((team) => {
      return <div className = "team">
          <Link to = { `/teams/${team.id}` } ><img className="teams__img" src = { team["venue_img"] } />
            <div className="team__name">
              { team["name"] }
            </div>
          </Link>
        </div>
    }) } </>
    : null;
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div id = "teams">
      <div className="title">
        La Liga Santander Teams
      </div>
      { getTeams() }
    </div>
  )
}

export default Teams