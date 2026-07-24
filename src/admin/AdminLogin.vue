<script setup>
import { ref } from 'vue'
import { LogIn, ShieldAlert } from 'lucide-vue-next'
import { useAuth } from '../composables/useAuth.js'

const { signIn, isSupabaseConfigured } = useAuth()

const email = ref('')
const password = ref('')
const error = ref('')
const submitting = ref(false)

const submit = async () => {
  error.value = ''
  submitting.value = true
  const result = await signIn(email.value.trim(), password.value)
  submitting.value = false
  if (result.error) error.value = result.error
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-[#f7f5ef] px-4">
    <div class="w-full max-w-sm rounded-lg border border-stone-200 bg-white p-6 shadow-crisp">
      <img src="/logo-nature-en-voyage.png" alt="Nature en Voyage" class="h-12 w-12 rounded-md bg-white object-contain p-1" />
      <h1 class="mt-4 text-xl font-black">Back-office</h1>
      <p class="mt-1 text-sm text-stone-600">Connexion reservee a l equipe Nature en Voyage.</p>

      <div v-if="!isSupabaseConfigured" class="mt-5 flex items-start gap-2 rounded-md bg-amber-50 p-3 text-sm text-amber-800">
        <ShieldAlert class="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <span>Supabase n est pas encore configure (fichier .env manquant). Voir les instructions de mise en route.</span>
      </div>

      <form v-else class="mt-5 space-y-3" @submit.prevent="submit">
        <label>
          <span class="label">Email</span>
          <input v-model="email" type="email" class="field" autocomplete="username" required />
        </label>
        <label>
          <span class="label">Mot de passe</span>
          <input v-model="password" type="password" class="field" autocomplete="current-password" required />
        </label>

        <p v-if="error" class="rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{{ error }}</p>

        <button
          type="submit"
          :disabled="submitting"
          class="focus-ring flex w-full items-center justify-center gap-2 rounded-md bg-canopy px-4 py-3 font-bold text-white hover:bg-[#184f3d] disabled:opacity-60"
        >
          <LogIn class="h-4 w-4" aria-hidden="true" />
          {{ submitting ? 'Connexion...' : 'Se connecter' }}
        </button>
      </form>
    </div>
  </div>
</template>
