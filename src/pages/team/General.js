import React from 'react';
import './team.css';

const General = (props) => {

  const team = props.team;
  console.log(team);

  if (Object.keys(team).length > 0) return (
    <div id = "general">
      <div className="title">{ team.name }</div>
      <div id="team__general-stats">
        <div className="team__general-stats__item">
          <div className="subtitle">Top Scorers</div>
        </div>
        <div className="team__general-stats__item">
          <div className="subtitle">
            General
          </div>
        </div>
        <div className="team__general-stats__item">
          
        </div>
      </div>
    </div>
  )
}

export default General