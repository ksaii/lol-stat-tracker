const fetchSummonerData = async (summonerName) => {
  console.log(`Sending and encoding ${summonerName} and then Fetching data...`);

  try {
    const response = await fetch(
      `/api/riot/summoner/${encodeURIComponent(summonerName)}`
    ); // Correct endpoint
    if (!response.ok) throw new Error("Failed to fetch summoner data");

    const data = await response.json();
    console.log("Front dataaaa:", data);

    if (data.entries.length === 0) {
      //setError('Summoner not found');
      return { error: "Summoner not found" };
    } else {
      //setError('');
      //setPlayerData(data); // Set the fetched data to state
      //callApi(); // Call the OpenAI API
      return { data };
    }
  } catch (err) {
    return { error: "Error fetching data from Riot API" };
  }
};

export default fetchSummonerData;
