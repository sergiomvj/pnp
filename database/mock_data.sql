-- Pulse & Perspective – Mock Data para Desenvolvimento
-- Geração automática de dados para todas as tabelas principais




-- Limpa as tabelas para ambiente de desenvolvimento (atenção: apaga todos os dados!)
TRUNCATE TABLE public.articles RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.categories RESTART IDENTITY CASCADE;

-- Categorias alinhadas ao projeto conceitual
INSERT INTO public.categories (id, name, slug, description, color, sort_order) VALUES
  ('10000000-0000-0000-0000-000000000001', 'Macho World', 'macho-world', 'Comportamento, masculinidade, dilemas modernos e piadas internas do universo masculino — sem culto ao “alfa” nem mimimi. Linha editorial: provocador, reflexivo e (quase sempre) autodepreciativo.', '#3B82F6', 1),
  ('10000000-0000-0000-0000-000000000002', 'Lipstick Corner', 'lipstick-corner', 'Feminilidade com cérebro, sarcasmo e um batom que nunca borra. Linha editorial: empoderado, direto e deliciosamente venenoso (quando precisa).', '#F59E42', 2),
  ('10000000-0000-0000-0000-000000000003', 'Sixty and Still Kicking', 'sixty-and-still-kicking', 'Vida, saúde, histórias, dores, prazeres e vitórias depois dos 60. Linha editorial: nostálgico, sábio e levemente impaciente.', '#10B981', 3),
  ('10000000-0000-0000-0000-000000000004', 'Nerd Brains', 'nerd-brains', 'Cultura pop, games, ciência, ficção, teorias, gadgets e debates nerds. Linha editorial: inteligente, geek e com humor referência-level.', '#EF4444', 4),
  ('10000000-0000-0000-0000-000000000005', 'Startups & Shenanigans', 'startups-shenanigans', 'Empreendedorismo sem palco, inovação sem buzzword. Linha editorial: realista, irreverente e ágil como um pitch.', '#6f9283', 5),
  ('10000000-0000-0000-0000-000000000006', 'Sweat & Swagger', 'sweat-swagger', 'Fitness, artes marciais, saúde e estética — com disciplina, mas sem a ditadura do tanquinho. Linha editorial: motivador, ácido e com muito cheiro de esforço real.', '#cdc6a5', 6),
  ('10000000-0000-0000-0000-000000000007', 'Wallet Therapy', 'wallet-therapy', 'Dinheiro, investimentos e traumas financeiros com humor e planilha. Linha editorial: direto, sarcástico e finalmente honesto.', '#f0dccaff', 7),
  ('10000000-0000-0000-0000-000000000008', 'Update Fever', 'update-fever', 'Tecnologia, tendências e o eterno ciclo de lançamentos. Linha editorial: crítico, engraçado e sempre meio beta.', '#696d7d', 8),
  ('10000000-0000-0000-0000-000000000009', 'Modern Love & Old Fights', 'modern-love-old-fights', 'Relacionamentos hétero, com amor, caos e lençóis bagunçados. Linha editorial: realista, ácido e perigosamente familiar.', '#8d9f87', 9),
  ('10000000-0000-0000-0000-000000000010', 'The Sideline Report', 'the-sideline-report', 'O esporte como ele é: um teatro épico de glória, grana e gritaria. Linha editorial: esportivo com espírito de resenha e farpa elegante.', '#6f9283', 10);

-- Artigos de exemplo para cada categoria
INSERT INTO public.articles (id, title, slug, content, excerpt, author_id, category_id, status, is_featured, views_count, published_at) VALUES
  ('20000000-0000-0000-0000-000000000001', 'O dilema do homem moderno', 'dilema-homem-moderno', '{"blocks":[]}', 'Reflexão ácida sobre masculinidade em crise.', NULL, '10000000-0000-0000-0000-000000000001', 'published', true, 42, now()),
  ('20000000-0000-0000-0000-000000000002', 'Batom, sarcasmo e poder', 'batom-sarcasmo-poder', '{"blocks":[]}', 'Feminilidade sem clichês e com veneno.', NULL, '10000000-0000-0000-0000-000000000002', 'published', false, 37, now()),
  ('20000000-0000-0000-0000-000000000003', 'A maturidade não pede licença', 'maturidade-nao-pede-licenca', '{"blocks":[]}', 'Envelhecer rindo das próprias dores.', NULL, '10000000-0000-0000-0000-000000000003', 'published', false, 29, now()),
  ('20000000-0000-0000-0000-000000000004', 'O multiverso é canônico?', 'multiverso-canonico', '{"blocks":[]}', 'Discussão nerd com humor referência-level.', NULL, '10000000-0000-0000-0000-000000000004', 'published', false, 51, now()),
  ('20000000-0000-0000-0000-000000000005', 'Pitch real, café ruim', 'pitch-real-cafe-ruim', '{"blocks":[]}', 'Startups sem palco e sem buzzword.', NULL, '10000000-0000-0000-0000-000000000005', 'published', false, 33, now()),
  ('20000000-0000-0000-0000-000000000006', 'O shape não veio no Pix', 'shape-nao-veio-pix', '{"blocks":[]}', 'Fitness ácido e motivador.', NULL, '10000000-0000-0000-0000-000000000006', 'published', false, 27, now()),
  ('20000000-0000-0000-0000-000000000007', 'Traumas financeiros e planilhas', 'traumas-financeiros-planilhas', '{"blocks":[]}', 'Dinheiro explicado sem enrolação.', NULL, '10000000-0000-0000-0000-000000000007', 'published', false, 39, now()),
  ('20000000-0000-0000-0000-000000000008', 'Atualize ou morra tentando', 'atualize-ou-morra', '{"blocks":[]}', 'A febre das atualizações eternas.', NULL, '10000000-0000-0000-0000-000000000008', 'published', false, 44, now()),
  ('20000000-0000-0000-0000-000000000009', 'Amor, caos e lençóis bagunçados', 'amor-caos-lencois', '{"blocks":[]}', 'Relacionamentos reais, ácidos e familiares.', NULL, '10000000-0000-0000-0000-000000000009', 'published', false, 41, now()),
  ('20000000-0000-0000-0000-000000000010', 'Glória, grana e gritaria', 'gloria-grana-gritaria', '{"blocks":[]}', 'O esporte como teatro épico.', NULL, '10000000-0000-0000-0000-000000000010', 'published', false, 36, now());

-- Artigos (20 exemplos, distribuídos)

-- Repita para tags, campanhas, ads, clientes, podcasts, badges, planos, etc.
-- Adapte os dados conforme necessidade do frontend.
-- FIM DO MOCK
