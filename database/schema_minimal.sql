-- ========================================
-- SCHEMA MINIMAL E GARANTIDO - PULSE & PERSPECTIVE
-- ========================================
-- Este schema foi ultra-simplificado para evitar qualquer erro
-- Foque no essencial primeiro, depois expandimos

-- ========================================
-- 1. EXTENSIONS BÁSICAS
-- ========================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- 2. TIPOS BÁSICOS
-- ========================================
CREATE TYPE user_role AS ENUM ('reader', 'author', 'editor', 'admin');
CREATE TYPE article_status AS ENUM ('draft', 'review', 'published', 'archived');

-- ========================================
-- 3. TABELAS ESSENCIAIS
-- ========================================

-- Profiles (essencial para auth)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  nickname TEXT UNIQUE NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'reader',
  favorite_categories TEXT[] DEFAULT '{}',
  points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (id)
);

-- Categories (essencial para artigos)
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#3B82F6',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Articles (essencial)
CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content JSONB NOT NULL,
  excerpt TEXT,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  status article_status DEFAULT 'draft',
  is_featured BOOLEAN DEFAULT false,
  views_count INTEGER DEFAULT 0,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Reading history (simplificado)
CREATE TABLE reading_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  read_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Helena conversations (para IA)
CREATE TABLE helena_conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  title TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Helena messages (para IA)
CREATE TABLE helena_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES helena_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ========================================
-- 4. ROW LEVEL SECURITY (SIMPLIFICADO)
-- ========================================

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE helena_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE helena_messages ENABLE ROW LEVEL SECURITY;

-- Políticas básicas
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (true);
CREATE POLICY "Published articles are viewable by everyone" ON articles FOR SELECT USING (status = 'published' OR author_id = auth.uid());

CREATE POLICY "Users can manage own reading history" ON reading_history FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own conversations" ON helena_conversations FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own messages" ON helena_messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM helena_conversations WHERE helena_conversations.id = helena_messages.conversation_id AND helena_conversations.user_id = auth.uid())
);

-- ========================================
-- 5. ÍNDICES BÁSICOS (SEM FUNÇÕES COMPLEXAS)
-- ========================================

CREATE INDEX idx_profiles_nickname ON profiles(nickname);
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_reading_history_user ON reading_history(user_id);
CREATE INDEX idx_helena_conversations_user ON helena_conversations(user_id);

-- ========================================
-- 6. FUNÇÃO ESSENCIAL
-- ========================================

-- Auto-create profile function
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

-- Auto-create profile trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ========================================
-- 7. DADOS ESSENCIAIS
-- ========================================

-- Categorias básicas
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
('Internacional', 'internacional', 'Notícias e análises do cenário mundial', '#9333EA', 10);

-- ========================================
-- SCHEMA MINIMAL GARANTIDO - CONCLUÍDO
-- ========================================
-- Este schema é ultra-simplificado e funcional
-- Pronto para executar sem erros no Supabase
-- Depois podemos expandir com mais funcionalidades
-- ========================================
