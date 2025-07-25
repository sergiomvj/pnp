-- ========================================
-- PULSE & PERSPECTIVE - DATABASE SCHEMA
-- ========================================
-- Complete database structure for the electronic magazine
-- Execute this script in your Supabase SQL Editor

-- ========================================
-- 1. EXTENSIONS
-- ========================================
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";  -- For better text search

-- ========================================
-- 2. CUSTOM TYPES
-- ========================================
-- User role enumeration
CREATE TYPE user_role AS ENUM ('reader', 'author', 'editor', 'admin');

-- Article status enumeration
CREATE TYPE article_status AS ENUM ('draft', 'review', 'published', 'archived');

-- Notification type enumeration
CREATE TYPE notification_type AS ENUM ('new_article', 'comment', 'like', 'follow', 'system');

-- Subscription plan enumeration
CREATE TYPE subscription_plan AS ENUM ('free', 'premium', 'pro');

-- ========================================
-- 3. USER PROFILES TABLE
-- ========================================
-- Extended user profiles (connected to auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  nickname TEXT UNIQUE NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'reader',
  subscription_plan subscription_plan DEFAULT 'free',
  subscription_ends_at TIMESTAMP WITH TIME ZONE,
  favorite_categories TEXT[] DEFAULT '{}',
  reading_preferences JSONB DEFAULT '{}',
  notifications_enabled BOOLEAN DEFAULT true,
  email_notifications BOOLEAN DEFAULT true,
  push_notifications BOOLEAN DEFAULT true,
  points INTEGER DEFAULT 0,
  reading_streak INTEGER DEFAULT 0,
  last_read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (id)
);

-- ========================================
-- 4. CATEGORIES TABLE
-- ========================================
-- Article categories with metadata
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#3B82F6',
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ========================================
-- 5. TAGS TABLE
-- ========================================
-- Article tags for better organization
CREATE TABLE tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ========================================
-- 6. ARTICLES TABLE
-- ========================================
-- Main articles table
CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  subtitle TEXT,
  content JSONB NOT NULL, -- Rich text content in JSON format
  excerpt TEXT,
  featured_image_url TEXT,
  featured_image_alt TEXT,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  status article_status DEFAULT 'draft',
  is_featured BOOLEAN DEFAULT false,
  is_premium BOOLEAN DEFAULT false,
  reading_time INTEGER, -- in minutes
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  meta_title TEXT,
  meta_description TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ========================================
-- 7. ARTICLE TAGS JUNCTION TABLE
-- ========================================
-- Many-to-many relationship between articles and tags
CREATE TABLE article_tags (
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

-- ========================================
-- 8. READING HISTORY TABLE
-- ========================================
-- Track user reading activity
CREATE TABLE reading_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  reading_progress DECIMAL(5,2) DEFAULT 0, -- percentage (0-100)
  reading_time INTEGER DEFAULT 0, -- in seconds
  completed BOOLEAN DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ========================================
-- 9. BOOKMARKS TABLE
-- ========================================
-- User bookmarks/favorites
CREATE TABLE bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, article_id)
);

-- ========================================
-- 10. LIKES TABLE
-- ========================================
-- Article likes
CREATE TABLE likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, article_id)
);

-- ========================================
-- 11. COMMENTS TABLE
-- ========================================
-- Article comments with nested replies
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE, -- for nested replies
  content TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT true,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ========================================
-- 12. COMMENT LIKES TABLE
-- ========================================
-- Likes for comments
CREATE TABLE comment_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, comment_id)
);

-- ========================================
-- 13. NOTIFICATIONS TABLE
-- ========================================
-- User notifications system
CREATE TABLE notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB DEFAULT '{}',
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ========================================
-- 14. HELENA AI CONVERSATIONS TABLE
-- ========================================
-- Store AI Helena conversations
CREATE TABLE helena_conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  title TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ========================================
-- 15. HELENA AI MESSAGES TABLE
-- ========================================
-- Individual messages in Helena conversations
CREATE TABLE helena_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES helena_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ========================================
-- 16. USER ACHIEVEMENTS TABLE
-- ========================================
-- Gamification: User achievements and badges
CREATE TABLE achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  points INTEGER DEFAULT 0,
  condition_type TEXT NOT NULL, -- 'articles_read', 'days_streak', 'comments_made', etc.
  condition_value INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ========================================
-- 17. USER ACHIEVEMENTS JUNCTION TABLE
-- ========================================
-- Track which achievements users have earned
CREATE TABLE user_achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, achievement_id)
);

-- ========================================
-- 18. NEWSLETTER SUBSCRIPTIONS TABLE
-- ========================================
-- Newsletter and email marketing
CREATE TABLE newsletter_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  categories TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- ========================================
-- 19. CONTENT ANALYTICS TABLE
-- ========================================
-- Track content performance and user engagement
CREATE TABLE content_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL, -- 'view', 'scroll', 'share', 'click', etc.
  event_data JSONB DEFAULT '{}',
  session_id TEXT,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ========================================
-- 20. SYSTEM SETTINGS TABLE
-- ========================================
-- Global system configuration
CREATE TABLE system_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ========================================
-- 21. ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE helena_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE helena_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Public profiles viewable by all" ON profiles
  FOR SELECT USING (true);

-- CATEGORIES POLICIES (Public read, admin write)
CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Only admins can modify categories" ON categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- TAGS POLICIES (Public read, authenticated write)
CREATE POLICY "Tags are viewable by everyone" ON tags
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create tags" ON tags
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- ARTICLES POLICIES
CREATE POLICY "Published articles are viewable by everyone" ON articles
  FOR SELECT USING (status = 'published' OR author_id = auth.uid());

CREATE POLICY "Authors can manage their articles" ON articles
  FOR ALL USING (author_id = auth.uid());

CREATE POLICY "Editors and admins can manage all articles" ON articles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('editor', 'admin')
    )
  );

-- READING HISTORY POLICIES
CREATE POLICY "Users can view own reading history" ON reading_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reading history" ON reading_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reading history" ON reading_history
  FOR UPDATE USING (auth.uid() = user_id);

-- BOOKMARKS POLICIES
CREATE POLICY "Users can manage own bookmarks" ON bookmarks
  FOR ALL USING (auth.uid() = user_id);

-- LIKES POLICIES
CREATE POLICY "Users can manage own likes" ON likes
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Likes are viewable by everyone" ON likes
  FOR SELECT USING (true);

-- COMMENTS POLICIES
CREATE POLICY "Comments are viewable by everyone" ON comments
  FOR SELECT USING (is_approved = true);

CREATE POLICY "Users can manage own comments" ON comments
  FOR ALL USING (auth.uid() = user_id);

-- NOTIFICATIONS POLICIES
CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- HELENA AI POLICIES
CREATE POLICY "Users can manage own conversations" ON helena_conversations
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own messages" ON helena_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM helena_conversations 
      WHERE helena_conversations.id = helena_messages.conversation_id 
      AND helena_conversations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own messages" ON helena_messages
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM helena_conversations 
      WHERE helena_conversations.id = helena_messages.conversation_id 
      AND helena_conversations.user_id = auth.uid()
    )
  );

-- ACHIEVEMENTS POLICIES
CREATE POLICY "Achievements are viewable by everyone" ON achievements
  FOR SELECT USING (is_active = true);

CREATE POLICY "Users can view own achievements" ON user_achievements
  FOR SELECT USING (auth.uid() = user_id);

-- ========================================
-- 22. INDEXES FOR PERFORMANCE
-- ========================================

-- User profiles indexes
CREATE INDEX idx_profiles_nickname ON profiles(nickname);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_subscription ON profiles(subscription_plan);

-- Articles indexes
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_author ON articles(author_id);
CREATE INDEX idx_articles_category ON articles(category_id);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX idx_articles_is_featured ON articles(is_featured);
CREATE INDEX idx_articles_search ON articles USING gin(to_tsvector('portuguese', title || ' ' || COALESCE(excerpt, '')));

-- Categories indexes
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_active ON categories(is_active);

-- Tags indexes
CREATE INDEX idx_tags_name ON tags(name);
CREATE INDEX idx_tags_usage ON tags(usage_count DESC);

-- Reading history indexes
CREATE INDEX idx_reading_history_user ON reading_history(user_id);
CREATE INDEX idx_reading_history_article ON reading_history(article_id);
CREATE INDEX idx_reading_history_date ON reading_history(read_at DESC);
CREATE UNIQUE INDEX idx_reading_history_unique_daily ON reading_history(user_id, article_id, DATE(read_at));

-- Comments indexes
CREATE INDEX idx_comments_article ON comments(article_id);
CREATE INDEX idx_comments_user ON comments(user_id);
CREATE INDEX idx_comments_parent ON comments(parent_id);
CREATE INDEX idx_comments_created ON comments(created_at DESC);

-- Notifications indexes
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_notifications_created ON notifications(created_at DESC);

-- Helena AI indexes
CREATE INDEX idx_helena_conversations_user ON helena_conversations(user_id);
CREATE INDEX idx_helena_messages_conversation ON helena_messages(conversation_id);
CREATE INDEX idx_helena_messages_created ON helena_messages(created_at);

-- Analytics indexes
CREATE INDEX idx_analytics_article ON content_analytics(article_id);
CREATE INDEX idx_analytics_user ON content_analytics(user_id);
CREATE INDEX idx_analytics_event ON content_analytics(event_type);
CREATE INDEX idx_analytics_created ON content_analytics(created_at DESC);

-- ========================================
-- 23. FUNCTIONS AND TRIGGERS
-- ========================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles 
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories 
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles 
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments 
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_helena_conversations_updated_at BEFORE UPDATE ON helena_conversations 
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Function to create user profile on signup
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

-- Trigger to create profile on user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to update article counters
CREATE OR REPLACE FUNCTION update_article_counters()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_TABLE_NAME = 'likes' THEN
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
  END IF;
  
  IF TG_OP = 'INSERT' THEN
    RETURN NEW;
  ELSE
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Triggers for counter updates
CREATE TRIGGER update_likes_counter 
  AFTER INSERT OR DELETE ON likes
  FOR EACH ROW EXECUTE PROCEDURE update_article_counters();

CREATE TRIGGER update_comments_counter 
  AFTER INSERT OR DELETE ON comments
  FOR EACH ROW EXECUTE PROCEDURE update_article_counters();

-- Function to update tag usage count
CREATE OR REPLACE FUNCTION update_tag_usage()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE tags SET usage_count = usage_count + 1 WHERE id = NEW.tag_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE tags SET usage_count = usage_count - 1 WHERE id = OLD.tag_id;
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Trigger for tag usage updates
CREATE TRIGGER update_tag_usage_trigger
  AFTER INSERT OR DELETE ON article_tags
  FOR EACH ROW EXECUTE PROCEDURE update_tag_usage();

-- ========================================
-- 24. INITIAL DATA
-- ========================================

-- Insert default categories
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

-- Insert initial achievements
INSERT INTO achievements (name, description, icon, points, condition_type, condition_value) VALUES
('Primeiro Passo', 'Leu seu primeiro artigo', '🎯', 10, 'articles_read', 1),
('Leitor Curioso', 'Leu 10 artigos', '📚', 50, 'articles_read', 10),
('Leitor Voraz', 'Leu 50 artigos', '🔥', 200, 'articles_read', 50),
('Especialista', 'Leu 100 artigos', '🏆', 500, 'articles_read', 100),
('Consistente', 'Manteve uma sequência de 7 dias lendo', '📅', 100, 'days_streak', 7),
('Dedicado', 'Manteve uma sequência de 30 dias lendo', '💪', 300, 'days_streak', 30),
('Social', 'Fez 10 comentários', '💬', 75, 'comments_made', 10),
('Comunicativo', 'Fez 50 comentários', '🗣️', 250, 'comments_made', 50),
('Explorador', 'Leu artigos em todas as categorias', '🗺️', 150, 'categories_explored', 10),
('Compartilhador', 'Compartilhou 25 artigos', '📤', 125, 'articles_shared', 25);

-- Insert system settings
INSERT INTO system_settings (key, value, description) VALUES
('site_title', '"Pulse & Perspective"', 'Nome do site'),
('site_description', '"Revista eletrônica para mentes inquietas"', 'Descrição do site'),
('articles_per_page', '12', 'Artigos por página'),
('premium_price_monthly', '9.90', 'Preço mensal premium em reais'),
('premium_price_yearly', '99.90', 'Preço anual premium em reais'),
('helena_enabled', 'true', 'IA Helena habilitada'),
('gamification_enabled', 'true', 'Sistema de gamificação habilitado'),
('comments_moderation', 'false', 'Moderação de comentários'),
('newsletter_enabled', 'true', 'Newsletter habilitada');

-- ========================================
-- SCRIPT EXECUTION COMPLETE
-- ========================================
-- This schema provides a complete foundation for the Pulse & Perspective platform
-- including user management, content management, AI integration, gamification,
-- analytics, and all features described in the PRD.
--
-- Next steps:
-- 1. Configure your Supabase environment variables
-- 2. Set up authentication providers (Google OAuth)
-- 3. Configure storage buckets for images
-- 4. Set up API integrations (OpenAI, WhatsApp, etc.)
-- ========================================
