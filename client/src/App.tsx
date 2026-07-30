import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('http://localhost:3001/health')
      .then((res) => res.json())
      .then((data) => setMessage(data.status))
      .catch(() => setMessage('Backend unavailable'));
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Warehouse Management System</h1>
      <p>Backend Status: {message}</p>
    </div>
  );
}

export default App;
