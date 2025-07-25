// FaceEditorAI.advanced.js
// Funções backend para recursos avançados da IA Helena
const db = require('../../db');
const { OpenAIApi, Configuration } = require('openai');
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

// Memória persistente entre sessões
async function getPersistentMemory(req, res) {
  const { userId } = req.params;
  const memory = await db.oneOrNone('SELECT memory FROM faceeditorai_persistent_memory WHERE user_id = $1', [userId]);
  res.json({ memory });
}
async function setPersistentMemory(req, res) {
  const { userId } = req.params;
  const { memory } = req.body;
  await db.none('INSERT INTO faceeditorai_persistent_memory (user_id, memory, updated_at) VALUES ($1, $2, NOW()) ON CONFLICT (user_id) DO UPDATE SET memory = $2, updated_at = NOW()', [userId, memory]);
  res.json({ success: true });
}

// Análise de padrões de leitura
async function analyzeReadingPatterns(req, res) {
  const { userId } = req.params;
  // Exemplo: buscar histórico e analisar
  const history = await db.any('SELECT * FROM leitura_historico WHERE user_id = $1', [userId]);
  // Chamar IA para análise
  const aiRes = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: `Analise os padrões de leitura: ${JSON.stringify(history)}` }],
  });
  const pattern = aiRes.data.choices[0].message.content;
  await db.none('INSERT INTO faceeditorai_reading_patterns (user_id, pattern, analyzed_at) VALUES ($1, $2, NOW())', [userId, pattern]);
  res.json({ pattern });
}

// Geração de conteúdo personalizado
async function generateCustomContent(req, res) {
  const { userId, context } = req.body;
  const aiRes = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: `Gere conteúdo personalizado para o contexto: ${JSON.stringify(context)}` }],
  });
  const content = aiRes.data.choices[0].message.content;
  await db.none('INSERT INTO faceeditorai_custom_content (user_id, content, generated_at, context) VALUES ($1, $2, NOW(), $3)', [userId, content, context]);
  res.json({ content });
}

module.exports = { getPersistentMemory, setPersistentMemory, analyzeReadingPatterns, generateCustomContent };
