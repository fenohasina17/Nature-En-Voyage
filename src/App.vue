<script setup>
import { CarFront, MessageCircle, Route, ShieldCheck } from 'lucide-vue-next'
import SiteHeader from './components/SiteHeader.vue'
import Hero from './components/Hero.vue'
import TrustSection from './components/TrustSection.vue'
import BookingSection from './components/BookingSection.vue'
import AxesSection from './components/AxesSection.vue'
import TestimonialsSection from './components/TestimonialsSection.vue'
import OffersSection from './components/OffersSection.vue'
import FleetSection from './components/FleetSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import MobileActionBar from './components/MobileActionBar.vue'
</script>

<template>
  <div id="top" class="min-h-screen bg-sand text-ink">
    <SiteHeader />

    <main>
      <Hero />

      <section class="border-b border-stone-200 bg-white py-5">
        <div class="section-shell grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div class="flex items-center gap-3">
            <Route class="h-5 w-5 text-clay" aria-hidden="true" />
            6 axes routiers, 39 sites
          </div>
          <div class="flex items-center gap-3">
            <CarFront class="h-5 w-5 text-canopy" aria-hidden="true" />
            Citadine, 4x4, van, minibus
          </div>
          <div class="flex items-center gap-3">
            <ShieldCheck class="h-5 w-5 text-lagoon" aria-hidden="true" />
            Chauffeur-guide bilingue
          </div>
          <div class="flex items-center gap-3">
            <MessageCircle class="h-5 w-5 text-ember" aria-hidden="true" />
            Booking WhatsApp ou email
          </div>
        </div>
      </section>

      <TrustSection />
      <AxesSection />
      <TestimonialsSection />
      <BookingSection />
      <OffersSection />
      <FleetSection />
      <ContactSection />
    </main>

    <div class="mobile-bar-spacer sm:hidden" aria-hidden="true"></div>

    <SiteFooter />

    <MobileActionBar />
  </div>
</template>
