const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const vehicles = [
  {
    brand: "Porsche",
    model: "911 Carrera S",
    version: "3.0 Flat-Six Turbo",
    year: 2023,
    mileage: 1200,
    price: 1150000,
    category: "Esportivo",
    transmission: "PDK 8 Speed",
    fuel: "Gasolina",
    color: "Cinza Arctic",
    city: "São Paulo",
    description: "Configuração exclusiva, interior em couro bordeaux, teto solar em vidro, escapamento esportivo.",
    blindagem: "",
    status: "available",
    featured: true,
    images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"]
  },
  {
    brand: "BMW",
    model: "M4 Competition",
    version: "xDrive Track Pack",
    year: 2024,
    mileage: 500,
    price: 890000,
    category: "Esportivo",
    transmission: "M Steptronic",
    fuel: "Gasolina",
    color: "Verde Isle of Man",
    city: "São Paulo",
    description: "Pacote de carbono completo, bancos concha M Carbon, freios de cerâmica.",
    blindagem: "",
    status: "available",
    featured: true,
    images: ["https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?q=80&w=1200&auto=format&fit=crop"]
  },
  {
    brand: "Audi",
    model: "RS6 Avant",
    version: "Performance 630cv",
    year: 2022,
    mileage: 15000,
    price: 980000,
    category: "Station Wagon",
    transmission: "Tiptronic 8 Speed",
    fuel: "Gasolina",
    color: "Nardo Gray",
    city: "São Paulo",
    description: "A perua mais rápida do mundo. Único dono, todas as revisões na concessionária.",
    blindagem: "Blindagem BSS Nível III-A",
    status: "available",
    featured: true,
    images: ["https://images.unsplash.com/photo-1614200187074-4e488257008b?q=80&w=1200&auto=format&fit=crop"]
  },
  {
    brand: "Land Rover",
    model: "Range Rover Autobiography",
    version: "D350 MHEV",
    year: 2023,
    mileage: 8000,
    price: 1350000,
    category: "SUV",
    transmission: "Automático 9 Speed",
    fuel: "Diesel / Híbrido",
    color: "Preto Santorini",
    city: "São Paulo",
    description: "O ápice do luxo off-road. Interior em couro semi-anilina, sistema de som Meridian Signature.",
    blindagem: "Blindagem Carbon Nível III-A",
    status: "available",
    featured: true,
    images: ["https://images.unsplash.com/photo-1541443131876-44b03de101c5?q=80&w=1200&auto=format&fit=crop"]
  },
  {
    brand: "Mercedes-Benz",
    model: "GLC 43 AMG",
    version: "4MATIC Coupé",
    year: 2021,
    mileage: 32000,
    price: 485000,
    category: "SUV Coupé",
    transmission: "AMG Speedshift 9G",
    fuel: "Gasolina",
    color: "Branco Polar",
    city: "São Paulo",
    description: "Esportividade e versatilidade. Teto solar panorâmico, escape performance AMG.",
    blindagem: "",
    status: "available",
    featured: false,
    images: ["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop"]
  }
];

async function seed() {
  console.log('Iniciando cadastro de veículos de exemplo...');
  
  for (const v of vehicles) {
    const { error } = await supabase
      .from('vehicles')
      .insert([v]);
      
    if (error) {
      console.error(`Erro ao inserir ${v.brand} ${v.model}:`, error.message);
    } else {
      console.log(`Sucesso: ${v.brand} ${v.model} cadastrado.`);
    }
  }
  
  console.log('Processo finalizado.');
}

seed();
