// facesocialnetwork.routes.js
// Rotas Express para FaceSocialNetwork
const express = require('express');
const router = express.Router();
const { shareCard, createStory, challengeUser, commentArticle, likeArticle, shareArticle, getRanking } = require('./FaceSocialNetwork');

router.post('/card', shareCard);
router.post('/story', createStory);
router.post('/challenge', challengeUser);
router.post('/comment', commentArticle);
router.post('/like', likeArticle);
router.post('/share', shareArticle);
router.get('/ranking', getRanking);

module.exports = router;
