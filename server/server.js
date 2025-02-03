import express, { response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import riotRoutes from './routes/riot.js';
import openaiRoutes from './routes/openai.js';

dotenv.config();

import OpenAI from 'openai';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/riot', riotRoutes);
app.use('/api/openai', openaiRoutes);



// Error Handling Middleware (Optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});




  

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});