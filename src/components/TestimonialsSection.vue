<script setup>
import { Quote, Star } from 'lucide-vue-next'
import { useI18n } from '../composables/useI18n.js'

const { t, isFr } = useI18n()

// PLACEHOLDER CONTENT — replace with real reviews (Google, TripAdvisor, WhatsApp
// thank-you messages) before launch. Structure/design only, quotes are illustrative.
const testimonials = [
  {
    initials: 'S.M.',
    origin: 'France',
    circuit: { fr: 'Circuit RN7, Isalo & Ranomafana', en: 'RN7 circuit, Isalo & Ranomafana' },
    quote: {
      fr: 'Notre chauffeur-guide connaissait chaque village sur la route. On a vecu Madagascar, pas juste traverse le pays.',
      en: 'Our driver-guide knew every village along the way. We experienced Madagascar, not just drove through it.',
    },
  },
  {
    initials: 'J.K.',
    origin: 'Germany',
    circuit: { fr: 'Ouest, Baobabs & Tsingy de Bemaraha', en: 'West, Baobabs & Tsingy de Bemaraha' },
    quote: {
      fr: 'Le 4x4 etait impeccable et le rythme du circuit parfaitement pense pour la piste. Une aventure sans stress logistique.',
      en: 'The 4x4 was spotless and the pace was perfectly judged for the track. An adventure with zero logistics stress.',
    },
  },
  {
    initials: 'A.R.',
    origin: 'United States',
    circuit: { fr: 'RN2, Andasibe & foret orientale', en: 'RN2, Andasibe & eastern rainforest' },
    quote: {
      fr: 'Entendre le chant de l indri au lever du jour, avec un guide qui parlait un anglais impeccable : un souvenir pour la vie.',
      en: 'Hearing the indri call at dawn, with a guide who spoke flawless English: a memory for life.',
    },
  },
]
</script>

<template>
  <section class="bg-ink py-16 text-white">
    <div class="section-shell">
      <div class="mb-10 max-w-2xl">
        <p class="text-sm font-bold uppercase text-ember">{{ t('testimonials.kicker') }}</p>
        <h2 class="font-display mt-2 text-3xl font-semibold sm:text-4xl">{{ t('testimonials.title') }}</h2>
      </div>

      <div class="grid gap-5 md:grid-cols-3">
        <article
          v-for="item in testimonials"
          :key="item.initials"
          class="reveal-up rounded-lg border border-white/10 bg-white/5 p-6"
        >
          <Quote class="h-6 w-6 text-ember" aria-hidden="true" />
          <p class="mt-4 text-sm leading-7 text-stone-100">{{ isFr ? item.quote.fr : item.quote.en }}</p>
          <div class="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ember/20 text-sm font-bold text-ember">
              {{ item.initials }}
            </span>
            <div class="min-w-0">
              <p class="flex items-center gap-1 text-sm font-bold">
                <Star v-for="n in 5" :key="n" class="h-3.5 w-3.5 fill-ember text-ember" aria-hidden="true" />
              </p>
              <p class="truncate text-xs text-stone-400">
                {{ item.origin }} · {{ isFr ? item.circuit.fr : item.circuit.en }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
