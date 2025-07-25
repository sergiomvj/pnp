-- ========================================
-- MINIMAL AUTH SETUP - PULSE & PERSPECTIVE
-- ========================================
-- Execute this SQL in your Supabase SQL Editor for basic authentication
-- This is the minimum required structure to get the auth system working

-- ========================================
-- 1. USER PROFILES TABLE
-- ========================================
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  nickname TEXT UNIQUE,
  bio TEXT,
  avatar_url TEXT,
  favorite_categories TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (id)
);

-- ========================================
-- 2. READING HISTORY TABLE
-- ========================================
CREATE TABLE reading_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  article_id TEXT NOT NULL,
  article_title TEXT NOT NULL,
  article_category TEXT,
  read_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ========================================
-- 3. ENABLE ROW LEVEL SECURITY
-- ========================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_history ENABLE ROW LEVEL SECURITY;

-- ========================================
-- 4. RLS POLICIES FOR PROFILES
-- ========================================
-- Users can view and edit their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- ========================================
-- 5. RLS POLICIES FOR READING HISTORY
-- ========================================
-- Users can only see and manage their own reading history
CREATE POLICY "Users can view own reading history" ON reading_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reading history" ON reading_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ========================================
-- 6. AUTO-CREATE PROFILE FUNCTION
-- ========================================
-- Function to automatically create a profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, nickname)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'nickname', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ========================================
-- 7. TRIGGER FOR AUTO-PROFILE CREATION
-- ========================================
-- Trigger to execute the function when a new user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ========================================
-- 8. UPDATE TIMESTAMP FUNCTION
-- ========================================
-- Function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ========================================
-- 9. APPLY UPDATE TRIGGER TO PROFILES
-- ========================================
CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON profiles 
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- ========================================
-- MINIMAL SETUP COMPLETE!
-- ========================================
-- This minimal schema will enable:
-- ✅ User registration and login
-- ✅ Google OAuth integration
-- ✅ Basic user profile management
-- ✅ Reading history tracking
-- ✅ All authentication features in your app
--
-- After executing this SQL:
-- 1. Update your .env file with Supabase credentials
-- 2. Test the authentication system
-- 3. Later, run the full schema.sql for complete features
-- ========================================
