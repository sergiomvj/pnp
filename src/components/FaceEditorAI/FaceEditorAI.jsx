// FaceEditorAI.jsx
// Componente React para chat flutuante e IA editorial
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function FaceEditorAI({ userId }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Opcional: carregar histórico
  }, [userId]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setMessages([...messages, { from: 'user', text: input }]);
    const res = await axios.post('/api/faceeditorai/chat', { userId, message: input });
    setMessages([...messages, { from: 'user', text: input }, { from: 'ai', text: res.data.response }]);
    setInput('');
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button onClick={() => setOpen(!open)} className="bg-blue-600 text-white rounded-full p-4 shadow-lg">IA</button>
      {open && (
        <div className="w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col p-4">
          <div className="flex-1 overflow-y-auto mb-2">
            {messages.map((msg, i) => (
              <div key={i} className={msg.from === 'user' ? 'text-right' : 'text-left'}>
                <span className={msg.from === 'user' ? 'bg-blue-100' : 'bg-gray-100'} style={{ borderRadius: 8, padding: 4, margin: 2 }}>{msg.text}</span>
              </div>
            ))}
          </div>
          <div className="flex">
            <input className="flex-1 border rounded-l px-2 py-1" value={input} onChange={e => setInput(e.target.value)} disabled={loading} onKeyDown={e => e.key === 'Enter' && sendMessage()} />
            <button className="bg-blue-600 text-white px-4 py-1 rounded-r" onClick={sendMessage} disabled={loading}>Enviar</button>
          </div>
        </div>
      )}
    </div>
  );
}
