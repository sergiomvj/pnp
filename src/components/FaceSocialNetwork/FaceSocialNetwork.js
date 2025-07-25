// FaceSocialNetwork.js
// Funções backend para recursos sociais
const db = require('../../db');

// Compartilhamento de trechos como cards
async function shareCard(req, res) {
  const { userId, articleId, excerpt, imageUrl } = req.body;
  await db.none('INSERT INTO facesocial_cards (user_id, article_id, excerpt, image_url) VALUES ($1, $2, $3, $4)', [userId, articleId, excerpt, imageUrl]);
  res.json({ success: true });
}

// Stories automáticos
async function createStory(req, res) {
  const { userId, articleId, storyUrl } = req.body;
  await db.none('INSERT INTO facesocial_stories (user_id, article_id, story_url) VALUES ($1, $2, $3)', [userId, articleId, storyUrl]);
  res.json({ success: true });
}

// Sistema de desafios
async function challengeUser(req, res) {
  const { challengerId, challengedId, articleId } = req.body;
  await db.none('INSERT INTO facesocial_challenges (challenger_id, challenged_id, article_id) VALUES ($1, $2, $3)', [challengerId, challengedId, articleId]);
  res.json({ success: true });
}

// Comentários e discussões
async function commentArticle(req, res) {
  const { articleId, userId, comment, parentId } = req.body;
  await db.none('INSERT INTO facesocial_comments (article_id, user_id, comment, parent_id) VALUES ($1, $2, $3, $4)', [articleId, userId, comment, parentId]);
  res.json({ success: true });
}

// Likes
async function likeArticle(req, res) {
  const { articleId, userId } = req.body;
  await db.none('INSERT INTO facesocial_likes (article_id, user_id) VALUES ($1, $2)', [articleId, userId]);
  res.json({ success: true });
}

// Shares
async function shareArticle(req, res) {
  const { articleId, userId, network } = req.body;
  await db.none('INSERT INTO facesocial_shares (article_id, user_id, network) VALUES ($1, $2, $3)', [articleId, userId, network]);
  res.json({ success: true });
}

// Ranking de artigos
async function getRanking(req, res) {
  const ranking = await db.any(`
    SELECT article_id, COUNT(*) as total
    FROM facesocial_likes
    GROUP BY article_id
    ORDER BY total DESC
    LIMIT 10
  `);
  res.json({ ranking });
}

module.exports = { shareCard, createStory, challengeUser, commentArticle, likeArticle, shareArticle, getRanking };
