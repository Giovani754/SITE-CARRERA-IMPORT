-- Script para adicionar a coluna 'category' na tabela 'vehicles'
-- Execute este comando no SQL Editor do seu painel Supabase

ALTER TABLE public.vehicles 
ADD COLUMN IF NOT EXISTS category TEXT;

-- Opcional: Adicionar um comentário para documentação
COMMENT ON COLUMN public.vehicles.category IS 'Categoria do veículo (ex: Esportivo, SUV, Sedã, etc.)';
