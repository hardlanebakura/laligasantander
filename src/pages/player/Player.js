import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import './player.css';
import axios from 'axios';

const Player = () => {

  const params = useParams();
  const [player, setPlayer] = useState({});
  const [values, setValues] = useState([]);
  const [allPositions, setAllPositions] = useState([]);
  const divElement = useCallback(node => {
    if (node !== null) {
      var arr = Array.from(document.getElementsByClassName("skill__stats")).concat(Array.from(document.getElementsByClassName("position__value"))).concat(Array.from(document.getElementsByClassName("additional-item__stats")));
      setAllPositions(document.getElementsByClassName("player-positions"));
      setValues(arr);
    }
  }, [])

  const getPositions = () => {
    if ("goalkeeper_url" in player) return <div>GK</div> 
    else {
      if (typeof(player.player_positions) === "string") player.player_positions = player.player_positions.split(", ");
      return player.player_positions.map((item) => {
        return <div className="player-positions positions">{ item }</div>
      })
    }
  }

  const getValue = (str) => {
    const v = parseFloat(str).toFixed(1);
    return (v >= 1000000) ? "€" + v / 1000000 + "M" : (v >= 1000) ? "€" + v / 1000 + "K" : "€" + v;
  }

  const getDate = (s) => {
    const d = new Date(s).toString().split(" ");
    return d[1] + " " + d[2] + ", " + d[3];
  }

  const getPlayerTraits = () => {
    const t = player.player_traits.split(", "); 
    return t.map((item) => {
      return <div>{ item }</div>
    })
  }

  const getAllValues = () => {  
    if (values.length > 0) {
      for (var value of values) { 
        const v = parseInt(value.innerText); 
        if (value.className === "position__value") value = value.parentNode;
        switch (true) {
          case v < 60:
            value.style.backgroundColor = "red";
            break;
          case v < 70:
            value.style.backgroundColor = "rgb(230, 182, 0)";
            break;
          case v < 80:
            value.style.backgroundColor = "rgb(102, 168, 15)";
            break;
          default: 
            value.style.backgroundColor = "rgb(12, 133, 57)";
        }
      }
    }
    for (const position of allPositions) { const c = position.innerText[position.innerText.length - 1];
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

  const getData = () => {
    axios.get(`http://127.0.0.1:5001/players/${params.id}/`)
    .then(response => response.data)
    .then(response => { console.log(response); setPlayer(response); })
    .catch(error => console.log(error));
  }

  useEffect(() => {
    getData();
    getAllValues();
  }, [values]);

  if (Object.keys(player).length > 0) return (
    <div id = "player" ref = { divElement } >
      <div className="player__row player__diagram">
        <div className="subtitle wrapper">RATING</div>
        <img src = { require("../images/field.png") } />
        <div className="forward-positions-1 a">
          <div className="player__position__1">
            <div className="position__header">LS</div>
            <div className="position__value">{ player.ls }</div>
          </div>
          <div className="player__position__1">
            <div className="position__header">ST</div>
            <div className="position__value">{ player.st }</div>
          </div>
          <div className="player__position__1">
            <div className="position__header">RS</div>
            <div className="position__value">{ player.rs }</div>
          </div>
        </div>
        <div className="forward-positions-2 a">
        <div className="player__position__1">
            <div className="position__header">LW</div>
            <div className="position__value">{ player.lw }</div>
          </div>
          <div className="player__position__1">
            <div className="position__header">LF</div>
            <div className="position__value">{ player.lf }</div>
          </div>
          <div className="player__position__1">
            <div className="position__header">CF</div>
            <div className="position__value">{ player.cf }</div>
          </div>
          <div className="player__position__1">
            <div className="position__header">RF</div>
            <div className="position__value">{ player.rf }</div>
          </div>
          <div className="player__position__1">
            <div className="position__header">RW</div>
            <div className="position__value">{ player.rw }</div>
          </div>
        </div>
        <div className="midfield-positions-1 a">
          <div className="player__position__1">
            <div className="position__header">LAM</div>
            <div className="position__value">{ player.lam }</div>
          </div>
          <div className="player__position__1">
            <div className="position__header">CAM</div>
            <div className="position__value">{ player.cam }</div>
          </div>
          <div className="player__position__1">
            <div className="position__header">RAM</div>
            <div className="position__value">{ player.ram }</div>
          </div>
        </div>
        <div className="midfield-positions-2 a">
          <div className="player__position__1">
              <div className="position__header">LM</div>
              <div className="position__value">{ player.lm }</div>
            </div>
            <div className="player__position__1">
              <div className="position__header">LCM</div>
              <div className="position__value">{ player.lcm }</div>
            </div>
            <div className="player__position__1">
              <div className="position__header">CM</div>
              <div className="position__value">{ player.cm }</div>
            </div>
            <div className="player__position__1">
              <div className="position__header">RCM</div>
              <div className="position__value">{ player.rcm }</div>
            </div>
            <div className="player__position__1">
              <div className="position__header">RM</div>
              <div className="position__value">{ player.rm }</div>
            </div>
        </div>
        <div className="defense-positions-1 a">
        <div className="player__position__1">
            <div className="position__header">LWB</div>
            <div className="position__value">{ player.lwb }</div>
          </div>
          <div className="player__position__1">
            <div className="position__header">LDM</div>
            <div className="position__value">{ player.ldm }</div>
          </div>
          <div className="player__position__1">
            <div className="position__header">CDM</div>
            <div className="position__value">{ player.rdm }</div>
          </div>
          <div className="player__position__1">
            <div className="position__header">RDM</div>
            <div className="position__value">{ player.rdm }</div>
          </div>
          <div className="player__position__1">
            <div className="position__header">RWB</div>
            <div className="position__value">{ player.rwb }</div>
          </div>
        </div>
        <div className="defense-positions-2 a">
        <div className="player__position__1">
            <div className="position__header">LB</div>
            <div className="position__value">{ player.lb }</div>
          </div>
          <div className="player__position__1">
            <div className="position__header">LCB</div>
            <div className="position__value">{ player.lcb }</div>
          </div>
          <div className="player__position__1">
            <div className="position__header">CB</div>
            <div className="position__value">{ player.cb }</div>
          </div>
          <div className="player__position__1">
            <div className="position__header">RCB</div>
            <div className="position__value">{ player.rcb }</div>
          </div>
          <div className="player__position__1">
            <div className="position__header">RB</div>
            <div className="position__value">{ player.rb }</div>
          </div>
        </div>
        <div className="gk-position a">
        <div className="player__position__1">
            <div className="position__header">GK</div>
            <div className="position__value">{ player.gk }</div>
          </div>
        </div>
        <div className="subtitle text__center diagram">PLAYER SKILLS</div>
        <div className="diagram">
          
        </div>
      </div>
      <div className="player__row player__info">
        <div className="basic-details">
          <div className="face"><img src = { player.face } /></div>
          <div className="basic-info">
            <div className="basic-info__name">{ player.long_name }</div>
            <div className="basic-info__details">
              <img className="player__flag" src = { player.nation_flag } />
              { getPositions() }
              <div>{ getDate(player.dob) }</div>
              <div>{ player.height_cm } cm</div>
              <div>{ player.weight_kg } kg</div>
            </div>
          </div>
        </div>
        <div className="additional-details">
          <div className="additional-item additional-item__rating">
            <div className="wrapper"><div className="additional-item__stats">{ player.overall }</div></div>
            <div className="additional-details__subtitle">Overall Rating</div>
          </div>
          <div className="additional-item">
            <div className="wrapper"><div className="additional-item__stats">{ player.potential }</div></div>
            <div className="additional-details__subtitle">Potential</div>
          </div>
          <div className="additional-item">
            <div className="wrapper"><div className="value-stats">{ getValue(player.value_eur) }</div></div>
            <div className="additional-details__subtitle">Value</div>
          </div>
          <div className="additional-item">
            <div className="wrapper"><div className="value-stats">{ getValue(player.wage_eur) }</div></div>
            <div className="additional-details__subtitle">Wage</div>
          </div>
        </div>
        <div className="player__profile-and-abilities">
          <div className="player__profile-and-abilities__row">
            <div className="subtitle">PROFILE</div>
            <div className="player__profile-info">
              <div className="player__profile-info__row">
                <div className="player__profile-info__row__title">Preferred foot</div>
                <div className="player__profile-info__row__stats">{ player.preferred_foot }</div>
              </div>
              <div className="player__profile-info__row">
                <div className="player__profile-info__row__title">Skill Moves</div>
                <div className="player__profile-info__row__stats">{ player.player_traits.split(", ").length }</div>
              </div>
              <div className="player__profile-info__row">
                <div className="player__profile-info__row__title">Work Rate</div>
                <div className="player__profile-info__row__stats">{ player.work_rate }</div>
              </div>
              <div className="player__profile-info__row">
                <div className="player__profile-info__row__title">Release clause</div>
                <div className="player__profile-info__row__stats">{ getValue(player.release_clause_eur) }</div>
              </div>
            </div>
          </div>
          <div className="player__profile-and-abilities__row">
            <div className="subtitle">PLAYER SPECIAL ABILITIES</div>
            <div className="gray text__center">{ getPlayerTraits() }</div>
          </div>
          <div className="player__profile-and-abilities__row">
            <div className="wrapper">
              <img className = "profile__nation" src = "https://cdn.sofifa.net/flags/es.png" />
              <div className="subtitle">{ player.club_name }</div>
            </div>
            <div className="club-logo wrapper"><img src = { player.club_logo } /></div>
            <div className="player__profile-club__row">
              <div className="player__profile-club__row__title">Position</div>
              <div className="player__profile-club__row__stats">{ player.club_position }</div>
            </div>
            <div className="player__profile-club__row">
              <div className="player__profile-club__row__title">Joined</div>
              <div className="player__profile-club__row__stats">{ getDate(player.club_joined) }</div>
            </div>
          </div>
        </div>
        <div className="player__skills">
          <div className="subtitle wrapper">SKILLS</div>
          <div className="skills">
            <div className="skills__row">
              <div className="skills__row__item">
                <div className="skill__title">Crossing</div>
                <div className="skill__stats">{ player.crossing }</div>
              </div>
              <div className="skills__row__item">
                <div className="skill__title">Pace</div>
                <div className="skill__stats">{ player.pace }</div>
              </div>
              <div className="skills__row__item">
                <div className="skill__title">Passing</div>
                <div className="skill__stats">{ player.passing}</div>
              </div>
              <div className="skills__row__item">
                <div className="skill__title">Shooting</div>
                <div className="skill__stats">{ player.shooting }</div>
              </div>
              <div className="skills__row__item">
                <div className="skill__title">Dribbling</div>
                <div className="skill__stats">{ player.dribbling }</div>
              </div>
              <div className="skills__row__item">
                <div className="skill__title">Skill Dribbling</div>
                <div className="skill__stats">{ player.skill_dribbling }</div>
              </div>
            </div>
            <div className="skills__row">
              <div className="skills__row__item">
                  <div className="skill__title">Heading accuracy</div>
                  <div className="skill__stats">{ player.heading_accuracy }</div>
              </div>
              <div className="skills__row__item">
                <div className="skill__title">Free kick accuracy</div>
                <div className="skill__stats">{ player.skill_fk_accuracy }</div>
              </div>
              <div className="skills__row__item">
                <div className="skill__title">Acceleration</div>
                <div className="skill__stats">{ player.acceleration }</div>
              </div>
              <div className="skills__row__item">
                <div className="skill__title">Sprint speed</div>
                <div className="skill__stats">{ player.sprint_speed }</div>
              </div>
              <div className="skills__row__item">
                <div className="skill__title">Agility</div>
                <div className="skill__stats">{ player.agility }</div>
              </div>
              <div className="skills__row__item">
                <div className="skill__title">Sliding tackle</div>
                <div className="skill__stats">{ player.sliding_tackle }</div>
              </div>
            </div>
            <div className="skills__row">
              <div className="skills__row__item">
                <div className="skill__title">Jumping</div>
                <div className="skill__stats">{ player.jumping }</div>
              </div>
              <div className="skills__row__item">
                <div className="skill__title">Stamina</div>
                <div className="skill__stats">{ player.stamina }</div>
              </div>
              <div className="skills__row__item">
                <div className="skill__title">Strength</div>
                <div className="skill__stats">{ player.strength }</div>
              </div>
              <div className="skills__row__item">
                <div className="skill__title">Power of shot</div>
                <div className="skill__stats">{ player.agility }</div>
              </div>
              <div className="skills__row__item">
                <div className="skill__title">Power of long shot</div>
                <div className="skill__stats">{ player.long_shots }</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="player__row latest__news">
        <div className="subtitle wrapper">
          LATEST NEWS
        </div>
        <div>
          <img className = "latest__news__img" src = { require("../../pages/images/news/Ben_Yedder.jpg") } />
          <div className="news-title">Bena Yedder</div>
        </div>
        <div>
          <img className = "latest__news__img" src = "https://www.getfootballnewsfrance.com/assets/fbl-fra-ligue1-reims-metz-806x537.jpg" />
          <div className="news-title">David Guion</div>
        </div>
        <div>
          <img className = "latest__news__img" src = { require("../../pages/images/news/Contract_Extensions.jpg") } />
          <div className="news-title">Contract Extensions</div>
        </div>
        <div>
          <img className = "latest__news__img" src = { require("../../pages/images/news/podcast_logo.png") } />
          <div className="news-title">Official Podcast</div>
        </div>
      </div>
    </div>
  )
}

export default Player