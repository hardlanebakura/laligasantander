import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Records = ({data}) => {
    
  const navigate = useNavigate();

  const getPlayer = (e) => {
    navigate(`${(data.filter((item) => item.long_name === e.target.parentNode.childNodes[0].innerText)[0].id)}`);
  }

  const getPlayersPositions = (player) => {
    if (Object.keys(player).includes("goalkeeper_url")) return <div className="gk">GK</div>;
    else {
        console.log(player);
        console.log(player.player_positions);
        const playerPositions = player.player_positions.split(", ");
        return playerPositions.map((position) => {
            const char = position[position.length - 1];
            //console.log(char);
            return (
                char
            )
        })
    } 
  }

  return (  
    <div className = "wrapper">
        <table className="table">
            <tbody>
                {data.map(player => (
                    <tr onClick = { getPlayer } >
                        <td><div>{ player.long_name }</div></td>
                        <td><img className="players__face" src = { player.face } /></td>
                        <td><div>{ player.overall }</div></td>
                        <td><div className = "player__positions">{ getPlayersPositions(player) }</div></td>
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