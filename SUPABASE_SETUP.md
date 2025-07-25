# Sistema de Autenticação - Pulse & Perspective

## Configuração do Supabase

Para que o sistema de autenticação funcione completamente, você precisa configurar o Supabase:

### 1. Criar conta no Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Crie uma conta gratuita
3. Crie um novo projeto

### 2. Configurar variáveis de ambiente

1. No seu projeto Supabase, vá em **Settings > API**
2. Copie a **URL** e a **anon public key**
3. Substitua no arquivo `.env`:

```env
VITE_SUPABASE_URL=sua-url-do-supabase
VITE_SUPABASE_ANON_KEY=sua-chave-anonima-do-supabase
```

### 3. Configurar tabelas no banco de dados

Execute este SQL no **SQL Editor** do Supabase:

```sql
-- Criar tabela de perfis de usuário
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  nickname TEXT UNIQUE,
  bio TEXT,
  avatar_url TEXT,
  favorite_categories TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (id)
);

-- Criar tabela de histórico de leitura
CREATE TABLE reading_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  article_id TEXT NOT NULL,
  article_title TEXT NOT NULL,
  article_category TEXT,
  read_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_history ENABLE ROW LEVEL SECURITY;

-- Política para perfis (usuários podem ver e editar apenas seus próprios perfis)
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Política para histórico de leitura
CREATE POLICY "Users can view own reading history" ON reading_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reading history" ON reading_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Função para criar perfil automaticamente quando usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, nickname)
  VALUES (new.id, new.raw_user_meta_data->>'nickname');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para executar a função quando novo usuário é criado
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

### 4. Configurar Google OAuth (Opcional)

1. No painel do Supabase, vá em **Authentication > Providers**
2. Habilite o **Google**
3. Configure com suas credenciais do Google Cloud Console
4. Adicione `http://localhost:5179` nas URLs autorizadas

### 5. Funcionalidades Implementadas

✅ **Login/Registro com email e senha**
- Formulários responsivos com validação
- Tratamento de erros
- Interface dark/light mode

✅ **Login com Google OAuth** 
- Integração completa com Supabase Auth
- Redirecionamento automático

✅ **Perfil do usuário**
- Edição de nickname e bio
- Visualização de informações
- Gerenciamento de preferências

✅ **Sistema de preferências**
- Seleção de categorias favoritas
- Configurações de notificação

✅ **Histórico de leitura**
- Rastreamento de artigos lidos
- Interface para visualizar histórico

✅ **Estado global de autenticação**
- Context API do React
- Persistência de sessão
- Sincronização em tempo real

### 6. Como usar

1. Clique em **"Entrar"** no header
2. Escolha entre **Login** ou **Criar Conta**
3. Preencha os dados ou use **Google**
4. Após login, clique no avatar para acessar o **perfil**
5. Configure suas **preferências** e veja seu **histórico**

### 7. Próximos passos

- [ ] Implementar upload de avatar
- [ ] Sistema de notificações
- [ ] Recuperação de senha
- [ ] Verificação de email
- [ ] Admin panel para gerenciar usuários

### 8. Estrutura dos arquivos

```
src/
├── contexts/
│   └── AuthContext.tsx       # Context global de autenticação
├── services/
│   └── supabase.ts          # Cliente e funções do Supabase
├── components/auth/
│   ├── AuthModal.tsx        # Modal de login/registro
│   └── UserProfile.tsx      # Perfil e configurações do usuário
└── components/layout/
    └── Header.tsx           # Header com botões de auth
```

O sistema está totalmente funcional e pronto para uso após a configuração do Supabase!
