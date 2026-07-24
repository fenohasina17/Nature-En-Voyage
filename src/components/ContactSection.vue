<script setup>
import { Mail, MessageCircle, Phone } from 'lucide-vue-next'
import { useI18n } from '../composables/useI18n.js'
import { useBooking } from '../composables/useBooking.js'

const { t, pick } = useI18n()
const { buildBookingMessage } = useBooking()

const whatsappUrl = () =>
  `https://wa.me/261349852252?text=${encodeURIComponent(
    `Bonjour, je souhaite reserver un trajet avec Nature en Voyage.\n\n${buildBookingMessage(t, pick)}`,
  )}`
</script>

<template>
  <section id="contact" class="bg-[#efe8dc] py-16">
    <div class="section-shell grid gap-8 lg:grid-cols-[1fr_420px]">
      <div>
        <p class="text-sm font-bold uppercase text-canopy">{{ t('contact.kicker') }}</p>
        <h2 class="font-display mt-2 text-3xl font-semibold sm:text-4xl">{{ t('contact.title') }}</h2>
        <p class="mt-4 max-w-2xl leading-7 text-stone-700">{{ t('contact.subtitle') }}</p>
      </div>

      <div class="rounded-lg border border-stone-300 bg-white p-5 shadow-sm">
        <a
          href="tel:+261349852252"
          class="focus-ring flex items-center gap-3 rounded-md border border-stone-200 px-4 py-3 font-bold hover:bg-stone-50"
        >
          <Phone class="h-5 w-5 text-canopy" aria-hidden="true" />
          +261 34 98 522 52
        </a>
        <a
          href="mailto:natureenvoyage@gmail.com"
          class="focus-ring mt-3 flex items-center gap-3 rounded-md border border-stone-200 px-4 py-3 font-bold hover:bg-stone-50"
        >
          <Mail class="h-5 w-5 text-clay" aria-hidden="true" />
          natureenvoyage@gmail.com
        </a>
        <a
          :href="whatsappUrl()"
          target="_blank"
          rel="noreferrer"
          class="focus-ring mt-3 flex items-center gap-3 rounded-md border border-lagoon px-4 py-3 font-bold text-lagoon hover:bg-lagoon/10"
        >
          <MessageCircle class="h-5 w-5" aria-hidden="true" />
          {{ t('contact.sendWhatsapp') }}
        </a>
      </div>
    </div>
  </section>
</template>
