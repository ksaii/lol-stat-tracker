import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Typewriter from './components/Typewriter';

import './styles/App.css'

import Home from './pages/Home'
import PlayerProfile from './pages/PlayerProfile'
import NotFound from './pages/NotFound'



function App() {
  const [inputValue,setInputValue] = useState(''); //Stores input value





  // This updates 'inputValue' state whenever the user types in the input field
  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Update state on input change
  };





  //This function sends a POST req to the openai link with input Value as the payload 
  async function callApi() {
    const prompt = inputValue;
    try{
      const res = await fetch('http://localhost:3001/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    console.log(data);
    }catch (err) {
      console.log(err);
    }
  } 

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
            <Route path="/" element={<Home />} />
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
