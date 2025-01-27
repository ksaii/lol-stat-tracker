import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RiotQueryInput.css';
import Button from '@mui/material/Button';
import HoverComponent from './HoverButtonComponent';
import { CircularProgress } from '@mui/material';


const AutoCompleteInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [storedInputs, setStoredInputs] = useState([]);
  const [suggestions, setSuggestions] = useState([]);



  useEffect(() => {
    const savedInputs = JSON.parse(localStorage.getItem("storedInputs")) || [];
    setStoredInputs(savedInputs);
  }, []);


  useEffect(() => {
    if (inputValue) {
      const filteredSuggestions = storedInputs.filter((input) =>
        input.toLowerCase().startsWith(inputValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
    }, [inputValue, storedInputs]);
    
    


  // Fetch summoner data from Riot API
  const fetchSummonerData = async (summonerName) => {
    setLoading(true);
    console.log(`Sending and encoding ${summonerName} and then Fetching data...`);

    try {
      
        const response = await fetch(`/riot/summoner/${encodeURIComponent(summonerName)}`); // Correct endpoint
        if (!response.ok) throw new Error('Failed to fetch summoner data');

        const data = await response.json();
        console.log("Front data:",data);
        
        setPlayerData(data); // Set the fetched data to state
    } catch (err) {
        setError('Error fetching data from Riot API');
        console.error(err);
    } finally {
        setError('');
        setLoading(false);
        
    }
};


  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);


  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(inputValue);
    if(inputValue && !storedInputs.includes(inputValue)){
      const updatedInputs = [...storedInputs, inputValue]; //Takes the current stored inputs array and adds the new input to the end of the array 
      setStoredInputs(updatedInputs);
      localStorage.setItem("storedInputs",JSON.stringify(updatedInputs));
    }
    
    console.log("Navigating to profile page...");
    navigate(`/profile/${encodeURIComponent(inputValue)}`);
    
  };
  

  const handleSuggestionClick = (suggestion) => {

    setInputValue(suggestion);
    console.log("Navigating to profile page...");
    navigate(`/profile/${encodeURIComponent(suggestion)}`);
    

  };



  const navigateAfterDelay = () => {
    // Show loading spinner or content
    document.getElementById('loading-spinner').style.display = 'block';
  
    // After delay (preloading), navigate
    setTimeout(() => {
      window.location.href = '/newPage';  // or history.push('/newPage') for React
    }, 1500);  // Delay in milliseconds (1.5 seconds)
  };
  return (

    <div style={{ paddingTop:'80px',padding: '20px', maxWidth: '600px',width:'600px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
      <form onSubmit={handleFormSubmit}>
      <div className={loading ? "searchBox puff-out-center" : "searchBox"}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search summoner name..."
          className='searchInput'
        />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
        <button className="searchButton" href="#">
                <i className="material-icons">
                    search
                </i>
        </button>
        <button type="submit" style={{ display: 'none' }}>Search</button>

        
      </div>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={loading ? {display:'none'}:{minHeight: '20vh'}}>
      {suggestions.length > 0 && (
          <ul style={{ listStyle: 'none', padding: 0,marginTop: '1vh', backgroundColor: '#2f3640', color: 'white',width: '260px'}}>
            {suggestions.map((suggestion, index) => (
              <li 
              key={index} 
              onClick={() => handleSuggestionClick(suggestion)}
              style = {{cursor: 'pointer', padding: '5px',border: '1px solid white', textAlign: 'center'}}
              className='slide-in-blurred-top'
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        </div>
      </form>

    </div>
  );
};

export default AutoCompleteInput;
