import React from 'react'
import './team.css';

const Honours = (props) => {

  const team = props.team;
  console.log(team.trophies);

  const getTrophies = (trophy, numbers) => {
    var s = "";
    for (let i = 0; i < trophy.length; i++) {
      s += (trophy[i-1] === " ") ? trophy[i].toUpperCase() : trophy[i];
    }
    s = s.replaceAll(" ", "") + "Trophy";
    console.log(s);
    s = trophy.replaceAll(" ", "_").toLowerCase() + "_trophy.png";
    console.log(s);
    return [...Array(numbers)].map((item) => {
      return (
        <div className="trophies__row__trophy"><img src = { require(`../images/${s}`) } alt = "" /></div>
      )
    })
  }

  if (Object.keys(team).length > 0) return (
    <div>
      <div className="title">{ team.name } trophies</div>
      <div id = "trophies">
      { Object.entries(team.trophies).map(([k, v]) => {
      return (
        <>
          <div className="trophies__row">
            { getTrophies(k, v) }
          </div>
          <div className="trophies__name">{ k }</div>
        </>
      )
    }) }
      </div>
    </div>
  )
}

export default Honours