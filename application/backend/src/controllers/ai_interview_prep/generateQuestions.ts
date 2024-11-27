import OpenAI from "openai"; // run the npm install openai command to rid of the error here
import { Request, Response } from "express";

// NOTE: Ignore these red squiggly lines, they will still show after installing openai package, but the code will still work
// Probably are just false positives -shrugs-

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
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
      max_tokens: 150,
    });

    const chatbotMessage = response.choices![0]!.message!.content!.trim();

    console.log("Received response from OpenAI API:", chatbotMessage);
    return res.status(200).json({ message: chatbotMessage });
  } catch (error: any) {
    console.error("Error getting chatbot response:", error);
    if (error.response) {
      console.error("OpenAI API response error:", error.response.data);
    } else {
      console.error("Error details:", error.message);
    }
    return res.status(500).json({ error: "Failed to get response from chatbot" });
  }
}
