// FaceCMS.js
// Funções backend para CMS administrativo
const db = require('../../db');

// Publicação de artigos
async function publishArticle(req, res) {
  const { article_id, published_by } = req.body;
  await db.none('INSERT INTO facecms_publications (article_id, published_by) VALUES ($1, $2)', [article_id, published_by]);
  res.json({ success: true });
}
async function listPublications(req, res) {
  const pubs = await db.any('SELECT * FROM facecms_publications ORDER BY published_at DESC');
  res.json({ publications: pubs });
}

// Moderação
async function moderateArticle(req, res) {
  const { article_id, moderator_id, status, reason } = req.body;
  await db.none('INSERT INTO facecms_moderation (article_id, moderator_id, status, reason) VALUES ($1, $2, $3, $4)', [article_id, moderator_id, status, reason]);
  res.json({ success: true });
}
async function listModeration(req, res) {
  const mods = await db.any('SELECT * FROM facecms_moderation ORDER BY moderated_at DESC');
  res.json({ moderation: mods });
}

// Analytics
async function getAnalytics(req, res) {
  const analytics = await db.any('SELECT * FROM facecms_analytics ORDER BY updated_at DESC');
  res.json({ analytics });
}

// Configuração IA Helena
async function getHelenaConfig(req, res) {
  const config = await db.any('SELECT * FROM facecms_helena_config');
  res.json({ config });
}
async function updateHelenaConfig(req, res) {
  const { key, value } = req.body;
  await db.none('UPDATE facecms_helena_config SET value=$1, updated_at=NOW() WHERE key=$2', [value, key]);
  res.json({ success: true });
}

// Permissões
async function listRoles(req, res) {
  const roles = await db.any('SELECT * FROM facecms_user_roles');
  res.json({ roles });
}
async function assignRole(req, res) {
  const { user_id, role } = req.body;
  await db.none('INSERT INTO facecms_user_roles (user_id, role) VALUES ($1, $2)', [user_id, role]);
  res.json({ success: true });
}

module.exports = {
  publishArticle, listPublications,
  moderateArticle, listModeration,
  getAnalytics,
  getHelenaConfig, updateHelenaConfig,
  listRoles, assignRole
};
