import React from 'react';
import './team.css';

const Stats = (props) => {

  const team = props.team;
  console.log(team);

  return (
    <div>
      <div className="title">{ team.name } statistics</div>
      <div id="team__general-stats">
        <div className="team__general-stats__item">
          <div className="subtitle">Top Scorers</div>
          <div id = "top_scorer"><img src = { team.top_scorers[0]["face"] } /></div>
          { team.top_scorers.map((item, index) => {
            const isActive = (index === 0) ? "scorer active-scorer" : "scorer";
            return <div className = { isActive } >
              <div className="scorer__name">{ item["name"] }</div>
              <div className="scorer__goals">{ item["goals"] }</div>
              </div>
          }) }
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