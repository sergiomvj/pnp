-- FaceSocialNetwork.sql
-- SQL para recursos sociais e engajamento

-- Compartilhamento de trechos como cards
CREATE TABLE IF NOT EXISTS facesocial_cards (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    article_id INTEGER NOT NULL,
    excerpt TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Stories automáticos para redes sociais
CREATE TABLE IF NOT EXISTS facesocial_stories (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    article_id INTEGER NOT NULL,
    story_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Sistema de desafios entre usuários
CREATE TABLE IF NOT EXISTS facesocial_challenges (
    id SERIAL PRIMARY KEY,
    challenger_id UUID NOT NULL,
    challenged_id UUID NOT NULL,
    article_id INTEGER,
    status VARCHAR(32) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Comentários e discussões em artigos
CREATE TABLE IF NOT EXISTS facesocial_comments (
    id SERIAL PRIMARY KEY,
    article_id INTEGER NOT NULL,
    user_id UUID NOT NULL,
    comment TEXT NOT NULL,
    parent_id INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Ranking de artigos com mais Likes e Shares
CREATE TABLE IF NOT EXISTS facesocial_likes (
    id SERIAL PRIMARY KEY,
    article_id INTEGER NOT NULL,
    user_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS facesocial_shares (
    id SERIAL PRIMARY KEY,
    article_id INTEGER NOT NULL,
    user_id UUID NOT NULL,
    network VARCHAR(32),
    created_at TIMESTAMP DEFAULT NOW()
);
