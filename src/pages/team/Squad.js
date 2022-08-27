import React, { useState, useCallback } from 'react'
import './team.css';

const Squad = (props) => {

  const team = props.team;
  const goalkeepers = [];
  const defenders = [];
  const midfielders = [];
  const forwards = [];

  const divElement = useCallback(node => {
    if (node !== null) {
      var arr = Array.from(document.getElementsByClassName("player__stats-overall")).concat(Array.from(document.getElementsByClassName("player__stats-potential")));
      for (const value of arr) {
        const v = parseInt(value.innerText); 
        switch (true) {
          case v < 60:
            value.style.backgroundColor = "red";
            break;
          case v < 70:
            value.style.backgroundColor = "rgb(230, 182, 0)";
            break;
          case v < 80:
            value.style.backgroundColor = "rgb(102, 168, 15)";
            break;
          default: 
            value.style.backgroundColor = "rgb(12, 133, 57)";
        }
      }
      var positions = Array.from(document.getElementsByClassName("player__stats-position"));
      for (const position of positions) {
        const c = position.innerText[position.innerText.length - 1];
        switch (true) {
          case (["S", "W", "C", "F", "T"].includes(c)):
            position.style.backgroundColor = "red";
            break;
          case (c === "M"):
            position.style.backgroundColor = "aquamarine";
            break;
          case (c === "B"):
            position.style.backgroundColor = "rgb(12, 133, 57)";
            break;
          default:
            position.style.backgroundColor = "yellow";
        }
      }
    }
  }, [])

  const getAllPositions = (positions) => {
    if (typeof(positions) === "string") positions = positions.split(", ");
    console.log(positions);
    return <div className="player__stats-positions">{ positions.map((position) => {
      return (
        <div className="player__stats-position">{ position }</div>
      )
    }) }</div>
  }

  if (Object.keys(team).length > 0) { 
    for (const player of team.players) if (Object.keys(player).includes("goalkeeper_url")) goalkeepers.push(player);
    else { const position = player.player_positions.split(",")[0]; const c = position[position.length - 1]; (c === "B") ? defenders.push(player) : (c === "M") ? midfielders.push(player) : forwards.push(player); }

    return (
    <div id = "squad" ref = { divElement } >
      <div className="subtitle wrapper">Goalkeeepers</div>
      <div className="squad">
        { goalkeepers.map((player) => {
          return (
            <div className="player">
              <img className="player__img" src = { player.face } />
              <div className="player__stats">
                <div className="player__stats-name">
                  <div className="player__flag"><img src = { player.nation_flag } /></div>
                  <div className="player__long_name">{ player.long_name }</div>
                </div>
                <div className="player__stats-positions">
                  <div className="player__stats-overall">{ player.overall }</div>
                  <div className="player__stats-potential">{ player.potential }</div>
                  <div className="player__playpositions player__stats-position">GK</div>
                </div>
              </div>
            </div>
          )
        }) }
      </div>
      <div className="subtitle wrapper">Defenders</div>
      <div className="squad">
        { defenders.map((player) => {
          return (
            <div className="player">
              <img className="player__img" src = { player.face } />
              <div className="player__stats">
                <div className="player__stats-name">
                  <div className="player__flag"><img src = { player.nation_flag } /></div>
                  <div className="player__long_name">{ player.long_name }</div>
                </div>
                <div className="player__stats-positions">
                  <div className="player__stats-overall">{ player.overall }</div>
                  <div className="player__stats-potential">{ player.potential }</div>
                  <div className="player__playpositions">{ getAllPositions(player.player_positions) }</div>
                </div>
              </div>
            </div>
          )
        }) }
      </div>
      <div className="subtitle wrapper">Midfielders</div>
      <div className="squad">
        { midfielders.map((player) => {
            return (
              <div className="player">
                <img className="player__img" src = { player.face } />
                <div className="player__stats">
                  <div className="player__stats-name">
                    <div className="player__flag"><img src = { player.nation_flag } /></div>
                    <div className="player__long_name">{ player.long_name }</div>
                  </div>
                  <div className="player__stats-positions">
                    <div className="player__stats-overall">{ player.overall }</div>
                    <div className="player__stats-potential">{ player.potential }</div>
                    <div className="player__playpositions">{ getAllPositions(player.player_positions) }</div>
                  </div>
                </div>
            </div>
            )
          }) }
      </div>
      <div className="subtitle wrapper">Forwards</div>
      <div className="squad">
        { forwards.map((player) => {
          return (
            <div className="player">
              <img className="player__img" src = { player.face } />
              <div className="player__stats">
                <div className="player__stats-name">
                  <div className="player__flag"><img src = { player.nation_flag } /></div>
                  <div className="player__long_name">{ player.long_name }</div>
                </div>
                <div className="player__stats-positions">
                  <div className="player__stats-overall">{ player.overall }</div>
                  <div className="player__stats-potential">{ player.potential }</div>
                  <div className="player__playpositions">{ getAllPositions(player.player_positions) }</div>
                </div>
              </div>
            </div>
          )
        }) }
      </div>
    </div>
  )
  }
}

export default Squad