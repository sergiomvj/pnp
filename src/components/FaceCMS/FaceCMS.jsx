// FaceCMS.jsx
// Componente React para painel administrativo
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function FaceCMS({ userId, isAdmin }) {
  const [publications, setPublications] = useState([]);
  const [moderation, setModeration] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [roles, setRoles] = useState([]);
  const [helenaConfig, setHelenaConfig] = useState([]);

  useEffect(() => {
    axios.get('/api/facecms/publications').then(res => setPublications(res.data.publications));
    axios.get('/api/facecms/moderation').then(res => setModeration(res.data.moderation));
    axios.get('/api/facecms/analytics').then(res => setAnalytics(res.data.analytics));
    axios.get('/api/facecms/roles').then(res => setRoles(res.data.roles));
    axios.get('/api/facecms/helena-config').then(res => setHelenaConfig(res.data.config));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Painel Administrativo</h2>
      <section className="mb-6">
        <h3 className="font-semibold mb-2">Publicações</h3>
        <ul>{publications.map(pub => <li key={pub.id}>Artigo #{pub.article_id} publicado por {pub.published_by} em {new Date(pub.published_at).toLocaleString()}</li>)}</ul>
      </section>
      <section className="mb-6">
        <h3 className="font-semibold mb-2">Moderação</h3>
        <ul>{moderation.map(mod => <li key={mod.id}>Artigo #{mod.article_id} - Status: {mod.status} ({mod.reason})</li>)}</ul>
      </section>
      <section className="mb-6">
        <h3 className="font-semibold mb-2">Analytics</h3>
        <ul>{analytics.map(a => <li key={a.id}>Artigo #{a.article_id}: {a.views} views, {a.likes} likes, {a.shares} shares, {a.comments} comentários</li>)}</ul>
      </section>
      <section className="mb-6">
        <h3 className="font-semibold mb-2">Permissões de Usuário</h3>
        <ul>{roles.map(r => <li key={r.id}>{r.user_id}: {r.role}</li>)}</ul>
      </section>
      <section className="mb-6">
        <h3 className="font-semibold mb-2">Configuração IA Helena</h3>
        <ul>{helenaConfig.map(cfg => <li key={cfg.id}>{cfg.key}: {cfg.value}</li>)}</ul>
      </section>
    </div>
  );
}
