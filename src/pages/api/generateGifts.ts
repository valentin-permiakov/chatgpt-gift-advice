import generatePrompt from "@/utils/generatePrompt";
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
    relation: string;
    age: number;
    hobbies: string;
  };
}

const generateGifts = async (req: GiftRequest, res: NextApiResponse) => {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const { holiday, priceMin, priceMax, gender, relation, age, hobbies } =
    req.body;
  const prompt = generatePrompt(
    priceMin,
    priceMax,
    gender,
    age,
    relation,
    holiday,
    hobbies
  );

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 1000,
    });
    console.log("prompt:", prompt, "response:", completion.data.choices);
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
};

export default generateGifts;
