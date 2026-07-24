<script setup>
import { computed, onMounted, ref } from 'vue'
import { CalendarDays, Car, Fuel, Luggage, Route, Users } from 'lucide-vue-next'
import { useVehiclesData } from '../composables/useVehiclesData.js'
import { useI18n, useCurrency } from '../composables/useI18n.js'
import { useBooking } from '../composables/useBooking.js'
import { cardSrcset } from '../lib/responsiveImage.js'

const { t, pick } = useI18n()
const { formatMGA, formatForeign } = useCurrency()
const { chooseVehicle } = useBooking()
const { vehiclesData, fetchVehiclesData } = useVehiclesData()

onMounted(fetchVehiclesData)

const selectedType = ref('all')

const typeLabels = computed(() => {
  const seen = new Map()
  vehiclesData.value.forEach((vehicle) => {
    if (!seen.has(vehicle.type.fr)) seen.set(vehicle.type.fr, vehicle.type)
  })
  return [{ key: 'all', label: pick({ fr: 'Tous', en: 'All' }) }, ...[...seen.entries()].map(([key, type]) => ({ key, label: pick(type) }))]
})

const filteredVehicles = computed(() => {
  if (selectedType.value === 'all') return vehiclesData.value
  return vehiclesData.value.filter((vehicle) => vehicle.type.fr === selectedType.value)
})
</script>

<template>
  <section id="voitures" class="bg-white py-16">
    <div class="section-shell">
      <div class="mb-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div>
          <p class="text-sm font-bold uppercase text-clay">{{ t('fleetSection.kicker') }}</p>
          <h2 class="font-display mt-2 text-3xl font-semibold sm:text-4xl">{{ t('fleetSection.title') }}</h2>
        </div>
        <label>
          <span class="label">{{ t('fleetSection.filterLabel') }}</span>
          <select v-model="selectedType" class="field">
            <option v-for="type in typeLabels" :key="type.key" :value="type.key">{{ type.label }}</option>
          </select>
        </label>
      </div>

      <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="vehicle in filteredVehicles"
          :key="vehicle.id"
          class="overflow-hidden rounded-lg border border-stone-200 bg-[#fbfaf6] shadow-sm"
        >
          <img
            v-if="vehicle.image"
            :src="cardSrcset(vehicle.image).src"
            :srcset="cardSrcset(vehicle.image).srcset"
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            :alt="vehicle.name"
            class="photo h-48 w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div v-else class="flex h-48 w-full items-center justify-center bg-gradient-to-br from-stone-700 to-ink">
            <Car class="h-10 w-10 text-white/80" aria-hidden="true" />
          </div>
          <div class="p-5">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-xl font-black">{{ vehicle.name }}</h3>
                <p class="mt-1 text-sm font-semibold text-clay">{{ pick(vehicle.type) }}</p>
              </div>
              <span class="rounded bg-canopy/10 px-2 py-1 text-xs font-bold text-canopy">
                {{ vehicle.available }} {{ t('fleetSection.available') }}
              </span>
            </div>
            <dl class="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div class="flex items-center gap-2">
                <Users class="h-4 w-4 text-stone-500" aria-hidden="true" />
                {{ vehicle.seats }} {{ t('fleetSection.seats') }}
              </div>
              <div class="flex items-center gap-2">
                <Luggage class="h-4 w-4 text-stone-500" aria-hidden="true" />
                {{ vehicle.bags }} {{ t('fleetSection.bags') }}
              </div>
              <div class="flex items-center gap-2">
                <Fuel class="h-4 w-4 text-stone-500" aria-hidden="true" />
                {{ pick(vehicle.fuel) }}
              </div>
              <div class="flex items-center gap-2">
                <Route class="h-4 w-4 text-stone-500" aria-hidden="true" />
                {{ pick(vehicle.terrain) }}
              </div>
            </dl>
            <div class="mt-5 flex items-center justify-between gap-4 border-t border-stone-200 pt-4">
              <div>
                <p class="text-xs font-semibold uppercase text-stone-500">{{ t('fleetSection.from') }}</p>
                <p class="text-xl font-black">{{ formatMGA(vehicle.rate) }}{{ t('fleetSection.perDay') }}</p>
                <p class="text-xs font-semibold text-lagoon">{{ formatForeign(vehicle.rate) }}{{ t('fleetSection.perDay') }}</p>
              </div>
              <button
                type="button"
                class="focus-ring inline-flex items-center gap-2 rounded-md bg-ink px-4 py-3 text-sm font-bold text-white hover:bg-stone-800"
                @click="chooseVehicle(vehicle.id)"
              >
                <CalendarDays class="h-4 w-4" aria-hidden="true" />
                {{ t('fleetSection.book') }}
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
