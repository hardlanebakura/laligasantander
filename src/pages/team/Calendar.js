import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './team.css';
import axios from 'axios';

const Calendar = () => {
  
  const [matches, setMatches] = useState([]);
  const params = useParams();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get(`http://127.0.0.1:5001/teams/${params.id}/matches`)
    .then(response => response.data)
    .then(response => { console.log(response); setMatches(response); })
    .catch((error) => console.log(error));
  }

  if (matches.length > 0) return (
      <>
      <div className="title">MATCHES</div>
      <div id = "team__matches-list">
        { matches.map((item) => {
          return (
            <div className="matches-list__match">
              <div className="matchday">Matchday { item.matchday }</div>
              <div className="match__home_team_crest"><img src = { item.home_team_crest } /></div>
              <div className="match__home_team_name">{ item.home_team }</div>
              <div className="match__home_team_goals">{ item.home_team_goals }</div>
              <div className="match__away_team_goals">{ item.away_team_goals }</div>
              <div className="match__away_team_crest"><img src = { item.away_team_crest } /></div>
              <div className="match__away_team_name">{ item.away_team }</div>
            </div>
          )
        }) }
      </div>
      </>
  )
}

export default Calendar