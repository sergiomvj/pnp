-- FaceClipp: Tabela de clipping automático
CREATE TABLE IF NOT EXISTS faceclipp_clippings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  fonte TEXT NOT NULL,
  titulo TEXT NOT NULL,
  resumo TEXT,
  url TEXT NOT NULL,
  data_publicacao TIMESTAMP WITH TIME ZONE,
  status_curadoria TEXT DEFAULT 'pendente', -- pendente, aprovado, rejeitado
  enviado_whatsapp BOOLEAN DEFAULT false,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
