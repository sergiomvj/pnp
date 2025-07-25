# FaceMonetization

Componente reutilizável para sistema de monetização, planos, assinaturas e clube de vantagens.

## Funcionalidades
- Planos Premium definidos
- Gateway de pagamento integrado (backend pronto para integração)
- Gestão de assinaturas
- Conteúdo exclusivo para assinantes
- Clube de Vantagens e Prêmios
- CRUD completo para área administrativa

## Backend
- Rotas Express (`facemonetization.routes.js`)
- Funções de integração e administração (`FaceMonetization.js`)
- SQL para tabelas necessárias (`FaceMonetization.sql`)

## Frontend
- Componente React (`FaceMonetization.jsx`) para planos e clube de vantagens

## Instalação
1. Importe o SQL em seu banco PostgreSQL/Supabase.
2. Adicione as rotas do backend ao seu servidor Express.
3. Importe e use o componente React no frontend.

## Exemplo de uso
```jsx
import FaceMonetization from './FaceMonetization/FaceMonetization';
<FaceMonetization plans={plans} onSubscribe={fn} userBenefits={benefits} onRedeem={fn} />
```

## Observações
- Backend pronto para integração com gateways de pagamento (ex: Stripe, MercadoPago).
- CRUD completo para área administrativa.
- Visual adaptável para desktop e mobile (TailwindCSS).
