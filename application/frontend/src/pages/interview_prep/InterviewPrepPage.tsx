import axios from 'axios';
import React, { useState } from 'react';
import { Box, Paper, Typography, Divider, List, ListItem, ListItemText, TextField, Button } from '@mui/material';

function InterviewPrepPage() {
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
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
    if (inputValue.trim()) {
      setMessages([...messages, { user: "You", text: inputValue }]);
      const botResponse = await fetchResponseFromOpenAI(inputValue);
      setMessages((prevMessages) => [...prevMessages, { user: "Bot", text: botResponse }]);
      setInputValue("");
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
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Send
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default InterviewPrepPage;