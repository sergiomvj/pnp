# FaceUserProfile – Componente de Perfil Avançado do Usuário

## O que é?
Componente React + backend para exibir perfil detalhado, estatísticas, preferências e favoritos do usuário.

## Instalação
1. Importe a tabela SQL (`FaceUserProfile.sql`) no seu banco PostgreSQL.
2. Adicione o backend (Node.js/Express) com endpoints:
   - `GET /api/faceuserprofile/profile/:userId` – busca perfil detalhado
   - `GET /api/faceuserprofile/favorites/:userId` – lista favoritos
   - `POST /api/faceuserprofile/favorites` – adiciona favorito
3. Importe o componente React `FaceUserProfile.js` e use onde quiser:
   ```js
   import FaceUserProfile from './components/FaceUserProfile/FaceUserProfile';
   <FaceUserProfile apiBase="/api/faceuserprofile" userId={userId} />
   ```

## Exemplo de uso
```js
<FaceUserProfile apiBase="/api/faceuserprofile" userId={userId} />
```

## Estrutura da tabela
Veja `FaceUserProfile.sql` para detalhes dos campos.

## Observações
- Personalize o frontend conforme seu design.
- Backend pode ser adaptado para autenticação, filtros, etc.
