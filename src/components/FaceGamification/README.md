# FaceGamification – Componente de Ranking e Conquistas

## O que é?
Componente React + backend para exibir ranking de leitores, badges e conquistas, com integração ao banco de dados.

## Instalação
1. Importe a tabela SQL (`FaceGamification.sql`) no seu banco PostgreSQL.
2. Adicione o backend (Node.js/Express) com endpoints:
   - `GET /api/facegamification/leaderboard` – lista ranking
   - `POST /api/facegamification/leaderboard` – adiciona/atualiza usuário
3. Importe o componente React `FaceGamification.js` e use onde quiser:
   ```js
   import FaceGamification from './components/FaceGamification/FaceGamification';
   <FaceGamification apiBase="/api/facegamification" />
   ```

## Exemplo de uso
```js
<FaceGamification apiBase="/api/facegamification" />
```

## Estrutura da tabela
Veja `FaceGamification.sql` para detalhes dos campos.

## Observações
- Personalize o frontend conforme seu design.
- Backend pode ser adaptado para autenticação, filtros, etc.
