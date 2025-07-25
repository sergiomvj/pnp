-- FaceGamification: Tabela de ranking e conquistas
CREATE TABLE IF NOT EXISTS facegamification_leaderboard (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  pontos INTEGER DEFAULT 0,
  badges TEXT[] DEFAULT '{}',
  conquistas TEXT[] DEFAULT '{}',
  ultima_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_facegamification_user ON facegamification_leaderboard(user_id);
