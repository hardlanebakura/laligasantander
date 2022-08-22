import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './team.css';
import axios from 'axios';

const Calendar = () => {
  
  const [matches, setMatches] = useState([]);
  const params = useParams();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get(`http://127.0.0.1:5001/teams/${params.id}/matches`)
    .then(response => response.data)
    .then(response => { console.log(response); setMatches(response); })
    .catch((error) => console.log(error));
  }

  return (
    <div>Calendar</div>
  )
}

export default Calendar