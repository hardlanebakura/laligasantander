import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import Records from './Records';
import './players.css';
import axios from 'axios';

const Players = () => {

  const [players, setPlayers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 40;

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = players.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(players.length / recordsPerPage);

  const getData = () => {
    axios.get("http://127.0.0.1:5001/players")
    .then(response => response.data)
    .then(response => { console.log(response); setPlayers(response); })
    .catch((error) => console.log(error));
  }

  useEffect(() => {
    getData();
  }, []);

  const getPlayers = () => {
    return (players.length > 0) 
    ? <table id = "table__players" className = "wrapper">
        <thead>
          <tr>
            <th><div className = "player__name">Name</div></th>
          </tr>
        </thead>
        <tbody>
          { players.map((player) => {
            return (
              <tr>
                <td>{ player.long_name }</td>
              </tr>  
            )
          }) }
        </tbody>
      </table>
    : null;
  }

  return (
    <>
    <div id = "players">
      <div className="title">
        La Liga Santander players
      </div>
    </div>
    <div className='container mt-5'>
          <Records data={currentRecords}/>
          <Pagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
          />
      </div>
    </>
  )
}

export default Players