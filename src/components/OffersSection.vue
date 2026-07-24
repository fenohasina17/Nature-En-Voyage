<script setup>
import { CarFront, Clock, Coins, Compass, ShieldCheck, Users } from 'lucide-vue-next'
import { axes } from '../data/axes.js'
import { useI18n } from '../composables/useI18n.js'

const { t, pick } = useI18n()

const offers = [
  {
    icon: ShieldCheck,
    title: { fr: 'Location avec chauffeur-guide', en: 'Rental with driver-guide' },
    detail: {
      fr: 'Chauffeur francophone et anglophone, aide a l itineraire, gestion carburant, peages, bacs et acces parcs.',
      en: 'French and English speaking driver, route planning help, fuel, tolls, ferries and park access handled for you.',
    },
    bestFor: { fr: 'Circuits RN7, Est, Nord, Ouest', en: 'RN7, East, North and West circuits' },
  },
  {
    icon: CarFront,
    title: { fr: 'Location sans chauffeur', en: 'Self-drive rental' },
    detail: {
      fr: 'Kia Pride ou Starex pour conducteurs autonomes, contrat clair, caution et assistance locale.',
      en: 'Kia Pride or Starex for self-driving guests, clear contract, deposit and local roadside assistance.',
    },
    bestFor: { fr: 'Ville, RN principales, courts sejours', en: 'City, main roads, short stays' },
  },
  {
    icon: Compass,
    title: { fr: '4x4 expedition', en: '4x4 expedition' },
    detail: {
      fr: 'Galloper, Terracan ou Pick-Up 4x4 avec kit piste, roue de secours et chauffeur habitue aux bacs.',
      en: 'Galloper, Terracan or 4x4 Pick-Up with track kit, spare wheel and a driver used to river ferries.',
    },
    bestFor: { fr: 'Bemaraha, pistes Ouest, Sud profond', en: 'Bemaraha, western tracks, deep South' },
  },
  {
    icon: Clock,
    title: { fr: 'Transfert aeroport et hotel', en: 'Airport & hotel transfers' },
    detail: {
      fr: 'Accueil a Ivato, navettes inter-villes, horaires de nuit et suivi de vol.',
      en: 'Ivato airport pickup, inter-city shuttles, night arrivals and flight tracking.',
    },
    bestFor: { fr: 'Arrivees, departs, business', en: 'Arrivals, departures, business trips' },
  },
  {
    icon: Users,
    title: { fr: 'Minibus et groupe', en: 'Minibus & groups' },
    detail: {
      fr: 'Mazda mini-bus ou Grand Starex, bagages, climatisation et gestion multi-etapes.',
      en: 'Mazda mini-bus or Grand Starex, luggage space, air conditioning and multi-stop planning.',
    },
    bestFor: { fr: 'Familles, ONG, seminaires', en: 'Families, NGOs, seminars' },
  },
  {
    icon: Coins,
    title: { fr: 'Location longue duree', en: 'Long-term rental' },
    detail: {
      fr: 'Forfaits semaine, mois, entreprise, entretien inclus et remplacement selon disponibilite.',
      en: 'Weekly, monthly and corporate packages, maintenance included and replacement subject to availability.',
    },
    bestFor: { fr: 'Missions, chantiers, expatriation', en: 'Missions, projects, expatriation' },
  },
]
</script>

<template>
  <section id="offres" class="bg-white py-16">
    <div class="section-shell">
      <div class="mb-8 max-w-3xl">
        <p class="text-sm font-bold uppercase text-canopy">{{ t('offersSection.kicker') }}</p>
        <h2 class="font-display mt-2 text-3xl font-semibold sm:text-4xl">{{ t('offersSection.title') }}</h2>
      </div>

      <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="offer in offers"
          :key="offer.title.fr"
          class="rounded-lg border border-stone-200 bg-[#fbfaf6] p-5 shadow-sm"
        >
          <component :is="offer.icon" class="h-8 w-8 text-clay" aria-hidden="true" />
          <h3 class="mt-4 text-xl font-black">{{ pick(offer.title) }}</h3>
          <p class="mt-3 text-sm leading-6 text-stone-700">{{ pick(offer.detail) }}</p>
          <p class="mt-4 rounded bg-stone-100 px-3 py-2 text-sm font-bold text-stone-700">
            {{ pick(offer.bestFor) }}
          </p>
        </article>
      </div>

      <div class="mt-10">
        <h3 class="mb-4 text-sm font-bold uppercase text-stone-500">{{ t('offersSection.circuitsTitle') }}</h3>
        <div class="grid gap-4 lg:grid-cols-3 xl:grid-cols-6">
          <a
            v-for="axis in axes"
            :key="axis.key"
            href="#axes"
            class="focus-ring rounded-lg border border-stone-200 bg-ink p-5 text-white shadow-sm transition hover:border-ember"
          >
            <p class="text-sm font-bold text-ember">{{ pick(axis.road) }}</p>
            <h4 class="mt-2 text-lg font-black leading-tight">{{ pick(axis.title) }}</h4>
            <p class="mt-3 rounded bg-white/10 px-3 py-2 text-xs font-bold">
              {{ pick(axis.vehicleHint) }}
            </p>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
