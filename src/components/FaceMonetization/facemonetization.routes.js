// facemonetization.routes.js
// Rotas Express para FaceMonetization (admin e público)
const express = require('express');
const router = express.Router();
const monetization = require('./FaceMonetization');

// Planos
router.get('/plans', monetization.listPlans);
router.post('/plans', monetization.createPlan);
router.put('/plans/:id', monetization.updatePlan);
router.delete('/plans/:id', monetization.deletePlan);

// Assinaturas
router.get('/subscriptions', monetization.listSubscriptions);
router.post('/subscriptions', monetization.createSubscription);
router.put('/subscriptions/:id', monetization.updateSubscription);
router.delete('/subscriptions/:id', monetization.deleteSubscription);

// Conteúdo exclusivo
router.get('/exclusive', monetization.listExclusiveContent);
router.post('/exclusive', monetization.createExclusiveContent);
router.put('/exclusive/:id', monetization.updateExclusiveContent);
router.delete('/exclusive/:id', monetization.deleteExclusiveContent);

// Clube de Vantagens
router.get('/benefits', monetization.listBenefits);
router.post('/benefits', monetization.createBenefit);
router.put('/benefits/:id', monetization.updateBenefit);
router.delete('/benefits/:id', monetization.deleteBenefit);

// Resgate de benefícios
router.get('/user-benefits', monetization.listUserBenefits);
router.post('/user-benefits', monetization.createUserBenefit);

module.exports = router;
