// FaceEditorAI.js
// Funções backend para IA editorial contextual e básica
const { OpenAIApi, Configuration } = require('openai');
const db = require('../../db'); // ajuste conforme seu setup

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

// Chat flutuante
async function handleChat(req, res) {
  const { userId, message } = req.body;
  // Recupera contexto e persona
  const persona = await db.oneOrNone('SELECT persona FROM faceeditorai_personas WHERE user_id = $1', [userId]);
  const context = await db.any('SELECT message, response FROM faceeditorai_conversations WHERE user_id = $1 ORDER BY created_at DESC LIMIT 10', [userId]);
  // Chama OpenAI
  const prompt = `Persona: ${persona ? JSON.stringify(persona.persona) : 'default'}\nContexto: ${JSON.stringify(context)}\nUsuário: ${message}`;
  const aiRes = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  });
  const response = aiRes.data.choices[0].message.content;
  // Loga conversa
  await db.none('INSERT INTO faceeditorai_conversations (user_id, message, response, context, persona) VALUES ($1, $2, $3, $4, $5)', [userId, message, response, JSON.stringify(context), persona ? persona.persona : null]);
  res.json({ response });
}

// Persona do usuário
async function getPersona(req, res) {
  const { userId } = req.params;
  const persona = await db.oneOrNone('SELECT persona FROM faceeditorai_personas WHERE user_id = $1', [userId]);
  res.json({ persona });
}
async function setPersona(req, res) {
  const { userId } = req.params;
  const { persona } = req.body;
  await db.none('INSERT INTO faceeditorai_personas (user_id, persona, updated_at) VALUES ($1, $2, NOW()) ON CONFLICT (user_id) DO UPDATE SET persona = $2, updated_at = NOW()', [userId, persona]);
  res.json({ success: true });
}

// Pautas personalizadas
async function getPautas(req, res) {
  const { userId } = req.params;
  const pautas = await db.any('SELECT * FROM faceeditorai_pautas WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
  res.json({ pautas });
}

// Sugestões de conteúdo
async function getSuggestions(req, res) {
  const { userId } = req.params;
  const suggestions = await db.any('SELECT * FROM faceeditorai_suggestions WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
  res.json({ suggestions });
}

module.exports = { handleChat, getPersona, setPersona, getPautas, getSuggestions };
