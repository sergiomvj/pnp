# FacePodCast

Componente reutilizável para geração e reprodução de podcasts interativos a partir de artigos.

## Funcionalidades
- Player nativo com timeline
- Comentários vinculados a timestamps
- Integração de áudio com artigos
- Sistema de transcrição automática

## Backend
- Rotas Express (`facepodcast.routes.js`)
- Funções de geração de podcast, comentários e transcrição (`FacePodCast.js`)
- SQL para tabelas necessárias (`FacePodCast.sql`)

## Frontend
- Componente React (`FacePodCast.jsx`) para player interativo

## Instalação
1. Importe o SQL em seu banco PostgreSQL/Supabase.
2. Adicione as rotas do backend ao seu servidor Express.
3. Importe e use o componente React no frontend.

## Exemplo de uso
```jsx
import FacePodCast from './FacePodCast/FacePodCast';
<FacePodCast articleId={article.id} userId={user.id} />
```

## Observações
- A geração real de áudio depende de integração com serviço TTS.
- O player suporta comentários em tempo real vinculados à timeline.
- O componente pode ser customizado visualmente via TailwindCSS.
