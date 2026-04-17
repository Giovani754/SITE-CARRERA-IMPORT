'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function upsertVehicle(formData: FormData) {
  const supabase = await createClient()

  const id = formData.get('id') as string | null
  const slug = (formData.get('slug') as string) || 
    `${formData.get('brand')}-${formData.get('model')}-${formData.get('year')}`.toLowerCase().replace(/\s+/g, '-')

  const vehicleData = {
    brand: formData.get('brand') as string,
    model: formData.get('model') as string,
    version: formData.get('version') as string,
    year: parseInt(formData.get('year') as string),
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
    armor: formData.get('armor') as string,
    images: (formData.get('images_json') as string)?.split(',').map(i => i.trim()).filter(Boolean) || [],
    highlights: (formData.get('highlights_json') as string)?.split(',').map(i => i.trim()).filter(Boolean) || [],
  }

  let error
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

  if (error) {
    console.error('Error saving vehicle:', error)
    return { error: 'Falha ao salvar veículo.' }
  }

  revalidatePath('/adm/veiculos')
  revalidatePath('/estoque')
  revalidatePath(`/estoque/${slug}`)
  revalidatePath('/')
  
  redirect('/adm/veiculos')
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
  revalidatePath('/estoque')
  revalidatePath('/')
}
