import { computed, ref } from 'vue'

const lang = ref('fr')

const dict = {
  fr: {
    nav: {
      axes: 'Circuits',
      offers: 'Offres',
      fleet: 'Voitures',
      booking: 'Booking',
      contact: 'Contact',
      cta: 'Réserver',
    },
    hero: {
      kicker: 'Location de voitures & circuits sur mesure a Madagascar',
      title: 'Nature en Voyage',
      subtitle:
        'Explorez Madagascar par la route : baobabs geants, tsingy de pierre, forets a lemuriens, plages du bout du monde. Une voiture, un chauffeur local, et l ile grandeur nature.',
      ctaBooking: 'Commencer mon voyage',
      ctaAxes: 'Decouvrir les circuits',
      stat1: '6 grands axes routiers couverts',
      stat2: '39 sites naturels et culturels',
      stat3: 'Chauffeurs-guides francophones et anglophones',
      stat4: 'Devis en Ariary, Euro et Dollar',
    },
    bookingSection: {
      kicker: 'Planifiez votre voyage',
      title: 'Un expert Madagascar vous repond sous 24h',
      subtitle:
        'Dites-nous vos dates, vos envies et le nombre de voyageurs : nous batissons votre itineraire avec vous, vehicule et chauffeur-guide inclus. L estimation ci-contre est un point de depart, pas un tarif fige.',
      note: 'Reponse humaine sous 24h, en francais ou en anglais',
    },
    trust: {
      kicker: 'Pourquoi voyager avec nous',
      title: 'Une agence locale qui connait chaque piste',
      item1title: 'Biodiversite unique au monde',
      item1: 'Plus de 90% des especes de Madagascar n existent nulle part ailleurs. Nos circuits sont concus pour vous emmener au plus pres, en respectant les parcs et les communautes.',
      item2title: 'Chauffeurs-guides experimentes',
      item2: 'Routes nationales, pistes de saison seche, bacs et franchissements de riviere : nos chauffeurs connaissent le terrain et parlent francais et anglais.',
      item3title: 'Flotte adaptee a chaque terrain',
      item3: 'Berlines, 4x4 et minibus entretenus, choisis selon votre circuit, du bitume de la RN7 aux pistes de l Ouest.',
      item4title: 'Reservation simple et transparente',
      item4: 'Devis instantane en Ariary avec equivalent Euro et Dollar, confirmation par WhatsApp ou email, sans surprise a l arrivee.',
    },
    axesSection: {
      kicker: 'Circuits par axe routier',
      title: 'Toute Madagascar, organisee par route',
      subtitle:
        'Chaque grand axe national ouvre sur un univers different : forets orientales humides, hautes terres artisanales, canyons du Sud, baobabs de l Ouest ou baies du Grand Nord. Choisissez un axe pour voir les sites que nous desservons.',
      sitesCount: 'sites',
      recommendedVehicle: 'Vehicule conseille',
      openMaps: 'Voir sur Google Maps',
    },
    offersSection: {
      kicker: 'Offres',
      title: 'Toute formule de location possible',
      circuitsTitle: 'Circuits types',
    },
    fleetSection: {
      kicker: 'Flotte disponible',
      title: 'Des voitures pretes pour vos trajets',
      filterLabel: 'Type de vehicule',
      seats: 'places',
      bags: 'bagages',
      from: 'A partir de',
      perDay: '/jour',
      available: 'dispo',
      book: 'Booker',
    },
    testimonials: {
      kicker: 'Ils sont partis avec nous',
      title: 'Des voyageurs qui ont vecu Madagascar autrement',
    },
    bookingForm: {
      title: 'Votre reservation',
      quote: 'Devis instantane',
      pickup: 'Depart',
      dropoff: 'Retour',
      startDate: 'Date debut',
      endDate: 'Date fin',
      axis: 'Axe / circuit vise',
      vehicle: 'Vehicule',
      driver: 'Chauffeur-guide',
      protection: 'Protection premium',
      childSeat: 'Siege enfant',
      roofRack: 'Galerie bagages',
      name: 'Nom',
      phone: 'Telephone',
      email: 'Email',
      notes: 'Notes trajet',
      notesPlaceholder: 'Ex: Isalo 4 jours, chauffeur francophone, 2 enfants',
      namePlaceholder: 'Votre nom',
      phonePlaceholder: '+261 ...',
      emailPlaceholder: 'contact@email.com',
      differentDropoff: 'Retour different',
      total: 'Total estime',
      error: 'Ajoutez au minimum votre nom et votre telephone pour confirmer la demande.',
      confirmedPrefix: 'Demande prete :',
      submit: 'Valider',
      whatsapp: 'WhatsApp',
      emailBtn: 'Email',
      days: 'jour(s)',
      currencyNote: 'Taux indicatif, confirme au moment de la reservation.',
    },
    contact: {
      kicker: 'Contact agence',
      title: 'Finalisez votre trajet avec l equipe',
      subtitle:
        'Le booking genere une demande claire avec dates, vehicule, trajet et budget estime. Notre equipe repond en francais et en anglais par WhatsApp, telephone ou email.',
      sendWhatsapp: 'Envoyer la demande WhatsApp',
    },
    footer: {
      rights: 'Nature en Voyage. Location de voitures de tourisme a Madagascar.',
      sources: 'Sources destinations :',
    },
  },
  en: {
    nav: {
      axes: 'Circuits',
      offers: 'Offers',
      fleet: 'Vehicles',
      booking: 'Booking',
      contact: 'Contact',
      cta: 'Book now',
    },
    hero: {
      kicker: 'Car rental & tailor-made circuits in Madagascar',
      title: 'Nature en Voyage',
      subtitle:
        'Explore Madagascar by road: giant baobabs, stone tsingy karst, lemur-filled rainforests, end-of-the-world beaches. One car, one local driver, and the whole island in front of you.',
      ctaBooking: 'Begin my journey',
      ctaAxes: 'Discover the circuits',
      stat1: '6 major road axes covered',
      stat2: '39 natural & cultural sites',
      stat3: 'French & English speaking driver-guides',
      stat4: 'Quotes in Ariary, Euro and Dollar',
    },
    bookingSection: {
      kicker: 'Plan your journey',
      title: 'A Madagascar expert replies within 24h',
      subtitle:
        'Tell us your dates, your interests and how many travellers: we build your itinerary together, vehicle and driver-guide included. The estimate alongside is a starting point, not a fixed price.',
      note: 'A human reply within 24h, in French or English',
    },
    trust: {
      kicker: 'Why travel with us',
      title: 'A local agency that knows every track',
      item1title: 'Biodiversity found nowhere else',
      item1: 'Over 90% of Madagascar species exist nowhere else on Earth. Our circuits are built to bring you close while respecting parks and local communities.',
      item2title: 'Experienced driver-guides',
      item2: 'National roads, dry-season tracks, river crossings by ferry: our drivers know the terrain and speak French and English.',
      item3title: 'Fleet matched to every terrain',
      item3: 'Sedans, 4x4s and minibuses, maintained and matched to your circuit, from the RN7 tarmac to the western tracks.',
      item4title: 'Simple, transparent booking',
      item4: 'Instant quote in Ariary with Euro and Dollar equivalent, confirmation by WhatsApp or email, no surprises on arrival.',
    },
    axesSection: {
      kicker: 'Circuits by road axis',
      title: 'All of Madagascar, organised by road',
      subtitle:
        'Each major national road opens onto a different world: humid eastern rainforest, artisanal highlands, southern canyons, western baobabs, or the bays of the far north. Pick an axis to see the sites we cover.',
      sitesCount: 'sites',
      recommendedVehicle: 'Recommended vehicle',
      openMaps: 'View on Google Maps',
    },
    offersSection: {
      kicker: 'Offers',
      title: 'Every kind of rental, covered',
      circuitsTitle: 'Signature circuits',
    },
    fleetSection: {
      kicker: 'Available fleet',
      title: 'Vehicles ready for your routes',
      filterLabel: 'Vehicle type',
      seats: 'seats',
      bags: 'bags',
      from: 'From',
      perDay: '/day',
      available: 'available',
      book: 'Book it',
    },
    testimonials: {
      kicker: 'Travellers who went with us',
      title: 'People who experienced Madagascar differently',
    },
    bookingForm: {
      title: 'Your reservation',
      quote: 'Instant quote',
      pickup: 'Pick-up',
      dropoff: 'Drop-off',
      startDate: 'Start date',
      endDate: 'End date',
      axis: 'Target axis / circuit',
      vehicle: 'Vehicle',
      driver: 'Driver-guide',
      protection: 'Premium protection',
      childSeat: 'Child seat',
      roofRack: 'Roof rack',
      name: 'Name',
      phone: 'Phone',
      email: 'Email',
      notes: 'Trip notes',
      notesPlaceholder: 'E.g. Isalo 4 days, English-speaking driver, 2 kids',
      namePlaceholder: 'Your name',
      phonePlaceholder: '+261 ...',
      emailPlaceholder: 'contact@email.com',
      differentDropoff: 'Different drop-off',
      total: 'Estimated total',
      error: 'Please add at least your name and phone number to confirm the request.',
      confirmedPrefix: 'Request ready:',
      submit: 'Confirm',
      whatsapp: 'WhatsApp',
      emailBtn: 'Email',
      days: 'day(s)',
      currencyNote: 'Indicative rate, confirmed at booking time.',
    },
    contact: {
      kicker: 'Contact the agency',
      title: 'Finalise your trip with our team',
      subtitle:
        'Booking generates a clear request with dates, vehicle, route and estimated budget. Our team answers in French and English by WhatsApp, phone or email.',
      sendWhatsapp: 'Send the WhatsApp request',
    },
    footer: {
      rights: 'Nature en Voyage. Tourist car rental in Madagascar.',
      sources: 'Destination sources:',
    },
  },
}

export function useI18n() {
  const t = (path) => {
    const parts = path.split('.')
    let node = dict[lang.value]
    for (const part of parts) {
      node = node?.[part]
    }
    return node ?? path
  }

  const pick = (bilingual) => bilingual?.[lang.value] ?? bilingual?.fr ?? ''

  const toggleLang = () => {
    lang.value = lang.value === 'fr' ? 'en' : 'fr'
  }

  const isFr = computed(() => lang.value === 'fr')

  return { lang, t, pick, toggleLang, isFr }
}

const RATE_EUR = 4750
const RATE_USD = 4400

export function useCurrency() {
  const formatMGA = (amount) =>
    new Intl.NumberFormat('fr-MG', {
      style: 'currency',
      currency: 'MGA',
      maximumFractionDigits: 0,
    }).format(amount)

  const formatForeign = (amount) => {
    const eur = Math.round(amount / RATE_EUR)
    const usd = Math.round(amount / RATE_USD)
    return `~${new Intl.NumberFormat('fr-FR').format(eur)} € / ~${new Intl.NumberFormat('en-US').format(usd)} $`
  }

  return { formatMGA, formatForeign }
}
