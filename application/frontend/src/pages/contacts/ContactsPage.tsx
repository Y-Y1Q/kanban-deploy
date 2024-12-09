import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  position: string;
  phone_num: string;
  user_note: string;
}

export default function ContactsPage() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newContact, setNewContact] = useState<Omit<Contact, "id">>({
    name: "",
    email: "",
    company: "",
    position: "",
    phone_num: "",
    user_note: "",
  });
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get<Contact[]>("/api/contacts/search", {
          params: {
            searchParam: searchTerm,
          },
        });
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts", error);
      }
    };
    fetchContacts();
  }, [searchTerm]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingContact(null);
    setNewContact({
      name: "",
      email: "",
      company: "",
      position: "",
      phone_num: "",
      user_note: "",
    });
  };

  const handleAddContact = async () => {
    console.log("Add Contact button clicked.");
    console.log("Adding new contact:", newContact);

    try {
      const response = await axios.post("/api/contacts/add", newContact);
      console.log("Response from adding contact:", response.data);
      setOpen(false);
      setSearchTerm("");
      setContacts((prev) => [...prev, { ...newContact, id: response.data?.id ?? "" }]);
    } catch (error) {
      console.error("Error adding contact", error);
    }
  };

  const handleRemoveContact = async (id: string) => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error("Error removing contact", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateContact = async (contact: Contact) => {
    try {
      await axios.put(`/api/contacts/${contact.id}`, contact);
      setContacts(contacts.map((c) => (c.id === contact.id ? contact : c)));
      setEditingContact(null);
    } catch (error) {
      console.error("Error updating contact", error);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 800, margin: "auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Your Contacts
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <TextField
          label="Search Contacts"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1, marginRight: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add Contact
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: contacts.length === 0 ? "center" : "flex-start",
          height: contacts.length === 0 ? "60vh" : "auto",
          border: contacts.length === 0 ? "1px dashed grey" : "none",
          borderRadius: 1,
          flexDirection: "column",
        }}
      >
        {contacts.length === 0 ? (
          <Box textAlign="center">
            <Typography variant="h6" gutterBottom>
              Your Contacts list is empty
            </Typography>
            <Typography variant="body1" gutterBottom>
              Add contacts to keep track of your relationships. You can link contacts to a job to
              keep track of your interactions.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
              Add Contact
            </Button>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {contacts.map((contact) => (
              <Grid item xs={12} key={contact.id}>
                <Box border={1} borderRadius={1} padding={2}>
                  <Typography variant="h6">{contact.name}</Typography>
                  <Typography variant="body1">Position: {contact.position}</Typography>
                  <Typography variant="body1">Company: {contact.company}</Typography>
                  <Typography variant="body1">Email: {contact.email}</Typography>
                  <Typography variant="body1">Phone: {contact.phone_num}</Typography>
                  <Typography variant="body1">Notes: {contact.user_note}</Typography>
                  <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => {
                        setEditingContact(contact);
                        setNewContact({
                          name: contact.name,
                          email: contact.email,
                          company: contact.company,
                          position: contact.position,
                          phone_num: contact.phone_num,
                          user_note: contact.user_note,
                        });
                        setOpen(true);
                      }}
                      sx={{ marginTop: 1 }}
                    >
                      Update Contact
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemoveContact(contact.id)}
                      sx={{ marginTop: 1 }}
                    >
                      Remove Contact
                    </Button>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{editingContact ? 'Update Contact' : 'Add Contact'}</DialogTitle>
        <DialogContent>
          <DialogContentText>Add contacts based on your job board</DialogContentText>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                margin="dense"
                label="Name"
                name="name"
                fullWidth
                variant="outlined"
                value={newContact.name}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                label="Position"
                name="position"
                fullWidth
                variant="outlined"
                value={newContact.position}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                label="Company"
                name="company"
                fullWidth
                variant="outlined"
                value={newContact.company}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                label="Email"
                name="email"
                fullWidth
                variant="outlined"
                value={newContact.email}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                label="Phone Number"
                name="phone_num"
                fullWidth
                variant="outlined"
                value={newContact.phone_num}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Contact Notes"
                name="user_note"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={newContact.user_note}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button 
            onClick={editingContact ? 
              () => handleUpdateContact({ ...editingContact, ...newContact }) : 
              handleAddContact
            } 
            variant="contained" 
            color="primary"
          >
            {editingContact ? 'Update Contact' : 'Add Contact'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}