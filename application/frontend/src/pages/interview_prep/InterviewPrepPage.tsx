import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

export default function InterviewPrepPage() {
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValue.trim()) {
      setMessages([...messages, { user: "You", text: inputValue }]);
      setInputValue("");
      // Here you can add logic to get a response from the chatbot
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 600, margin: "auto", mt: 4 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom align="center">
          Interview Prep Chatbot
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List sx={{ maxHeight: 400, overflow: 'auto', mb: 2 }}>
          {messages.map((message, index) => (
            <ListItem key={index} sx={{ display: 'flex', justifyContent: message.user === "You" ? 'flex-end' : 'flex-start' }}>
              <Paper sx={{ p: 1.5, backgroundColor: message.user === "You" ? '#e0f7fa' : '#f1f1f1', maxWidth: '75%' }}>
                <ListItemText primary={message.text} />
              </Paper>
            </ListItem>
          ))}
        </List>
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Type your message"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            sx={{ mr: 2 }}
          />
          <Button type="submit" variant="contained" color="primary">
            Send
          </Button>
        </form>
      </Paper>
    </Box>
  );
}