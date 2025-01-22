import express, { response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import apiRoutes from './routes/riot.js';

dotenv.config();

import OpenAI from 'openai';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes)


// Intialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Securely load the API key from the .env file
  });
  

app.post('/api/generate', async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'user', content: prompt },
            ],
        });
        console.log(response.choices[0].message.content);
        res.json(response.choices[0].message.content); 

    } catch (err) {
        console.error(err);
        res.status(500).send('Error generating text');
    }
});




  

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});