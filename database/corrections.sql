-- ========================================
-- CORREÇÕES DE ERROS - PULSE & PERSPECTIVE
-- ========================================
-- Execute este SQL para corrigir os erros encontrados

-- ========================================
-- CORREÇÃO 1: Índice GIN para busca full-text
-- ========================================
-- Remove o índice problemático se existir
DROP INDEX IF EXISTS idx_articles_search;

-- Cria o índice correto usando to_tsvector
CREATE INDEX idx_articles_search ON articles USING gin(to_tsvector('portuguese', title || ' ' || COALESCE(excerpt, '')));

-- ========================================
-- CORREÇÃO 2: Índice único para reading_history
-- ========================================
-- Remove o índice problemático se existir
DROP INDEX IF EXISTS idx_reading_history_unique_daily;

-- Cria o índice único correto
CREATE UNIQUE INDEX idx_reading_history_unique_daily ON reading_history(user_id, article_id, DATE(read_at));

-- ========================================
-- VERIFICAÇÕES FINAIS
-- ========================================
-- Verifica se as tabelas principais existem
SELECT 
  tablename,
  schemaname
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('profiles', 'articles', 'categories', 'reading_history')
ORDER BY tablename;

-- Verifica se os índices foram criados
SELECT 
  indexname,
  tablename
FROM pg_indexes 
WHERE schemaname = 'public' 
  AND indexname IN ('idx_articles_search', 'idx_reading_history_unique_daily')
ORDER BY indexname;

-- ========================================
-- CORREÇÕES APLICADAS COM SUCESSO
-- ========================================
