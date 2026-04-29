import { createClient } from "./supabase/server";
import { MOCK_VEHICLES } from "@/data/mockVehicles";
import { Vehicle } from "@/data/vehicles";

/**
 * Retorna todos os veículos disponíveis.
 * Une os dados do Supabase com os Mocks para garantir um catálogo completo na apresentação.
 */
export async function getAllVehicles(): Promise<Vehicle[]> {
  const supabase = await createClient();
  
  try {
    const { data: dbVehicles, error } = await supabase
      .from("vehicles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase Error (getAllVehicles):", error.message);
      return MOCK_VEHICLES;
    }

    const realVehicles = (dbVehicles || []) as Vehicle[];
    
    // Se o banco estiver vazio, usa só mocks
    if (realVehicles.length === 0) return MOCK_VEHICLES;

    // Se houver dados no banco, unimos com os mocks que não tenham o mesmo slug
    const realSlugs = new Set(realVehicles.map(v => v.slug));
    const uniqueMocks = MOCK_VEHICLES.filter(v => !realSlugs.has(v.slug));
    
    return [...realVehicles, ...uniqueMocks];
  } catch (_err) {
    console.error("Critical error in getAllVehicles:", _err);
    return MOCK_VEHICLES;
  }
}

/**
 * Retorna veículos em destaque para a Home.
 */
export async function getFeaturedVehicles(limit = 6): Promise<Vehicle[]> {
  const supabase = await createClient();

  try {
    const { data: dbFeatured, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("featured", true)
      .eq("status", "available")
      .limit(limit);

    if (error) {
      console.error("Supabase Error (getFeaturedVehicles):", error.message);
      return MOCK_VEHICLES.filter(v => v.featured).slice(0, limit);
    }

    const realFeatured = (dbFeatured || []) as Vehicle[];
    
    // Se tiver destaques no banco suficientes, usa eles. 
    // Caso contrário, completa com os mocks featured.
    if (realFeatured.length >= limit) return realFeatured;

    const realSlugs = new Set(realFeatured.map(v => v.slug));
    const mockFeatured = MOCK_VEHICLES.filter(v => v.featured && !realSlugs.has(v.slug));
    
    return [...realFeatured, ...mockFeatured].slice(0, limit);
  } catch (_err) {
    console.error("Critical error in getFeaturedVehicles:", _err);
    return MOCK_VEHICLES.filter(v => v.featured).slice(0, limit);
  }
}


/**
 * Busca um veículo individual pelo slug.
 */
export async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  const supabase = await createClient();

  try {
    const { data: dbVehicle, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      console.error("Supabase Error (getVehicleBySlug):", error.message);
    }

    if (dbVehicle) {
      return dbVehicle as Vehicle;
    }

    // Tenta encontrar nos mocks se não houver no banco
    return MOCK_VEHICLES.find(v => v.slug === slug) || null;
  } catch (_err) {
    console.error("Critical error in getVehicleBySlug:", _err);
    return MOCK_VEHICLES.find(v => v.slug === slug) || null;
  }
}

/**
 * Retorna veículos relacionados.
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

    if (!error && dbRelated && dbRelated.length > 0) {
      return dbRelated as Vehicle[];
    }

    // Fallback para marcas diferentes se não houver da mesma marca
    const { data: dbAny, error: errorAny } = await supabase
      .from("vehicles")
      .select("*")
      .neq("slug", currentVehicle.slug)
      .eq("status", "available")
      .limit(limit);

    if (!errorAny && dbAny && dbAny.length > 0) {
      return dbAny as Vehicle[];
    }
    
    return MOCK_VEHICLES.filter(v => v.slug !== currentVehicle.slug).slice(0, limit);
  } catch {
    return MOCK_VEHICLES.filter(v => v.slug !== currentVehicle.slug).slice(0, limit);
  }
}
