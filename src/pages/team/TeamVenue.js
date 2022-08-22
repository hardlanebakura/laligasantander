import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './team.css';
import axios from 'axios';

const TeamVenue = () => {

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
    }, [])
  
    if (Object.keys(team) !== 0) return (
      <>
        <img id = "team__venue" src = { team.venue_img } />
        <div className="team__name">
            { team["name"] }
        </div>
      </>
    )
  }

export default TeamVenue