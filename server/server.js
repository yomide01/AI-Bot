import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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
    const prompt = req.body.prompt;

    // Call OpenAI's API to generate a response
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0.5,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0.5,
    });

   // Send the response back to the client
   res.status(200).json({
    bot: response.data.choices[0].text
  });
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
}
});

const configureOpenAI = (apiKey) => {
  const config = new Configuration({
    apiKey,
  });

  return new OpenAIApi(config);
};

const openai = configureOpenAI(process.env.OPENAI_API_KEY);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
