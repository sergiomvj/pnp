// facepodcast.routes.js
// Rotas Express para FacePodCast
const express = require('express');
const router = express.Router();
const { generatePodcast, getPodcast, addComment, getComments, getTranscript } = require('./FacePodCast');

// Gerar podcast a partir de artigo
router.post('/generate', generatePodcast);
// Obter podcast de artigo
router.get('/:articleId', getPodcast);
// Adicionar comentário
router.post('/:podcastId/comment', addComment);
// Listar comentários
router.get('/:podcastId/comments', getComments);
// Obter transcrição
router.get('/:podcastId/transcript', getTranscript);

module.exports = router;
