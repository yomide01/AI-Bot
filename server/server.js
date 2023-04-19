import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

// Check if OPENAI_API_KEY is set in the environment
if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY not set in environment!');
  process.exit(1);
}

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const app = express();

// Allow CORS requests
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Route for testing server
app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hi from MegaAI',
  });
});

// Route for generating responses
app.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;

    // Call OpenAI's API to generate a response
    const response = await openai.completions.create({
      model: "davinci-003",
      prompt: `${prompt}`,
      temperature: 0.5,
      maxTokens: 4000,
      topP: 1,
      frequencyPenalty: 0.5,
      presencePenalty: 0.5,
    });

    // Send the response back to the client
   res.status(200).send({
    bot: response.data.choices[0].text
   })
} catch (error) {
    console.error(error);
    res.status(500).send({ error })
}
})

app.listen(10000, () => console.log('Server is running on http://localhost:10000'));
