-- Pulse & Perspective – Estrutura Completa do Banco de Dados
-- PostgreSQL/Supabase – Geração: 2025-07-25
-- Inclui todos os componentes: editorial, comercial, monetização, gamificação, podcast, social, admin, etc.

-- ENUMS
CREATE TYPE article_status AS ENUM ('draft', 'review', 'published', 'archived');
CREATE TYPE user_role AS ENUM ('reader', 'editor', 'admin', 'moderator', 'commercial', 'podcaster');
CREATE TYPE ad_format AS ENUM ('banner', 'native', 'video', 'sponsored', 'popup');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'cancelled');
CREATE TYPE interaction_type AS ENUM ('like', 'share', 'comment', 'bookmark', 'expand', 'challenge');
CREATE TYPE platform_type AS ENUM ('facebook', 'twitter', 'linkedin', 'whatsapp', 'instagram', 'tiktok', 'other');

-- USUÁRIOS E PERFIS
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  nickname text NOT NULL UNIQUE,
  bio text,
  avatar_url text,
  role user_role DEFAULT 'reader',
  favorite_categories text[] DEFAULT '{}',
  points integer DEFAULT 0,
  created_at timestamptz DEFAULT timezone('utc', now()),
  updated_at timestamptz DEFAULT timezone('utc', now())
);

-- CATEGORIAS E TAGS
CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  description text,
  color text DEFAULT '#3B82F6',
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT timezone('utc', now())
);
CREATE TABLE public.tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  usage_count integer DEFAULT 0,
  created_at timestamptz DEFAULT timezone('utc', now())
);

-- ARTIGOS E RELACIONADOS
CREATE TABLE public.articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content jsonb NOT NULL,
  excerpt text,
  author_id uuid REFERENCES auth.users(id),
  category_id uuid REFERENCES public.categories(id),
  status article_status DEFAULT 'draft',
  is_featured boolean DEFAULT false,
  views_count integer DEFAULT 0,
  published_at timestamptz,
  created_at timestamptz DEFAULT timezone('utc', now())
);
CREATE TABLE public.article_tags (
  article_id uuid REFERENCES public.articles(id),
  tag_id uuid REFERENCES public.tags(id),
  PRIMARY KEY (article_id, tag_id)
);
CREATE TABLE public.bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  article_id uuid REFERENCES public.articles(id),
  folder_name text DEFAULT 'Geral',
  notes text,
  created_at timestamptz DEFAULT timezone('utc', now()),
  updated_at timestamptz DEFAULT timezone('utc', now())
);
CREATE TABLE public.article_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  article_id uuid REFERENCES public.articles(id),
  created_at timestamptz DEFAULT timezone('utc', now())
);

-- COMENTÁRIOS
CREATE TABLE public.comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES public.articles(id),
  user_id uuid REFERENCES auth.users(id),
  parent_id uuid REFERENCES public.comments(id),
  content text NOT NULL,
  is_approved boolean DEFAULT true,
  likes_count integer DEFAULT 0,
  created_at timestamptz DEFAULT timezone('utc', now()),
  updated_at timestamptz DEFAULT timezone('utc', now())
);
CREATE TABLE public.comment_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  comment_id uuid REFERENCES public.comments(id),
  created_at timestamptz DEFAULT timezone('utc', now())
);

-- HISTÓRICO E INTERAÇÕES
CREATE TABLE public.reading_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  article_id uuid REFERENCES public.articles(id),
  read_at timestamptz DEFAULT timezone('utc', now()),
  completed boolean DEFAULT false,
  started_at timestamptz DEFAULT timezone('utc', now())
);
CREATE TABLE public.user_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  article_id uuid REFERENCES public.articles(id),
  interaction_type interaction_type NOT NULL,
  metadata jsonb DEFAULT '{}',
  session_id text,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT timezone('utc', now())
);
CREATE TABLE public.social_shares (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  article_id uuid REFERENCES public.articles(id),
  platform platform_type NOT NULL,
  shared_url text,
  custom_message text,
  clicks_count integer DEFAULT 0,
  created_at timestamptz DEFAULT timezone('utc', now())
);

-- IA HELENA
CREATE TABLE public.helena_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  session_id text NOT NULL,
  title text,
  created_at timestamptz DEFAULT timezone('utc', now())
);
CREATE TABLE public.helena_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES public.helena_conversations(id),
  role text NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content text NOT NULL,
  created_at timestamptz DEFAULT timezone('utc', now())
);

-- GAMIFICAÇÃO
CREATE TABLE public.badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  icon_url text,
  created_at timestamptz DEFAULT timezone('utc', now())
);
CREATE TABLE public.user_badges (
  user_id uuid REFERENCES auth.users(id),
  badge_id uuid REFERENCES public.badges(id),
  earned_at timestamptz DEFAULT timezone('utc', now()),
  PRIMARY KEY (user_id, badge_id)
);
CREATE TABLE public.achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  type text NOT NULL,
  value integer,
  description text,
  achieved_at timestamptz DEFAULT timezone('utc', now())
);
CREATE TABLE public.rankings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  points integer DEFAULT 0,
  period text DEFAULT 'all_time',
  created_at timestamptz DEFAULT timezone('utc', now())
);

-- PODCAST
CREATE TABLE public.podcasts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  cover_url text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT timezone('utc', now())
);
CREATE TABLE public.episodes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  podcast_id uuid REFERENCES public.podcasts(id),
  title text NOT NULL,
  description text,
  audio_url text,
  transcript text,
  published_at timestamptz,
  created_at timestamptz DEFAULT timezone('utc', now())
);

-- MONETIZAÇÃO
CREATE TABLE public.plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  price numeric(10,2) NOT NULL,
  period text DEFAULT 'monthly',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT timezone('utc', now())
);
CREATE TABLE public.subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  plan_id uuid REFERENCES public.plans(id),
  status payment_status DEFAULT 'pending',
  started_at timestamptz DEFAULT timezone('utc', now()),
  ended_at timestamptz
);
CREATE TABLE public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id uuid REFERENCES public.subscriptions(id),
  amount numeric(10,2) NOT NULL,
  status payment_status DEFAULT 'pending',
  paid_at timestamptz,
  created_at timestamptz DEFAULT timezone('utc', now())
);

-- GESTÃO COMERCIAL
CREATE TABLE public.clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  contact_email text,
  contact_phone text,
  company text,
  created_at timestamptz DEFAULT timezone('utc', now())
);
CREATE TABLE public.ad_formats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  format ad_format NOT NULL,
  location text NOT NULL,
  cost numeric(10,2) NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT timezone('utc', now())
);
CREATE TABLE public.campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES public.clients(id),
  name text NOT NULL,
  start_date date,
  end_date date,
  budget numeric(12,2),
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT timezone('utc', now())
);
CREATE TABLE public.ads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES public.campaigns(id),
  ad_format_id uuid REFERENCES public.ad_formats(id),
  title text NOT NULL,
  content jsonb NOT NULL,
  image_url text,
  target_url text,
  impressions integer DEFAULT 0,
  clicks integer DEFAULT 0,
  created_at timestamptz DEFAULT timezone('utc', now())
);
CREATE TABLE public.billing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES public.clients(id),
  campaign_id uuid REFERENCES public.campaigns(id),
  amount numeric(12,2) NOT NULL,
  status payment_status DEFAULT 'pending',
  due_date date,
  paid_at timestamptz,
  created_at timestamptz DEFAULT timezone('utc', now())
);

-- SOCIAL E ENGAJAMENTO
CREATE TABLE public.stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  content jsonb NOT NULL,
  created_at timestamptz DEFAULT timezone('utc', now())
);
CREATE TABLE public.challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  start_date date,
  end_date date,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT timezone('utc', now())
);
CREATE TABLE public.challenge_participants (
  challenge_id uuid REFERENCES public.challenges(id),
  user_id uuid REFERENCES auth.users(id),
  joined_at timestamptz DEFAULT timezone('utc', now()),
  PRIMARY KEY (challenge_id, user_id)
);
CREATE TABLE public.article_ranking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES public.articles(id),
  likes integer DEFAULT 0,
  shares integer DEFAULT 0,
  views integer DEFAULT 0,
  period text DEFAULT 'all_time',
  created_at timestamptz DEFAULT timezone('utc', now())
);

-- ADMINISTRAÇÃO E LOGS
CREATE TABLE public.admin_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  action text NOT NULL,
  details jsonb,
  created_at timestamptz DEFAULT timezone('utc', now())
);
CREATE TABLE public.permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  resource text NOT NULL,
  can_read boolean DEFAULT false,
  can_write boolean DEFAULT false,
  can_delete boolean DEFAULT false,
  can_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT timezone('utc', now())
);
CREATE TABLE public.integrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  config jsonb NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT timezone('utc', now())
);

-- FIM DO SCRIPT
