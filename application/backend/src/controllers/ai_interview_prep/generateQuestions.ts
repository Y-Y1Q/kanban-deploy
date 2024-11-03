import OpenAI from "openai";
import { Request, Response } from "express";

const openai = new OpenAI({
  apiKey: process.env.Open_AI_KEY,
});

export async function getChatbotResponse(req: Request, res: Response) {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    console.log("Sending request to OpenAI API with message:", message);
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: message,
      max_tokens: 150,
    });

    const chatbotMessage = response.choices[0].text.trim();
    return res.status(200).json({ message: chatbotMessage });
  } catch (error) {
    console.error("Error getting chatbot response:", error);
    return res.status(500).json({ error: "Failed to get response from chatbot" });
  }
}
