// FaceAds.js
// Funções backend para gestão comercial de anúncios
const db = require('../../db');

// Formatos de ads
async function listFormats(req, res) {
  const formats = await db.any('SELECT * FROM faceads_formats ORDER BY created_at DESC');
  res.json({ formats });
}
async function createFormat(req, res) {
  const { name, location, cost_cents, active } = req.body;
  await db.none('INSERT INTO faceads_formats (name, location, cost_cents, active) VALUES ($1, $2, $3, $4)', [name, location, cost_cents, active]);
  res.json({ success: true });
}
async function updateFormat(req, res) {
  const { id } = req.params;
  const { name, location, cost_cents, active } = req.body;
  await db.none('UPDATE faceads_formats SET name=$1, location=$2, cost_cents=$3, active=$4 WHERE id=$5', [name, location, cost_cents, active, id]);
  res.json({ success: true });
}
async function deleteFormat(req, res) {
  const { id } = req.params;
  await db.none('DELETE FROM faceads_formats WHERE id=$1', [id]);
  res.json({ success: true });
}

// Clientes
async function listClients(req, res) {
  const clients = await db.any('SELECT * FROM faceads_clients ORDER BY created_at DESC');
  res.json({ clients });
}
async function createClient(req, res) {
  const { name, contact } = req.body;
  await db.none('INSERT INTO faceads_clients (name, contact) VALUES ($1, $2)', [name, contact]);
  res.json({ success: true });
}
async function updateClient(req, res) {
  const { id } = req.params;
  const { name, contact } = req.body;
  await db.none('UPDATE faceads_clients SET name=$1, contact=$2 WHERE id=$3', [name, contact, id]);
  res.json({ success: true });
}
async function deleteClient(req, res) {
  const { id } = req.params;
  await db.none('DELETE FROM faceads_clients WHERE id=$1', [id]);
  res.json({ success: true });
}

// Campanhas
async function listCampaigns(req, res) {
  const campaigns = await db.any('SELECT * FROM faceads_campaigns ORDER BY created_at DESC');
  res.json({ campaigns });
}
async function createCampaign(req, res) {
  const { client_id, format_id, name, start_date, end_date, budget_cents, status } = req.body;
  await db.none('INSERT INTO faceads_campaigns (client_id, format_id, name, start_date, end_date, budget_cents, status) VALUES ($1, $2, $3, $4, $5, $6, $7)', [client_id, format_id, name, start_date, end_date, budget_cents, status]);
  res.json({ success: true });
}
async function updateCampaign(req, res) {
  const { id } = req.params;
  const { client_id, format_id, name, start_date, end_date, budget_cents, status } = req.body;
  await db.none('UPDATE faceads_campaigns SET client_id=$1, format_id=$2, name=$3, start_date=$4, end_date=$5, budget_cents=$6, status=$7 WHERE id=$8', [client_id, format_id, name, start_date, end_date, budget_cents, status, id]);
  res.json({ success: true });
}
async function deleteCampaign(req, res) {
  const { id } = req.params;
  await db.none('DELETE FROM faceads_campaigns WHERE id=$1', [id]);
  res.json({ success: true });
}

// Faturamento
async function listBilling(req, res) {
  const billing = await db.any('SELECT * FROM faceads_billing ORDER BY issued_at DESC');
  res.json({ billing });
}
async function createBilling(req, res) {
  const { campaign_id, amount_cents, paid_at } = req.body;
  await db.none('INSERT INTO faceads_billing (campaign_id, amount_cents, paid_at) VALUES ($1, $2, $3)', [campaign_id, amount_cents, paid_at]);
  res.json({ success: true });
}
async function updateBilling(req, res) {
  const { id } = req.params;
  const { amount_cents, paid_at } = req.body;
  await db.none('UPDATE faceads_billing SET amount_cents=$1, paid_at=$2 WHERE id=$3', [amount_cents, paid_at, id]);
  res.json({ success: true });
}
async function deleteBilling(req, res) {
  const { id } = req.params;
  await db.none('DELETE FROM faceads_billing WHERE id=$1', [id]);
  res.json({ success: true });
}

module.exports = {
  listFormats, createFormat, updateFormat, deleteFormat,
  listClients, createClient, updateClient, deleteClient,
  listCampaigns, createCampaign, updateCampaign, deleteCampaign,
  listBilling, createBilling, updateBilling, deleteBilling
};
