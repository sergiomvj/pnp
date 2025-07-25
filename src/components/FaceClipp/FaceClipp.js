import React, { useEffect, useState } from 'react';

export default function FaceClipp({ apiBase = '/api/faceclipp' }) {
  const [clippings, setClippings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    fetch(`${apiBase}/clippings`)
      .then(res => res.json())
      .then(data => { setClippings(data); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, [apiBase]);

  if (loading) return <div>Carregando clippings...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="faceclipp-list">
      <h2>Clippings Recentes</h2>
      <ul>
        {clippings.map(clip => (
          <li key={clip.id}>
            <a href={clip.url} target="_blank" rel="noopener noreferrer">{clip.titulo}</a>
            <div><small>{clip.fonte} | {new Date(clip.data_publicacao).toLocaleString()}</small></div>
            <div>{clip.resumo}</div>
            <div>Status: {clip.status_curadoria}</div>
            <div>Enviado WhatsApp: {clip.enviado_whatsapp ? 'Sim' : 'Não'}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
