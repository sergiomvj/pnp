-- FaceMonetization.sql
-- SQL para sistema de monetização, planos, assinaturas e clube de vantagens

-- Planos Premium
CREATE TABLE IF NOT EXISTS facemonetization_plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    description TEXT,
    price_cents INTEGER NOT NULL,
    period VARCHAR(16) NOT NULL, -- mensal, anual, etc
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Assinaturas
CREATE TABLE IF NOT EXISTS facemonetization_subscriptions (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    plan_id INTEGER NOT NULL REFERENCES facemonetization_plans(id),
    status VARCHAR(32) DEFAULT 'active',
    started_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP,
    payment_gateway VARCHAR(32),
    external_id VARCHAR(128)
);

-- Conteúdo exclusivo
CREATE TABLE IF NOT EXISTS facemonetization_exclusive_content (
    id SERIAL PRIMARY KEY,
    article_id INTEGER NOT NULL,
    available_for_plan INTEGER REFERENCES facemonetization_plans(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Clube de Vantagens e Prêmios
CREATE TABLE IF NOT EXISTS facemonetization_benefits (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    description TEXT,
    image_url TEXT,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS facemonetization_user_benefits (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    benefit_id INTEGER NOT NULL REFERENCES facemonetization_benefits(id),
    redeemed_at TIMESTAMP DEFAULT NOW()
);
