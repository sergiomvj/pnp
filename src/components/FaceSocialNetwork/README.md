# FaceSocialNetwork

Componente compacto e reutilizável para recursos sociais e engajamento em artigos.

## Funcionalidades
- Compartilhamento de trechos como cards
- Stories automáticos para redes sociais
- Sistema de desafios entre usuários
- Comentários e discussões em artigos
- Ranking de artigos com mais Likes e Shares
- Mini barra de opções para redes sociais no topo dos artigos

## Backend
- Rotas Express (`facesocialnetwork.routes.js`)
- Funções de integração e ranking (`FaceSocialNetwork.js`)
- SQL para tabelas necessárias (`FaceSocialNetwork.sql`)

## Frontend
- Componente React (`FaceSocialNetwork.jsx`) compacto, elegante e responsivo

## Instalação
1. Importe o SQL em seu banco PostgreSQL/Supabase.
2. Adicione as rotas do backend ao seu servidor Express.
3. Importe e use o componente React no frontend.

## Exemplo de uso
```jsx
import FaceSocialNetwork from './FaceSocialNetwork/FaceSocialNetwork';
<FaceSocialNetwork articleId={article.id} likes={10} shares={5} onShare={fn} onLike={fn} onComment={fn} />
```

## Observações
- Usa ícones das redes sociais (react-icons).
- Visual compacto, elegante e responsivo (TailwindCSS).
- Pode ser customizado para desktop e mobile.
