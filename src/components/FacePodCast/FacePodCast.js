// FacePodCast.js
// Funções backend para geração de podcasts e comentários
const db = require('../../db');
const { OpenAIApi, Configuration } = require('openai');
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

// Gerar podcast a partir de artigo
async function generatePodcast(req, res) {
  const { articleId, articleText } = req.body;
  // Chamar IA para gerar áudio (exemplo fictício)
  // Integração real depende de TTS provider
  const audioUrl = `https://fake-tts-service.com/audio/${articleId}`;
  // Gerar transcrição automática
  const aiRes = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: `Transcreva o seguinte artigo para áudio: ${articleText}` }],
  });
  const transcript = aiRes.data.choices[0].message.content;
  const result = await db.one('INSERT INTO facepodcast_podcasts (article_id, audio_url, transcript) VALUES ($1, $2, $3) RETURNING *', [articleId, audioUrl, transcript]);
  res.json(result);
}

// Obter podcast de artigo
async function getPodcast(req, res) {
  const { articleId } = req.params;
  const podcast = await db.oneOrNone('SELECT * FROM facepodcast_podcasts WHERE article_id = $1', [articleId]);
  res.json(podcast);
}

// Adicionar comentário
async function addComment(req, res) {
  const { podcastId } = req.params;
  const { userId, timestampSeconds, comment } = req.body;
  await db.none('INSERT INTO facepodcast_comments (podcast_id, user_id, timestamp_seconds, comment) VALUES ($1, $2, $3, $4)', [podcastId, userId, timestampSeconds, comment]);
  res.json({ success: true });
}

// Listar comentários
async function getComments(req, res) {
  const { podcastId } = req.params;
  const comments = await db.any('SELECT * FROM facepodcast_comments WHERE podcast_id = $1 ORDER BY timestamp_seconds', [podcastId]);
  res.json({ comments });
}

// Obter transcrição
async function getTranscript(req, res) {
  const { podcastId } = req.params;
  const podcast = await db.oneOrNone('SELECT transcript FROM facepodcast_podcasts WHERE id = $1', [podcastId]);
  res.json({ transcript: podcast ? podcast.transcript : null });
}

module.exports = { generatePodcast, getPodcast, addComment, getComments, getTranscript };
