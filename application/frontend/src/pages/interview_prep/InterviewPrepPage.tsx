import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Divider, List, ListItem, Paper, TextField, Typography, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

function InterviewPrepPage() {
  const [messages, setMessages] = useState<{ user: string; text: string }[]>(() => {
    const savedMessages = localStorage.getItem("chatbotMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [interviewType, setInterviewType] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("chatbotMessages", JSON.stringify(messages));
  }, [messages]);

  const fetchResponseFromOpenAI = async (message: string) => {
    try {
      const response = await axios.post("/api/chatbot", { message });
      return response.data.message;
    } catch (error) {
      console.error("Error fetching response from OpenAI:", error);
      return "Sorry, I couldn't process your request.";
    }
  };

  const formatBotResponse = (response: string) => {
    const lines = response.split("\n").map((line) => line.trim());
    let formattedResponse = "";
    let intro = ""; // To hold the introductory text
    let inQuestion = false;

    lines.forEach((line) => {
      if (line.match(/^\d+\./)) {
        // Start of a numbered list
        formattedResponse += `\n${line}\n`;
        inQuestion = true;
      } else if (inQuestion) {
        // Adding the question text under the number (only once)
        formattedResponse += `**Question:** "${line}"\n`;
        inQuestion = false;
      } else if (line.startsWith("•")) {
        // Bullet points
        formattedResponse += `\n${line.replace("•", "").trim()}\n`;
      } else if (line.startsWith("-")) {
        // Subpoints under bullets
        formattedResponse += `  ${line.replace("-", "").trim()}\n`;
      } else if (
        line.toLowerCase().includes("purpose") &&
        !formattedResponse.includes("**Purpose:**")
      ) {
        // Add "Purpose" only once
        formattedResponse += `**Purpose:** ${line.replace("Purpose:", "").trim()}\n`;
      } else if (!line.match(/^\d+\./) && !line.startsWith("-") && !line.startsWith("•")) {
        // Collect any introductory text (lines not part of the main content)
        intro += `${line} `;
      }
    });

    // Trim trailing artifacts and combine intro text with formatted response
    intro = intro.trim();
    formattedResponse = formattedResponse
      .replace(/(\*\*Question:\*\*\s*".*")\s*\*\*Question:\*\*\s*""/g, "$1")
      .trim();

    return `${intro}\n\n${formattedResponse}`;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoadingMessage(true);
    if (inputValue.trim()) {
      setMessages([...messages, { user: "You", text: inputValue }]);
      setInputValue("");
      const botResponse = await fetchResponseFromOpenAI(inputValue);
      const formattedResponse = formatBotResponse(botResponse);
      setMessages((prevMessages) => [...prevMessages, { user: "Bot", text: formattedResponse }]);
    }
    setLoadingMessage(false);
  };

  const handleReset = () => {
    setMessages([]);
    localStorage.removeItem("chatbotMessages");
  };

  const handleInterview = async () => {
    const interviewTypeResponse = prompt("What sort of interview are you preparing for?");
    if (interviewTypeResponse) {
      setInterviewType(interviewTypeResponse);
      const botResponse = await fetchResponseFromOpenAI(`I am preparing for a ${interviewTypeResponse} interview. Can you provide some questions?`);
      const formattedResponse = formatBotResponse(botResponse);
      setMessages((prevMessages) => [...prevMessages, { user: "Bot", text: formattedResponse }]);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 600, margin: "auto", mt: 4 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom align="center">
          Interview Prep Chatbot
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List sx={{ maxHeight: 400, overflow: "auto", mb: 2 }}>
          {messages.map((message, index) => (
            <ListItem key={index}>
              <ReactMarkdown>{message.text}</ReactMarkdown>
            </ListItem>
          ))}
        </List>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Type your message"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            loading={loadingMessage}
          >
            Send
          </LoadingButton>
        </form>
        <Button
          variant="contained"
          color="error"
          sx={{ mt: 2 }}
          onClick={handleReset}
        >
          Clear Chat
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 2 }}
          onClick={handleInterview}
        >
          Interview
        </Button>
      </Paper>
    </Box>
  );
}

export default InterviewPrepPage;