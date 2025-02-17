import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HoverComponent from "../components/HoverButtonComponent";
import { Home, Info } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import InfoComponent from "../components/InfoComponent";
import fetchSummonerData from "../api/riotApi";
import { Typography } from "@mui/material";
import promptGPT from "../api/openaiApi";
import '../styles/PlayerProfile.css';
import { blue } from "@mui/material/colors";

const PlayerProfile = () => {
  const [playerData, setPlayerData] = useState(null);
  const [openaiData, setOpenaiData] = useState(null);
  const { summonerName } = useParams();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // New loading state
  const [rankedStats, setRankedStats] = useState([]);

  //This function sends a POST req to the openai link with input Value as the payload
  const callApi = (playerData) => {
    const prompt = `Evaluate this player's stats in League of Legends and give a short max 1 sentence response:
    ${playerData[1]?.queueType ?? ""}
    ${playerData[1]?.tier ?? ""}
    ${playerData[1]?.rank ?? "Unranked"} ${playerData[1]?.rank ?? ""}
    with Wins: ${playerData[1]?.wins ?? "0"} Losses: ${playerData[1]?.losses ?? "0"} LP: ${playerData[1]?.lp ?? "0"} and a winrate of ${playerData[1]?.winRate ?? "0"}%
    ${playerData[2]?.queueType ?? ""} ${playerData[2]?.tier ?? ""} ${playerData[2]?.rank ?? "Unranked"} ${playerData[2]?.rank ?? ""} with Wins: ${playerData[2]?.wins ?? "0"} Losses: ${playerData[2]?.losses ?? "0"} LP: ${playerData[2]?.lp ?? "0"} and a winrate of ${playerData[2]?.winRate ?? "0"}%`;
    

      promptGPT(prompt).then((data) => {
      if(data.error){
        setLoading(false);
        setError(data.error);
      }else{
        setLoading(false);
        setOpenaiData(data.data);
        console.log("Open ai response:" + openaiData);
        
      }

      })
   
      
  }

  useEffect(() => {
    if (!summonerName) return;
    setLoading(true); // Start loading
    console.log("Fetching data for summonerrrrr: ", summonerName);
    fetchSummonerData(summonerName).then((data) => {
      
      if (data.error) {
        setLoading(false);
        setError(data.error);
      } else {
        console.log(data.summonerData);
        const formattedData = formatRankedData(data.playerRankData); // Format the ranked data   
        formattedData.unshift(data.summonerData); // Add the summoner profile data to the beginning of the array
        console.log("Formatted Data:", formattedData);
        setPlayerData(formattedData); // Set the fetched data to state
        callApi(formattedData); // Pass the data directly to callApi
        
      }
    });
  }, [summonerName]);

  const formatRankedData = (rankedData) => {

    return rankedData
    .map(entry => {
        return {
            queueType: queueTypeMap[entry.queueType] || entry.queueType, // Fallback to raw queueType if not in map
            tier: entry.tier,
            rank: entry.rank,
            wins: entry.wins,
            losses: entry.losses,
            lp: entry.leaguePoints,
            winRate: ((entry.wins / (entry.wins + entry.losses)) * 100).toFixed(2) + "%",
        };
    });
  
};


  const queueTypeMap = {
    "RANKED_SOLO_5x5": "Solo/Duo",
    "RANKED_FLEX_SR": "Flex"
};



  useEffect(() => {
    // Call the OpenAI API only when playerData is available
    if (playerData) {
      //callApi();
    }
  }, [playerData]); // This useEffect will be triggered whenever playerData changes

  // Conditional rendering for loading, error, or player data
  if (loading) {
    return (
      <div
      style={{
        height: "60vh",
        marginTop: "20vh",
        paddingTop: "80px",
        padding: "20px",
        maxWidth: "100%",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
      }}>
      <CircularProgress size="50px" />
    </div>
    ); // Show loading spinner while data is being fetched
  }

  /*if (error) {
    return <Typography color="error">{error}</Typography>; // Display error message if any
  }

  if (!playerData) {
    return <Typography>No player data available.</Typography>; // Fallback in case of empty data
  }*/

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        height: "60vh",
        marginTop: "20vh",
        paddingTop: "80px",
        padding: "20px",
        maxWidth: "100%",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
      }}
    >
     

      {error && <p style={{ color: "red" }}> {error}</p>}
      {playerData ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "rgba(88, 85, 85, 0.5)",
            borderRadius: "10px",

          }}
        >
          <InfoComponent
            width="250px"
            height="400px"
            text1={summonerName}
            text2={`Summoner Level: ${playerData[0].summonerLevel}`}
            text3={`${playerData[1]?.queueType ?? ""}  \n ${
              playerData[1]?.tier ?? `Unranked`
            } ${playerData[1]?.rank ?? ""}`}
            text4={`Wins: ${playerData[1]?.wins ?? "0"} Losses: ${
              playerData[1]?.losses ?? "0"
            }`}
            image1={`http://ddragon.leagueoflegends.com/cdn/11.20.1/img/profileicon/${
              playerData[0]?.profileIconId ?? "1"
            }.png`}
            image2={`/src/assets/RankedIcons/Rank=${
              playerData[1]?.tier ?? "Unranked"
            }.png`}
            icon1alt="Profile Icon"
          ></InfoComponent>

          <InfoComponent
            width="250px"
            height="400px"
            text1=""
            text2={`${openaiData ?? ""}`}
            text3={`${playerData[2]?.queueType ?? ""} \n ${
              playerData[2]?.tier ?? `Unranked`
            } ${playerData[2]?.rank ?? ""}`}
            text4={`Wins: ${playerData[2]?.wins ?? "0"} Losses: ${
              playerData[2]?.losses ?? "0"
            }`}
            image2={`/src/assets/RankedIcons/Rank=${
              playerData[2]?.tier ?? "Unranked"
            }.png`}
            animationDelay1="3s"
            animationDelay2="4s"
          ></InfoComponent>
        </div>
      ) : (
        !error && <CircularProgress style={{ marginTop: "20px" }} />
      )}
    </div>
  );
};

export default PlayerProfile;
