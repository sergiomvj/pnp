-- FaceCMS.sql
-- SQL para CMS administrativo

-- Publicação de artigos
CREATE TABLE IF NOT EXISTS facecms_publications (
    id SERIAL PRIMARY KEY,
    article_id INTEGER NOT NULL,
    published_at TIMESTAMP DEFAULT NOW(),
    published_by UUID NOT NULL
);

-- Moderação de conteúdo
CREATE TABLE IF NOT EXISTS facecms_moderation (
    id SERIAL PRIMARY KEY,
    article_id INTEGER NOT NULL,
    moderator_id UUID NOT NULL,
    status VARCHAR(32) DEFAULT 'pending',
    reason TEXT,
    moderated_at TIMESTAMP DEFAULT NOW()
);

-- Analytics editoriais
CREATE TABLE IF NOT EXISTS facecms_analytics (
    id SERIAL PRIMARY KEY,
    article_id INTEGER NOT NULL,
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Configuração de IA Helena
CREATE TABLE IF NOT EXISTS facecms_helena_config (
    id SERIAL PRIMARY KEY,
    key VARCHAR(64) NOT NULL,
    value TEXT,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Permissões de usuários
CREATE TABLE IF NOT EXISTS facecms_user_roles (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    role VARCHAR(32) NOT NULL,
    assigned_at TIMESTAMP DEFAULT NOW()
);
