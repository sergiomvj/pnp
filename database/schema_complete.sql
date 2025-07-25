-- ========================================
-- SCHEMA COMPLETO E FUNCIONAL - PULSE & PERSPECTIVE
-- ========================================
-- Versão completa com histórico detalhado, favoritos e redes sociais
-- Mantendo simplicidade mas com todos os recursos necessários

-- ========================================
-- 1. EXTENSIONS
-- ========================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- 2. TIPOS
-- ========================================
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('reader', 'author', 'editor', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE article_status AS ENUM ('draft', 'review', 'published', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE social_platform AS ENUM ('twitter', 'facebook', 'linkedin', 'whatsapp', 'telegram', 'email');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE interaction_type AS ENUM ('view', 'like', 'comment', 'share', 'bookmark', 'read_complete');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ========================================
-- 3. TABELAS PRINCIPAIS
-- ========================================

-- Profiles (expandido)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  nickname TEXT UNIQUE NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'reader',
  favorite_categories TEXT[] DEFAULT '{}',
  
  -- Redes sociais
  social_twitter TEXT,
  social_linkedin TEXT,
  social_instagram TEXT,
  social_facebook TEXT,
  
  -- Configurações
  notifications_enabled BOOLEAN DEFAULT true,
  email_notifications BOOLEAN DEFAULT true,
  
  -- Gamificação
  points INTEGER DEFAULT 0,
  reading_streak INTEGER DEFAULT 0,
  total_articles_read INTEGER DEFAULT 0,
  total_time_reading INTEGER DEFAULT 0, -- em segundos
  
  -- Timestamps
  last_read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (id)
);

-- Categories
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#3B82F6',
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tags
CREATE TABLE IF NOT EXISTS tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Articles
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  subtitle TEXT,
  content JSONB NOT NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  featured_image_alt TEXT,
  
  -- Relacionamentos
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  
  -- Status e configurações
  status article_status DEFAULT 'draft',
  is_featured BOOLEAN DEFAULT false,
  is_premium BOOLEAN DEFAULT false,
  reading_time INTEGER, -- tempo estimado em minutos
  
  -- Métricas
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  bookmarks_count INTEGER DEFAULT 0,
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  
  -- Timestamps
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Article tags (muitos-para-muitos)
CREATE TABLE IF NOT EXISTS article_tags (
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

-- ========================================
-- 4. HISTÓRICO DE LEITURA COMPLETO
-- ========================================

-- Histórico detalhado de leitura
CREATE TABLE IF NOT EXISTS reading_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  
  -- Progresso detalhado
  reading_progress DECIMAL(5,2) DEFAULT 0, -- porcentagem (0-100)
  reading_time INTEGER DEFAULT 0, -- tempo gasto lendo em segundos
  scroll_depth DECIMAL(5,2) DEFAULT 0, -- profundidade do scroll (0-100)
  completed BOOLEAN DEFAULT false, -- se terminou de ler
  
  -- Contexto da leitura
  device_type TEXT, -- 'mobile', 'desktop', 'tablet'
  source TEXT, -- 'direct', 'search', 'social', 'newsletter'
  referrer TEXT,
  
  -- Timestamps
  started_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  last_read_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- ========================================
-- 5. SISTEMA DE FAVORITOS/BOOKMARKS
-- ========================================

-- Bookmarks/Favoritos
CREATE TABLE IF NOT EXISTS bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  
  -- Organização
  folder_name TEXT DEFAULT 'Geral', -- pasta de organização
  notes TEXT, -- notas pessoais sobre o bookmark
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  CONSTRAINT unique_user_article_bookmark UNIQUE(user_id, article_id)
);

-- ========================================
-- 6. SISTEMA DE CURTIDAS E INTERAÇÕES
-- ========================================

-- Likes dos artigos
CREATE TABLE IF NOT EXISTS article_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  CONSTRAINT unique_user_article_like UNIQUE(user_id, article_id)
);

-- Comentários
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE, -- para respostas
  
  content TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT true,
  likes_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Likes dos comentários
CREATE TABLE IF NOT EXISTS comment_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  CONSTRAINT unique_user_comment_like UNIQUE(user_id, comment_id)
);

-- ========================================
-- 7. COMPARTILHAMENTO SOCIAL
-- ========================================

-- Histórico de compartilhamentos
CREATE TABLE IF NOT EXISTS social_shares (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  
  platform social_platform NOT NULL,
  shared_url TEXT,
  custom_message TEXT, -- mensagem personalizada do usuário
  
  -- Métricas (quando possível rastrear)
  clicks_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ========================================
-- 8. SISTEMA DE INTERAÇÕES COMPLETO
-- ========================================

-- Log completo de todas as interações do usuário
CREATE TABLE IF NOT EXISTS user_interactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  
  interaction_type interaction_type NOT NULL,
  
  -- Dados contextuais
  metadata JSONB DEFAULT '{}', -- dados extras específicos da interação
  session_id TEXT, -- para agrupar por sessão
  ip_address INET,
  user_agent TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ========================================
-- 9. IA HELENA
-- ========================================

-- Conversas com Helena
CREATE TABLE IF NOT EXISTS helena_conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  session_id TEXT NOT NULL,
  title TEXT,
  context_article_id UUID REFERENCES articles(id) ON DELETE SET NULL, -- artigo relacionado
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Mensagens das conversas
CREATE TABLE IF NOT EXISTS helena_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES helena_conversations(id) ON DELETE CASCADE,
  
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ========================================
-- 10. RLS POLICIES
-- ========================================

-- Enable RLS
DO $$ 
BEGIN
  ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

DO $$ 
BEGIN
  ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

DO $$ 
BEGIN
  ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

DO $$ 
BEGIN
  ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

DO $$ 
BEGIN
  ALTER TABLE article_tags ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

DO $$ 
BEGIN
  ALTER TABLE reading_history ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

DO $$ 
BEGIN
  ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

DO $$ 
BEGIN
  ALTER TABLE article_likes ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

DO $$ 
BEGIN
  ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

DO $$ 
BEGIN
  ALTER TABLE comment_likes ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

DO $$ 
BEGIN
  ALTER TABLE social_shares ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

DO $$ 
BEGIN
  ALTER TABLE user_interactions ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

DO $$ 
BEGIN
  ALTER TABLE helena_conversations ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

DO $$ 
BEGIN
  ALTER TABLE helena_messages ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

-- Profiles
CREATE POLICY IF NOT EXISTS "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY IF NOT EXISTS "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY IF NOT EXISTS "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Categories e Tags (público)
CREATE POLICY IF NOT EXISTS "Categories viewable by everyone" ON categories FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Tags viewable by everyone" ON tags FOR SELECT USING (true);

-- Articles
CREATE POLICY IF NOT EXISTS "Published articles viewable by everyone" ON articles FOR SELECT USING (status = 'published' OR author_id = auth.uid());
CREATE POLICY IF NOT EXISTS "Authors can manage their articles" ON articles FOR ALL USING (author_id = auth.uid());

-- Reading History
CREATE POLICY IF NOT EXISTS "Users manage own reading history" ON reading_history FOR ALL USING (auth.uid() = user_id);

-- Bookmarks
CREATE POLICY IF NOT EXISTS "Users manage own bookmarks" ON bookmarks FOR ALL USING (auth.uid() = user_id);

-- Likes
CREATE POLICY IF NOT EXISTS "Users manage own likes" ON article_likes FOR ALL USING (auth.uid() = user_id);

-- Comments
CREATE POLICY IF NOT EXISTS "Comments viewable by everyone" ON comments FOR SELECT USING (is_approved = true);
CREATE POLICY IF NOT EXISTS "Users manage own comments" ON comments FOR ALL USING (auth.uid() = user_id);

-- Comment Likes
CREATE POLICY IF NOT EXISTS "Users manage own comment likes" ON comment_likes FOR ALL USING (auth.uid() = user_id);

-- Social Shares
CREATE POLICY IF NOT EXISTS "Users manage own shares" ON social_shares FOR ALL USING (auth.uid() = user_id);

-- User Interactions
CREATE POLICY IF NOT EXISTS "Users view own interactions" ON user_interactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users insert own interactions" ON user_interactions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Helena
CREATE POLICY IF NOT EXISTS "Users manage own conversations" ON helena_conversations FOR ALL USING (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users view own messages" ON helena_messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM helena_conversations WHERE helena_conversations.id = helena_messages.conversation_id AND helena_conversations.user_id = auth.uid())
);
CREATE POLICY IF NOT EXISTS "Users insert own messages" ON helena_messages FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM helena_conversations WHERE helena_conversations.id = helena_messages.conversation_id AND helena_conversations.user_id = auth.uid())
);

-- ========================================
-- 11. ÍNDICES PERFORMANCE
-- ========================================

-- Profiles
CREATE INDEX IF NOT EXISTS idx_profiles_nickname ON profiles(nickname);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- Articles
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_author ON articles(author_id);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles(is_featured) WHERE is_featured = true;

-- Categories
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_active ON categories(is_active) WHERE is_active = true;

-- Reading History
CREATE INDEX IF NOT EXISTS idx_reading_history_user ON reading_history(user_id);
CREATE INDEX IF NOT EXISTS idx_reading_history_article ON reading_history(article_id);
CREATE INDEX IF NOT EXISTS idx_reading_history_completed ON reading_history(completed);
CREATE INDEX IF NOT EXISTS idx_reading_history_date ON reading_history(started_at DESC);

-- Bookmarks
CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_folder ON bookmarks(folder_name);
CREATE INDEX IF NOT EXISTS idx_bookmarks_date ON bookmarks(created_at DESC);

-- Likes
CREATE INDEX IF NOT EXISTS idx_article_likes_user ON article_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_article_likes_article ON article_likes(article_id);

-- Comments
CREATE INDEX IF NOT EXISTS idx_comments_article ON comments(article_id);
CREATE INDEX IF NOT EXISTS idx_comments_user ON comments(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent ON comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_comments_approved ON comments(is_approved) WHERE is_approved = true;

-- Social Shares
CREATE INDEX IF NOT EXISTS idx_social_shares_user ON social_shares(user_id);
CREATE INDEX IF NOT EXISTS idx_social_shares_article ON social_shares(article_id);
CREATE INDEX IF NOT EXISTS idx_social_shares_platform ON social_shares(platform);

-- User Interactions
CREATE INDEX IF NOT EXISTS idx_interactions_user ON user_interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_interactions_article ON user_interactions(article_id);
CREATE INDEX IF NOT EXISTS idx_interactions_type ON user_interactions(interaction_type);
CREATE INDEX IF NOT EXISTS idx_interactions_session ON user_interactions(session_id);
CREATE INDEX IF NOT EXISTS idx_interactions_date ON user_interactions(created_at DESC);

-- Helena
CREATE INDEX IF NOT EXISTS idx_helena_conversations_user ON helena_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_helena_messages_conversation ON helena_messages(conversation_id);

-- ========================================
-- 12. FUNCTIONS E TRIGGERS
-- ========================================

-- Função de update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Aplicar triggers
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_bookmarks_updated_at ON bookmarks;
CREATE TRIGGER update_bookmarks_updated_at BEFORE UPDATE ON bookmarks 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_comments_updated_at ON comments;
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_helena_conversations_updated_at ON helena_conversations;
CREATE TRIGGER update_helena_conversations_updated_at BEFORE UPDATE ON helena_conversations 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Função para criar perfil automaticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, nickname, role)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'nickname', split_part(NEW.email, '@', 1)),
    'reader'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Função para atualizar contadores
CREATE OR REPLACE FUNCTION update_article_counters()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_TABLE_NAME = 'article_likes' THEN
    IF TG_OP = 'INSERT' THEN
      UPDATE articles SET likes_count = likes_count + 1 WHERE id = NEW.article_id;
    ELSIF TG_OP = 'DELETE' THEN
      UPDATE articles SET likes_count = likes_count - 1 WHERE id = OLD.article_id;
    END IF;
  ELSIF TG_TABLE_NAME = 'comments' THEN
    IF TG_OP = 'INSERT' THEN
      UPDATE articles SET comments_count = comments_count + 1 WHERE id = NEW.article_id;
    ELSIF TG_OP = 'DELETE' THEN
      UPDATE articles SET comments_count = comments_count - 1 WHERE id = OLD.article_id;
    END IF;
  ELSIF TG_TABLE_NAME = 'bookmarks' THEN
    IF TG_OP = 'INSERT' THEN
      UPDATE articles SET bookmarks_count = bookmarks_count + 1 WHERE id = NEW.article_id;
    ELSIF TG_OP = 'DELETE' THEN
      UPDATE articles SET bookmarks_count = bookmarks_count - 1 WHERE id = OLD.article_id;
    END IF;
  ELSIF TG_TABLE_NAME = 'social_shares' THEN
    IF TG_OP = 'INSERT' THEN
      UPDATE articles SET shares_count = shares_count + 1 WHERE id = NEW.article_id;
    ELSIF TG_OP = 'DELETE' THEN
      UPDATE articles SET shares_count = shares_count - 1 WHERE id = OLD.article_id;
    END IF;
  END IF;
  
  IF TG_OP = 'INSERT' THEN
    RETURN NEW;
  ELSE
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Triggers para contadores
DROP TRIGGER IF EXISTS update_likes_counter ON article_likes;
CREATE TRIGGER update_likes_counter 
  AFTER INSERT OR DELETE ON article_likes
  FOR EACH ROW EXECUTE FUNCTION update_article_counters();

DROP TRIGGER IF EXISTS update_comments_counter ON comments;
CREATE TRIGGER update_comments_counter 
  AFTER INSERT OR DELETE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_article_counters();

DROP TRIGGER IF EXISTS update_bookmarks_counter ON bookmarks;
CREATE TRIGGER update_bookmarks_counter 
  AFTER INSERT OR DELETE ON bookmarks
  FOR EACH ROW EXECUTE FUNCTION update_article_counters();

DROP TRIGGER IF EXISTS update_shares_counter ON social_shares;
CREATE TRIGGER update_shares_counter 
  AFTER INSERT OR DELETE ON social_shares
  FOR EACH ROW EXECUTE FUNCTION update_article_counters();

-- ========================================
-- 13. DADOS INICIAIS
-- ========================================

-- Categorias
INSERT INTO categories (name, slug, description, color, sort_order) VALUES
('Política Nacional', 'politica-nacional', 'Cobertura completa da política brasileira', '#DC2626', 1),
('Economia', 'economia', 'Análises econômicas e mercado financeiro', '#059669', 2),
('Sociedade', 'sociedade', 'Questões sociais e comportamentais', '#7C3AED', 3),
('Tecnologia', 'tecnologia', 'Inovação, startups e transformação digital', '#2563EB', 4),
('Cultura', 'cultura', 'Arte, entretenimento e manifestações culturais', '#EC4899', 5),
('Esportes', 'esportes', 'Cobertura esportiva nacional e internacional', '#EA580C', 6),
('Saúde', 'saude', 'Medicina, bem-estar e políticas de saúde', '#16A34A', 7),
('Educação', 'educacao', 'Sistema educacional e desenvolvimento acadêmico', '#0891B2', 8),
('Meio Ambiente', 'meio-ambiente', 'Sustentabilidade e questões ambientais', '#65A30D', 9),
('Internacional', 'internacional', 'Notícias e análises do cenário mundial', '#9333EA', 10)
ON CONFLICT (slug) DO NOTHING;

-- ========================================
-- SCHEMA COMPLETO CONCLUÍDO
-- ========================================
-- Este schema inclui TUDO que você mencionou:
-- ✅ Histórico de leitura DETALHADO
-- ✅ Sistema de favoritos/bookmarks completo
-- ✅ Redes sociais e compartilhamento
-- ✅ Sistema de curtidas e comentários
-- ✅ Rastreamento completo de interações
-- ✅ Perfis com redes sociais
-- ✅ Gamificação básica
-- ✅ IA Helena integrada
-- ========================================
