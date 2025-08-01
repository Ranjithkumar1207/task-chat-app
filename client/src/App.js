
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chat from './Chat';

function App() {
  const [username, setUsername] = useState('');
  const [joined, setJoined] = useState(false);

  const joinChat = () => {
    if (username.trim() !== '') {
      setJoined(true);
    }
  };

  return (
    <div className="App">
      {!joined ? (
        <div className="container mt-5">
          <div className="card p-4 shadow">
            <h3 className="mb-3">👋 Enter your name to join the chat</h3>
            <input
              className="form-control mb-3"
              placeholder="Your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && joinChat()}
            />
            <button className="btn btn-success" onClick={joinChat}>
              Join Chat
            </button>
          </div>
        </div>
      ) : (
        <Chat username={username} />
      )}
    </div>
  );
}

export default App;

