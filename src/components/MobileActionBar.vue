<script setup>
import { CalendarDays, MessageCircle } from 'lucide-vue-next'
import { useI18n } from '../composables/useI18n.js'
import { useBooking } from '../composables/useBooking.js'

const { t, pick } = useI18n()
const { buildBookingMessage } = useBooking()

const whatsappUrl = () =>
  `https://wa.me/261349852252?text=${encodeURIComponent(
    `Bonjour, je souhaite planifier un voyage avec Nature en Voyage.\n\n${buildBookingMessage(t, pick)}`,
  )}`
</script>

<template>
  <div
    class="mobile-bar fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 border-t border-black/10 bg-white px-3 pt-3 shadow-[0_-8px_24px_rgba(23,33,29,0.12)] sm:hidden"
  >
    <a
      :href="whatsappUrl()"
      target="_blank"
      rel="noreferrer"
      class="focus-ring flex items-center justify-center gap-2 rounded-full bg-lagoon px-4 py-3 text-sm font-bold text-white"
    >
      <MessageCircle class="h-4 w-4" aria-hidden="true" />
      WhatsApp
    </a>
    <a
      href="#booking"
      class="focus-ring flex items-center justify-center gap-2 rounded-full bg-ember px-4 py-3 text-sm font-bold text-ink"
    >
      <CalendarDays class="h-4 w-4" aria-hidden="true" />
      {{ t('nav.cta') }}
    </a>
  </div>
</template>
