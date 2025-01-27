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

const PlayerProfile = () => {
  const [playerData, setPlayerData] = useState(null);
  const [openaiData, setOpenaiData] = useState(null);
  const { summonerName } = useParams();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // New loading state

  //This function sends a POST req to the openai link with input Value as the payload
  const callApi = (playerData) => {
    const prompt = `Evaluate this player's stats in League of Legends and give a short max 1 sentence response: 
          ${playerData.entries[0]?.queueType ?? ""} 
          ${playerData.entries[0]?.tier ?? "Unranked"} ${
      playerData.entries[0]?.rank ?? ""
    } 
          with Wins: ${playerData.entries[0]?.wins ?? "0"} Losses: ${
      playerData.entries[0]?.losses ?? "0"
    }`;

    
      promptGPT(prompt).then((data) => {
      if(data.error){
        setError(data.error);
      }else{
        setOpenaiData(data.data);
        console.log("Open ai response:" + openaiData);
        setLoading(false);
      }

      })
   
      
  }

  useEffect(() => {
    if (!summonerName) return;
    setLoading(true); // Start loading
    console.log("Fetching data for summonerrrrr: ", summonerName);
    fetchSummonerData(summonerName).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setPlayerData(data.data); // Set the fetched data to state
          callApi(data.data); // Pass the data directly to callApi
        
      }
    });
  }, [summonerName]);

  useEffect(() => {
    // Call the OpenAI API only when playerData is available
    if (playerData) {
      //callApi();
    }
  }, [playerData]); // This useEffect will be triggered whenever playerData changes

  // Conditional rendering for loading, error, or player data
  if (loading) {
    return <CircularProgress />; // Show loading spinner while data is being fetched
  }

  if (error) {
    return <Typography color="error">{error}</Typography>; // Display error message if any
  }

  if (!playerData) {
    return <Typography>No player data available.</Typography>; // Fallback in case of empty data
  }

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        height: "80vh",
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
      <HoverComponent
        width="80px"
        height="40px"
        text="Home"
        onClick={handleGoHome}
        icon={Home}
      ></HoverComponent>

      {error && <p style={{ color: "red" }}> {error}</p>}
      {playerData ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <InfoComponent
            width="250px"
            height="400px"
            text1={summonerName}
            text2={`Summoner Level: ${playerData.summonerProfile.summonerLevel}`}
            text3={`${playerData.entries[0]?.queueType ?? ""} \n ${
              playerData.entries[0]?.tier ?? "Unranked"
            } ${playerData.entries[0]?.rank ?? ""}`}
            text4={`Wins: ${playerData.entries[0]?.wins ?? "0"} Losses: ${
              playerData.entries[0]?.losses ?? "0"
            }`}
            image1={`http://ddragon.leagueoflegends.com/cdn/11.20.1/img/profileicon/${
              playerData.summonerProfile?.profileIconId ?? "1"
            }.png`}
            image2={`/src/assets/RankedIcons/Rank=${
              playerData.entries[0]?.tier ?? "Unranked"
            }.png`}
            icon1alt="Profile Icon"
          ></InfoComponent>

          <InfoComponent
            width="250px"
            height="400px"
            text1=""
            text2={`${openaiData ?? ""}`}
            text3={`${playerData.entries[1]?.queueType ?? ""} \n ${
              playerData.entries[1]?.tier ?? "Unranked"
            } ${playerData.entries[1]?.rank ?? ""}`}
            text4={`Wins: ${playerData.entries[1]?.wins ?? "0"} Losses: ${
              playerData.entries[1]?.losses ?? "0"
            }`}
            image2={`/src/assets/RankedIcons/Rank=${
              playerData.entries[1]?.tier ?? "Unranked"
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
