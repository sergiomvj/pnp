-- FacePodCast.sql
-- SQL para tabelas do sistema de podcast interativo

-- Tabela de podcasts gerados a partir de artigos
CREATE TABLE IF NOT EXISTS facepodcast_podcasts (
    id SERIAL PRIMARY KEY,
    article_id INTEGER NOT NULL,
    audio_url TEXT NOT NULL,
    transcript TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    generated_by_ai BOOLEAN DEFAULT TRUE
);

-- Tabela de comentários vinculados a timestamps
CREATE TABLE IF NOT EXISTS facepodcast_comments (
    id SERIAL PRIMARY KEY,
    podcast_id INTEGER NOT NULL REFERENCES facepodcast_podcasts(id),
    user_id UUID NOT NULL,
    timestamp_seconds INTEGER NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
