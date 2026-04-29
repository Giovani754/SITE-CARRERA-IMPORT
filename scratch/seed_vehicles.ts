import { createClient } from '../src/lib/supabase/server';
import { MOCK_VEHICLES } from '../src/data/mockVehicles';

async function seed() {
  const supabase = await createClient();
  
  console.log('Seeding vehicles...');
  
  // Clean up existing if needed? Better to just insert new ones.
  // Actually, let's just insert the ones from MOCK_VEHICLES but mapped to the real DB schema if needed.
  
  for (const vehicle of MOCK_VEHICLES as any[]) {
    // Remove id to let DB generate one, or keep it if it's a string UUID
    const { id, ...data } = vehicle;
    
    // Ensure numeric fields are numbers
    const cleanedData = {
      ...data,
      year: Number(data.year),
      price: typeof data.price === 'string' ? (data.price.includes('Consulta') ? 0 : Number(data.price.replace(/[^\d]/g, ''))) : data.price,
      // Mileage is usually a string like "2.500 km" in mock but user wants number
      mileage: typeof data.mileage === 'string' ? Number(data.mileage.replace(/[^\d]/g, '')) : data.mileage,
    };

    const { error } = await supabase
      .from('vehicles')
      .insert([cleanedData]);
      
    if (error) {
      console.error(`Error inserting ${data.model}:`, error.message);
    } else {
      console.log(`Inserted ${data.model}`);
    }
  }
}

seed();
