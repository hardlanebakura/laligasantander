import React, { useState, useEffect } from 'react';
import './top_scorers.css'
import axios from 'axios';

const TopManagers = () => {

  const [managers, setManagers] = useState([]);

  const getData = () => {
    axios.get("http://127.0.0.1:5001/teams")
    .then(response => response.data)
    .then(response => { setManagers(topManagers(response.sort((a, b) => b.staff_impact - a.staff_impact).slice(0, 10))); })
    .catch((error) => console.log(error));
  }

  const getScorer = (e) => {
    document.getElementsByClassName("active-scorer")[1].classList.remove("active-scorer");
    e.target.parentNode.classList.add("active-scorer");
    e.target.parentNode.parentNode.getElementsByTagName("img")[0].src = managers.filter((item) => item.staff === e.target.parentNode.childNodes[0].innerText)[0].staff_img;
  }

  const topManagers = (arr) => {
    for (var item of arr) if (item.staff.split(" ").length > 1) arr[arr.indexOf(item)].staff = item.staff.split(" ")[0][0] + ". " + item.staff.split(" ")[1];
    return arr;
  }

  const getManagers = () => {
    return (managers.length > 0) 
    ? <> 
    <div id = "top_scorer"><img id="top-manager" src = { managers[0]["staff_img"] } /></div>
    { managers.map((item, index) => {
      const isActive = (index === 0) ? "scorer active-scorer" : "scorer";
      return <div className = { isActive } onClick = { getScorer } >
        <div className="scorer__name">{ item["staff"] }</div>
        <div className="scorer__goals">{ item["staff_impact"] }</div>
        </div>
    }) }
    </>
    : null;
  }

  useEffect(() => {
    getData();
  }, [])
 
  return (
    <div id = "top__managers">
        <div className="subtitle">
            Top Managers
        </div>
        { getManagers() }
    </div>
  )
}

export default TopManagers