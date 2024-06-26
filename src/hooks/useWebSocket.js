import { useState, useEffect } from 'react';

const useWebSocket = (url) => {
  const [status, setStatus] = useState('Disconnected');
  const [data, setData] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => setStatus('Connected');
    ws.onclose = () => setStatus('Disconnected');
    ws.onmessage = (message) => {
      const msgData = message.data;
      if (msgData.startsWith('{') && msgData.endsWith('}')) {
        setData(JSON.parse(msgData));
      } else {
        setLogs(prevLogs => [...prevLogs, msgData]);
      }
    };

    return () => ws.close();
  }, [url]);

  return { status, data, logs, addLog: (log) => setLogs(prev => [...prev, log]) };
};

export default useWebSocket;