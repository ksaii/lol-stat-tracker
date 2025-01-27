import axios from "axios";
import express, { response } from "express";
import dotenv from 'dotenv';
import OpenAI from 'openai';

// Intialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Securely load the API key from the .env file
  });
  

  const generateResponse = async (req, res) => {
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
};


export default generateResponse;