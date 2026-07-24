import { ref } from 'vue'
import { supabase, isSupabaseConfigured } from '../lib/supabase.js'
import { axes as staticAxes } from '../data/axes.js'
import { getImage } from '../data/images.js'
import { coordinates } from '../data/coordinates.js'

const buildStaticAxes = () =>
  staticAxes.map((axis) => ({
    key: axis.key,
    road: axis.road,
    title: axis.title,
    pitch: axis.pitch,
    vehicleHint: axis.vehicleHint,
    accent: axis.accent,
    sites: axis.sites.map((site) => ({
      id: site.imgKey,
      name: site.name,
      badge: site.badge,
      description: site.description,
      tags: site.tags || [],
      image: getImage(site.imgKey, 1200),
      lat: coordinates[site.imgKey]?.lat ?? null,
      lng: coordinates[site.imgKey]?.lng ?? null,
    })),
  }))

const axesData = ref(buildStaticAxes())
const loading = ref(false)
const usingFallback = ref(true)

const mapAxisRow = (axisRow, siteRows) => ({
  key: axisRow.key,
  road: { fr: axisRow.road_fr, en: axisRow.road_en },
  title: { fr: axisRow.title_fr, en: axisRow.title_en },
  pitch: { fr: axisRow.pitch_fr, en: axisRow.pitch_en },
  vehicleHint: { fr: axisRow.vehicle_hint_fr, en: axisRow.vehicle_hint_en },
  accent: axisRow.accent,
  sites: siteRows
    .filter((site) => site.axis_key === axisRow.key)
    .map((site) => ({
      id: site.id,
      name: site.name,
      badge: { fr: site.badge_fr, en: site.badge_en },
      description: { fr: site.description_fr, en: site.description_en },
      tags: site.tags || [],
      image: site.image_url || '',
      lat: site.lat,
      lng: site.lng,
    })),
})

export async function fetchAxesData() {
  if (!isSupabaseConfigured) {
    usingFallback.value = true
    return
  }

  loading.value = true
  try {
    const [{ data: axisRows, error: axesError }, { data: siteRows, error: sitesError }] = await Promise.all([
      supabase.from('axes').select('*').order('position'),
      supabase.from('sites').select('*').order('position'),
    ])

    if (axesError || sitesError || !axisRows?.length) {
      usingFallback.value = true
      return
    }

    axesData.value = axisRows.map((axisRow) => mapAxisRow(axisRow, siteRows || []))
    usingFallback.value = false
  } catch {
    usingFallback.value = true
  } finally {
    loading.value = false
  }
}

export async function createSite(payload) {
  const { error } = await supabase.from('sites').insert({
    axis_key: payload.axisKey,
    name: payload.name,
    badge_fr: payload.badgeFr,
    badge_en: payload.badgeEn,
    description_fr: payload.descriptionFr,
    description_en: payload.descriptionEn,
    tags: payload.tags,
    image_url: payload.image || null,
    lat: payload.lat,
    lng: payload.lng,
    position: payload.position ?? 999,
  })
  if (error) throw error
  await fetchAxesData()
}

export async function updateSite(id, payload) {
  const { error } = await supabase
    .from('sites')
    .update({
      axis_key: payload.axisKey,
      name: payload.name,
      badge_fr: payload.badgeFr,
      badge_en: payload.badgeEn,
      description_fr: payload.descriptionFr,
      description_en: payload.descriptionEn,
      tags: payload.tags,
      image_url: payload.image || null,
      lat: payload.lat,
      lng: payload.lng,
    })
    .eq('id', id)
  if (error) throw error
  await fetchAxesData()
}

export async function deleteSite(id) {
  const { error } = await supabase.from('sites').delete().eq('id', id)
  if (error) throw error
  await fetchAxesData()
}

export async function updateAxisText(key, payload) {
  const { error } = await supabase
    .from('axes')
    .update({
      road_fr: payload.roadFr,
      road_en: payload.roadEn,
      title_fr: payload.titleFr,
      title_en: payload.titleEn,
      pitch_fr: payload.pitchFr,
      pitch_en: payload.pitchEn,
      vehicle_hint_fr: payload.vehicleHintFr,
      vehicle_hint_en: payload.vehicleHintEn,
    })
    .eq('key', key)
  if (error) throw error
  await fetchAxesData()
}

export function useSitesData() {
  return { axesData, loading, usingFallback, fetchAxesData, createSite, updateSite, deleteSite, updateAxisText }
}
