-- Inserção de categorias


-- Inserção de categorias com UUIDs
INSERT INTO categories (id, name, slug, description) VALUES
  (gen_random_uuid(), 'Macho World', 'macho-world', 'Para homens que ainda estão tentando entender o que se espera deles.'),
  (gen_random_uuid(), 'Lipstick Corner', 'lipstick-corner', 'Feminilidade com cérebro, sarcasmo e um batom que nunca borra.'),
  (gen_random_uuid(), 'Nerd Brains', 'nerd-brains', 'Para quem acha que cultura pop, ciência e tecnologia são o novo sexy.'),
  (gen_random_uuid(), 'Update Fever', 'update-fever', 'Tudo sobre tecnologia, inovação e futuro.'),
  (gen_random_uuid(), 'Wallet Therapy', 'wallet-therapy', 'Dinheiro, carreira e propósito.'),
  (gen_random_uuid(), 'Sweat & Swagger', 'sweat-swagger', 'Fitness, saúde e bem-estar.'),
  (gen_random_uuid(), 'Sixty and Still Kicking', 'sixty-and-still-kicking', 'Maturidade com atitude.'),
  (gen_random_uuid(), 'The Sideline Report', 'the-sideline-report', 'Esportes e cultura pop.'),
  (gen_random_uuid(), 'Coffee & Books', 'coffee-books', 'Literatura, cafés e minimalismo.'),
  (gen_random_uuid(), 'Social Pulse', 'social-pulse', 'Tendências e comportamento.')
ON CONFLICT (name) DO NOTHING;


-- Texto genérico para todos os artigos

-- Texto genérico para todos os artigos

-- Texto genérico para todos os artigos
DO $$
DECLARE
  generic_text TEXT := 'Este é um artigo de exemplo para testes do sistema. O conteúdo é genérico e serve apenas para validar a exibição e o fluxo da aplicação.';
BEGIN
  -- Artigos mockados usando os UUIDs das categorias já inseridas
  INSERT INTO articles (title, content, image, category_id, read_time, published_at) VALUES
    -- Macho World
    ('Força e Vulnerabilidade', generic_text, 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', (SELECT id FROM categories WHERE name = 'Macho World'), '8 min', NOW() - INTERVAL '1 day'),
    ('Homem Provedor?', generic_text, 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80', (SELECT id FROM categories WHERE name = 'Macho World'), '7 min', NOW() - INTERVAL '2 days'),
    ('Chorar é de Homem', generic_text, 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80', (SELECT id FROM categories WHERE name = 'Macho World'), '6 min', NOW() - INTERVAL '3 days'),
    -- Lipstick Corner
    ('Poder & Batom', generic_text, 'https://images.unsplash.com/photo-1494790108755-2616c78a7ea2?auto=format&fit=crop&w=600&q=80', (SELECT id FROM categories WHERE name = 'Lipstick Corner'), '9 min', NOW() - INTERVAL '1 day'),
    ('Elegância Sem Desculpas', generic_text, 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80', (SELECT id FROM categories WHERE name = 'Lipstick Corner'), '8 min', NOW() - INTERVAL '2 days'),
    ('Batom Que Não Borra', generic_text, 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80', (SELECT id FROM categories WHERE name = 'Lipstick Corner'), '7 min', NOW() - INTERVAL '3 days'),
    -- Nerd Brains
    ('Cultura Pop é Sexy', generic_text, 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80', (SELECT id FROM categories WHERE name = 'Nerd Brains'), '10 min', NOW() - INTERVAL '1 day'),
    ('Ciência para Todos', generic_text, 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80', (SELECT id FROM categories WHERE name = 'Nerd Brains'), '8 min', NOW() - INTERVAL '2 days'),
    ('O Novo Sexy', generic_text, 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80', (SELECT id FROM categories WHERE name = 'Nerd Brains'), '7 min', NOW() - INTERVAL '3 days'),
    -- Update Fever
    ('Futuro do Trabalho', generic_text, 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80', (SELECT id FROM categories WHERE name = 'Update Fever'), '12 min', NOW() - INTERVAL '1 day'),
    ('Tecnologia e Sociedade', generic_text, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=600&q=80', (SELECT id FROM categories WHERE name = 'Update Fever'), '11 min', NOW() - INTERVAL '2 days'),
    ('O Amanhã é Agora', generic_text, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80', (SELECT id FROM categories WHERE name = 'Update Fever'), '10 min', NOW() - INTERVAL '3 days'),
    -- Wallet Therapy
    ('Investimentos para Leigos', generic_text, 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80', (SELECT id FROM categories WHERE name = 'Wallet Therapy'), '11 min', NOW() - INTERVAL '1 day'),
    ('Dinheiro e Propósito', generic_text, 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80', (SELECT id FROM categories WHERE name = 'Wallet Therapy'), '10 min', NOW() - INTERVAL '2 days'),
    ('Storytelling nas Marcas', generic_text, 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80', (SELECT id FROM categories WHERE name = 'Wallet Therapy'), '9 min', NOW() - INTERVAL '3 days'),
    -- Sweat & Swagger
    ('Shape: Disciplina ou Obsessão?', generic_text, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80', (SELECT id FROM categories WHERE name = 'Sweat & Swagger'), '8 min', NOW() - INTERVAL '1 day'),
    ('Saúde Mental em Alta', generic_text, 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80', (SELECT id FROM categories WHERE name = 'Sweat & Swagger'), '9 min', NOW() - INTERVAL '2 days'),
    ('Bem-estar 360', generic_text, 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80', (SELECT id FROM categories WHERE name = 'Sweat & Swagger'), '7 min', NOW() - INTERVAL '3 days'),
    -- Sixty and Still Kicking
    ('Maturidade com Atitude', generic_text, 'https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=600&q=80', (SELECT id FROM categories WHERE name = 'Sixty and Still Kicking'), '7 min', NOW() - INTERVAL '1 day'),
    ('Revolução 60+', generic_text, 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80', (SELECT id FROM categories WHERE name = 'Sixty and Still Kicking'), '8 min', NOW() - INTERVAL '2 days'),
    ('Experiência é Ouro', generic_text, 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80', (SELECT id FROM categories WHERE name = 'Sixty and Still Kicking'), '9 min', NOW() - INTERVAL '3 days'),
    -- The Sideline Report
    ('Esporte e Cultura Pop', generic_text, 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80', (SELECT id FROM categories WHERE name = 'The Sideline Report'), '8 min', NOW() - INTERVAL '1 day'),
    ('Bastidores do Jogo', generic_text, 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80', (SELECT id FROM categories WHERE name = 'The Sideline Report'), '7 min', NOW() - INTERVAL '2 days'),
    ('Torcida Digital', generic_text, 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', (SELECT id FROM categories WHERE name = 'The Sideline Report'), '6 min', NOW() - INTERVAL '3 days'),
    -- Coffee & Books
    ('Café, Livros e Minimalismo', generic_text, 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80', (SELECT id FROM categories WHERE name = 'Coffee & Books'), '6 min', NOW() - INTERVAL '1 day'),
    ('Leitura Essencial', generic_text, 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80', (SELECT id FROM categories WHERE name = 'Coffee & Books'), '7 min', NOW() - INTERVAL '2 days'),
    ('Minimalismo na Prática', generic_text, 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80', (SELECT id FROM categories WHERE name = 'Coffee & Books'), '8 min', NOW() - INTERVAL '3 days'),
    -- Social Pulse
    ('Tendências e Comportamento', generic_text, 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80', (SELECT id FROM categories WHERE name = 'Social Pulse'), '7 min', NOW() - INTERVAL '1 day'),
    ('Geração Z e Consumo', generic_text, 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80', (SELECT id FROM categories WHERE name = 'Social Pulse'), '8 min', NOW() - INTERVAL '2 days'),
    ('Storytelling Viral', generic_text, 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80', (SELECT id FROM categories WHERE name = 'Social Pulse'), '9 min', NOW() - INTERVAL '3 days');
END $$;
