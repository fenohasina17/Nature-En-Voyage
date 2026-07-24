<script setup>
import { onMounted, reactive, ref } from 'vue'
import { Car, Loader2, Pencil, Plus, Save, Trash2, Upload, X } from 'lucide-vue-next'
import { useVehiclesData, createVehicle, updateVehicle, deleteVehicle } from '../composables/useVehiclesData.js'
import { useImageUpload } from '../composables/useImageUpload.js'
import { useCurrency } from '../composables/useI18n.js'

const { vehiclesData, loading, usingFallback, fetchVehiclesData } = useVehiclesData()
const { uploading, uploadError, uploadImage } = useImageUpload()
const { formatMGA } = useCurrency()

onMounted(fetchVehiclesData)

const emptyForm = () => ({
  id: null,
  name: '',
  typeFr: '',
  typeEn: '',
  seats: 4,
  bags: 2,
  terrainFr: '',
  terrainEn: '',
  fuelFr: '',
  fuelEn: '',
  rate: 0,
  available: 1,
  image: '',
})

const form = reactive(emptyForm())
const formOpen = ref(false)
const saving = ref(false)
const formError = ref('')

const openCreate = () => {
  Object.assign(form, emptyForm())
  formOpen.value = true
  formError.value = ''
}

const openEdit = (vehicle) => {
  Object.assign(form, {
    id: vehicle.id,
    name: vehicle.name,
    typeFr: vehicle.type.fr,
    typeEn: vehicle.type.en,
    seats: vehicle.seats,
    bags: vehicle.bags,
    terrainFr: vehicle.terrain.fr,
    terrainEn: vehicle.terrain.en,
    fuelFr: vehicle.fuel.fr,
    fuelEn: vehicle.fuel.en,
    rate: vehicle.rate,
    available: vehicle.available,
    image: vehicle.image || '',
  })
  formOpen.value = true
  formError.value = ''
}

const cancelForm = () => {
  formOpen.value = false
  formError.value = ''
}

const onFileChange = async (event) => {
  const file = event.target.files?.[0]
  if (!file) return
  const url = await uploadImage(file, 'vehicles')
  if (url) form.image = url
  else formError.value = uploadError.value
}

const saveVehicle = async () => {
  if (!form.name.trim()) {
    formError.value = 'Le nom du vehicule est obligatoire.'
    return
  }

  saving.value = true
  formError.value = ''
  const payload = {
    name: form.name.trim(),
    typeFr: form.typeFr.trim(),
    typeEn: form.typeEn.trim(),
    seats: Number(form.seats) || 0,
    bags: Number(form.bags) || 0,
    terrainFr: form.terrainFr.trim(),
    terrainEn: form.terrainEn.trim(),
    fuelFr: form.fuelFr.trim(),
    fuelEn: form.fuelEn.trim(),
    rate: Number(form.rate) || 0,
    available: Number(form.available) || 0,
    image: form.image.trim(),
  }

  try {
    if (form.id) {
      await updateVehicle(form.id, payload)
    } else {
      await createVehicle({ ...payload, position: vehiclesData.value.length })
    }
    formOpen.value = false
  } catch (err) {
    formError.value = err.message || 'Erreur lors de l enregistrement'
  } finally {
    saving.value = false
  }
}

const removeVehicle = async (vehicle) => {
  if (!confirm(`Supprimer "${vehicle.name}" ?`)) return
  try {
    await deleteVehicle(vehicle.id)
  } catch (err) {
    alert(err.message || 'Erreur lors de la suppression')
  }
}
</script>

<template>
  <div>
    <div v-if="usingFallback" class="mb-4 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-800">
      Mode lecture seule : donnees statiques (Supabase non connecte ou vide). Les modifications ne seront pas sauvegardees tant que le back-office n est pas configure.
    </div>

    <div class="mb-4 flex items-center justify-between">
      <h4 class="text-base font-black">Flotte de vehicules</h4>
      <button
        type="button"
        class="focus-ring inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2 text-sm font-bold text-white hover:bg-stone-800"
        @click="openCreate"
      >
        <Plus class="h-4 w-4" aria-hidden="true" />
        Ajouter un vehicule
      </button>
    </div>

    <div v-if="formOpen" class="mb-6 rounded-lg border border-canopy/40 bg-white p-4 shadow-sm">
      <div class="mb-3 flex items-center justify-between">
        <h5 class="font-black">{{ form.id ? 'Modifier le vehicule' : 'Nouveau vehicule' }}</h5>
        <button type="button" class="rounded p-1 hover:bg-stone-100" @click="cancelForm"><X class="h-4 w-4" /></button>
      </div>

      <div class="grid gap-3 sm:grid-cols-2">
        <label class="sm:col-span-2"><span class="label">Nom du vehicule</span><input v-model="form.name" class="field" placeholder="Ex: Hyundai Starex 4x4" /></label>
        <label><span class="label">Type (FR)</span><input v-model="form.typeFr" class="field" placeholder="Van 4x4" /></label>
        <label><span class="label">Type (EN)</span><input v-model="form.typeEn" class="field" placeholder="4x4 Van" /></label>
        <label><span class="label">Places</span><input v-model="form.seats" type="number" min="1" class="field" /></label>
        <label><span class="label">Bagages</span><input v-model="form.bags" type="number" min="0" class="field" /></label>
        <label><span class="label">Terrain (FR)</span><input v-model="form.terrainFr" class="field" /></label>
        <label><span class="label">Terrain (EN)</span><input v-model="form.terrainEn" class="field" /></label>
        <label><span class="label">Carburant (FR)</span><input v-model="form.fuelFr" class="field" placeholder="Diesel" /></label>
        <label><span class="label">Carburant (EN)</span><input v-model="form.fuelEn" class="field" placeholder="Diesel" /></label>
        <label><span class="label">Prix / jour (Ariary)</span><input v-model="form.rate" type="number" min="0" step="1000" class="field" /></label>
        <label><span class="label">Disponibles</span><input v-model="form.available" type="number" min="0" class="field" /></label>

        <div class="sm:col-span-2">
          <span class="label">Photo</span>
          <div class="flex items-center gap-3">
            <img v-if="form.image" :src="form.image" alt="" class="h-16 w-24 rounded object-cover" />
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
          @click="saveVehicle"
        >
          <Save class="h-4 w-4" aria-hidden="true" />
          Enregistrer
        </button>
        <button type="button" class="rounded-md border border-stone-300 px-4 py-2 text-sm font-bold" @click="cancelForm">Annuler</button>
      </div>
    </div>

    <p v-if="loading" class="text-sm text-stone-500">Chargement...</p>

    <div class="grid gap-3 md:grid-cols-2">
      <article
        v-for="vehicle in vehiclesData"
        :key="vehicle.id"
        class="flex items-center gap-3 rounded-lg border border-stone-200 bg-white p-3"
      >
        <img v-if="vehicle.image" :src="vehicle.image" :alt="vehicle.name" class="h-16 w-20 shrink-0 rounded object-cover" />
        <div v-else class="flex h-16 w-20 shrink-0 items-center justify-center rounded bg-stone-100 text-stone-400">
          <Car class="h-5 w-5" aria-hidden="true" />
        </div>
        <div class="min-w-0 flex-1">
          <p class="truncate font-bold">{{ vehicle.name }}</p>
          <p class="truncate text-xs text-stone-500">{{ vehicle.type.fr }} · {{ formatMGA(vehicle.rate) }}/j · {{ vehicle.available }} dispo</p>
        </div>
        <div class="flex shrink-0 gap-2">
          <button type="button" class="rounded-md border border-stone-300 p-2 hover:bg-stone-50" @click="openEdit(vehicle)">
            <Pencil class="h-4 w-4" aria-hidden="true" />
          </button>
          <button type="button" class="rounded-md border border-red-200 p-2 text-red-600 hover:bg-red-50" @click="removeVehicle(vehicle)">
            <Trash2 class="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </article>
    </div>
  </div>
</template>
