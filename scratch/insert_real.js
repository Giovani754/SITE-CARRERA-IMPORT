const https = require('https');

const supabaseUrl = 'https://ytklzhvazoqofgapumnu.supabase.co';
const supabaseKey = 'sb_publishable_ioOV1SPlEFATjymwzHYv_g_XNSouJP7';

const vehicles = [
  {
    brand: 'Porsche', model: '911', version: 'Carrera S', year: 2023, mileage: 8500, price: 1150000, category: 'esportivo',
    city: 'São Paulo, SP', blindagem: '', featured: true, status: 'available', slug: 'porsche-911-carrera-s-2023',
    highlights: ['Procedência verificada', 'Configuração altamente desejada', 'Baixa quilometragem'],
    images: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop'],
    description: 'Exemplar selecionado para clientes que priorizam procedência, histórico consistente e configuração altamente desejada no mercado premium.'
  },
  {
    brand: 'BMW', model: 'M4', version: 'Competition', year: 2022, mileage: 12000, price: 780000, category: 'performance',
    city: 'São Paulo, SP', blindagem: '', featured: true, status: 'available', slug: 'bmw-m4-competition-2022',
    highlights: ['Pacote performance', 'Acabamento premium', 'Histórico consistente'],
    images: ['https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?q=80&w=1200&auto=format&fit=crop'],
    description: 'Coupé de alta performance com configuração esportiva e presença marcante, ideal para quem busca exclusividade e dirigibilidade refinada.'
  },
  {
    brand: 'Audi', model: 'RS6', version: 'Avant Performance', year: 2024, mileage: 5200, price: 980000, category: 'performance',
    city: 'São Paulo, SP', blindagem: '', featured: true, status: 'available', slug: 'audi-rs6-avant-performance-2024',
    highlights: ['Configuração rara', 'Baixa quilometragem', 'Alto desempenho'],
    images: ['https://images.unsplash.com/photo-1614200187074-4e488257008b?q=80&w=1200&auto=format&fit=crop'],
    description: 'Perua de altíssimo desempenho selecionada para clientes que desejam versatilidade, potência e configuração diferenciada em um único ativo.'
  },
  {
    brand: 'Land Rover', model: 'Range Rover', version: 'Autobiography', year: 2023, mileage: 14500, price: 1450000, category: 'luxo',
    city: 'São Paulo, SP', blindagem: 'Blindagem nível III-A', featured: true, status: 'available', slug: 'range-rover-autobiography-2023',
    highlights: ['Blindagem nível III-A', 'Luxo e presença', 'Configuração premium'],
    images: ['https://images.unsplash.com/photo-1541443131876-44b03de101c5?q=80&w=1200&auto=format&fit=crop'],
    description: 'SUV de altíssimo padrão com proposta de luxo, presença e segurança, pensado para quem exige sofisticação sem abrir mão de proteção.'
  },
  {
    brand: 'Mercedes-Benz', model: 'GLC 63', version: 'AMG S', year: 2022, mileage: 18800, price: 690000, category: 'suv',
    city: 'São Paulo, SP', blindagem: '', featured: false, status: 'available', slug: 'mercedes-amg-glc-63-s-2022',
    highlights: ['Motorização AMG', 'Excelente conservação', 'Performance com conforto'],
    images: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop'],
    description: 'SUV com assinatura AMG, escolhido para clientes que valorizam performance, conforto premium e configuração esportiva de fábrica.'
  },
  {
    brand: 'Porsche', model: 'Cayenne', version: 'Coupé', year: 2023, mileage: 9900, price: 890000, category: 'suv',
    city: 'São Paulo, SP', blindagem: '', featured: true, status: 'available', slug: 'porsche-cayenne-coupe-2023',
    highlights: ['Design esportivo', 'Procedência verificada', 'Baixa quilometragem'],
    images: ['https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200&auto=format&fit=crop'],
    description: 'Cayenne Coupé selecionado para compor um portfólio sofisticado de SUVs premium com apelo esportivo e excelente liquidez de mercado.'
  },
  {
    brand: 'BMW', model: 'X5 M', version: 'Competition', year: 2021, mileage: 21000, price: 720000, category: 'suv',
    city: 'São Paulo, SP', blindagem: 'Blindagem nível III-A', featured: false, status: 'available', slug: 'bmw-x5-m-competition-2021',
    highlights: ['Blindagem nível III-A', 'Performance em SUV', 'Conjunto premium'],
    images: ['https://images.unsplash.com/photo-1556182330-ad286d538cb1?q=80&w=1200&auto=format&fit=crop'],
    description: 'SUV de alta performance com blindagem e configuração marcante, indicado para quem busca segurança e esportividade no mesmo conjunto.'
  },
  {
    brand: 'Mercedes-Benz', model: 'C300', version: 'AMG Line', year: 2022, mileage: 17000, price: 365000, category: 'luxo',
    city: 'São Paulo, SP', blindagem: '', featured: false, status: 'available', slug: 'mercedes-benz-c300-amg-line-2022',
    highlights: ['Acabamento sofisticado', 'Histórico consistente', 'Excelente liquidez'],
    images: ['https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1200&auto=format&fit=crop'],
    description: 'Sedã premium com proposta equilibrada entre elegância, conforto e valor de revenda, ideal para um portfólio de apresentação refinado.'
  },
  {
    brand: 'Audi', model: 'RS Q8', version: '4.0 TFSI', year: 2023, mileage: 7800, price: 995000, category: 'suv',
    city: 'São Paulo, SP', blindagem: '', featured: false, status: 'available', slug: 'audi-rs-q8-2023',
    highlights: ['Alto desempenho', 'Configuração exclusiva', 'Baixa quilometragem'],
    images: ['https://images.unsplash.com/photo-1606148632319-ca6444f2155c?q=80&w=1200&auto=format&fit=crop'],
    description: 'RS Q8 selecionado para representar o topo da linha entre SUVs de performance, com visual imponente e excelente apelo no mercado premium.'
  },
  {
    brand: 'Land Rover', model: 'Defender', version: 'HSE', year: 2022, mileage: 19500, price: 610000, category: 'suv',
    city: 'São Paulo, SP', blindagem: '', featured: false, status: 'available', slug: 'land-rover-defender-hse-2022',
    highlights: ['Presença marcante', 'Configuração versátil', 'Excelente conservação'],
    images: ['https://images.unsplash.com/photo-1605515298946-d062f2e9da53?q=80&w=1200&auto=format&fit=crop'],
    description: 'Defender com proposta sofisticada e robusta, escolhido para compor um estoque de apresentação com variedade real e forte apelo visual.'
  }
];

const data = JSON.stringify(vehicles);

const options = {
  hostname: 'ytklzhvazoqofgapumnu.supabase.co',
  path: '/rest/v1/vehicles',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': supabaseKey,
    'Authorization': `Bearer ${supabaseKey}`,
    'Prefer': 'resolution=merge-duplicates'
  }
};

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.write(data);
req.end();
