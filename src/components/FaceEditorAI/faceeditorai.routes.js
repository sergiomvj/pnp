// faceeditorai.routes.js
// Rotas Express para FaceEditorAI
const express = require('express');
const router = express.Router();
const { handleChat, getPersona, setPersona, getPautas, getSuggestions } = require('./FaceEditorAI');

// Chat flutuante
router.post('/chat', handleChat);

// Persona do usuário
router.get('/persona/:userId', getPersona);
router.post('/persona/:userId', setPersona);

// Pautas personalizadas
router.get('/pautas/:userId', getPautas);

// Sugestões de conteúdo
router.get('/suggestions/:userId', getSuggestions);

module.exports = router;
