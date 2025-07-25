# 🚀 Setup Completo - Guia de Execução

## Passo a Passo para Configurar o Supabase

### 1. Criar Projeto no Supabase
1. Acesse [https://supabase.com](https://supabase.com)
2. Faça login ou crie uma conta
3. Clique em **"New Project"**
4. Escolha uma organização
5. Preencha os dados:
   - **Project Name:** `pulse-perspective`
   - **Database Password:** (anote esta senha!)
   - **Region:** South America (Brazil)
6. Clique em **"Create new project"**
7. Aguarde a criação (2-3 minutos)

### 2. Configurar Variáveis de Ambiente
1. No painel do Supabase, vá em **Settings > API**
2. Copie:
   - **Project URL**
   - **anon public key**
3. Edite o arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://sua-url-aqui.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-aqui
```

### 3. Executar o Schema SQL
1. No painel do Supabase, vá em **SQL Editor**
2. Clique em **"New query"**
3. Cole todo o conteúdo do arquivo `database/schema.sql`
4. Clique em **"Run"** (pode demorar 30-60 segundos)
5. ✅ Deve aparecer "Success. No rows returned"

### 4. Configurar Google OAuth (Opcional)
1. Vá em **Authentication > Providers**
2. Clique em **Google**
3. Toggle **"Enable sign in with Google"**
4. Para desenvolvimento local, pode usar as configurações padrão
5. Para produção, precisará configurar Google Cloud Console

### 5. Configurar Storage (Para avatares)
1. Vá em **Storage**
2. Clique em **"Create a new bucket"**
3. Nome: `avatars`
4. Público: **Yes**
5. Clique em **"Create bucket"**

### 6. Testar a Configuração
1. Volte ao VS Code
2. Reinicie o servidor de desenvolvimento:
```bash
npm run dev
```
3. Acesse `http://localhost:5179`
4. Clique em **"Entrar"** no header
5. Teste criar uma conta ou fazer login

### 7. Verificar se Funcionou
✅ **Login/Registro** deve funcionar
✅ **Perfil do usuário** deve ser criado automaticamente
✅ **Google OAuth** deve redirecionar (se configurado)
✅ **Dados salvos** na tabela `profiles`

## 🔧 Troubleshooting

### Erro: "Invalid JWT"
- Verifique se as variáveis no `.env` estão corretas
- Reinicie o servidor (`Ctrl+C` e `npm run dev`)

### Erro: "Table doesn't exist"
- Execute novamente o SQL do `schema.sql`
- Verifique se não houve erros na execução

### Google OAuth não funciona
- Para desenvolvimento local, é normal dar erro de redirect
- Configure apenas se for fazer deploy

## 📊 O que foi Criado

### Tabelas Principais:
- **profiles** - Perfis dos usuários
- **articles** - Artigos da revista
- **categories** - 10 categorias pré-configuradas
- **reading_history** - Histórico de leitura
- **helena_conversations** - Conversas com IA
- **achievements** - Sistema de conquistas
- E mais 18 tabelas para funcionalidades completas!

### Dados Iniciais:
- ✅ 10 categorias da revista
- ✅ 10 conquistas de gamificação
- ✅ Configurações do sistema
- ✅ Políticas de segurança (RLS)

## 🎯 Próximos Passos

Após o setup, estaremos prontos para:
1. **🤖 IA Helena** - Chat inteligente
2. **📰 Sistema de Artigos** - CMS completo
3. **🎮 Gamificação** - Pontos e conquistas
4. **📊 Analytics** - Métricas de engajamento

---

**🚨 IMPORTANTE:** Guarde as credenciais do Supabase em local seguro!

Depois de executar estes passos, o sistema de autenticação estará 100% funcional! 🎉
