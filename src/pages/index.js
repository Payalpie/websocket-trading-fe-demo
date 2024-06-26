import { TradeDetails } from '@/components/TradeDetails';
import useWebSocket from '@/hooks/useWebSocket';
import axios from 'axios';
import { useState } from 'react';

export default function Home() {
  const { status, data: tradeData, logs, addLog } = useWebSocket(process.env.NEXT_PUBLIC_WS_BASE_URL);
  const [loading, setLoading] = useState(false);

  const handleTrade = async () => {
    try {
      addLog('Trade initiated');
      setLoading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/trade`);
      addLog('Trade completed');
    } catch (error) {
      addLog('Trade failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <button
        onClick={handleTrade}
        disabled={loading}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition ease-in-out duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? 'Processing...' : 'Execute Trade'}
      </button>
      <div className="status mt-4">
        <p className={`text-lg ${status === 'Connected' ? 'text-green-500' : 'text-red-500'}`}>Status: <span>{status}</span></p>
      </div>
      <div className="logs mt-4 bg-gray-100 p-4 rounded shadow">
        <h2 className="text-xl font-semibold">Logs:</h2>
        <ul className="list-disc pl-5">
          {logs.map((log, index) => (
            <li key={index} className="text-gray-700">{log}</li>
          ))}
        </ul>
      </div>
      {tradeData && (
        <TradeDetails tradeData={tradeData} />
      )}
    </div>
  );
}
