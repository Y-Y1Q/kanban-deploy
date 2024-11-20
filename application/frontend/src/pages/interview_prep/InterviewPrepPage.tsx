import { LoadingButton } from "@mui/lab";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

function InterviewPrepPage() {
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const fetchResponseFromOpenAI = async (message: string) => {
    try {
      const response = await axios.post("/api/chatbot", { message });
      return response.data.message;
    } catch (error) {
      console.error("Error fetching response from OpenAI:", error);
      return "Sorry, I couldn't process your request.";
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoadingMessage(true);
    if (inputValue.trim()) {
      setMessages([...messages, { user: "You", text: inputValue }]);
      setInputValue("");
      const botResponse = await fetchResponseFromOpenAI(inputValue);
      setMessages((prevMessages) => [...prevMessages, { user: "Bot", text: botResponse }]);
    }
    setLoadingMessage(false);
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
            <ListItem
              key={index}
              sx={{
                display: "flex",
                justifyContent: message.user === "You" ? "flex-end" : "flex-start",
              }}
            >
              <ListItemText primary={message.text} />
            </ListItem>
          ))}
        </List>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
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
      </Paper>
    </Box>
  );
}

export default InterviewPrepPage;
