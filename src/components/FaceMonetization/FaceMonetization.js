// FaceMonetization.js
// Funções backend para monetização e administração
const db = require('../../db');

// Planos
async function listPlans(req, res) {
  const plans = await db.any('SELECT * FROM facemonetization_plans ORDER BY price_cents');
  res.json({ plans });
}
async function createPlan(req, res) {
  const { name, description, price_cents, period, active } = req.body;
  await db.none('INSERT INTO facemonetization_plans (name, description, price_cents, period, active) VALUES ($1, $2, $3, $4, $5)', [name, description, price_cents, period, active]);
  res.json({ success: true });
}
async function updatePlan(req, res) {
  const { id } = req.params;
  const { name, description, price_cents, period, active } = req.body;
  await db.none('UPDATE facemonetization_plans SET name=$1, description=$2, price_cents=$3, period=$4, active=$5 WHERE id=$6', [name, description, price_cents, period, active, id]);
  res.json({ success: true });
}
async function deletePlan(req, res) {
  const { id } = req.params;
  await db.none('DELETE FROM facemonetization_plans WHERE id=$1', [id]);
  res.json({ success: true });
}

// Assinaturas
async function listSubscriptions(req, res) {
  const subs = await db.any('SELECT * FROM facemonetization_subscriptions');
  res.json({ subscriptions: subs });
}
async function createSubscription(req, res) {
  const { user_id, plan_id, status, expires_at, payment_gateway, external_id } = req.body;
  await db.none('INSERT INTO facemonetization_subscriptions (user_id, plan_id, status, expires_at, payment_gateway, external_id) VALUES ($1, $2, $3, $4, $5, $6)', [user_id, plan_id, status, expires_at, payment_gateway, external_id]);
  res.json({ success: true });
}
async function updateSubscription(req, res) {
  const { id } = req.params;
  const { status, expires_at } = req.body;
  await db.none('UPDATE facemonetization_subscriptions SET status=$1, expires_at=$2 WHERE id=$3', [status, expires_at, id]);
  res.json({ success: true });
}
async function deleteSubscription(req, res) {
  const { id } = req.params;
  await db.none('DELETE FROM facemonetization_subscriptions WHERE id=$1', [id]);
  res.json({ success: true });
}

// Conteúdo exclusivo
async function listExclusiveContent(req, res) {
  const content = await db.any('SELECT * FROM facemonetization_exclusive_content');
  res.json({ exclusive: content });
}
async function createExclusiveContent(req, res) {
  const { article_id, available_for_plan } = req.body;
  await db.none('INSERT INTO facemonetization_exclusive_content (article_id, available_for_plan) VALUES ($1, $2)', [article_id, available_for_plan]);
  res.json({ success: true });
}
async function updateExclusiveContent(req, res) {
  const { id } = req.params;
  const { article_id, available_for_plan } = req.body;
  await db.none('UPDATE facemonetization_exclusive_content SET article_id=$1, available_for_plan=$2 WHERE id=$3', [article_id, available_for_plan, id]);
  res.json({ success: true });
}
async function deleteExclusiveContent(req, res) {
  const { id } = req.params;
  await db.none('DELETE FROM facemonetization_exclusive_content WHERE id=$1', [id]);
  res.json({ success: true });
}

// Clube de Vantagens
async function listBenefits(req, res) {
  const benefits = await db.any('SELECT * FROM facemonetization_benefits');
  res.json({ benefits });
}
async function createBenefit(req, res) {
  const { name, description, image_url, active } = req.body;
  await db.none('INSERT INTO facemonetization_benefits (name, description, image_url, active) VALUES ($1, $2, $3, $4)', [name, description, image_url, active]);
  res.json({ success: true });
}
async function updateBenefit(req, res) {
  const { id } = req.params;
  const { name, description, image_url, active } = req.body;
  await db.none('UPDATE facemonetization_benefits SET name=$1, description=$2, image_url=$3, active=$4 WHERE id=$5', [name, description, image_url, active, id]);
  res.json({ success: true });
}
async function deleteBenefit(req, res) {
  const { id } = req.params;
  await db.none('DELETE FROM facemonetization_benefits WHERE id=$1', [id]);
  res.json({ success: true });
}

// Resgate de benefícios
async function listUserBenefits(req, res) {
  const userBenefits = await db.any('SELECT * FROM facemonetization_user_benefits');
  res.json({ user_benefits: userBenefits });
}
async function createUserBenefit(req, res) {
  const { user_id, benefit_id } = req.body;
  await db.none('INSERT INTO facemonetization_user_benefits (user_id, benefit_id) VALUES ($1, $2)', [user_id, benefit_id]);
  res.json({ success: true });
}

module.exports = {
  listPlans, createPlan, updatePlan, deletePlan,
  listSubscriptions, createSubscription, updateSubscription, deleteSubscription,
  listExclusiveContent, createExclusiveContent, updateExclusiveContent, deleteExclusiveContent,
  listBenefits, createBenefit, updateBenefit, deleteBenefit,
  listUserBenefits, createUserBenefit
};
