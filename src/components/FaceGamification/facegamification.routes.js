const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const pool = new Pool();

// Listar ranking
router.get('/leaderboard', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM facegamification_leaderboard ORDER BY pontos DESC, ultima_atualizacao ASC LIMIT 100');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Adicionar/atualizar pontos, badges, conquistas
router.post('/leaderboard', async (req, res) => {
  const { user_id, pontos, badges, conquistas } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO facegamification_leaderboard (user_id, pontos, badges, conquistas, ultima_atualizacao)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT (user_id) DO UPDATE SET pontos = $2, badges = $3, conquistas = $4, ultima_atualizacao = NOW()
       RETURNING *`,
      [user_id, pontos, badges, conquistas]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
