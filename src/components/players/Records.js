import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Records = ({data}) => {
    
  const navigate = useNavigate();

  const getPlayer = (e) => {
    navigate(`${(data.filter((item) => item.long_name === e.target.parentNode.childNodes[0].innerText)[0].id)}`);
  }

  const positionsElement = useCallback(node => {
    if (node !== null) {
      const positions = document.getElementsByClassName("position");
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

  const getPlayersPositions = (player) => {
    if (Object.keys(player).includes("goalkeeper_url")) return <div className="position gk">GK</div>;
    const playerPositions = player.player_positions.split(", ");
    return playerPositions.map((position) => {
        return (
            <div className="position">{ position }</div>
        )
    })
  }

  return (  
    <div className = "wrapper">
        <table className="table">
            <tbody>
                {data.map(player => (
                    <tr onClick = { getPlayer } >
                        <td><div><a href = { player.id }>{ player.long_name }</a></div></td>
                        <td><img className="players__face" src = { player.face } /></td>
                        <td><div>{ player.overall }</div></td>
                        <td ref = { positionsElement } ><div className = "player__positions">{ getPlayersPositions(player) }</div></td>
                        <td><img className="players__logo" src = { player.club_logo } /></td>
                        <td><div>{ player.club_name }</div></td>
                        <td></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  ) 
}

export default Records  