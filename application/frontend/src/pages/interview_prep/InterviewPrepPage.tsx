import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

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
    <Box sx={{ width: "100%", maxWidth: 500, margin: "auto" }}>
      <Typography variant="h1" gutterBottom>
        Work In Progress
      </Typography>
      <List>
        {messages.map((message, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${message.user}: ${message.text}`} />
          </ListItem>
        ))}
      </List>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          label="Type your message"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Send
        </Button>
      </form>
    </Box>
  );
}