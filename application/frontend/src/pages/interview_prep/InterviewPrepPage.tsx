import LoadingButton from "@mui/lab/LoadingButton";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

function InterviewPrepPage() {
  const [messages, setMessages] = useState<{ user: string; text: string }[]>(() => {
    const savedMessages = localStorage.getItem("chatbotMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [loadingInterview, setLoadingInterview] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputHistory, setInputHistory] = useState<string[]>(() => {
    const savedHistory = localStorage.getItem("inputHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem("chatbotMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("inputHistory", JSON.stringify(inputHistory));
  }, [inputHistory]);

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
        // Start of a bolded point
        formattedResponse += `\n**• ${line.replace(/^\d+\./, "").trim()}**\n`;
        inQuestion = true;
      } else if (inQuestion) {
        // Adding the question text under the bolded point (only once)
        formattedResponse += `\n${line}\n`;
        inQuestion = false;
      } else if (line.startsWith("•")) {
        // Bullet points with increased indentation and bolded
        formattedResponse += `\n    **• ${line.replace("•", "").trim()}**\n`;
      } else if (line.startsWith("-")) {
        // Subpoints under bullets with increased indentation
        formattedResponse += `      - ${line.replace("-", "").trim()}\n`;
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
      setInputHistory((prevHistory) => {
        if (!prevHistory.includes(inputValue)) {
          return [...prevHistory, inputValue];
        }
        return prevHistory;
      });
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
    setLoadingInterview(true);
    if (interviewTypeResponse) {
      const botResponse = await fetchResponseFromOpenAI(
        `I am preparing for a ${interviewTypeResponse} interview. Can you provide some questions?`
      );
      const formattedResponse = formatBotResponse(botResponse);
      setMessages((prevMessages) => [...prevMessages, { user: "Bot", text: formattedResponse }]);
    }
    setLoadingInterview(false);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "90%", margin: "auto", mt: 4 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: "bold" }}>
          Interview Prep Chatbot
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List sx={{ maxHeight: 400, overflow: "auto", mb: 2 }}>
          {messages.map((message, index) => (
            <ListItem key={index} sx={{ display: "block", textAlign: "left" }}>
              <ReactMarkdown>{message.text}</ReactMarkdown>
            </ListItem>
          ))}
        </List>
        <form onSubmit={handleSubmit}>
          <Autocomplete
            freeSolo
            options={inputHistory}
            value={inputValue}
            onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Type your message"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            )}
          />
          <LoadingButton
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#607D8B",
              "&:hover": { backgroundColor: "#455A64" },
              mt: 2,
            }}
            loading={loadingMessage}
          >
            Send
          </LoadingButton>
        </form>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#F44336",
            "&:hover": { backgroundColor: "#D32F2F" },
            mt: 2,
            mr: 2,
          }}
          onClick={handleReset}
        >
          Clear Chat
        </Button>
        <LoadingButton
          variant="contained"
          sx={{ backgroundColor: "#2196F3", "&:hover": { backgroundColor: "#1976D2" }, mt: 2 }}
          loading={loadingInterview}
          onClick={handleInterview}
        >
          Interview
        </LoadingButton>
      </Paper>
    </Box>
  );
}

export default InterviewPrepPage;
