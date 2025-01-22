import axios from "axios";
import { response } from "express";

const RIOT_API_KEY = "RGAPI-483fb8f9-8d74-4059-b339-a8d623e253b5";
const NA_RIOT_ROUTE = "https://na1.api.riotgames.com";
const AMERICAS_RIOT_ROUTE = "https://americas.api.riotgames.com";
const FETCH_RIOT_UUID = "/riot/account/v1/accounts/by-riot-id/"; /* /riot/account/v1/accounts/by-riot-id/{Name}/{Tag} */
const FETCH_RIOT_EID = "/lol/summoner/v4/summoners/by-puuid/";  /* /lol/summoner/v4/summoners/by-puuid/{puuid} */
const FETCH_ENTRIES = "/lol/league/v4/entries/by-summoner/"   /* /lol/league/v4/entries/by-summoner/{eid} */

const getCurrentRank = async (req, res) => {
  try {
    
    const PUUID = await fetchPUUID(req.params.summonerName);
    const SUMMONERDATA = await fetchEID(PUUID); // This fetches encrypted ID
    const ENTRIES = await fetchEntries(SUMMONERDATA.id); // This fetches rank with encrypted ID



    
    res.status(200).json({ puuid: PUUID, summonerProfile: SUMMONERDATA, entries: ENTRIES});
  } catch (err) {
    console.error("Error fetching rank:", err);
    res.status(500).json({ error: "Failed to fetch rank" });
  }
};

const fetchPUUID = async (summonerName) => {
  console.log(`Fetching data for summoner: ${summonerName}`);

  if (!summonerName) {
    return res.status(400).json({ error: "Summoner name is required" });
  }

  const splitName = summonerName.split("#");

  try {
    // Await the response from the API
    const response = await axios.get(
      `${AMERICAS_RIOT_ROUTE}${FETCH_RIOT_UUID}${splitName[0]}/${splitName[1]}?api_key=${RIOT_API_KEY}`
    );

    // Assuming the PUUID is part of the response
    const puuid = response.data.puuid;

    console.log("PUUID fetched:", puuid);

    return puuid; // Return the PUUID
  } catch (err) {
    console.err(err);
    throw err;
  }
};


const fetchEID = async (PUUID) => {
    console.log("Fetching EID...");

    try{

    const response = await axios.get(
        `${NA_RIOT_ROUTE}${FETCH_RIOT_EID}${PUUID}?api_key=${RIOT_API_KEY}`
      );

      const data = response.data;
      console.log("EID fetched:", data);
      return data;
    }catch (err){
        console.error(err);
        throw err;
    }

}


const fetchEntries = async (EID) => {
    console.log("Fetching Entries...");

    try{
        const response = await axios.get(`${NA_RIOT_ROUTE}${FETCH_ENTRIES}${EID}?api_key=${RIOT_API_KEY}`);

        const entries = response.data;

        return entries;
    }catch(err){
        console.error(err);
        throw err;
    }
}

/*app.get('/api/riot/summoner/:summonerName', async (req, res) => {
    const summonerName = req.params.summonerName;
    console.log(`Fetching data for summoner: ${summonerName}`);
    
    if (!summonerName) {
        return res.status(400).json({ error: 'Summoner name is required' });
    }
    const splitName = summonerName.split('#');

    console.log("Test:"+AMERICAS_RIOT_ROUTE+FETCH_RIOT_UUID+`${splitName[0]}/${splitName[1]}?api_key=`+RIOT_API_KEY);
    axios.get(AMERICAS_RIOT_ROUTE+FETCH_RIOT_UUID+`${splitName[0]}/${splitName[1]}?api_key=`+RIOT_API_KEY)
    .then ((response) => {
        const posts = response.data;

        console.log(posts);

        res.json({
            name: posts.gameName,
            summonerLevel: 30, // Example level
            id: posts.puuid,       // Example ID
        });
        
        //this.setState ({ posts });
    });
    
});*/

export default getCurrentRank;
