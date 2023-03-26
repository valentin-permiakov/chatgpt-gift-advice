import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

interface GiftRequest extends NextApiRequest {
  body: {
    holiday: string;
    priceMin: number;
    priceMax: number;
    gender: string;
    age: number;
    hobbies: string;
  };
}

export default async function generateGifts(
  req: GiftRequest,
  res: NextApiResponse
) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const { holiday, priceMin, priceMax, gender, age, hobbies } = req.body;
  const prompt = generatePrompt(
    priceMin,
    priceMax,
    gender,
    age,
    holiday,
    hobbies
  );

  console.log(prompt);

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 2048,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(
  priceMin: number,
  priceMax: number,
  gender: string = "person",
  age: number,
  holiday?: string,
  hobbies?: string
) {
  return `Suggest 3 ${holiday} gift ideas between ${priceMin} dollars and ${priceMax} dollars for a ${age} years old ${gender} ${
    hobbies ? `who is into ${hobbies}` : ""
  } `;
}
