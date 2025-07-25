// facecms.routes.js
// Rotas Express para FaceCMS
const express = require('express');
const router = express.Router();
const cms = require('./FaceCMS');

// Publicação de artigos
router.post('/publish', cms.publishArticle);
router.get('/publications', cms.listPublications);

// Moderação
router.post('/moderate', cms.moderateArticle);
router.get('/moderation', cms.listModeration);

// Analytics
router.get('/analytics', cms.getAnalytics);

// Configuração IA Helena
router.get('/helena-config', cms.getHelenaConfig);
router.put('/helena-config', cms.updateHelenaConfig);

// Permissões
router.get('/roles', cms.listRoles);
router.post('/roles', cms.assignRole);

module.exports = router;
