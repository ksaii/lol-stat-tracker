import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import HoverComponent from '../components/HoverButtonComponent';
import { Home, Info } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import InfoComponent from '../components/InfoComponent';

const PlayerProfile = () => {
    
  const [playerData, setPlayerData] = useState(null);
  const { summonerName } = useParams();
  const [error, setError] = useState('');
  const navigate = useNavigate();







    useEffect(() => {
      const fetchSummonerData = async () => {
        console.log(`Sending and encoding ${summonerName} and then Fetching data...`);
    
        try {
          
            const response = await fetch(`/api/riot/summoner/${encodeURIComponent(summonerName)}`); // Correct endpoint
            if (!response.ok) throw new Error('Failed to fetch summoner data');
    
            const data = await response.json();
            console.log("Front dataaaa:",data);
            
            if(data.entries.length === 0){
              setError('Summoner not found');
            }else{
            setError('');
            setPlayerData(data); // Set the fetched data to state
            }
        } catch (err) {
            setError('Error fetching data from Riot API');
            console.error(err);
        }
    };

    fetchSummonerData();

    }, [summonerName])


    const handleGoHome = () => {

      navigate('/');
    }
  


    return (
      <div style={{ height: '80vh', marginTop: '20vh', paddingTop:'80px',padding: '20px', maxWidth: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',margin: 'auto' }} >
        <HoverComponent width='80px' height='40px' text="Home" onClick={handleGoHome} icon={Home}></HoverComponent>
        
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {playerData ? (
        <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
          <InfoComponent 
          width='250px' 
          height='400px' 
          text1={summonerName}
          text2={`Summoner Level: ${playerData.summonerProfile.summonerLevel}`}
          text3='Profile Icon'
          text4='Summoner Name'
          image2={`http://ddragon.leagueoflegends.com/cdn/11.20.1/img/profileicon/${playerData.summonerProfile.profileIconId}.png`}
          image1={`http://ddragon.leagueoflegends.com/cdn/11.20.1/img/profileicon/${playerData.summonerProfile.profileIconId}.png`}>

          </InfoComponent>
          
          <p><strong style={{color:'gold'}}>Rank: </strong> {playerData.entries[0].queueType}: {playerData.entries[0].tier} {playerData.entries[0].rank} </p>
          <p><strong style={{ color: 'red'}}>Losses:</strong> {playerData.entries[0].losses}</p>
          <p><strong style={{ color: 'green'}}>Wins:</strong> {playerData.entries[0].wins}</p>
       
        </div>
           ) : (
            !error && <CircularProgress style={{marginTop: '20px'}}/>
           )}
        </div>
      );
    };

    export default PlayerProfile;