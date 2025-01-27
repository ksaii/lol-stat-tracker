import express from 'express';
import generateResponse from '../controllers/openaiController.js';

const router = express.Router();

router.post('/generate/report', generateResponse);

export default router;