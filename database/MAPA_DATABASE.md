# 📊 Mapa do Banco de Dados - Pulse & Perspective

## 🗂️ Histórico de Leitura - Onde Fica?

### 📖 **Tabela: `reading_history`**
```sql
CREATE TABLE reading_history (
  id UUID PRIMARY KEY,
  user_id UUID,           -- 👤 Quem leu
  article_id UUID,        -- 📰 O que leu
  reading_progress DECIMAL, -- 📊 % do artigo lido (0-100)
  reading_time INTEGER,   -- ⏱️ Tempo gasto lendo (segundos)
  scroll_depth DECIMAL,   -- 📏 Profundidade do scroll (0-100)
  completed BOOLEAN,      -- ✅ Terminou de ler?
  device_type TEXT,       -- 📱 Mobile/Desktop/Tablet
  source TEXT,            -- 🔗 Como chegou (search/social/direct)
  started_at TIMESTAMP,   -- 🚀 Quando começou
  completed_at TIMESTAMP  -- 🏁 Quando terminou
);
```

**O que rastreia:**
- ✅ **Histórico completo** de tudo que o usuário leu
- ✅ **Progresso de leitura** - se parou no meio
- ✅ **Tempo gasto** lendo cada artigo  
- ✅ **Contexto** - de onde veio, que device usou
- ✅ **Padrões de comportamento** para IA Helena

---

## ❤️ Favoritos/Bookmarks - Onde Fica?

### 🔖 **Tabela: `bookmarks`**
```sql
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY,
  user_id UUID,           -- 👤 Quem favoritou
  article_id UUID,        -- 📰 Artigo favoritado
  folder_name TEXT,       -- 📁 Pasta de organização ("Trabalho", "Estudos")
  notes TEXT,             -- 📝 Notas pessoais do usuário
  created_at TIMESTAMP    -- 📅 Quando favoritou
);
```

**Funcionalidades:**
- ✅ **Favoritar artigos** com um clique
- ✅ **Organizar em pastas** ("Ler depois", "Importantes", etc.)
- ✅ **Notas pessoais** sobre cada bookmark
- ✅ **Sincronização** entre dispositivos

---

## 📱 Redes Sociais - Onde Fica?

### 1️⃣ **Perfil Social: `profiles`**
```sql
-- Dentro da tabela profiles:
social_twitter TEXT,      -- @usuario
social_linkedin TEXT,     -- linkedin.com/in/usuario  
social_instagram TEXT,    -- @usuario
social_facebook TEXT      -- facebook.com/usuario
```

### 2️⃣ **Compartilhamentos: `social_shares`**
```sql
CREATE TABLE social_shares (
  id UUID PRIMARY KEY,
  user_id UUID,           -- 👤 Quem compartilhou
  article_id UUID,        -- 📰 Artigo compartilhado
  platform social_platform, -- 📱 Twitter/Facebook/LinkedIn/WhatsApp
  shared_url TEXT,        -- 🔗 URL compartilhada
  custom_message TEXT,    -- 💬 Mensagem personalizada
  clicks_count INTEGER,   -- 📊 Quantos cliques teve
  created_at TIMESTAMP    -- 📅 Quando compartilhou
);
```

**Plataformas suportadas:**
- ✅ **Twitter** - Compartilhamento direto
- ✅ **Facebook** - Link com preview
- ✅ **LinkedIn** - Para conteúdo profissional
- ✅ **WhatsApp** - Link direto
- ✅ **Telegram** - Para grupos
- ✅ **E-mail** - Envio por e-mail

---

## 💝 Sistema de Curtidas - Onde Fica?

### ❤️ **Tabela: `article_likes`**
```sql
CREATE TABLE article_likes (
  id UUID PRIMARY KEY,
  user_id UUID,           -- 👤 Quem curtiu
  article_id UUID,        -- 📰 Artigo curtido
  created_at TIMESTAMP    -- 📅 Quando curtiu
);
```

### 💬 **Tabela: `comments`**
```sql
CREATE TABLE comments (
  id UUID PRIMARY KEY,
  article_id UUID,        -- 📰 Artigo comentado
  user_id UUID,           -- 👤 Quem comentou
  parent_id UUID,         -- 🔗 Resposta a outro comentário
  content TEXT,           -- 💭 Conteúdo do comentário
  likes_count INTEGER,    -- ❤️ Curtidas no comentário
  created_at TIMESTAMP    -- 📅 Quando comentou
);
```

---

## 🕵️ Rastreamento Completo - Onde Fica?

### 📊 **Tabela: `user_interactions`**
```sql
CREATE TABLE user_interactions (
  id UUID PRIMARY KEY,
  user_id UUID,           -- 👤 Usuário
  article_id UUID,        -- 📰 Artigo
  interaction_type interaction_type, -- 📋 Tipo da interação
  metadata JSONB,         -- 🗂️ Dados extras
  session_id TEXT,        -- 🔑 Sessão de navegação
  ip_address INET,        -- 🌐 IP do usuário
  created_at TIMESTAMP    -- ⏰ Quando aconteceu
);
```

**Tipos de interação rastreados:**
- ✅ `view` - Visualizou o artigo
- ✅ `like` - Curtiu o artigo  
- ✅ `comment` - Comentou
- ✅ `share` - Compartilhou
- ✅ `bookmark` - Favoritou
- ✅ `read_complete` - Leu até o fim

---

## 🗺️ Arquitetura Completa

```
👤 USER
├── 📋 profiles (dados pessoais + redes sociais)
├── 📖 reading_history (tudo que leu)
├── 🔖 bookmarks (favoritos organizados)
├── ❤️ article_likes (curtidas)
├── 💬 comments (comentários)
├── 📱 social_shares (compartilhamentos)
├── 📊 user_interactions (todas as ações)
└── 🤖 helena_conversations (conversas com IA)

📰 ARTICLES
├── 📝 content (conteúdo)
├── 🏷️ article_tags (tags)
├── 📊 métricas (views, likes, shares, bookmarks)
└── 🗂️ categories (categorização)
```

---

## 🎯 Funcionalidades Que Isso Permite

### 📊 **Dashboard do Usuário:**
- ✅ "Você leu **47 artigos** este mês"
- ✅ "Tempo total de leitura: **12h 30min**"
- ✅ "Sua categoria favorita: **Tecnologia**"
- ✅ "Você tem **23 artigos** nos favoritos"

### 🤖 **IA Helena Inteligente:**
- ✅ "Vi que você gosta de **Economia**, que tal este artigo?"
- ✅ "Você começou a ler este artigo ontem, quer continuar?"
- ✅ "Baseado no seu histórico, aqui estão **5 sugestões**"

### 📱 **Social e Engajamento:**
- ✅ Compartilhar com mensagem personalizada
- ✅ Ver quem curtiu e comentou
- ✅ Organizar favoritos em pastas
- ✅ Histórico completo de tudo

---

**Agora faz sentido a estrutura? Essa versão tem TUDO que você mencionou! 🚀**
