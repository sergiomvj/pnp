import React, { useEffect, useState } from 'react';

export default function FaceUserProfile({ apiBase = '/api/faceuserprofile', userId }) {
  const [profile, setProfile] = useState();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    Promise.all([
      fetch(`${apiBase}/profile/${userId}`).then(res => res.json()),
      fetch(`${apiBase}/favorites/${userId}`).then(res => res.json())
    ])
      .then(([profileData, favs]) => {
        setProfile(profileData);
        setFavorites(favs);
        setLoading(false);
      })
      .catch(e => { setError(e.message); setLoading(false); });
  }, [apiBase, userId]);

  if (loading) return <div>Carregando perfil...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!profile) return <div>Perfil não encontrado.</div>;

  return (
    <div className="faceuserprofile">
      <h2>Perfil do Usuário</h2>
      <img src={profile.avatar_url} alt="Avatar" style={{ width: 80, borderRadius: '50%' }} />
      <div><strong>Nickname:</strong> {profile.nickname}</div>
      <div><strong>Pontos:</strong> {profile.points}</div>
      <div><strong>Preferências:</strong> {profile.favorite_categories && profile.favorite_categories.join(', ')}</div>
      <div><strong>Estatísticas de leitura:</strong> {profile.total_articles_read} artigos, {profile.total_time_reading} min</div>
      <div><strong>Histórico de interações:</strong> {profile.reading_streak} dias de streak</div>
      <h3>Artigos Favoritos</h3>
      <ul>
        {favorites.map(fav => (
          <li key={fav.article_id}>
            <a href={`/artigo/${fav.article_id}`}>{fav.article_title || fav.article_id}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
