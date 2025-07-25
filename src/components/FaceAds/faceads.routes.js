// faceads.routes.js
// Rotas Express para FaceAds
const express = require('express');
const router = express.Router();
const ads = require('./FaceAds');

// Formatos de ads
router.get('/formats', ads.listFormats);
router.post('/formats', ads.createFormat);
router.put('/formats/:id', ads.updateFormat);
router.delete('/formats/:id', ads.deleteFormat);

// Clientes
router.get('/clients', ads.listClients);
router.post('/clients', ads.createClient);
router.put('/clients/:id', ads.updateClient);
router.delete('/clients/:id', ads.deleteClient);

// Campanhas
router.get('/campaigns', ads.listCampaigns);
router.post('/campaigns', ads.createCampaign);
router.put('/campaigns/:id', ads.updateCampaign);
router.delete('/campaigns/:id', ads.deleteCampaign);

// Faturamento
router.get('/billing', ads.listBilling);
router.post('/billing', ads.createBilling);
router.put('/billing/:id', ads.updateBilling);
router.delete('/billing/:id', ads.deleteBilling);

module.exports = router;
