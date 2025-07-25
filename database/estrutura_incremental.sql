-- Pulse & Perspective – Script Incremental Seguro para Banco Existente
-- PostgreSQL/Supabase – Geração: 2025-07-25
-- Adaptações: IF NOT EXISTS, checagem de tipos, tabelas e constraints

-- ENUMS
DO $$ BEGIN
  CREATE TYPE article_status AS ENUM ('draft', 'review', 'published', 'archived');
EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('reader', 'editor', 'admin', 'moderator', 'commercial', 'podcaster');
EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN
  CREATE TYPE ad_format AS ENUM ('banner', 'native', 'video', 'sponsored', 'popup');
EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN
  CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'cancelled');
EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN
  CREATE TYPE interaction_type AS ENUM ('like', 'share', 'comment', 'bookmark', 'expand', 'challenge');
EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN
  CREATE TYPE platform_type AS ENUM ('facebook', 'twitter', 'linkedin', 'whatsapp', 'instagram', 'tiktok', 'other');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- TABELAS (exemplo para algumas, repita para todas as novas)
CREATE TABLE IF NOT EXISTS public.badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  icon_url text,
  created_at timestamptz DEFAULT timezone('utc', now())
);
CREATE TABLE IF NOT EXISTS public.user_badges (
  user_id uuid REFERENCES auth.users(id),
  badge_id uuid REFERENCES public.badges(id),
  earned_at timestamptz DEFAULT timezone('utc', now()),
  PRIMARY KEY (user_id, badge_id)
);
CREATE TABLE IF NOT EXISTS public.achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  type text NOT NULL,
  value integer,
  description text,
  achieved_at timestamptz DEFAULT timezone('utc', now())
);
CREATE TABLE IF NOT EXISTS public.rankings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  points integer DEFAULT 0,
  period text DEFAULT 'all_time',
  created_at timestamptz DEFAULT timezone('utc', now())
);
CREATE TABLE IF NOT EXISTS public.podcasts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  cover_url text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT timezone('utc', now())
);
CREATE TABLE IF NOT EXISTS public.episodes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  podcast_id uuid REFERENCES public.podcasts(id),
  title text NOT NULL,
  description text,
  audio_url text,
  transcript text,
  published_at timestamptz,
  created_at timestamptz DEFAULT timezone('utc', now())
);
-- Repita o padrão acima para todas as tabelas novas do script completo

-- Exemplo para constraints e colunas novas:
-- ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false;
-- ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS views_count integer DEFAULT 0;

-- FIM DO SCRIPT INCREMENTAL
