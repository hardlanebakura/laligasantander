import React from 'react'
import './team.css';

const Squad = (props) => {

  const team = props.team;
  console.log(team);
  const goalkeepers = [];
  const defenders = [];
  const midfielders = [];
  const forwards = [];

  if (Object.keys(team).length > 0) { 
    for (const player of team.players) if (Object.keys(player).includes("goalkeeper_url")) goalkeepers.push(player);
    else { const position = player.player_positions.split(",")[0]; const c = position[position.length - 1]; (c === "B") ? defenders.push(player) : (c === "M") ? midfielders.push(player) : forwards.push(player); }

    return (
    <div id = "squad">
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
                  <div className="player__playpositions">GK</div>
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
                  <div className="player__playpositions">{ player.player_positions }</div>
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
                    <div className="player__playpositions">{ player.player_positions }</div>
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
                  <div className="player__playpositions">{ player.player_positions }</div>
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