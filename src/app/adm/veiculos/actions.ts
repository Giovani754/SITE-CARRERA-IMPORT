'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function upsertVehicle(formData: FormData) {
  const supabase = await createClient()

  const id = formData.get('id') as string | null
  const brand = formData.get('brand') as string
  const model = formData.get('model') as string
  const year = formData.get('year') as string
  
  const slug = (formData.get('slug') as string) || 
    `${brand}-${model}-${year}`.toLowerCase().replace(/\s+/g, '-')

  // Get image URLs from formData
  const images = (formData.get('images_json') as string)?.split(',').filter(Boolean) || []

  const vehicleData = {
    brand: brand,
    model: model,
    version: formData.get('version') as string,
    year: parseInt(year),
    mileage: formData.get('mileage') as string,
    color: formData.get('color') as string,
    category: formData.get('category') as string,
    fuel: formData.get('fuel') as string,
    transmission: formData.get('transmission') as string,
    price: formData.get('price') as string,
    description: formData.get('description') as string,
    status: formData.get('status') as 'available' | 'sold' | 'reserved',
    featured: formData.get('featured') === 'on',
    slug: slug,
    blindagem: formData.get('blindagem') as string,
    city: formData.get('city') as string,
    images: images,
    highlights: (formData.get('highlights_json') as string)?.split(',').map(i => i.trim()).filter(Boolean) || [],
  }

  let error
  try {
    if (id) {
      const { error: updateError } = await supabase
        .from('vehicles')
        .update(vehicleData)
        .eq('id', id)
      error = updateError
    } else {
      const { error: insertError } = await supabase
        .from('vehicles')
        .insert([vehicleData])
      error = insertError
    }
  } catch (err: any) {
    console.error('Critical Database Error:', err);
    return { error: `Erro crítico: ${err.message}` }
  }

  if (error) {
    console.error('Supabase Error:', error)
    return { error: `Erro no Supabase: ${error.message} - ${error.details}` }
  }

  // Revalidate everything
  revalidatePath('/adm/veiculos')
  revalidatePath('/adm/dashboard')
  revalidatePath('/estoque')
  revalidatePath(`/estoque/${slug}`)
  revalidatePath('/')
  
  return { success: true, slug };
}

export async function updateVehicleStatus(id: string, status: 'available' | 'sold' | 'reserved') {
  const supabase = await createClient()
  const { error } = await supabase
    .from('vehicles')
    .update({ status })
    .eq('id', id)

  if (error) return { error: 'Falha ao atualizar status.' }

  revalidatePath('/adm/veiculos')
  revalidatePath('/adm/dashboard')
  revalidatePath('/estoque')
  revalidatePath('/')
}

export async function toggleVehicleFeatured(id: string, currentStatus: boolean) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('vehicles')
    .update({ featured: !currentStatus })
    .eq('id', id)

  if (error) return { error: 'Falha ao atualizar destaque.' }

  revalidatePath('/adm/veiculos')
  revalidatePath('/adm/dashboard')
  revalidatePath('/')
}

export async function deleteVehicle(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('vehicles').delete().eq('id', id)

  if (error) {
    return { error: 'Falha ao excluir veículo.' }
  }

  revalidatePath('/adm/veiculos')
  revalidatePath('/adm/dashboard')
  revalidatePath('/estoque')
  revalidatePath('/')
}
