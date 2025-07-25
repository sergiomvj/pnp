# FaceAds

Componente reutilizável para gestão comercial de anúncios.

## Funcionalidades
- Cadastro de formatos de ads, localização e custos
- Cadastro de clientes e campanhas
- Faturamento
- CRUD completo para área administrativa

## Backend
- Rotas Express (`faceads.routes.js`)
- Funções de integração e administração (`FaceAds.js`)
- SQL para tabelas necessárias (`FaceAds.sql`)

## Frontend
- Componente React (`FaceAds.jsx`) para painel de gestão

## Instalação
1. Importe o SQL em seu banco PostgreSQL/Supabase.
2. Adicione as rotas do backend ao seu servidor Express.
3. Importe e use o componente React no frontend.

## Exemplo de uso
```jsx
import FaceAds from './FaceAds/FaceAds';
<FaceAds />
```

## Observações
- Visual adaptável para desktop e mobile (TailwindCSS).
- CRUD completo para área administrativa.
