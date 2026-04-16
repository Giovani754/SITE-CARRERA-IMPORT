import { createClient } from "./supabase/server";
import { MOCK_VEHICLES } from "@/data/mockVehicles";
import { Vehicle } from "@/data/vehicles";

/**
 * Retorna todos os veículos disponíveis.
 * Tenta buscar do Supabase primeiro; se vazio ou erro, retorna os mocks.
 */
export async function getAllVehicles(): Promise<Vehicle[]> {
  const supabase = await createClient();
  
  try {
    const { data: dbVehicles, error } = await supabase
      .from("vehicles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !dbVehicles || dbVehicles.length === 0) {
      if (error) console.warn("Supabase Fetch Error (getAllVehicles), using mocks:", error.message);
      return MOCK_VEHICLES;
    }

    return dbVehicles as Vehicle[];
  } catch (err) {
    console.error("Critical error in getAllVehicles, using mocks:", err);
    return MOCK_VEHICLES;
  }
}

/**
 * Retorna veículos em destaque para a Home.
 * Se não houver itens com 'featured' no banco, usa os mocks filtrados.
 */
export async function getFeaturedVehicles(limit = 3): Promise<Vehicle[]> {
  const supabase = await createClient();

  try {
    const { data: dbFeatured, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("featured", true)
      .eq("status", "available")
      .limit(limit);

    if (error || !dbFeatured || dbFeatured.length === 0) {
      if (error) console.warn("Supabase Fetch Error (getFeaturedVehicles), using mocks:", error.message);
      return MOCK_VEHICLES.filter(v => v.featured).slice(0, limit);
    }

    return dbFeatured as Vehicle[];
  } catch (err) {
    console.error("Critical error in getFeaturedVehicles, using mocks:", err);
    return MOCK_VEHICLES.filter(v => v.featured).slice(0, limit);
  }
}

/**
 * Busca um veículo individual pelo slug.
 * Verifica no Supabase e, se não encontrar, tenta nos mocks.
 */
export async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  const supabase = await createClient();

  try {
    const { data: dbVehicle, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !dbVehicle) {
      // Tenta encontrar nos mocks
      const mock = MOCK_VEHICLES.find(v => v.slug === slug);
      return mock || null;
    }

    return dbVehicle as Vehicle;
  } catch (err) {
    console.error("Critical error in getVehicleBySlug, searching mocks:", err);
    const mock = MOCK_VEHICLES.find(v => v.slug === slug);
    return mock || null;
  }
}

/**
 * Retorna veículos relacionados (mesma marca ou aleatórios).
 */
export async function getRelatedVehicles(currentVehicle: Vehicle, limit = 3): Promise<Vehicle[]> {
  const supabase = await createClient();

  try {
    const { data: dbRelated, error } = await supabase
      .from("vehicles")
      .select("*")
      .neq("slug", currentVehicle.slug)
      .eq("brand", currentVehicle.brand)
      .eq("status", "available")
      .limit(limit);

    // Se no DB não houver da mesma marca, tenta qualquer um disponível
    if (error || !dbRelated || dbRelated.length === 0) {
      const mockRelated = MOCK_VEHICLES.filter(
        v => v.slug !== currentVehicle.slug && (v.brand === currentVehicle.brand || true)
      ).slice(0, limit);
      
      return mockRelated;
    }

    return dbRelated as Vehicle[];
  } catch (err) {
    return MOCK_VEHICLES.filter(v => v.slug !== currentVehicle.slug).slice(0, limit);
  }
}
