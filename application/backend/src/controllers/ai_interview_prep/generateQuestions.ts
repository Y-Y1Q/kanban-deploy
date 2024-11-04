import OpenAI from "openai"; // do npm install openai to get rid of this error. Also gitignore the openai package
import { Request, Response } from "express";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

export async function getChatbotResponse(req: Request, res: Response) {
  const { message } = req.body;

  if (!message) {
    console.error("No message provided");
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    console.log("Sending request to OpenAI API with message:", message);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: message,
      max_tokens: 150,
    });

    const chatbotMessage = response.data.choices[0].text.trim();
    console.log("Received response from OpenAI API:", chatbotMessage);
    return res.status(200).json({ message: chatbotMessage });
  } catch (error) {
    console.error("Error getting chatbot response:", error);
    if (error.response) {
      console.error("OpenAI API response error:", error.response.data);
    }
    return res.status(500).json({ error: "Failed to get response from chatbot" });
  }
}
