import OpenAI from "openai";
import dotenv from "dotenv";
import * as Message from "./messages";

// Initialize OpenAI configuration

dotenv.config();

if (process.env.OPEN_AI_KEY === undefined) {
  console.log("\x1b[91m%s\x1b[0m", "You forgot to add OPEN_AI_KEY in .env file");
}

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

export async function summarizeSkills(userInput: string): Promise<string> {
  try {
    const response = await await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `${Message.SKILLS}\n\n${userInput}`,
        },
      ],
    });

    let htmlFormattedSummary =
      response.choices[0].message.content || "<div><p>No summary available</p></div>";

    htmlFormattedSummary = htmlFormattedSummary.replace(/```html|```/g, "").trim();
    return htmlFormattedSummary;
  } catch (error) {
    console.error("Error summarizing text:", error);
    return "<div><p>Error occurred while summarizing.</p></div>";
  }
}

export async function summarizeEducation(userInput: string): Promise<string> {
  try {
    const response = await await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `${Message.EDUCATION}\n\n${userInput}`,
        },
      ],
    });

    let htmlFormattedSummary =
      response.choices[0].message.content || "<div><p>No summary available</p></div>";

    htmlFormattedSummary = htmlFormattedSummary.replace(/```html|```/g, "").trim();
    return htmlFormattedSummary;
  } catch (error) {
    console.error("Error summarizing text:", error);
    return "<div><p>Error occurred while summarizing.</p></div>";
  }
}

export async function summarizeExperience(userInput: string): Promise<string> {
  try {
    const response = await await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `${Message.EXPERIENCE}\n\n${userInput}`,
        },
      ],
    });

    let htmlFormattedSummary =
      response.choices[0].message.content || "<div><p>No summary available</p></div>";

    htmlFormattedSummary = htmlFormattedSummary.replace(/```html|```/g, "").trim();
    return htmlFormattedSummary;
  } catch (error) {
    console.error("Error summarizing text:", error);
    return "<div><p>Error occurred while summarizing.</p></div>";
  }
}

export async function summarizeProjects(userInput: string): Promise<string> {
  try {
    const response = await await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `${Message.PROJECTS}\n\n${userInput}`,
        },
      ],
    });

    let htmlFormattedSummary =
      response.choices[0].message.content || "<div><p>No summary available</p></div>";

    htmlFormattedSummary = htmlFormattedSummary.replace(/```html|```/g, "").trim();
    return htmlFormattedSummary;
  } catch (error) {
    console.error("Error summarizing text:", error);
    return "<div><p>Error occurred while summarizing.</p></div>";
  }
}

// tsx .\src\controllers\ai_resume\open_ai_api\index.ts
