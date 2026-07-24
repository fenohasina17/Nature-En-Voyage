import { ref } from 'vue'
import { supabase, isSupabaseConfigured } from '../lib/supabase.js'
import { vehicles as staticVehicles } from '../data/vehicles.js'
import { getImage } from '../data/images.js'

const buildStaticVehicles = () =>
  staticVehicles.map((vehicle) => ({
    id: vehicle.id,
    name: vehicle.name,
    type: vehicle.type,
    seats: vehicle.seats,
    bags: vehicle.bags,
    terrain: vehicle.terrain,
    fuel: vehicle.fuel,
    rate: vehicle.rate,
    available: vehicle.available,
    image: getImage(vehicle.imgKey, 1200),
  }))

const vehiclesData = ref(buildStaticVehicles())
const loading = ref(false)
const usingFallback = ref(true)

export async function fetchVehiclesData() {
  if (!isSupabaseConfigured) {
    usingFallback.value = true
    return
  }

  loading.value = true
  try {
    const { data, error } = await supabase.from('vehicles').select('*').order('position')

    if (error || !data?.length) {
      usingFallback.value = true
      return
    }

    vehiclesData.value = data.map((row) => ({
      id: row.id,
      name: row.name,
      type: { fr: row.type_fr, en: row.type_en },
      seats: row.seats,
      bags: row.bags,
      terrain: { fr: row.terrain_fr, en: row.terrain_en },
      fuel: { fr: row.fuel_fr, en: row.fuel_en },
      rate: row.rate,
      available: row.available,
      image: row.image_url || '',
    }))
    usingFallback.value = false
  } catch {
    usingFallback.value = true
  } finally {
    loading.value = false
  }
}

export async function createVehicle(payload) {
  const { error } = await supabase.from('vehicles').insert({
    name: payload.name,
    type_fr: payload.typeFr,
    type_en: payload.typeEn,
    seats: payload.seats,
    bags: payload.bags,
    terrain_fr: payload.terrainFr,
    terrain_en: payload.terrainEn,
    fuel_fr: payload.fuelFr,
    fuel_en: payload.fuelEn,
    rate: payload.rate,
    available: payload.available,
    image_url: payload.image || null,
    position: payload.position ?? 999,
  })
  if (error) throw error
  await fetchVehiclesData()
}

export async function updateVehicle(id, payload) {
  const { error } = await supabase
    .from('vehicles')
    .update({
      name: payload.name,
      type_fr: payload.typeFr,
      type_en: payload.typeEn,
      seats: payload.seats,
      bags: payload.bags,
      terrain_fr: payload.terrainFr,
      terrain_en: payload.terrainEn,
      fuel_fr: payload.fuelFr,
      fuel_en: payload.fuelEn,
      rate: payload.rate,
      available: payload.available,
      image_url: payload.image || null,
    })
    .eq('id', id)
  if (error) throw error
  await fetchVehiclesData()
}

export async function deleteVehicle(id) {
  const { error } = await supabase.from('vehicles').delete().eq('id', id)
  if (error) throw error
  await fetchVehiclesData()
}

export function useVehiclesData() {
  return { vehiclesData, loading, usingFallback, fetchVehiclesData, createVehicle, updateVehicle, deleteVehicle }
}
