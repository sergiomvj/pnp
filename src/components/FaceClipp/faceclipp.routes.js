const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const pool = new Pool();

// Listar clippings
router.get('/clippings', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM faceclipp_clippings ORDER BY data_publicacao DESC NULLS LAST, criado_em DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Adicionar clipping
router.post('/clippings', async (req, res) => {
  const { fonte, titulo, resumo, url, data_publicacao } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO faceclipp_clippings (fonte, titulo, resumo, url, data_publicacao) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [fonte, titulo, resumo, url, data_publicacao]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar status/curadoria
router.patch('/clippings/:id', async (req, res) => {
  const { id } = req.params;
  const { status_curadoria, enviado_whatsapp } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE faceclipp_clippings SET status_curadoria = COALESCE($1, status_curadoria), enviado_whatsapp = COALESCE($2, enviado_whatsapp), atualizado_em = NOW() WHERE id = $3 RETURNING *',
      [status_curadoria, enviado_whatsapp, id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
