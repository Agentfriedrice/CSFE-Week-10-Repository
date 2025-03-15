import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import './index.css';

function App() {
  const [data, setData] = useState([]);
  const [text, setText] = useState('');
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' // Persist mode across reloads
  );

  useEffect(() => {
    axios.get('http://localhost:5000/data')
      .then((res) => setData(res.data))
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', darkMode); // Save preference
    console.log('Dark mode active:', darkMode); // Debugging
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className="app-container">
      <h1>MongoDB Data Storage</h1>
      <button onClick={toggleDarkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <input 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Enter text"
      />
      <button onClick={() => {
        axios.post('http://localhost:5000/data', { text })
          .then((res) => {
            setData([...data, res.data]);
            setText('');
          })
          .catch((err) => console.error('Error adding data:', err));
      }}>Add</button>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
