<script setup>
import { ref } from 'vue'
import { CalendarDays, Languages, Menu, X } from 'lucide-vue-next'
import { useI18n } from '../composables/useI18n.js'

const { t, lang, toggleLang } = useI18n()
const logoImage = '/logo-nature-en-voyage.png'
const menuOpen = ref(false)

const links = [
  { href: '#axes', key: 'nav.axes' },
  { href: '#offres', key: 'nav.offers' },
  { href: '#voitures', key: 'nav.fleet' },
  { href: '#booking', key: 'nav.booking' },
  { href: '#contact', key: 'nav.contact' },
]
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-ink/85 text-white backdrop-blur">
    <div class="section-shell flex h-16 items-center justify-between">
      <a href="#top" class="flex items-center gap-3 focus-ring rounded-md">
        <img
          :src="logoImage"
          alt="Nature en Voyage"
          class="h-12 w-12 rounded-md bg-white object-contain p-1 shadow-sm"
        />
        <span>
          <span class="block text-sm font-bold">Nature en Voyage</span>
          <span class="block text-xs text-stone-300">Madagascar road trips</span>
        </span>
      </a>

      <nav class="hidden items-center gap-6 text-sm font-medium text-stone-200 md:flex">
        <a v-for="link in links" :key="link.href" :href="link.href" class="hover:text-white">
          {{ t(link.key) }}
        </a>
      </nav>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="focus-ring inline-flex min-h-11 items-center gap-2 rounded-md border border-white/25 px-3 py-2 text-sm font-bold text-white hover:bg-white/10"
          :aria-label="lang === 'fr' ? 'Switch to English' : 'Passer en francais'"
          @click="toggleLang"
        >
          <Languages class="h-4 w-4" aria-hidden="true" />
          {{ lang === 'fr' ? 'EN' : 'FR' }}
        </button>

        <a
          href="#booking"
          class="focus-ring hidden items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-ink hover:bg-stone-100 sm:inline-flex"
        >
          <CalendarDays class="h-4 w-4" aria-hidden="true" />
          {{ t('nav.cta') }}
        </a>

        <button
          type="button"
          class="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/25 text-white hover:bg-white/10 md:hidden"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          @click="menuOpen = !menuOpen"
        >
          <component :is="menuOpen ? X : Menu" class="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>

    <nav
      v-if="menuOpen"
      class="border-t border-white/10 bg-ink/95 px-4 py-4 text-sm font-medium text-stone-200 md:hidden"
    >
      <a
        v-for="link in links"
        :key="link.href"
        :href="link.href"
        class="block rounded-md px-2 py-3 hover:bg-white/10 hover:text-white"
        @click="menuOpen = false"
      >
        {{ t(link.key) }}
      </a>
    </nav>
  </header>
</template>
