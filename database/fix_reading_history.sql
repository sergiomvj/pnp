-- ========================================
-- FIX PARA ERRO DE SINTAXE - READING HISTORY
-- ========================================
-- Execute este SQL se você encontrou o erro na linha 135

-- Primeiro, remove a tabela se ela foi criada com erro
DROP TABLE IF EXISTS reading_history CASCADE;

-- Recria a tabela reading_history corretamente
CREATE TABLE reading_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  reading_progress DECIMAL(5,2) DEFAULT 0, -- percentage (0-100)
  reading_time INTEGER DEFAULT 0, -- in seconds
  completed BOOLEAN DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Habilita RLS
ALTER TABLE reading_history ENABLE ROW LEVEL SECURITY;

-- Cria as políticas RLS
CREATE POLICY "Users can view own reading history" ON reading_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reading history" ON reading_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reading history" ON reading_history
  FOR UPDATE USING (auth.uid() = user_id);

-- Cria os índices
CREATE INDEX idx_reading_history_user ON reading_history(user_id);
CREATE INDEX idx_reading_history_article ON reading_history(article_id);
CREATE INDEX idx_reading_history_date ON reading_history(read_at DESC);
CREATE UNIQUE INDEX idx_reading_history_unique_daily ON reading_history(user_id, article_id, DATE(read_at));

-- ========================================
-- CORREÇÃO CONCLUÍDA
-- ========================================
