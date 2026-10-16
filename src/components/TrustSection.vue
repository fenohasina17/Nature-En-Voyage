<script setup>
import { BadgeCheck, Coins, TreePine, Users } from 'lucide-vue-next'
import { useI18n } from '../composables/useI18n.js'

const { t } = useI18n()

const items = [
  { icon: TreePine, titleKey: 'trust.item1title', textKey: 'trust.item1' },
  { icon: Users, titleKey: 'trust.item2title', textKey: 'trust.item2' },
  { icon: BadgeCheck, titleKey: 'trust.item3title', textKey: 'trust.item3' },
  { icon: Coins, titleKey: 'trust.item4title', textKey: 'trust.item4' },
]
</script>

<template>
  <section class="border-b border-stone-200 bg-white py-16">
    <div class="section-shell">
      <div class="mb-10 max-w-3xl">
        <p class="text-sm font-bold uppercase text-canopy">{{ t('trust.kicker') }}</p>
        <h2 class="font-display mt-2 text-3xl font-semibold sm:text-4xl">{{ t('trust.title') }}</h2>
      </div>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div v-for="item in items" :key="item.titleKey" class="rounded-2xl border border-stone-200 bg-[#fbfaf6] p-5">
          <component :is="item.icon" class="h-8 w-8 text-canopy" aria-hidden="true" />
          <h3 class="mt-4 text-lg font-black">{{ t(item.titleKey) }}</h3>
          <p class="mt-3 text-sm leading-6 text-stone-700">{{ t(item.textKey) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
