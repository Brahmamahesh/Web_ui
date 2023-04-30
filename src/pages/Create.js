import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { create } from '@mui/material/styles/createTransitions';

function Create() {
  const [servers, setServers] = useState([]);
  const [newServer, setNewServer] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8080/servers')
      .then(response => {
        setServers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/servers', newServer)
      .then(response => {
        setServers([...servers, response.data]);
        setNewServer({});
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/servers/${id}`)
      .then(response => {
        setServers(servers.filter(server => server.id !== id));
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Servers</h1>
      <ul>
        {servers.map(server => (
          <li key={server.id}>
            <p>Name: {server.name}</p>
            <p>ID: {server.id}</p>
            <p>Language: {server.language}</p>
            <p>Framework: {server.framework}</p>
            <button onClick={() => handleDelete(server.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Create a new server</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={newServer.name} onChange={(event) => setNewServer({...newServer, name: event.target.value})} />
        </label>
        <label>
          ID:
          <input type="text" value={newServer.id} onChange={(event) => setNewServer({...newServer, id: event.target.value})} />
        </label>
        <label>
          Language:
          <input type="text" value={newServer.language} onChange={(event) => setNewServer({...newServer, language: event.target.value})} />
        </label>
        <label>
          Framework:
          <input type="text" value={newServer.framework} onChange={(event) => setNewServer({...newServer, framework: event.target.value})} />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default create;
