import React from 'react'
import './team.css';

const Stadium = (props) => {

  const team = props.team;
  console.log(team);

  if (Object.keys(team).length > 0) return (
    <div id = "stadium">
      <div className="title">{ team.venue }</div>
      <div className="wrapper">
        <div id="stadium__info">
          <div id="stadium__info__item">Capacity: { team.venue_capacity }</div>
          <div id="stadium__info__item">Address: { team.address }</div>
          <div id="stadium__info__item">Phone: </div>
          <div id="stadium__info__item">Website:</div>
        </div>
      </div>
    </div>
  )
}

export default Stadium