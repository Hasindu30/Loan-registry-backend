// routes/chatbot.js
import express from 'express';
import { detectIntent} from '../models/dilalogflowService.js'

const router = express.Router();

router.post('/message', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    const result = await detectIntent(message);
    const reply = result.fulfillmentText;
    res.json({ reply });
  } catch (err) {
    console.error('Dialogflow error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
