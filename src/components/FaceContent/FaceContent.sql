-- FaceContent.sql
-- SQL para sistema gerenciador de artigos

-- Artigos
CREATE TABLE IF NOT EXISTS facecontent_articles (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    seo_title VARCHAR(255),
    seo_description TEXT,
    seo_keywords TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP
);

-- Histórico de edições
CREATE TABLE IF NOT EXISTS facecontent_article_history (
    id SERIAL PRIMARY KEY,
    article_id INTEGER NOT NULL REFERENCES facecontent_articles(id),
    user_id UUID NOT NULL,
    content TEXT NOT NULL,
    edited_at TIMESTAMP DEFAULT NOW()
);

-- Permissões de edição/exclusão
CREATE TABLE IF NOT EXISTS facecontent_permissions (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    article_id INTEGER NOT NULL REFERENCES facecontent_articles(id),
    can_edit BOOLEAN DEFAULT TRUE,
    can_delete BOOLEAN DEFAULT FALSE
);
