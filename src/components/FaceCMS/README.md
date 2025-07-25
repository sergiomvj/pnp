# FaceCMS

Componente reutilizável para painel administrativo (CMS) completo.

## Funcionalidades
- Publicação de artigos
- Moderação de conteúdo
- Analytics e métricas editoriais
- Configuração de comportamento da IA Helena
- Gestão de usuários e permissões
- Pronto para integração com OpenAI, N8N, Stripe, Evolution API e CI/CD

## Backend
- Rotas Express (`facecms.routes.js`)
- Funções de integração e administração (`FaceCMS.js`)
- SQL para tabelas necessárias (`FaceCMS.sql`)

## Frontend
- Componente React (`FaceCMS.jsx`) para painel administrativo

## Instalação
1. Importe o SQL em seu banco PostgreSQL/Supabase.
2. Adicione as rotas do backend ao seu servidor Express.
3. Importe e use o componente React no frontend.

## Exemplo de uso
```jsx
import FaceCMS from './FaceCMS/FaceCMS';
<FaceCMS userId={user.id} isAdmin={user.isAdmin} />
```

## Observações
- Estrutura pronta para integração com automações, pagamentos e IA.
- Visual adaptável para desktop e mobile (TailwindCSS).
