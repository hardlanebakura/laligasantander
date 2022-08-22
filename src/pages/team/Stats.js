import React from 'react';
import './team.css';

const Stats = (props) => {

  const team = props.team;

  return (
    <div>Stats
      <div className="title">{ team.name } statistics</div>
      <div id="team__general-stats">
        <div className="team__general-stats__item">
          <div className="subtitle">Top Scorers</div>
        </div>
        <div className="team__general-stats__item">
          <div className="subtitle">
            General
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats