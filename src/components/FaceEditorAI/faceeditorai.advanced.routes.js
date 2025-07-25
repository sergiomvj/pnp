// faceeditorai.advanced.routes.js
// Rotas Express para recursos avançados da IA Helena
const express = require('express');
const router = express.Router();
const { getPersistentMemory, setPersistentMemory, analyzeReadingPatterns, generateCustomContent } = require('./FaceEditorAI.advanced');

// Memória persistente
router.get('/memory/:userId', getPersistentMemory);
router.post('/memory/:userId', setPersistentMemory);

// Análise de padrões de leitura
router.post('/analyze/:userId', analyzeReadingPatterns);

// Geração de conteúdo personalizado
router.post('/custom-content', generateCustomContent);

module.exports = router;
