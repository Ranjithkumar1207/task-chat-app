import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './Chat.css'; // optional for advanced styling

const socket = io('http://localhost:5000'); // Make sure backend is running

const Chat = ({ username }) => {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setChatLog((prevLog) => [...prevLog, data]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog]);

  const sendMessage = () => {
    if (message.trim() === '') return;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const data = { username, message, time: timestamp };
    socket.emit('send_message', data);
    setMessage('');
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h3 className="text-center text-primary mb-4">💬 Real-Time Chat Room</h3>
        <div
          className="border p-3 mb-3 bg-light rounded chat-box"
          style={{ height: '350px', overflowY: 'auto' }}
        >
          {chatLog.length === 0 && (
            <p className="text-muted text-center">Start the conversation!</p>
          )}

          {chatLog.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 p-2 rounded ${
                msg.username === username ? 'bg-success text-white' : 'bg-white'
              }`}
            >
              <div className="d-flex justify-content-between">
                <strong style={{ color: msg.username === username ? '#fff' : '#007bff' }}>
                  {msg.username === username ? 'You' : msg.username}
                </strong>
                <small className="text-muted">{msg.time}</small>
              </div>
              <div>{msg.message}</div>
            </div>
          ))}
          <div ref={bottomRef}></div>
        </div>

        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button className="btn btn-primary" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
