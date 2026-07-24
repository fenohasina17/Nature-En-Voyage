<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { Loader2, MapPin, Pencil, Plus, Save, Trash2, Upload, X } from 'lucide-vue-next'
import { useSitesData, createSite, updateSite, deleteSite, updateAxisText } from '../composables/useSitesData.js'
import { useImageUpload } from '../composables/useImageUpload.js'

const { axesData, loading, usingFallback, fetchAxesData } = useSitesData()
const { uploading, uploadError, uploadImage } = useImageUpload()

onMounted(fetchAxesData)

const selectedAxisKey = ref('')
const currentAxis = computed(
  () => axesData.value.find((axis) => axis.key === selectedAxisKey.value) || axesData.value[0],
)

const axisForm = reactive({ roadFr: '', roadEn: '', titleFr: '', titleEn: '', pitchFr: '', pitchEn: '', vehicleHintFr: '', vehicleHintEn: '' })
const axisSaving = ref(false)
const showAxisEditor = ref(false)

const loadAxisForm = (axis) => {
  if (!axis) return
  axisForm.roadFr = axis.road.fr
  axisForm.roadEn = axis.road.en
  axisForm.titleFr = axis.title.fr
  axisForm.titleEn = axis.title.en
  axisForm.pitchFr = axis.pitch.fr
  axisForm.pitchEn = axis.pitch.en
  axisForm.vehicleHintFr = axis.vehicleHint.fr
  axisForm.vehicleHintEn = axis.vehicleHint.en
}

const selectAxis = (key) => {
  selectedAxisKey.value = key
  showAxisEditor.value = false
  cancelSiteForm()
  const axis = axesData.value.find((a) => a.key === key)
  loadAxisForm(axis)
}

const saveAxis = async () => {
  axisSaving.value = true
  try {
    await updateAxisText(currentAxis.value.key, axisForm)
    showAxisEditor.value = false
  } catch (err) {
    alert(err.message || 'Erreur lors de l enregistrement')
  } finally {
    axisSaving.value = false
  }
}

const emptyForm = () => ({
  id: null,
  axisKey: '',
  name: '',
  badgeFr: '',
  badgeEn: '',
  descriptionFr: '',
  descriptionEn: '',
  tagsText: '',
  image: '',
  lat: '',
  lng: '',
})

const siteForm = reactive(emptyForm())
const formOpen = ref(false)
const saving = ref(false)
const formError = ref('')

const openCreate = () => {
  Object.assign(siteForm, emptyForm())
  siteForm.axisKey = currentAxis.value.key
  formOpen.value = true
  formError.value = ''
}

const openEdit = (site) => {
  Object.assign(siteForm, {
    id: site.id,
    axisKey: currentAxis.value.key,
    name: site.name,
    badgeFr: site.badge.fr,
    badgeEn: site.badge.en,
    descriptionFr: site.description.fr,
    descriptionEn: site.description.en,
    tagsText: (site.tags || []).join(', '),
    image: site.image || '',
    lat: site.lat ?? '',
    lng: site.lng ?? '',
  })
  formOpen.value = true
  formError.value = ''
}

const cancelSiteForm = () => {
  formOpen.value = false
  formError.value = ''
}

const onFileChange = async (event) => {
  const file = event.target.files?.[0]
  if (!file) return
  const url = await uploadImage(file, 'sites')
  if (url) siteForm.image = url
  else formError.value = uploadError.value
}

const saveSite = async () => {
  if (!siteForm.name.trim()) {
    formError.value = 'Le nom du site est obligatoire.'
    return
  }

  saving.value = true
  formError.value = ''
  const payload = {
    axisKey: siteForm.axisKey,
    name: siteForm.name.trim(),
    badgeFr: siteForm.badgeFr.trim(),
    badgeEn: siteForm.badgeEn.trim(),
    descriptionFr: siteForm.descriptionFr.trim(),
    descriptionEn: siteForm.descriptionEn.trim(),
    tags: siteForm.tagsText
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean),
    image: siteForm.image.trim(),
    lat: siteForm.lat === '' ? null : Number(siteForm.lat),
    lng: siteForm.lng === '' ? null : Number(siteForm.lng),
  }

  try {
    if (siteForm.id) {
      await updateSite(siteForm.id, payload)
    } else {
      await createSite({ ...payload, position: currentAxis.value.sites.length })
    }
    formOpen.value = false
  } catch (err) {
    formError.value = err.message || 'Erreur lors de l enregistrement'
  } finally {
    saving.value = false
  }
}

const removeSite = async (site) => {
  if (!confirm(`Supprimer "${site.name}" ?`)) return
  try {
    await deleteSite(site.id)
  } catch (err) {
    alert(err.message || 'Erreur lors de la suppression')
  }
}
</script>

<template>
  <div>
    <div class="mb-4 flex flex-wrap gap-2">
      <button
        v-for="axis in axesData"
        :key="axis.key"
        type="button"
        class="rounded-full border px-4 py-2 text-sm font-bold transition"
        :class="
          axis.key === (currentAxis && currentAxis.key)
            ? 'border-canopy bg-canopy text-white'
            : 'border-stone-300 bg-white text-stone-700 hover:border-canopy'
        "
        @click="selectAxis(axis.key)"
      >
        {{ axis.road.fr }}
      </button>
    </div>

    <div v-if="usingFallback" class="mb-4 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-800">
      Mode lecture seule : donnees statiques (Supabase non connecte ou vide). Les modifications ne seront pas sauvegardees tant que le back-office n est pas configure.
    </div>

    <div v-if="currentAxis" class="mb-6 rounded-lg border border-stone-200 bg-[#fbfaf6] p-4">
      <div class="flex items-center justify-between gap-3">
        <div>
          <h3 class="text-lg font-black">{{ currentAxis.title.fr }}</h3>
          <p class="text-sm text-stone-600">{{ currentAxis.sites.length }} site(s)</p>
        </div>
        <button
          type="button"
          class="focus-ring inline-flex items-center gap-2 rounded-md border border-stone-300 px-3 py-2 text-sm font-bold hover:bg-white"
          @click="showAxisEditor = !showAxisEditor; if (showAxisEditor) loadAxisForm(currentAxis)"
        >
          <Pencil class="h-4 w-4" aria-hidden="true" />
          Modifier le texte de l axe
        </button>
      </div>

      <div v-if="showAxisEditor" class="mt-4 grid gap-3 border-t border-stone-200 pt-4 sm:grid-cols-2">
        <label><span class="label">Nom court (FR)</span><input v-model="axisForm.roadFr" class="field" /></label>
        <label><span class="label">Nom court (EN)</span><input v-model="axisForm.roadEn" class="field" /></label>
        <label><span class="label">Titre (FR)</span><input v-model="axisForm.titleFr" class="field" /></label>
        <label><span class="label">Titre (EN)</span><input v-model="axisForm.titleEn" class="field" /></label>
        <label class="sm:col-span-2"><span class="label">Description (FR)</span><textarea v-model="axisForm.pitchFr" class="field min-h-20"></textarea></label>
        <label class="sm:col-span-2"><span class="label">Description (EN)</span><textarea v-model="axisForm.pitchEn" class="field min-h-20"></textarea></label>
        <label><span class="label">Vehicule conseille (FR)</span><input v-model="axisForm.vehicleHintFr" class="field" /></label>
        <label><span class="label">Vehicule conseille (EN)</span><input v-model="axisForm.vehicleHintEn" class="field" /></label>
        <div class="sm:col-span-2">
          <button
            type="button"
            :disabled="axisSaving"
            class="focus-ring inline-flex items-center gap-2 rounded-md bg-canopy px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
            @click="saveAxis"
          >
            <Save class="h-4 w-4" aria-hidden="true" />
            Enregistrer
          </button>
        </div>
      </div>
    </div>

    <div class="mb-4 flex items-center justify-between">
      <h4 class="text-base font-black">Sites de cet axe</h4>
      <button
        type="button"
        class="focus-ring inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2 text-sm font-bold text-white hover:bg-stone-800"
        @click="openCreate"
      >
        <Plus class="h-4 w-4" aria-hidden="true" />
        Ajouter un site
      </button>
    </div>

    <div v-if="formOpen" class="mb-6 rounded-lg border border-canopy/40 bg-white p-4 shadow-sm">
      <div class="mb-3 flex items-center justify-between">
        <h5 class="font-black">{{ siteForm.id ? 'Modifier le site' : 'Nouveau site' }}</h5>
        <button type="button" class="rounded p-1 hover:bg-stone-100" @click="cancelSiteForm"><X class="h-4 w-4" /></button>
      </div>

      <div class="grid gap-3 sm:grid-cols-2">
        <label class="sm:col-span-2"><span class="label">Nom du site</span><input v-model="siteForm.name" class="field" /></label>
        <label><span class="label">Badge (FR)</span><input v-model="siteForm.badgeFr" class="field" /></label>
        <label><span class="label">Badge (EN)</span><input v-model="siteForm.badgeEn" class="field" /></label>
        <label class="sm:col-span-2"><span class="label">Description (FR)</span><textarea v-model="siteForm.descriptionFr" class="field min-h-20"></textarea></label>
        <label class="sm:col-span-2"><span class="label">Description (EN)</span><textarea v-model="siteForm.descriptionEn" class="field min-h-20"></textarea></label>
        <label class="sm:col-span-2"><span class="label">Tags (separes par des virgules)</span><input v-model="siteForm.tagsText" class="field" placeholder="foret, lemuriens, photo" /></label>
        <label><span class="label">Latitude</span><input v-model="siteForm.lat" type="number" step="any" class="field" /></label>
        <label><span class="label">Longitude</span><input v-model="siteForm.lng" type="number" step="any" class="field" /></label>

        <div class="sm:col-span-2">
          <span class="label">Photo</span>
          <div class="flex items-center gap-3">
            <img v-if="siteForm.image" :src="siteForm.image" alt="" class="h-16 w-24 rounded object-cover" />
            <label class="focus-ring inline-flex cursor-pointer items-center gap-2 rounded-md border border-stone-300 px-3 py-2 text-sm font-bold hover:bg-stone-50">
              <Loader2 v-if="uploading" class="h-4 w-4 animate-spin" aria-hidden="true" />
              <Upload v-else class="h-4 w-4" aria-hidden="true" />
              {{ uploading ? 'Envoi...' : 'Choisir une photo' }}
              <input type="file" accept="image/*" class="hidden" @change="onFileChange" />
            </label>
          </div>
        </div>
      </div>

      <p v-if="formError" class="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{{ formError }}</p>

      <div class="mt-4 flex gap-3">
        <button
          type="button"
          :disabled="saving"
          class="focus-ring inline-flex items-center gap-2 rounded-md bg-canopy px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
          @click="saveSite"
        >
          <Save class="h-4 w-4" aria-hidden="true" />
          Enregistrer
        </button>
        <button type="button" class="rounded-md border border-stone-300 px-4 py-2 text-sm font-bold" @click="cancelSiteForm">Annuler</button>
      </div>
    </div>

    <p v-if="loading" class="text-sm text-stone-500">Chargement...</p>

    <div v-if="currentAxis" class="grid gap-3 md:grid-cols-2">
      <article
        v-for="site in currentAxis.sites"
        :key="site.id"
        class="flex items-center gap-3 rounded-lg border border-stone-200 bg-white p-3"
      >
        <img v-if="site.image" :src="site.image" :alt="site.name" class="h-16 w-20 shrink-0 rounded object-cover" />
        <div v-else class="flex h-16 w-20 shrink-0 items-center justify-center rounded bg-stone-100 text-stone-400">
          <MapPin class="h-5 w-5" aria-hidden="true" />
        </div>
        <div class="min-w-0 flex-1">
          <p class="truncate font-bold">{{ site.name }}</p>
          <p class="truncate text-xs text-stone-500">{{ site.badge.fr }}</p>
        </div>
        <div class="flex shrink-0 gap-2">
          <button type="button" class="rounded-md border border-stone-300 p-2 hover:bg-stone-50" @click="openEdit(site)">
            <Pencil class="h-4 w-4" aria-hidden="true" />
          </button>
          <button type="button" class="rounded-md border border-red-200 p-2 text-red-600 hover:bg-red-50" @click="removeSite(site)">
            <Trash2 class="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </article>
    </div>
  </div>
</template>
