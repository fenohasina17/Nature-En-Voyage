<script setup>
import { Compass, Coins, Languages, MapPin, Route, Send } from 'lucide-vue-next'
import { getImage } from '../data/images.js'
import { useI18n } from '../composables/useI18n.js'

const { t } = useI18n()

const heroStyle = {
  '--hero-bg-mobile': `url('${getImage('baobabs', 900)}')`,
  '--hero-bg-desktop': `url('${getImage('baobabs', 1800)}')`,
}
</script>

<template>
  <section class="relative flex min-h-[100svh] items-end overflow-hidden pt-20 text-white sm:min-h-[92svh] sm:pt-24">
    <div
      class="hero-bg ken-burns photo absolute inset-0 bg-cover bg-center"
      :style="heroStyle"
      aria-hidden="true"
    ></div>
    <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" aria-hidden="true"></div>

    <div class="section-shell reveal-up relative max-w-3xl pb-24 sm:pb-16">
      <p class="mb-4 inline-flex rounded bg-white/15 px-3 py-2 text-sm font-semibold text-white">
        {{ t('hero.kicker') }}
      </p>
      <h1 class="font-display text-5xl font-semibold leading-[1.05] sm:text-6xl md:text-7xl">
        {{ t('hero.title') }}
      </h1>
      <p class="mt-5 max-w-2xl text-base leading-7 text-stone-100 sm:mt-6 sm:text-lg sm:leading-8">
        {{ t('hero.subtitle') }}
      </p>

      <div class="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
        <a
          href="#booking"
          class="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-ember px-6 py-4 font-bold text-ink transition hover:scale-[1.02] hover:bg-[#d99b38] sm:w-auto sm:py-3"
        >
          <Send class="h-5 w-5" aria-hidden="true" />
          {{ t('hero.ctaBooking') }}
        </a>
        <a
          href="#axes"
          class="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/70 px-6 py-4 font-bold text-white transition hover:bg-white/10 sm:w-auto sm:py-3"
        >
          <MapPin class="h-5 w-5" aria-hidden="true" />
          {{ t('hero.ctaAxes') }}
        </a>
      </div>

      <dl class="mt-8 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4">
        <div class="flex items-start gap-3 text-sm text-stone-100">
          <Route class="mt-0.5 h-5 w-5 shrink-0 text-ember" aria-hidden="true" />
          {{ t('hero.stat1') }}
        </div>
        <div class="flex items-start gap-3 text-sm text-stone-100">
          <Compass class="mt-0.5 h-5 w-5 shrink-0 text-ember" aria-hidden="true" />
          {{ t('hero.stat2') }}
        </div>
        <div class="flex items-start gap-3 text-sm text-stone-100">
          <Languages class="mt-0.5 h-5 w-5 shrink-0 text-ember" aria-hidden="true" />
          {{ t('hero.stat3') }}
        </div>
        <div class="flex items-start gap-3 text-sm text-stone-100">
          <Coins class="mt-0.5 h-5 w-5 shrink-0 text-ember" aria-hidden="true" />
          {{ t('hero.stat4') }}
        </div>
      </dl>
    </div>
  </section>
</template>
