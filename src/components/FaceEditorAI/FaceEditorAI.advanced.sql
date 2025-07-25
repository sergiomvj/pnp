-- FaceEditorAI.advanced.sql
-- Tabelas para recursos avançados da IA Helena

-- Memória persistente entre sessões
CREATE TABLE IF NOT EXISTS faceeditorai_persistent_memory (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    memory JSONB NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Análise de padrões de leitura
CREATE TABLE IF NOT EXISTS faceeditorai_reading_patterns (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    pattern JSONB NOT NULL,
    analyzed_at TIMESTAMP DEFAULT NOW()
);

-- Geração de conteúdo personalizado
CREATE TABLE IF NOT EXISTS faceeditorai_custom_content (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    content TEXT NOT NULL,
    generated_at TIMESTAMP DEFAULT NOW(),
    context JSONB
);
