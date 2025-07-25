# FaceClipp – Componente de Clipping Automático

## O que é?
Componente React + backend para ingestão, curadoria e distribuição de notícias de múltiplas fontes (RSS, IA, WhatsApp).

## Instalação
1. Importe a tabela SQL (`FaceClipp.sql`) no seu banco PostgreSQL.
2. Adicione o backend (Node.js/Express) com endpoints:
   - `GET /api/faceclipp/clippings` – lista clippings
   - `POST /api/faceclipp/clippings` – adiciona clipping
   - `PATCH /api/faceclipp/clippings/:id` – atualiza status/curadoria
3. Importe o componente React `FaceClipp.js` e use onde quiser:
   ```js
   import FaceClipp from './components/FaceClipp/FaceClipp';
   <FaceClipp apiBase="/api/faceclipp" />
   ```

## Exemplo de uso
```js
<FaceClipp apiBase="/api/faceclipp" />
```

## Integração com N8N/WhatsApp
- Use o endpoint POST para ingestão automática de RSS via N8N.
- Use o campo `enviado_whatsapp` para controlar distribuição.

## Estrutura da tabela
Veja `FaceClipp.sql` para detalhes dos campos.

## Observações
- Personalize o frontend conforme seu design.
- Backend pode ser adaptado para autenticação, filtros, etc.
