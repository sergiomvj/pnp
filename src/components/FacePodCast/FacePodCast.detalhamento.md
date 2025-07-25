# FacePodCast – Detalhamento Técnico e de Uso

Componente reutilizável para geração, publicação e reprodução de podcasts a partir de artigos, com enriquecimento de conteúdo e vozes profissionais.

## Visão Geral
- Gera podcasts a partir de artigos, enriquecendo o texto com pesquisa e citações via IA.
- Cria roteiro para duas vozes (masculina e feminina).
- Envia o script para a API ElevenLabs (ou outro TTS profissional) para gerar o áudio.
- Salva o podcast e disponibiliza para todos os usuários.
- Player interativo com timeline, transcrição e comentários vinculados a timestamps.

## Estrutura de Pastas e Arquivos
- `FacePodCast.sql`: Tabelas para podcasts, comentários e scripts.
- `FacePodCast.js`: Funções backend para geração, enriquecimento, integração TTS, comentários e transcrição.
- `facepodcast.routes.js`: Rotas Express para geração, busca, comentários e transcrição.
- `FacePodCast.jsx`: Componente React para player interativo.
- `README.md`: Manual de integração e uso.
- `FacePodCast.detalhamento.md`: Este detalhamento técnico.

## Fluxo de Geração do Podcast
1. **Receber artigo**: Endpoint recebe o texto do artigo e ID.
2. **Enriquecimento IA**: Chama assistente virtual (OpenAI, Claude, etc.) para:
   - Pesquisar o tema
   - Adicionar citações e detalhes
   - Gerar roteiro alternando falas entre duas vozes
3. **Geração de Áudio**: Envia o script para a API ElevenLabs, especificando as vozes.
4. **Salvar Podcast**: Salva URL do áudio, script, vozes e transcrição no banco/storage.
5. **Disponibilização**: Podcast fica disponível para qualquer usuário ouvir.
6. **Player**: Exibe áudio, transcrição e permite comentários com timestamps.

## Exemplo de Endpoint Backend (Fluxo Simplificado)
```js
// POST /api/facepodcast/generate
// body: { articleId, articleText }
async function generatePodcast(req, res) {
  // 1. Enriquecer artigo via IA
  // 2. Gerar roteiro para duas vozes
  // 3. Enviar para ElevenLabs e obter URL do áudio
  // 4. Salvar no banco
  // 5. Retornar dados do podcast
}
```

## Exemplo de Uso no Frontend
```jsx
import FacePodCast from './FacePodCast/FacePodCast';
<FacePodCast articleId={article.id} userId={user.id} />
```

## Observações
- Integração real com ElevenLabs requer chave de API e configuração das vozes.
- O player pode ser customizado via TailwindCSS.
- O componente pode ser plugado em qualquer portal ou publicação digital.
