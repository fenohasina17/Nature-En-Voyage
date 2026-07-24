<script setup>
import { computed, onMounted, ref } from 'vue'
import { Leaf, MapPin, Navigation, Route, Search } from 'lucide-vue-next'
import { useSitesData } from '../composables/useSitesData.js'
import { useI18n } from '../composables/useI18n.js'
import { cardSrcset } from '../lib/responsiveImage.js'

const { t, pick } = useI18n()
const { axesData, fetchAxesData } = useSitesData()

onMounted(fetchAxesData)

const selectedAxisKey = ref('')
const search = ref('')

const currentAxis = computed(
  () => axesData.value.find((axis) => axis.key === selectedAxisKey.value) || axesData.value[0],
)

const filteredSites = computed(() => {
  if (!currentAxis.value) return []
  const query = search.value.trim().toLowerCase()
  if (!query) return currentAxis.value.sites

  return currentAxis.value.sites.filter((site) => {
    const haystack = [site.name, pick(site.description), pick(site.badge), ...(site.tags || [])]
      .join(' ')
      .toLowerCase()
    return haystack.includes(query)
  })
})

const googleMapsUrl = (site) => `https://www.google.com/maps/search/?api=1&query=${site.lat},${site.lng}`
</script>

<template>
  <section id="axes" class="py-16">
    <div class="section-shell">
      <div class="mb-8 max-w-3xl">
        <p class="text-sm font-bold uppercase text-lagoon">{{ t('axesSection.kicker') }}</p>
        <h2 class="font-display mt-2 text-3xl font-semibold sm:text-4xl">{{ t('axesSection.title') }}</h2>
        <p class="mt-4 leading-7 text-stone-700">{{ t('axesSection.subtitle') }}</p>
      </div>

      <div class="mb-6 flex flex-wrap gap-2">
        <button
          v-for="axis in axesData"
          :key="axis.key"
          type="button"
          class="focus-ring rounded-full border px-4 py-2 text-sm font-bold transition"
          :class="
            axis.key === (currentAxis && currentAxis.key)
              ? 'border-canopy bg-canopy text-white'
              : 'border-stone-300 bg-white text-stone-700 hover:border-canopy hover:text-canopy'
          "
          @click="selectedAxisKey = axis.key"
        >
          {{ pick(axis.road) }}
        </button>
      </div>

      <div v-if="currentAxis" class="mb-8 rounded-lg border border-stone-200 bg-[#fbfaf6] p-5">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 class="text-2xl font-black">{{ pick(currentAxis.title) }}</h3>
            <p class="mt-2 max-w-2xl text-sm leading-6 text-stone-700">{{ pick(currentAxis.pitch) }}</p>
          </div>
          <div class="flex items-center gap-3">
            <span class="whitespace-nowrap rounded bg-canopy/10 px-3 py-2 text-sm font-bold text-canopy">
              {{ pick(currentAxis.vehicleHint) }}
            </span>
            <span class="whitespace-nowrap rounded bg-stone-200 px-3 py-2 text-sm font-bold text-stone-700">
              {{ currentAxis.sites.length }} {{ t('axesSection.sitesCount') }}
            </span>
          </div>
        </div>

        <label class="mt-4 block max-w-sm">
          <span class="relative block">
            <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
            <input v-model="search" class="field pl-9" placeholder="baobabs, lemuriens, plage..." />
          </span>
        </label>
      </div>

      <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="site in filteredSites"
          :key="site.id"
          class="overflow-hidden rounded-lg border border-stone-200 bg-[#fbfaf6] shadow-sm"
        >
          <img
            v-if="site.image"
            :src="cardSrcset(site.image).src"
            :srcset="cardSrcset(site.image).srcset"
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            :alt="site.name"
            class="photo h-52 w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div
            v-else
            class="flex h-52 w-full items-center justify-center bg-gradient-to-br from-canopy to-ink px-4 text-center"
          >
            <div class="text-white/90">
              <Leaf class="mx-auto h-8 w-8" aria-hidden="true" />
              <p class="mt-2 text-sm font-bold">{{ site.name }}</p>
            </div>
          </div>
          <div class="p-5">
            <span class="rounded bg-clay/10 px-2 py-1 text-xs font-bold text-clay">
              {{ pick(site.badge) }}
            </span>
            <h3 class="mt-4 text-xl font-black">{{ site.name }}</h3>
            <p class="mt-3 text-sm leading-6 text-stone-700">{{ pick(site.description) }}</p>
            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="tag in site.tags"
                :key="tag"
                class="inline-flex items-center gap-1 rounded bg-stone-100 px-2 py-1 text-xs font-semibold text-stone-600"
              >
                <MapPin class="h-3 w-3" aria-hidden="true" />
                {{ tag }}
              </span>
            </div>
            <a
              v-if="site.lat && site.lng"
              :href="googleMapsUrl(site)"
              target="_blank"
              rel="noreferrer"
              class="focus-ring mt-4 flex flex-wrap items-center justify-between gap-x-2 gap-y-1 rounded-md border border-stone-200 px-3 py-2 text-xs font-semibold text-stone-600 transition hover:border-canopy hover:text-canopy"
            >
              <span class="flex min-w-0 items-center gap-2">
                <Navigation class="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span class="truncate">{{ site.lat.toFixed(4) }}, {{ site.lng.toFixed(4) }}</span>
              </span>
              <span class="shrink-0 font-bold">{{ t('axesSection.openMaps') }}</span>
            </a>
          </div>
        </article>
      </div>

      <p v-if="!filteredSites.length" class="rounded-md border border-dashed border-stone-300 p-6 text-center text-sm text-stone-500">
        <Route class="mx-auto mb-2 h-5 w-5" aria-hidden="true" />
        —
      </p>
    </div>
  </section>
</template>
