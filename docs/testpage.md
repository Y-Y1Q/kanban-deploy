import React, { useState, FormEvent } from 'react';

interface Contact {
  id: number;
  username: string;
  email: string;
  password: string;
}

const TestContactAPI: React.FC = () => {
  const [createContact, setCreateContact] = useState<Contact>({ id: 0, username: '', email: '', password: '' });
  const [retrieveId, setRetrieveId] = useState<number>(0);
  const [updateId, setUpdateId] = useState<number>(0);
  const [createContactResult, setCreateContactResult] = useState<string>('');
  const [retrieveContactResult, setRetrieveContactResult] = useState<string>('');

  const handleCreateContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateContact({ ...createContact, [e.target.name]: e.target.value });
  };

  const handleRetrieveIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRetrieveId(Number(e.target.value));
  };

  const handleUpdateIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateId(Number(e.target.value));
  };

  const handleCreateContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle create contact logic here
    setCreateContactResult('Contact created successfully');
  };

  const handleRetrieveContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle retrieve contact logic here
    setRetrieveContactResult('Contact retrieved successfully');
  };

  return (
    <div>
      <h1>Test Contact API</h1>

      <h1>Contact</h1>

      <h2>Create Contact</h2>
      <form id="createContactForm" onSubmit={handleCreateContactSubmit}>
        <label htmlFor="createId">ID:</label>
        <input type="number" id="createId" name="id" value={createContact.id} onChange={handleCreateContactChange} required />
        <label htmlFor="createUsername">Username:</label>
        <input type="text" id="createUsername" name="username" value={createContact.username} onChange={handleCreateContactChange} required />
        <label htmlFor="createEmail">Email:</label>
        <input type="email" id="createEmail" name="email" value={createContact.email} onChange={handleCreateContactChange} required />
        <label htmlFor="createPassword">Password:</label>
        <input type="password" id="createPassword" name="password" value={createContact.password} onChange={handleCreateContactChange} required />
        <button type="submit">Create Contact</button>
      </form>
      <div id="createContactResult">{createContactResult}</div>

      <h2>Retrieve Contact</h2>
      <form id="retrieveContactForm" onSubmit={handleRetrieveContactSubmit}>
        <label htmlFor="retrieveId">ID:</label>
        <input type="number" id="retrieveId" name="id" value={retrieveId} onChange={handleRetrieveIdChange} required />
        <button type="submit">Retrieve Contact</button>
      </form>
      <div id="retrieveContactResult">{retrieveContactResult}</div>

      <h2>Update Contact By Email</h2>
      <form id="updateContactForm">
        <label htmlFor="updateId">ID:</label>
        <input type="number" id="updateId" name="id" value={updateId} onChange={handleUpdateIdChange} required />
        {/* Add more fields and logic for updating contact email */}
        <button type="submit">Update Contact</button>
      </form>
    </div>
  );
};

export default TestContactAPI;