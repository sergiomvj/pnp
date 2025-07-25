-- FaceAds.sql
-- SQL para gestão comercial de anúncios

-- Formatos de ads
CREATE TABLE IF NOT EXISTS faceads_formats (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    location VARCHAR(64) NOT NULL,
    cost_cents INTEGER NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Clientes
CREATE TABLE IF NOT EXISTS faceads_clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    contact VARCHAR(128),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Campanhas
CREATE TABLE IF NOT EXISTS faceads_campaigns (
    id SERIAL PRIMARY KEY,
    client_id INTEGER NOT NULL REFERENCES faceads_clients(id),
    format_id INTEGER NOT NULL REFERENCES faceads_formats(id),
    name VARCHAR(128) NOT NULL,
    start_date DATE,
    end_date DATE,
    budget_cents INTEGER,
    status VARCHAR(32) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Faturamento
CREATE TABLE IF NOT EXISTS faceads_billing (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL REFERENCES faceads_campaigns(id),
    amount_cents INTEGER NOT NULL,
    issued_at TIMESTAMP DEFAULT NOW(),
    paid_at TIMESTAMP
);
