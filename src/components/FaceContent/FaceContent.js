// FaceContent.js
// Funções backend para gerenciamento de artigos
const db = require('../../db');
const axios = require('axios');

// CRUD de artigos
async function listArticles(req, res) {
  const articles = await db.any('SELECT * FROM facecontent_articles WHERE deleted_at IS NULL ORDER BY created_at DESC');
  res.json({ articles });
}
async function getArticle(req, res) {
  const { id } = req.params;
  const article = await db.oneOrNone('SELECT * FROM facecontent_articles WHERE id = $1 AND deleted_at IS NULL', [id]);
  res.json({ article });
}
async function createArticle(req, res) {
  const { user_id, title, content, image_url, seo_title, seo_description, seo_keywords } = req.body;
  const result = await db.one('INSERT INTO facecontent_articles (user_id, title, content, image_url, seo_title, seo_description, seo_keywords) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [user_id, title, content, image_url, seo_title, seo_description, seo_keywords]);
  res.json(result);
}
async function updateArticle(req, res) {
  const { id } = req.params;
  const { title, content, image_url, seo_title, seo_description, seo_keywords } = req.body;
  await db.none('UPDATE facecontent_articles SET title=$1, content=$2, image_url=$3, seo_title=$4, seo_description=$5, seo_keywords=$6, updated_at=NOW() WHERE id=$7', [title, content, image_url, seo_title, seo_description, seo_keywords, id]);
  res.json({ success: true });
}
async function deleteArticle(req, res) {
  const { id } = req.params;
  await db.none('UPDATE facecontent_articles SET deleted_at=NOW() WHERE id=$1', [id]);
  res.json({ success: true });
}

// Histórico de edições
async function getArticleHistory(req, res) {
  const { id } = req.params;
  const history = await db.any('SELECT * FROM facecontent_article_history WHERE article_id = $1 ORDER BY edited_at DESC', [id]);
  res.json({ history });
}

// Permissões
async function getUserPermissions(req, res) {
  const { userId } = req.params;
  const permissions = await db.any('SELECT * FROM facecontent_permissions WHERE user_id = $1', [userId]);
  res.json({ permissions });
}

// Correção ortográfica (LanguageTool)
async function spellCheck(req, res) {
  const { text, language } = req.body;
  const ltRes = await axios.post('https://api.languagetoolplus.com/v2/check', null, {
    params: {
      text,
      language: language || 'auto',
    },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  res.json(ltRes.data);
}

// Sugestão de imagem via API
async function suggestImage(req, res) {
  const { summary } = req.body;
  // Exemplo: Unsplash API (ajuste para seu provedor)
  const unsplashRes = await axios.get('https://api.unsplash.com/search/photos', {
    params: { query: summary, per_page: 5 },
    headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` },
  });
  res.json({ images: unsplashRes.data.results });
}

// SEO via IA
async function generateSEO(req, res) {
  const { text } = req.body;
  // Exemplo: OpenAI para gerar descrição, keywords, hashtags
  // Ajuste para seu provedor de IA
  const aiRes = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: `Gere uma descrição, keywords e hashtags para o seguinte artigo: ${text}` }],
  }, {
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
  });
  res.json(aiRes.data.choices[0].message.content);
}

module.exports = {
  listArticles, getArticle, createArticle, updateArticle, deleteArticle,
  getArticleHistory, getUserPermissions, spellCheck, suggestImage, generateSEO
};
