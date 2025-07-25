# Helena – Editora Virtual Inteligente

Helena é a IA editorial do Pulse & Perspective, responsável por potencializar a produção, curadoria e personalização de conteúdo jornalístico. Esta documentação cobre arquitetura, fluxos, integrações, exemplos de uso e melhores práticas para desenvolvedores e editores.

---

## Visão Geral

Helena é composta por módulos de IA generativa, memória contextual, análise de perfil e automação de tarefas editoriais. Atua como assistente, consultora e produtora de pautas, além de interagir com usuários e equipe editorial.

---

## Funcionalidades Principais

- **Geração de pautas personalizadas**
- **Sistema de persona do usuário**
- **Memória de conversas por usuário**
- **Sugestões de conteúdo baseadas em perfil**
- **Expansão de artigos e respostas contextuais**
- **Logging e histórico de interações**

---

## 1. Geração de Pautas Personalizadas

### Fluxo
1. Usuário acessa a função de geração de pauta.
2. Informa briefing: tema, público, tom, formato, palavras-chave.
3. Frontend envia requisição ao backend.
4. Backend monta prompt e consulta a OpenAI.
5. Sugestões retornam, são exibidas e podem ser salvas/ajustadas.

### Endpoint Sugerido
`POST /api/pautas/gerar`

#### Exemplo de Body
```json
{
  "tema": "Economia brasileira",
  "publicoAlvo": "Jovens universitários",
  "tom": "Didático e inspirador",
  "formato": "Artigo longo",
  "palavrasChave": ["inflação", "juros", "PIB"]
}
```

#### Exemplo de Resposta
```json
{
  "pautas": [
    {
      "titulo": "Como a inflação afeta o dia a dia dos jovens universitários",
      "resumo": "Uma explicação acessível sobre inflação, exemplos práticos e dicas para lidar com o cenário econômico."
    }
  ]
}
```

#### Exemplo de Prompt
```
Gere 3 sugestões de pautas jornalísticas para o tema: Economia brasileira.
Público-alvo: Jovens universitários.
Tom: Didático e inspirador.
Formato: Artigo longo.
Palavras-chave: inflação, juros, PIB.
Para cada pauta, retorne título e resumo.
```

---

## 2. Sistema de Persona do Usuário

- Helena constrói um perfil dinâmico de cada usuário/editor com base em interações, preferências e histórico.
- Utiliza dados de leitura, temas favoritos, engajamento e feedback para personalizar sugestões.
- Permite segmentação de conteúdo e geração de pautas sob medida.

---

## 3. Memória de Conversas

- Todas as interações com Helena são logadas (tabela `helena_conversations` e `helena_messages`).
- Permite continuidade de contexto, histórico de dúvidas e acompanhamento de decisões editoriais.
- Suporta múltiplas sessões e recuperação de conversas anteriores.

---

## 4. Sugestões de Conteúdo Baseadas em Perfil

- Helena recomenda artigos, pautas e temas com base no perfil do usuário/editor.
- Integra análise de leitura, preferências e tendências do momento.
- Pode ser acionada via chat, painel editorial ou automações.

---

## 5. Integração com OpenAI

- Utiliza a API oficial da OpenAI (modelos GPT-4o ou superior).
- Chave de API deve ser configurada via variável de ambiente `VITE_OPENAI_API_KEY`.
- Parâmetros recomendados: `temperature` entre 0.7 e 0.9, `max_tokens` conforme o tamanho da resposta desejada.

---

## 6. Exemplos de Interação

- "Helena, gere 5 pautas sobre tecnologia para jovens leitores."
- "Sugira um título criativo para um artigo sobre mudanças climáticas."
- "Liste tendências emergentes em educação para 2025."

---

## 7. Boas Práticas

- Sempre revise as sugestões da IA antes de publicar.
- Forneça briefings claros e objetivos para melhores resultados.
- Use o histórico de conversas para aprendizado e melhoria contínua.
- Garanta a privacidade dos dados dos usuários.

---

## 8. Estrutura de Banco de Dados (resumo)

- `helena_conversations`: sessões de chat por usuário/editor.
- `helena_messages`: mensagens trocadas em cada conversa.
- `custom_pitches` (opcional): pautas geradas e briefing associado.

---

## 9. Roadmap Futuro

- Memória persistente entre sessões
- Análise automática de padrões de leitura
- Geração de conteúdo multimídia
- Integração com automações (N8N, WhatsApp, etc)

---

> Helena é a ponte entre inteligência artificial e jornalismo humano, potencializando criatividade, eficiência e personalização editorial.
