import React, { useEffect, useState } from 'react';

export default function FaceGamification({ apiBase = '/api/facegamification' }) {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    fetch(`${apiBase}/leaderboard`)
      .then(res => res.json())
      .then(data => { setRanking(data); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, [apiBase]);

  if (loading) return <div>Carregando ranking...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="facegamification-leaderboard">
      <h2>Ranking de Leitores</h2>
      <ol>
        {ranking.map((user, idx) => (
          <li key={user.user_id}>
            <strong>#{idx + 1}</strong> Usuário: {user.user_id} | Pontos: {user.pontos}
            <div>Badges: {user.badges && user.badges.length ? user.badges.join(', ') : 'Nenhum'}</div>
            <div>Conquistas: {user.conquistas && user.conquistas.length ? user.conquistas.join(', ') : 'Nenhuma'}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}
