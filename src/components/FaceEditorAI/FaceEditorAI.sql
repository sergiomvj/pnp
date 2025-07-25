-- FaceEditorAI.sql
-- SQL para tabelas relacionadas à IA editorial contextual e básica

-- Tabela de conversas do chat flutuante
CREATE TABLE IF NOT EXISTS faceeditorai_conversations (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    message TEXT NOT NULL,
    response TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    context JSONB,
    persona VARCHAR(255)
);

-- Tabela de pautas personalizadas geradas
CREATE TABLE IF NOT EXISTS faceeditorai_pautas (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    pauta TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    suggested_by_ai BOOLEAN DEFAULT TRUE
);

-- Tabela de perfis/personas de usuário
CREATE TABLE IF NOT EXISTS faceeditorai_personas (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    persona JSONB NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de sugestões de conteúdo
CREATE TABLE IF NOT EXISTS faceeditorai_suggestions (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    suggestion TEXT NOT NULL,
    source VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);
