# FaceEditorAI

Componente reutilizável de IA editorial para portais, revistas digitais e produtos de conteúdo.

## Funcionalidades
- Chat flutuante em todas as páginas
- Respostas contextuais sobre artigos
- Integração com OpenAI API
- Logging de conversas
- Geração de pautas personalizadas
- Sistema de persona do usuário
- Memória de conversas por usuário
- Sugestões de conteúdo baseadas em perfil
- **Memória persistente entre sessões**
- **Análise de padrões de leitura**
- **Geração de conteúdo personalizado**
- **Integração com todas as funcionalidades**

## Backend
- Rotas Express (`faceeditorai.routes.js`, `faceeditorai.advanced.routes.js`)
- Funções de integração com OpenAI e banco de dados (`FaceEditorAI.js`, `FaceEditorAI.advanced.js`)
- SQL para tabelas necessárias (`FaceEditorAI.sql`, `FaceEditorAI.advanced.sql`)

## Frontend
- Componente React (`FaceEditorAI.jsx`) para chat flutuante

## Instalação
1. Importe o SQL em seu banco PostgreSQL/Supabase.
2. Adicione as rotas do backend ao seu servidor Express.
3. Importe e use o componente React no frontend.

## Exemplo de uso
```jsx
import FaceEditorAI from './FaceEditorAI/FaceEditorAI';
<FaceEditorAI userId={user.id} />
```

## Observações
- Requer variável de ambiente `OPENAI_API_KEY` no backend.
- Ajuste o caminho do import do banco de dados conforme seu projeto.
- O componente pode ser customizado visualmente via TailwindCSS.
