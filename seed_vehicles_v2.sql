-- Script de Seed V2 - Carrera Imports
-- Adiciona 10 veículos premium para apresentação do portfólio.
-- Execute este script no SQL Editor do Supabase.

-- Opcional: Limpar veículos de teste anteriores se desejar um catálogo limpo
-- DELETE FROM vehicles WHERE brand IN ('Porsche', 'BMW', 'Audi', 'Land Rover', 'Mercedes-Benz');

INSERT INTO vehicles (
  brand, 
  model, 
  version, 
  year, 
  mileage, 
  price, 
  category, 
  transmission, 
  fuel, 
  color, 
  city, 
  description, 
  blindagem, 
  status, 
  featured, 
  slug,
  images,
  highlights
) VALUES 
(
  'Porsche', '911', 'Carrera S', 2023, 8500, 1150000, 'esportivo', 'PDK 8 Speed', 'Gasolina', 'Cinza Arctic', 'São Paulo, SP', 
  'Exemplar selecionado para clientes que priorizam procedência, histórico consistente e configuração altamente desejada no mercado premium.', 
  '', 'available', true, 'porsche-911-carrera-s-2023', 
  ARRAY['https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop'],
  ARRAY['Procedência verificada', 'Configuração altamente desejada', 'Baixa quilometragem']
),
(
  'BMW', 'M4', 'Competition', 2022, 12000, 780000, 'performance', 'M Steptronic', 'Gasolina', 'Verde Isle of Man', 'São Paulo, SP', 
  'Coupé de alta performance com configuração esportiva e presença marcante, ideal para quem busca exclusividade e dirigibilidade refinada.', 
  '', 'available', true, 'bmw-m4-competition-2022', 
  ARRAY['https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?q=80&w=1200&auto=format&fit=crop'],
  ARRAY['Pacote performance', 'Acabamento premium', 'Histórico consistente']
),
(
  'Audi', 'RS6', 'Avant Performance', 2024, 5200, 980000, 'performance', 'Tiptronic 8 Speed', 'Gasolina', 'Nardo Gray', 'São Paulo, SP', 
  'Perua de altíssimo desempenho selecionada para clientes que desejam versatilidade, potência e configuração diferenciada em um único ativo.', 
  '', 'available', true, 'audi-rs6-avant-performance-2024', 
  ARRAY['https://images.unsplash.com/photo-1614200187074-4e488257008b?q=80&w=1200&auto=format&fit=crop'],
  ARRAY['Configuração rara', 'Baixa quilometragem', 'Alto desempenho']
),
(
  'Land Rover', 'Range Rover', 'Autobiography', 2023, 14500, 1450000, 'luxo', 'Automático 9 Speed', 'Diesel / Híbrido', 'Preto Santorini', 'São Paulo, SP', 
  'SUV de altíssimo padrão com proposta de luxo, presença e segurança, pensado para quem exige sofisticação sem abrir mão de proteção.', 
  'Blindagem nível III-A', 'available', true, 'range-rover-autobiography-2023', 
  ARRAY['https://images.unsplash.com/photo-1541443131876-44b03de101c5?q=80&w=1200&auto=format&fit=crop'],
  ARRAY['Blindagem nível III-A', 'Luxo e presença', 'Configuração premium']
),
(
  'Mercedes-Benz', 'GLC 63', 'AMG S', 2022, 18800, 690000, 'suv', 'AMG Speedshift 9G', 'Gasolina', 'Branco Polar', 'São Paulo, SP', 
  'SUV com assinatura AMG, escolhido para clientes que valorizam performance, conforto premium e configuração esportiva de fábrica.', 
  '', 'available', false, 'mercedes-amg-glc-63-s-2022', 
  ARRAY['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop'],
  ARRAY['Motorização AMG', 'Excelente conservação', 'Performance com conforto']
),
(
  'Porsche', 'Cayenne', 'Coupé', 2023, 9900, 890000, 'suv', 'Tiptronic S 8 Speed', 'Gasolina', 'Preto Cromita', 'São Paulo, SP', 
  'Cayenne Coupé selecionado para compor um portfólio sofisticado de SUVs premium com apelo esportivo e excelente liquidez de mercado.', 
  '', 'available', true, 'porsche-cayenne-coupe-2023', 
  ARRAY['https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200&auto=format&fit=crop'],
  ARRAY['Design esportivo', 'Procedência verificada', 'Baixa quilometragem']
),
(
  'BMW', 'X5 M', 'Competition', 2021, 21000, 720000, 'suv', 'M Steptronic', 'Gasolina', 'Azul Marina Bay', 'São Paulo, SP', 
  'SUV de alta performance com blindagem e configuração marcante, indicado para quem busca segurança e esportividade no mesmo conjunto.', 
  'Blindagem nível III-A', 'available', false, 'bmw-x5-m-competition-2021', 
  ARRAY['https://images.unsplash.com/photo-1556182330-ad286d538cb1?q=80&w=1200&auto=format&fit=crop'],
  ARRAY['Blindagem nível III-A', 'Performance em SUV', 'Conjunto premium']
),
(
  'Mercedes-Benz', 'C300', 'AMG Line', 2022, 17000, 365000, 'luxo', '9G-Tronic', 'Gasolina', 'Prata Iridium', 'São Paulo, SP', 
  'Sedã premium com proposta equilibrada entre elegância, conforto e valor de revenda, ideal para um portfólio de apresentação refinado.', 
  '', 'available', false, 'mercedes-benz-c300-amg-line-2022', 
  ARRAY['https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1200&auto=format&fit=crop'],
  ARRAY['Acabamento sofisticado', 'Histórico consistente', 'Excelente liquidez']
),
(
  'Audi', 'RS Q8', '4.0 TFSI', 2023, 7800, 995000, 'suv', 'Tiptronic 8 Speed', 'Gasolina', 'Verde Java', 'São Paulo, SP', 
  'RS Q8 selecionado para representar o topo da linha entre SUVs de performance, com visual imponente e excelente apelo no mercado premium.', 
  '', 'available', false, 'audi-rs-q8-2023', 
  ARRAY['https://images.unsplash.com/photo-1606148632319-ca6444f2155c?q=80&w=1200&auto=format&fit=crop'],
  ARRAY['Alto desempenho', 'Configuração exclusiva', 'Baixa quilometragem']
),
(
  'Land Rover', 'Defender', 'HSE', 2022, 19500, 610000, 'suv', 'Automático 8 Speed', 'Diesel', 'Bege Gondwana', 'São Paulo, SP', 
  'Defender com proposta sofisticada e robusta, escolhido para compor um estoque de apresentação com variedade real e forte apelo visual.', 
  '', 'available', false, 'land-rover-defender-hse-2022', 
  ARRAY['https://images.unsplash.com/photo-1605515298946-d062f2e9da53?q=80&w=1200&auto=format&fit=crop'],
  ARRAY['Presença marcante', 'Configuração versátil', 'Excelente conservação']
);
