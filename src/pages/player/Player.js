import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './player.css';
import axios from 'axios';

const Player = () => {

  const params = useParams();
  console.log(params.id);

  const getData = () => {
    axios.get("http://127.0.0.1/players/")
  }

  return (
    <div>Player</div>
  )
}

export default Player