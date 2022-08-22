import React, { useState, useEffect } from 'react';
import './top_scorers.css'
import axios from 'axios';

const TopManagers = () => {

  const [assists, setAssists] = useState([]);

  const getData = () => {
    axios.get("http://127.0.0.1:5001/top_assists")
    .then(response => response.data)
    .then(response => { console.log(response.sort((a, b) => b.staff_impact - a.staff_impact).slice(0, 10)); setAssists(response.sort((a, b) => b.staff_impact - a.staff_impact).slice(0, 10)); })
    .catch((error) => console.log(error));
  }

  const getScorer = (e) => {
    document.getElementsByClassName("active-scorer")[2].classList.remove("active-scorer");
    e.target.parentNode.classList.add("active-scorer");
    e.target.parentNode.parentNode.getElementsByTagName("img")[0].src = assists.filter((item) => item.name === e.target.parentNode.childNodes[0].innerText)[0].face;
  }

  const getManagers = () => {
    return (assists.length > 0) 
    ? <> 
    <div id = "top_scorer"><img id="top-manager" src = { assists[0]["face"] } /></div>
    { assists.map((item, index) => {
      const isActive = (index === 0) ? "scorer active-scorer" : "scorer";
      return <div className = { isActive } onClick = { getScorer } >
        <div className="scorer__name">{ item["name"] }</div>
        <div className="scorer__goals">{ item["assists"] }</div>
        </div>
    }) }
    </>
    : null;
  }

  useEffect(() => {
    getData();
  }, [])
 
  return (
    <div id = "top__assists">
        <div className="subtitle">
            Top Assists
        </div>
        { getManagers() }
    </div>
  )
}

export default TopManagers