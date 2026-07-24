<script setup>
import { onMounted } from 'vue'
import { CheckCircle2, Mail, MessageCircle } from 'lucide-vue-next'
import { useSitesData } from '../composables/useSitesData.js'
import { useVehiclesData } from '../composables/useVehiclesData.js'
import { useI18n, useCurrency } from '../composables/useI18n.js'
import { useBooking } from '../composables/useBooking.js'

const { t, pick } = useI18n()
const { formatMGA, formatForeign } = useCurrency()
const { axesData, fetchAxesData } = useSitesData()
const { vehiclesData, fetchVehiclesData } = useVehiclesData()
const {
  booking,
  confirmation,
  bookingError,
  selectedVehicle,
  rentalDays,
  selectedExtras,
  bookingTotal,
  submitBooking,
  buildBookingMessage,
} = useBooking()

onMounted(() => {
  fetchAxesData()
  fetchVehiclesData()
})

const today = new Date().toISOString().slice(0, 10)

const whatsappUrl = () =>
  `https://wa.me/261380769499?text=${encodeURIComponent(
    `Bonjour, je souhaite reserver un trajet avec Nature en Voyage.\n\n${buildBookingMessage(t, pick)}`,
  )}`

const mailUrl = () =>
  `mailto:natureenvoyage@gmail.com?subject=${encodeURIComponent('Reservation Nature en Voyage')}&body=${encodeURIComponent(buildBookingMessage(t, pick))}`
</script>

<template>
  <section id="booking" class="py-16">
    <div class="section-shell grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
      <div class="lg:sticky lg:top-28">
        <p class="text-sm font-bold uppercase text-canopy">{{ t('bookingSection.kicker') }}</p>
        <h2 class="font-display mt-2 text-3xl font-semibold sm:text-4xl">{{ t('bookingSection.title') }}</h2>
        <p class="mt-4 max-w-md leading-7 text-stone-700">{{ t('bookingSection.subtitle') }}</p>
        <p class="mt-6 inline-flex items-center gap-2 rounded-full bg-canopy/10 px-4 py-2 text-sm font-bold text-canopy">
          {{ t('bookingSection.note') }}
        </p>
      </div>

      <div class="rounded-lg bg-white p-4 text-ink shadow-crisp sm:p-6">
        <div class="mb-5 flex items-start justify-between gap-4">
          <h3 class="text-xl font-black">{{ t('bookingForm.title') }}</h3>
          <span class="rounded bg-stone-100 px-2 py-1 text-xs font-bold text-stone-700">
            {{ t('bookingForm.quote') }}
          </span>
        </div>

        <form class="space-y-4" @submit.prevent="submitBooking(t)">
          <div class="grid gap-3 sm:grid-cols-2">
            <label>
              <span class="label">{{ t('bookingForm.pickup') }}</span>
              <select v-model="booking.pickup" class="field">
                <option>Ivato Aeroport</option>
                <option>Antananarivo centre</option>
                <option>Antsirabe</option>
                <option>Morondava</option>
                <option>Diego Suarez</option>
                <option>Toamasina</option>
                <option>Toliara</option>
              </select>
            </label>
            <label>
              <span class="label">{{ t('bookingForm.dropoff') }}</span>
              <select v-model="booking.dropoff" class="field">
                <option>Ivato Aeroport</option>
                <option>Antananarivo centre</option>
                <option>Antsirabe</option>
                <option>Morondava</option>
                <option>Diego Suarez</option>
                <option>Toamasina</option>
                <option>Toliara</option>
              </select>
            </label>
          </div>

          <div class="grid gap-3 sm:grid-cols-2">
            <label>
              <span class="label">{{ t('bookingForm.startDate') }}</span>
              <input v-model="booking.startDate" :min="today" type="date" class="field" />
            </label>
            <label>
              <span class="label">{{ t('bookingForm.endDate') }}</span>
              <input v-model="booking.endDate" :min="booking.startDate" type="date" class="field" />
            </label>
          </div>

          <div class="grid gap-3 sm:grid-cols-2">
            <label>
              <span class="label">{{ t('bookingForm.axis') }}</span>
              <select v-model="booking.axis" class="field">
                <option v-for="axis in axesData" :key="axis.key" :value="axis.key">
                  {{ pick(axis.title) }}
                </option>
              </select>
            </label>
            <label>
              <span class="label">{{ t('bookingForm.vehicle') }}</span>
              <select v-model="booking.vehicleId" class="field">
                <option v-for="vehicle in vehiclesData" :key="vehicle.id" :value="vehicle.id">
                  {{ vehicle.name }} - {{ pick(vehicle.type) }}
                </option>
              </select>
            </label>
          </div>

          <div class="grid gap-2 sm:grid-cols-2">
            <label class="flex items-center gap-3 rounded-md border border-stone-200 bg-stone-50 p-3 text-sm">
              <input v-model="booking.driver" type="checkbox" class="h-4 w-4 accent-canopy" />
              {{ t('bookingForm.driver') }}
            </label>
            <label class="flex items-center gap-3 rounded-md border border-stone-200 bg-stone-50 p-3 text-sm">
              <input v-model="booking.protection" type="checkbox" class="h-4 w-4 accent-canopy" />
              {{ t('bookingForm.protection') }}
            </label>
            <label class="flex items-center gap-3 rounded-md border border-stone-200 bg-stone-50 p-3 text-sm">
              <input v-model="booking.childSeat" type="checkbox" class="h-4 w-4 accent-canopy" />
              {{ t('bookingForm.childSeat') }}
            </label>
            <label class="flex items-center gap-3 rounded-md border border-stone-200 bg-stone-50 p-3 text-sm">
              <input v-model="booking.roofRack" type="checkbox" class="h-4 w-4 accent-canopy" />
              {{ t('bookingForm.roofRack') }}
            </label>
          </div>

          <div class="grid gap-3 sm:grid-cols-2">
            <label>
              <span class="label">{{ t('bookingForm.name') }}</span>
              <input v-model="booking.name" type="text" class="field" :placeholder="t('bookingForm.namePlaceholder')" />
            </label>
            <label>
              <span class="label">{{ t('bookingForm.phone') }}</span>
              <input v-model="booking.phone" type="tel" class="field" :placeholder="t('bookingForm.phonePlaceholder')" />
            </label>
          </div>

          <label>
            <span class="label">{{ t('bookingForm.email') }}</span>
            <input v-model="booking.email" type="email" class="field" :placeholder="t('bookingForm.emailPlaceholder')" />
          </label>

          <label>
            <span class="label">{{ t('bookingForm.notes') }}</span>
            <textarea
              v-model="booking.notes"
              class="field min-h-20 resize-y"
              :placeholder="t('bookingForm.notesPlaceholder')"
            ></textarea>
          </label>

          <div class="border-y border-stone-200 py-4">
            <div class="flex items-center justify-between text-sm">
              <span>{{ selectedVehicle.name }} x {{ rentalDays }} {{ t('bookingForm.days') }}</span>
              <strong>{{ formatMGA(selectedVehicle.rate * rentalDays) }}</strong>
            </div>
            <div
              v-for="extra in selectedExtras"
              :key="extra.key"
              class="mt-2 flex items-center justify-between text-sm text-stone-600"
            >
              <span>{{ t(`bookingForm.${extra.key}`) }}</span>
              <span>{{ formatMGA(extra.amount) }}</span>
            </div>
            <div
              v-if="booking.pickup !== booking.dropoff"
              class="mt-2 flex items-center justify-between text-sm text-stone-600"
            >
              <span>{{ t('bookingForm.differentDropoff') }}</span>
              <span>{{ formatMGA(80000) }}</span>
            </div>
            <div class="mt-4 flex items-end justify-between">
              <span class="text-sm font-semibold text-stone-600">{{ t('bookingForm.total') }}</span>
              <strong class="text-2xl">{{ formatMGA(bookingTotal) }}</strong>
            </div>
            <p class="mt-1 text-right text-sm font-semibold text-lagoon">{{ formatForeign(bookingTotal) }}</p>
            <p class="mt-1 text-right text-xs text-stone-500">{{ t('bookingForm.currencyNote') }}</p>
          </div>

          <p v-if="bookingError" class="rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
            {{ bookingError }}
          </p>

          <div
            v-if="confirmation"
            class="rounded-md border border-canopy/30 bg-canopy/10 px-3 py-3 text-sm text-canopy"
          >
            <div class="flex items-center gap-2 font-bold">
              <CheckCircle2 class="h-5 w-5" aria-hidden="true" />
              {{ t('bookingForm.confirmedPrefix') }} {{ confirmation.reference }}
            </div>
            <p class="mt-1">
              {{ confirmation.vehicle }} - {{ formatMGA(confirmation.amount) }}
            </p>
          </div>

          <div class="grid gap-3 sm:grid-cols-3">
            <button
              type="submit"
              class="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-canopy px-4 py-3 font-bold text-white transition hover:bg-[#184f3d] sm:col-span-1"
            >
              <CheckCircle2 class="h-5 w-5" aria-hidden="true" />
              {{ t('bookingForm.submit') }}
            </button>
            <a
              :href="whatsappUrl()"
              target="_blank"
              rel="noreferrer"
              class="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-lagoon px-4 py-3 font-bold text-lagoon transition hover:bg-lagoon/10"
            >
              <MessageCircle class="h-5 w-5" aria-hidden="true" />
              {{ t('bookingForm.whatsapp') }}
            </a>
            <a
              :href="mailUrl()"
              class="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 px-4 py-3 font-bold transition hover:bg-stone-100"
            >
              <Mail class="h-5 w-5" aria-hidden="true" />
              {{ t('bookingForm.emailBtn') }}
            </a>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
