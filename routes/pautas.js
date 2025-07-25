// routes/pautas.js
const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/gerar', async (req, res) => {
  const { tema, publicoAlvo, tom, formato, palavrasChave } = req.body;

  const prompt = `
Gere 3 sugestões de pautas jornalísticas para o tema: ${tema}.
Público-alvo: ${publicoAlvo}.
Tom: ${tom}.
Formato: ${formato}.
Palavras-chave: ${palavrasChave.join(', ')}.
Para cada pauta, retorne título e resumo.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
      temperature: 0.8
    });

    // Ajuste conforme a resposta do modelo
    const pautas = completion.choices[0].message.content;
    res.json({ pautas });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;