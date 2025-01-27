import { useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchSummonerData from '../api/riotApi';

import RiotQueryInput from '../components/RiotQueryInput';

const Home = () => {





  return (
    <div style={{ height: '80vh', marginTop: '20vh', paddingTop:'80px',padding: '20px', maxWidth: '600px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',margin: 'auto' }}>
      {/* Input */}
      <RiotQueryInput/>
      
      <p>Search for League of Legends summoners and analyze their stats with OpenAI.</p>
     
    </div>
  );
};

export default Home;
