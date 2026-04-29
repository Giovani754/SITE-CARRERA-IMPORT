import { createClient } from '../src/lib/supabase/server';

async function checkDb() {
  const supabase = await createClient();
  const { data, count, error } = await supabase
    .from('vehicles')
    .select('*', { count: 'exact' });

  if (error) {
    console.error('Error fetching vehicles:', error.message);
    return;
  }

  console.log('--- DATABASE AUDIT ---');
  console.log('Total vehicles:', count);
  console.log('Featured vehicles:', data?.filter((v: any) => v.featured).length);
  console.log('Available vehicles:', data?.filter((v: any) => v.status === 'available').length);
  
  if (data && data.length > 0) {
    console.log('Vehicle models in DB:', data.map((v: any) => v.model).join(', '));
  } else {
    console.log('No vehicles found in DB.');
  }
}

checkDb();
