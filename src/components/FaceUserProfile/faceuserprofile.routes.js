const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const pool = new Pool();

// Buscar perfil detalhado
router.get('/profile/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const { rows } = await pool.query(
      `SELECT id as user_id, nickname, avatar_url, points, favorite_categories, total_articles_read, total_time_reading, reading_streak
       FROM profiles WHERE id = $1`,
      [userId]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Listar favoritos do usuário
router.get('/favorites/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const { rows } = await pool.query(
      `SELECT f.article_id, a.title as article_title
       FROM faceuserprofile_favorites f
       LEFT JOIN articles a ON a.id = f.article_id
       WHERE f.user_id = $1
       ORDER BY f.criado_em DESC`,
      [userId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Adicionar artigo favorito
router.post('/favorites', async (req, res) => {
  const { user_id, article_id } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO faceuserprofile_favorites (user_id, article_id) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *`,
      [user_id, article_id]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
