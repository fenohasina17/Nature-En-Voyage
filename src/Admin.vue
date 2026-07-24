<script setup>
import { ref } from 'vue'
import { LogOut, MapPinned, Car as CarIcon } from 'lucide-vue-next'
import { useAuth } from './composables/useAuth.js'
import AdminLogin from './admin/AdminLogin.vue'
import AdminSites from './admin/AdminSites.vue'
import AdminVehicles from './admin/AdminVehicles.vue'

const { session, authReady, signOut } = useAuth()
const tab = ref('sites')
</script>

<template>
  <div v-if="!authReady" class="flex min-h-screen items-center justify-center text-stone-500">
    Chargement...
  </div>

  <AdminLogin v-else-if="!session" />

  <div v-else class="min-h-screen bg-[#f7f5ef] text-ink">
    <header class="border-b border-stone-200 bg-white">
      <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <div class="flex items-center gap-3">
          <img src="/logo-nature-en-voyage.png" alt="" class="h-9 w-9 rounded bg-white object-contain p-1" />
          <div>
            <p class="text-sm font-black leading-none">Nature en Voyage</p>
            <p class="text-xs text-stone-500">Back-office</p>
          </div>
        </div>
        <button
          type="button"
          class="focus-ring inline-flex items-center gap-2 rounded-md border border-stone-300 px-3 py-2 text-sm font-bold hover:bg-stone-50"
          @click="signOut"
        >
          <LogOut class="h-4 w-4" aria-hidden="true" />
          Deconnexion
        </button>
      </div>
    </header>

    <nav class="border-b border-stone-200 bg-white">
      <div class="mx-auto flex max-w-5xl gap-1 px-4 sm:px-6">
        <button
          type="button"
          class="flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold transition"
          :class="tab === 'sites' ? 'border-canopy text-canopy' : 'border-transparent text-stone-500 hover:text-ink'"
          @click="tab = 'sites'"
        >
          <MapPinned class="h-4 w-4" aria-hidden="true" />
          Sites & circuits
        </button>
        <button
          type="button"
          class="flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold transition"
          :class="tab === 'vehicles' ? 'border-canopy text-canopy' : 'border-transparent text-stone-500 hover:text-ink'"
          @click="tab = 'vehicles'"
        >
          <CarIcon class="h-4 w-4" aria-hidden="true" />
          Vehicules & prix
        </button>
      </div>
    </nav>

    <main class="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <AdminSites v-if="tab === 'sites'" />
      <AdminVehicles v-else />
    </main>
  </div>
</template>
