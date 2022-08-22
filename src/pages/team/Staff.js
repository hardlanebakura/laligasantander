import React from 'react'
import './team.css';

const Staff = (props) => {

  const team = props.team;

  return (
    <div>
      <div className="title">Coach</div>
      <div id = "staff" className="wrapper">
        <div id = "staff__img">
          <img src = { team.staff_img } />
        </div>
        <div id = "staff__info">
          <div id = "staff__name">{ team.staff }</div>
          <div id = "staff__dob">{ team.staff_dob }</div>
        </div>
      </div>
    </div>
  )
}

export default Staff