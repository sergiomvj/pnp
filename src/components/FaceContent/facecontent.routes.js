// facecontent.routes.js
// Rotas Express para FaceContent
const express = require('express');
const router = express.Router();
const content = require('./FaceContent');

// CRUD de artigos
router.get('/articles', content.listArticles);
router.get('/articles/:id', content.getArticle);
router.post('/articles', content.createArticle);
router.put('/articles/:id', content.updateArticle);
router.delete('/articles/:id', content.deleteArticle);

// Histórico de edições
router.get('/articles/:id/history', content.getArticleHistory);

// Permissões
router.get('/permissions/:userId', content.getUserPermissions);

// Correção ortográfica
router.post('/spellcheck', content.spellCheck);

// Sugestão de imagem
router.post('/suggest-image', content.suggestImage);

// SEO
router.post('/seo', content.generateSEO);

module.exports = router;
