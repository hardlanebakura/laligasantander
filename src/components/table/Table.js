import React, { useState, useEffect } from 'react';
import './table.css';
import WinIcon from '../images/winicon.svg';
import DrawIcon from '../images/drawicon.svg';
import LoseIcon from '../images/loseicon.svg';
import axios from 'axios';

const Table = () => {

  const [rankings, setRankings] = useState([]);

  const getData = () => {
    axios.get("http://127.0.0.1:5001/")
    .then(response => response.data)
    .then(response => { console.log(response); setRankings(response); })
    .catch((error) => console.log(error));
  }

  const getLastFiveMatches = (arr) => {
    arr = arr.split(",");
    return arr.map((item) => {
      const iconSource = (item === "W") ? WinIcon : (item === "D") ? DrawIcon : LoseIcon;
      return (
        <div>
          <img src = { iconSource } />
        </div>
      )
    })
  }

  useEffect(() => {
    getData();
  }, []);

  const getHeader = () => {
    if (rankings.length > 0) {
      console.log(Object.keys(rankings[0]));
      return <>
      <th>#</th>
      <th>&nbsp;</th>
      <th id = "table__header__name">Club</th>
      <th>PM</th>
      <th>W</th>
      <th>D</th>
      <th>L</th>
      <th>Pts</th>
      <th>GS</th>
      <th>GC</th>
      <th>GD</th>
      <th>Last 5 matches</th>
      </>
    }
  }

  const getAllFields = () => {
    if (rankings.length > 0) {
      console.log(rankings[0]);
      return <>
      { rankings.map((item, index) => {
        return <>
        <tr>
          <td><div>{ index + 1 }</div></td>
          <td><div className="club__img"><img src = { item["crest"] } /></div></td>
          <td><div className="club__name">{ item["team_name"] }</div></td>
          <td><div>{ item["points"] }</div></td>
          <td><div className="club__w">{ item["wins"] }</div></td>
          <td><div className="club__d">{ item["draws"] }</div></td>
          <td><div className="club__l">{ item["loses"] }</div></td>
          <td><div className="club__pts">{ item["points"] }</div></td>
          <td><div className="club__gs">{ item["goals_scored"] }</div></td>
          <td><div className="club__gc">{ item["goals_conceeded"] }</div></td>
          <td><div className="club__gd">{ item["goal_difference"] }</div></td>
          <td><div className="club__last_5">{ getLastFiveMatches(item["last_5"]) }</div></td>
        </tr>
        </>
      }) }
      </>
    }
  }

  return (
    <div id = "table-wrapper">
      <table id = "league-table">
          <thead>
          <tr>
            { getHeader() }
          </tr>
          </thead>
          <tbody>
            { getAllFields() }
          </tbody>
      </table>
    </div>
  )
}

export default Table