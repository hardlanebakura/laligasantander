import React, { useState, useEffect } from 'react';
import './top_scorers.css'
import axios from 'axios';

const TopScorers = () => {

  const [topScorers, setTopScorers] = useState([]);

  const getData = () => {
    axios.get("http://127.0.0.1:5001/top_scorers")
    .then(response => response.data)
    .then(response => { console.log(response); setTopScorers(response.slice(0, 10)); })
    .catch((error) => console.log(error));
  }

  const getScorer = (e) => {
    const scorerName = e.target.parentNode.getElementsByClassName("scorer__name")[0].innerText;
    document.getElementById("top_scorer").getElementsByTagName("img")[0].setAttribute("src", topScorers.filter((scorer) => scorer.name === scorerName)[0].face)
    document.getElementsByClassName("active-scorer")[0].classList.remove("active-scorer")
    console.log(e.target.parentNode);
    e.target.parentNode.classList.add("active-scorer");
  }

  const getTopScorers = () => {
    return (topScorers.length > 0) 
    ? <>
    <div id = "top_scorer"><img src = { topScorers[0]["face"] } /></div>
    { topScorers.map((item, index) => {
      const isActive = (index === 0) ? "scorer active-scorer" : "scorer";
      return <div className = { isActive } onClick = { getScorer }>
        <div className="scorer__name">{ item["name"] }</div>
        <div className="scorer__goals">{ item["goals"] }</div>
        </div>
    }) }
    </>
    : null;
  }

  useEffect(() => {
    getData();
  }, []);

  return (
      <div id = "top-scorers">
        <div className = "subtitle">Top Scorers</div>
        <div>{ getTopScorers() }</div>
    </div>
  )
}

export default TopScorers