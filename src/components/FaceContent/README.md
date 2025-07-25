# FaceContent

Componente reutilizável para gerenciamento de artigos com correção ortográfica, sugestão de imagem, SEO e controle de edição/exclusão.

## Funcionalidades
- Editor com corretor ortográfico (LanguageTool)
- Sugestão de imagem via API (Unsplash ou similar)
- Parâmetros de SEO gerados por IA
- Página de edição/exclusão de artigos (restrição por função)
- Histórico de edições

## Backend
- Rotas Express (`facecontent.routes.js`)
- Funções de integração e administração (`FaceContent.js`)
- SQL para tabelas necessárias (`FaceContent.sql`)

## Frontend
- Componente React (`FaceContent.jsx`) para editor, listagem e permissões

## Instalação
1. Importe o SQL em seu banco PostgreSQL/Supabase.
2. Adicione as rotas do backend ao seu servidor Express.
3. Importe e use o componente React no frontend.

## Exemplo de uso
```jsx
import FaceContent from './FaceContent/FaceContent';
<FaceContent userId={user.id} isAdmin={user.isAdmin} />
```

## Observações
- Integração pronta para LanguageTool, Unsplash e OpenAI.
- Visual adaptável para desktop e mobile (TailwindCSS).
- Permissões de edição e exclusão controladas por backend.
