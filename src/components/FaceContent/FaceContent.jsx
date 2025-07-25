// FaceContent.jsx
// Componente React para gerenciamento de artigos
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function FaceContent({ userId, isAdmin }) {
  const [articles, setArticles] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', content: '', image_url: '', seo_title: '', seo_description: '', seo_keywords: '' });
  const [errors, setErrors] = useState([]);
  const [images, setImages] = useState([]);
  const [seo, setSeo] = useState({});

  useEffect(() => {
    axios.get('/api/facecontent/articles').then(res => setArticles(res.data.articles));
  }, []);

  // Correção ortográfica
  const handleSpellCheck = async (text, language) => {
    const res = await axios.post('/api/facecontent/spellcheck', { text, language });
    setErrors(res.data.matches || []);
  };

  // Sugestão de imagem
  const handleSuggestImage = async (summary) => {
    const res = await axios.post('/api/facecontent/suggest-image', { summary });
    setImages(res.data.images);
  };

  // SEO
  const handleSEO = async (text) => {
    const res = await axios.post('/api/facecontent/seo', { text });
    setSeo(res.data);
  };

  // CRUD
  const handleEdit = (article) => {
    setEditing(article.id);
    setForm(article);
  };
  const handleDelete = async (id) => {
    if (!window.confirm('Excluir este artigo?')) return;
    await axios.delete(`/api/facecontent/articles/${id}`);
    setArticles(articles.filter(a => a.id !== id));
  };
  const handleSubmit = async () => {
    if (!form.image_url || !seo.seo_description) return alert('Imagem e SEO obrigatórios!');
    if (editing) {
      await axios.put(`/api/facecontent/articles/${editing}`, form);
    } else {
      await axios.post('/api/facecontent/articles', { ...form, user_id: userId });
    }
    setEditing(null);
    setForm({ title: '', content: '', image_url: '', seo_title: '', seo_description: '', seo_keywords: '' });
    axios.get('/api/facecontent/articles').then(res => setArticles(res.data.articles));
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Gerenciador de Artigos</h2>
      <div className="mb-6">
        <input className="w-full border rounded mb-2 px-2 py-1" placeholder="Título" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <textarea className="w-full border rounded mb-2 px-2 py-1" placeholder="Conteúdo" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} onBlur={e => handleSpellCheck(e.target.value, 'auto')} />
        {errors.length > 0 && <div className="text-red-600 text-xs mb-2">{errors.map((err, i) => <div key={i}>{err.message} ({err.replacements.map(r => r.value).join(', ')})</div>)}</div>}
        <button className="bg-blue-600 text-white px-3 py-1 rounded mb-2" onClick={() => handleSuggestImage(form.content.slice(0, 150))}>Sugerir Imagem</button>
        <div className="flex gap-2 mb-2">
          {images.map(img => <img key={img.id} src={img.urls.thumb} alt="Sugestão" className="w-16 h-16 object-cover cursor-pointer border-2" onClick={() => setForm({ ...form, image_url: img.urls.full })} />)}
        </div>
        <button className="bg-green-600 text-white px-3 py-1 rounded mb-2" onClick={() => handleSEO(form.content)}>Gerar SEO</button>
        {seo && seo.seo_description && <div className="text-xs bg-gray-100 p-2 rounded mb-2">SEO: {seo.seo_description} <br />Keywords: {seo.seo_keywords} <br />Hashtags: {seo.hashtags}</div>}
        <input className="w-full border rounded mb-2 px-2 py-1" placeholder="URL da Imagem" value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} />
        <button className="bg-blue-700 text-white px-4 py-2 rounded w-full" onClick={handleSubmit} disabled={!form.image_url || !seo.seo_description}>Salvar Artigo</button>
      </div>
      <h3 className="text-lg font-bold mb-2">Meus Artigos</h3>
      <ul>
        {articles.filter(a => a.user_id === userId).map(article => (
          <li key={article.id} className="border-b py-2 flex items-center">
            <span className="flex-1">{article.title}</span>
            <button className="text-blue-600 mr-2" onClick={() => handleEdit(article)}>Editar</button>
            {isAdmin && <button className="text-red-600" onClick={() => handleDelete(article.id)}>Excluir</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}
