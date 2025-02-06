import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Typewriter from './components/Typewriter';

import './styles/App.css'

import Home from './pages/Home'
import NewHome from './pages/NewHome'
import PlayerProfile from './pages/PlayerProfile'
import NotFound from './pages/NotFound'



function App() {
 

  return (
    <Router>
      <div className="App">
        <header style={{display: 'flex', justifyContent: 'center'}}>
          
          
          <h1 style={{width:'fit-content', alignItems: 'center' }} id="logoTitle">
          <Typewriter text="League Stat Tracker" typingSpeed={150}/>
          </h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<NewHome />} />
            <Route path="/profile/:summonerName" element={<PlayerProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer>
          <p>© 2025 League Stat Tracker</p>
        </footer>
      </div>
    </Router>
  );
}

export default App
