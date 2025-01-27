import express from 'express';
import getCurrentRank from '../controllers/riotController.js';

const router = express.Router();

// Riot Route
router.get('/summoner/:summonerName', getCurrentRank);

export default router;
