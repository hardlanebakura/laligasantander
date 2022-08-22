import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import './index.css';
import App from './App';
import { Header, News, Players, Teams, Footer } from './components';
import { Player, Team } from './pages';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path = "/" element = {<Layout />} >
        <Route path = "/" element = {<App />} />
        <Route path = "/news" element = {<News />} />
        <Route path = "/teams" element = {<Teams />} />
        <Route path = "/players" element = {<Players />} />
        <Route path = "/teams/:id/*" element = {<Team />} />
        <Route path = "/players/:id" element = {<Player />} />
      </Route>
    </Routes>
  </Router>
);

function Layout () {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

