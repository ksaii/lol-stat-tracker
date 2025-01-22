import express from 'express';
const router = express.Router();
import getCurrentRank from '../controllers/riotController.js';


router.get('/riot/summoner/:summonerName', getCurrentRank);

export default router;