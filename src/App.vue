<script setup>
import { computed, reactive, ref } from 'vue'
import {
  CalendarDays,
  CarFront,
  CheckCircle2,
  Clock,
  CreditCard,
  Fuel,
  Luggage,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Route,
  Search,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Users,
} from 'lucide-vue-next'

const commonsImage = (file, width = 1200) =>
  `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}?width=${width}`

const logoImage = '/logo-nature-en-voyage.png'
const heroImage = commonsImage('Avenue of the Baobabs, central axis.jpg', 1600)

const provinces = [
  {
    name: 'Antananarivo',
    tone: 'Hautes terres',
    anchor: 'Tana, Ampefy, Mantasoa, Antsirabe',
    access: 'Berline ou SUV',
    pitch: 'Escapades courtes, lacs volcaniques, patrimoine royal et route RN7 vers le sud.',
  },
  {
    name: 'Toamasina',
    tone: 'Foret humide',
    anchor: 'Andasibe, Pangalanes, Foulpointe',
    access: 'SUV conseille',
    pitch: 'RN2 vers les forets a lemuriens, le canal des Pangalanes et les plages de la cote Est.',
  },
  {
    name: 'Fianarantsoa',
    tone: 'RN7 nature',
    anchor: 'Ambalavao, Ranomafana, Manakara',
    access: 'SUV ou minibus',
    pitch: 'Etapes culturelles, reserves communautaires et foret tropicale accessible depuis Fianarantsoa.',
  },
  {
    name: 'Toliara',
    tone: 'Sud solaire',
    anchor: 'Isalo, Zombitse, Ifaty, Tsimanampetsotsa',
    access: 'SUV ou 4x4',
    pitch: 'Grands paysages de gres, baobabs du sud, lagons et pistes seches selon saison.',
  },
  {
    name: 'Mahajanga',
    tone: 'Ouest aventure',
    anchor: 'Ankarafantsika, Baobabs, Bemaraha',
    access: 'SUV a 4x4',
    pitch: 'Forets seches, baobabs, pistes de Morondava et circuits 4x4 vers les Tsingy.',
  },
  {
    name: 'Antsiranana',
    tone: 'Nord panoramique',
    anchor: 'Diego Suarez, Ankarana, Montagne d Ambre, Nosy Be',
    access: 'SUV ou 4x4',
    pitch: 'Baies, tsingy, montagnes, routes RN6 et excursions entre terre, mer et iles.',
  },
]

const destinations = [
  {
    name: 'Parc Andasibe-Mantadia',
    province: 'Toamasina',
    region: 'Alaotra-Mangoro',
    distance: '150 km / 3-4 h depuis Tana',
    access: 'RN2 puis acces parc',
    vehicle: 'SUV conseille',
    season: 'Toute l annee, mieux mai-octobre',
    image: commonsImage('Andasibe-Mantadia National Park 2013 28.jpg'),
    tags: ['foret', 'lemuriens', 'week-end'],
  },
  {
    name: 'Parc National Isalo',
    province: 'Toliara',
    region: 'Ihorombe',
    distance: 'RN7 jusqu a Ranohira',
    access: 'Route nationale + circuits carrossables',
    vehicle: 'Berline robuste ou SUV',
    season: 'Toute l annee, eviter fortes pluies',
    image: commonsImage('Isalo National Park 01.jpg'),
    tags: ['rn7', 'canyons', 'famille'],
  },
  {
    name: 'Ranomafana',
    province: 'Fianarantsoa',
    region: 'Vatovavy-Fitovinany',
    distance: '427 km / env. 12 h depuis Tana',
    access: 'RN7, RNS45 et RN25',
    vehicle: 'SUV conseille',
    season: 'Accessible toute l annee, mieux avril-novembre',
    image: commonsImage('Mist over Ranomafana National Park (15719448688).jpg'),
    tags: ['foret', 'sources thermales', 'rn7'],
  },
  {
    name: 'Allee des Baobabs',
    province: 'Mahajanga',
    region: 'Menabe',
    distance: '19-20 km de Morondava',
    access: 'Piste RN8 courte',
    vehicle: 'SUV ou 4x4 en pluie',
    season: 'Meilleur coucher de soleil, confirmer piste',
    image: commonsImage('Avenue of Baobabs (45333912101).jpg'),
    tags: ['baobabs', 'photo', 'ouest'],
  },
  {
    name: 'Tsingy de Bemaraha',
    province: 'Mahajanga',
    region: 'Melaky',
    distance: 'Piste Morondava - Bekopaka',
    access: 'Piste + bac',
    vehicle: '4x4 obligatoire',
    season: 'Generalement saison seche, acces a confirmer',
    image: commonsImage('Tsingy de Bemaraha.jpg'),
    tags: ['4x4', 'unesco', 'aventure'],
  },
  {
    name: 'Ankarana',
    province: 'Antsiranana',
    region: 'DIANA',
    distance: '108 km de Diego Suarez',
    access: 'RN6 vers Mahamasina',
    vehicle: 'SUV ou 4x4',
    season: 'Zone Est toute l annee, Ouest juillet-novembre',
    image: commonsImage('Ankarana Reserve tsingy at sunset Madagascar.jpg'),
    tags: ['grottes', 'tsingy', 'nord'],
  },
  {
    name: 'Ankarafantsika',
    province: 'Mahajanga',
    region: 'Boeny',
    distance: 'RN4 entre Tana et Mahajanga',
    access: 'Acces direct RN4',
    vehicle: 'Berline ou SUV',
    season: 'Accessible toute l annee',
    image: commonsImage('Baobabs, Ankarafantsika National Park, Madagascar (4466613399).jpg'),
    tags: ['oiseaux', 'foret seche', 'rn4'],
  },
  {
    name: 'Diego Suarez et Ramena',
    province: 'Antsiranana',
    region: 'DIANA',
    distance: 'Depuis Antsiranana',
    access: 'Route locale vers plages et baie',
    vehicle: 'SUV ou minibus',
    season: 'Toute l annee, vent de juin-septembre',
    image: commonsImage('Le pain de sucre dans la baie de Diego Suarez, Madagascar.JPG'),
    tags: ['plage', 'baie', 'nord'],
  },
  {
    name: 'Nosy Be et Mont Passot',
    province: 'Antsiranana',
    region: 'DIANA',
    distance: 'Ferry depuis Ankify ou vol',
    access: 'Routes locales sur l ile',
    vehicle: 'SUV, van ou quad local',
    season: 'Toute l annee, verifier ferry',
    image: commonsImage('Coucher de soleil, Mont Passot à Nosy-be, Madagascar.jpg'),
    tags: ['ile', 'panorama', 'famille'],
  },
]

const offers = [
  {
    title: 'Location avec chauffeur-guide',
    icon: ShieldCheck,
    detail: 'Chauffeur francophone, aide itineraire, gestion carburant, peages, bacs et acces parcs.',
    bestFor: 'Circuits RN7, Est, Nord, Ouest',
  },
  {
    title: 'Location sans chauffeur',
    icon: CarFront,
    detail: 'SUV ou citadine pour conducteurs autonomes, contrat clair, caution et assistance locale.',
    bestFor: 'Ville, RN principales, courts sejours',
  },
  {
    title: '4x4 expedition',
    icon: Navigation,
    detail: 'Land Cruiser, Hilux ou Prado avec kit piste, roues de secours et chauffeur habitue aux bacs.',
    bestFor: 'Bemaraha, pistes Ouest, Sud profond',
  },
  {
    title: 'Transfert aeroport et hotel',
    icon: Clock,
    detail: 'Accueil Ivato, navettes inter-villes, horaires de nuit et suivi de vol.',
    bestFor: 'Arrivees, departs, business',
  },
  {
    title: 'Minibus et groupe',
    icon: Users,
    detail: 'Van premium, minibus 12 a 16 places, bagages, climatisation et gestion multi-etapes.',
    bestFor: 'Familles, ONG, seminaires',
  },
  {
    title: 'Location longue duree',
    icon: CreditCard,
    detail: 'Forfaits semaine, mois, entreprise, entretien inclus et remplacement selon disponibilite.',
    bestFor: 'Missions, chantiers, expatriation',
  },
]

const vehicles = [
  {
    id: 'duster',
    name: 'Renault Duster',
    type: 'SUV',
    seats: 5,
    bags: 3,
    terrain: 'RN + piste legere',
    fuel: 'Diesel / essence',
    rate: 210000,
    available: 4,
    image: commonsImage('Renault Duster.JPG', 900),
  },
  {
    id: 'rav4',
    name: 'Toyota RAV4',
    type: 'SUV',
    seats: 5,
    bags: 3,
    terrain: 'Route + piste stable',
    fuel: 'Essence',
    rate: 245000,
    available: 2,
    image: commonsImage('Toyota Rav4.jpg', 900),
  },
  {
    id: 'prado',
    name: 'Toyota Prado',
    type: '4x4',
    seats: 7,
    bags: 4,
    terrain: 'Piste et expedition',
    fuel: 'Diesel',
    rate: 390000,
    available: 3,
    image: commonsImage('2013-2017 Toyota Land Cruiser Prado (front).jpg', 900),
  },
  {
    id: 'hilux',
    name: 'Toyota Hilux 4x4',
    type: '4x4',
    seats: 5,
    bags: 5,
    terrain: 'Piste, bacs, charge utile',
    fuel: 'Diesel',
    rate: 420000,
    available: 2,
    image: commonsImage('Toyota Pickup 4x4 (Hilux).jpg', 900),
  },
  {
    id: 'staria',
    name: 'Hyundai Staria',
    type: 'Van',
    seats: 8,
    bags: 6,
    terrain: 'Route confort',
    fuel: 'Diesel',
    rate: 360000,
    available: 1,
    image: commonsImage('Hyundai Staria IMG 5632.jpg', 900),
  },
  {
    id: 'sprinter',
    name: 'Mercedes Sprinter',
    type: 'Minibus',
    seats: 16,
    bags: 12,
    terrain: 'Groupes et longues routes',
    fuel: 'Diesel',
    rate: 520000,
    available: 1,
    image: commonsImage('2018 Mercedes-Benz Sprinter 314 CDi 2.1 Front.jpg', 900),
  },
]

const circuits = [
  {
    key: 'rn7',
    title: 'Grand Sud RN7',
    days: '8 a 12 jours',
    route: 'Tana - Antsirabe - Ranomafana - Ambalavao - Isalo - Toliara',
    vehicle: 'SUV ou van',
  },
  {
    key: 'est',
    title: 'Foret de l Est',
    days: '2 a 5 jours',
    route: 'Tana - Andasibe - Manambato - Pangalanes - Toamasina',
    vehicle: 'SUV conseille',
  },
  {
    key: 'ouest',
    title: 'Ouest Baobabs & Tsingy',
    days: '7 a 12 jours',
    route: 'Tana - Miandrivazo - Morondava - Bekopaka - Baobabs',
    vehicle: '4x4 obligatoire',
  },
  {
    key: 'nord',
    title: 'Nord Diana',
    days: '5 a 9 jours',
    route: 'Diego Suarez - Ramena - Montagne d Ambre - Ankarana - Ankify',
    vehicle: 'SUV ou 4x4',
  },
]

const vehicleTypes = ['Tous', 'SUV', '4x4', 'Van', 'Minibus']
const provinceFilters = ['Toutes', ...provinces.map((province) => province.name)]
const accessFilters = ['Tous', 'Berline', 'SUV', '4x4']

const selectedProvince = ref('Toutes')
const selectedAccess = ref('Tous')
const selectedCarType = ref('Tous')
const destinationSearch = ref('')
const confirmation = ref(null)
const bookingError = ref('')

const today = new Date().toISOString().slice(0, 10)

const booking = reactive({
  pickup: 'Ivato Aeroport',
  dropoff: 'Ivato Aeroport',
  startDate: today,
  endDate: today,
  province: 'Toliara',
  vehicleId: 'prado',
  driver: true,
  protection: true,
  childSeat: false,
  roofRack: false,
  name: '',
  phone: '',
  email: '',
  notes: '',
})

const formatCurrency = (amount) =>
  new Intl.NumberFormat('fr-MG', {
    style: 'currency',
    currency: 'MGA',
    maximumFractionDigits: 0,
  }).format(amount)

const selectedVehicle = computed(
  () => vehicles.find((vehicle) => vehicle.id === booking.vehicleId) || vehicles[0],
)

const rentalDays = computed(() => {
  const start = new Date(booking.startDate)
  const end = new Date(booking.endDate)

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
    return 1
  }

  const diff = end.getTime() - start.getTime()
  return Math.max(1, Math.ceil(diff / 86400000) + 1)
})

const selectedExtras = computed(() => {
  const extras = []
  if (booking.driver) extras.push({ label: 'Chauffeur-guide', amount: 120000 * rentalDays.value })
  if (booking.protection) extras.push({ label: 'Protection premium', amount: 45000 * rentalDays.value })
  if (booking.childSeat) extras.push({ label: 'Siege enfant', amount: 25000 })
  if (booking.roofRack) extras.push({ label: 'Galerie bagages', amount: 35000 * rentalDays.value })
  return extras
})

const bookingTotal = computed(() => {
  const base = selectedVehicle.value.rate * rentalDays.value
  const extras = selectedExtras.value.reduce((sum, item) => sum + item.amount, 0)
  const oneWay = booking.pickup !== booking.dropoff ? 80000 : 0
  return base + extras + oneWay
})

const filteredDestinations = computed(() => {
  const query = destinationSearch.value.trim().toLowerCase()

  return destinations.filter((destination) => {
    const provinceMatch =
      selectedProvince.value === 'Toutes' || destination.province === selectedProvince.value
    const accessMatch =
      selectedAccess.value === 'Tous' ||
      destination.vehicle.toLowerCase().includes(selectedAccess.value.toLowerCase()) ||
      destination.access.toLowerCase().includes(selectedAccess.value.toLowerCase())
    const queryMatch =
      !query ||
      [destination.name, destination.region, destination.province, ...destination.tags]
        .join(' ')
        .toLowerCase()
        .includes(query)

    return provinceMatch && accessMatch && queryMatch
  })
})

const filteredVehicles = computed(() => {
  if (selectedCarType.value === 'Tous') {
    return vehicles
  }

  return vehicles.filter((vehicle) => vehicle.type === selectedCarType.value)
})

const bookingMessage = computed(() => {
  const lines = [
    `Demande de reservation Nature en Voyage`,
    `Vehicule: ${selectedVehicle.value.name}`,
    `Dates: ${booking.startDate} au ${booking.endDate} (${rentalDays.value} jour(s))`,
    `Trajet: ${booking.pickup} -> ${booking.dropoff}`,
    `Province cible: ${booking.province}`,
    `Total estime: ${formatCurrency(bookingTotal.value)}`,
    `Nom: ${booking.name || '-'}`,
    `Telephone: ${booking.phone || '-'}`,
    `Email: ${booking.email || '-'}`,
    `Notes: ${booking.notes || '-'}`,
  ]

  return lines.join('\n')
})

const whatsappUrl = computed(
  () =>
    `https://wa.me/261349852252?text=${encodeURIComponent(
      `Bonjour, je souhaite reserver un trajet avec Nature en Voyage. Voici les details :\n\n${bookingMessage.value}`,
    )}`,
)

const mailUrl = computed(
  () =>
    `mailto:natureenvoyage@gmail.com?subject=${encodeURIComponent('Reservation Nature en Voyage')}&body=${encodeURIComponent(bookingMessage.value)}`,
)

const chooseVehicle = (vehicleId) => {
  booking.vehicleId = vehicleId
  document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })
}

const submitBooking = () => {
  bookingError.value = ''

  if (!booking.name.trim() || !booking.phone.trim()) {
    bookingError.value = 'Ajoutez au minimum votre nom et votre telephone pour confirmer la demande.'
    return
  }

  const reference = `NEV-${Date.now().toString().slice(-6)}`
  confirmation.value = {
    reference,
    vehicle: selectedVehicle.value.name,
    amount: bookingTotal.value,
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#f7f5ef] text-ink">
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
            <span class="block text-xs text-stone-300">Location tourisme Madagascar</span>
          </span>
        </a>

        <nav class="hidden items-center gap-6 text-sm font-medium text-stone-200 md:flex">
          <a href="#destinations" class="hover:text-white">Sites</a>
          <a href="#offres" class="hover:text-white">Offres</a>
          <a href="#voitures" class="hover:text-white">Voitures</a>
          <a href="#booking" class="hover:text-white">Booking</a>
        </nav>

        <a
          href="#booking"
          class="focus-ring inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-ink hover:bg-stone-100"
        >
          <CalendarDays class="h-4 w-4" aria-hidden="true" />
          Reserver
        </a>
      </div>
    </header>

    <main id="top">
      <section
        class="relative min-h-[88svh] bg-cover bg-center pt-24 text-white"
        :style="{ backgroundImage: `url('${heroImage}')` }"
      >
        <div class="absolute inset-0 bg-ink/65" aria-hidden="true"></div>
        <div class="section-shell relative grid min-h-[78svh] items-end gap-8 pb-8 lg:grid-cols-[1fr_440px]">
          <div class="max-w-3xl pb-4">
            <p class="mb-4 inline-flex rounded bg-white/15 px-3 py-2 text-sm font-semibold text-white">
              Circuits, transferts, 4x4 et minibus avec booking direct
            </p>
            <h1 class="text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
              Nature en Voyage
            </h1>
            <p class="mt-5 max-w-2xl text-lg leading-8 text-stone-100">
              Louez la bonne voiture pour decouvrir Madagascar par la route : RN7, forets de l Est,
              pistes de l Ouest, plages du Nord et escapades depuis Antananarivo.
            </p>
            <div class="mt-8 flex flex-wrap gap-3">
              <a
                href="#booking"
                class="focus-ring inline-flex items-center gap-2 rounded-md bg-ember px-5 py-3 font-bold text-ink hover:bg-[#d99b38]"
              >
                <Send class="h-5 w-5" aria-hidden="true" />
                Demarrer un booking
              </a>
              <a
                href="#destinations"
                class="focus-ring inline-flex items-center gap-2 rounded-md border border-white/70 px-5 py-3 font-bold text-white hover:bg-white/10"
              >
                <MapPin class="h-5 w-5" aria-hidden="true" />
                Voir les sites praticables
              </a>
            </div>
          </div>

          <div id="booking" class="bg-white p-4 text-ink shadow-crisp sm:p-5 lg:p-6">
            <div class="mb-5 flex items-start justify-between gap-4">
              <div>
                <p class="text-sm font-semibold text-canopy">Booking rapide</p>
                <h2 class="text-2xl font-black">Votre reservation</h2>
              </div>
              <span class="rounded bg-stone-100 px-2 py-1 text-xs font-bold text-stone-700">
                Devis instantane
              </span>
            </div>

            <form class="space-y-4" @submit.prevent="submitBooking">
              <div class="grid gap-3 sm:grid-cols-2">
                <label>
                  <span class="label">Depart</span>
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
                  <span class="label">Retour</span>
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
                  <span class="label">Date debut</span>
                  <input v-model="booking.startDate" :min="today" type="date" class="field" />
                </label>
                <label>
                  <span class="label">Date fin</span>
                  <input v-model="booking.endDate" :min="booking.startDate" type="date" class="field" />
                </label>
              </div>

              <div class="grid gap-3 sm:grid-cols-2">
                <label>
                  <span class="label">Province cible</span>
                  <select v-model="booking.province" class="field">
                    <option v-for="province in provinces" :key="province.name">
                      {{ province.name }}
                    </option>
                  </select>
                </label>
                <label>
                  <span class="label">Vehicule</span>
                  <select v-model="booking.vehicleId" class="field">
                    <option v-for="vehicle in vehicles" :key="vehicle.id" :value="vehicle.id">
                      {{ vehicle.name }} - {{ vehicle.type }}
                    </option>
                  </select>
                </label>
              </div>

              <div class="grid gap-2 sm:grid-cols-2">
                <label class="flex items-center gap-3 rounded-md border border-stone-200 bg-stone-50 p-3 text-sm">
                  <input v-model="booking.driver" type="checkbox" class="h-4 w-4 accent-canopy" />
                  Chauffeur-guide
                </label>
                <label class="flex items-center gap-3 rounded-md border border-stone-200 bg-stone-50 p-3 text-sm">
                  <input v-model="booking.protection" type="checkbox" class="h-4 w-4 accent-canopy" />
                  Protection premium
                </label>
                <label class="flex items-center gap-3 rounded-md border border-stone-200 bg-stone-50 p-3 text-sm">
                  <input v-model="booking.childSeat" type="checkbox" class="h-4 w-4 accent-canopy" />
                  Siege enfant
                </label>
                <label class="flex items-center gap-3 rounded-md border border-stone-200 bg-stone-50 p-3 text-sm">
                  <input v-model="booking.roofRack" type="checkbox" class="h-4 w-4 accent-canopy" />
                  Galerie bagages
                </label>
              </div>

              <div class="grid gap-3 sm:grid-cols-2">
                <label>
                  <span class="label">Nom</span>
                  <input v-model="booking.name" type="text" class="field" placeholder="Votre nom" />
                </label>
                <label>
                  <span class="label">Telephone</span>
                  <input v-model="booking.phone" type="tel" class="field" placeholder="+261 ..." />
                </label>
              </div>

              <label>
                <span class="label">Email</span>
                <input v-model="booking.email" type="email" class="field" placeholder="contact@email.com" />
              </label>

              <label>
                <span class="label">Notes trajet</span>
                <textarea
                  v-model="booking.notes"
                  class="field min-h-20 resize-y"
                  placeholder="Ex: Isalo 4 jours, chauffeur francophone, 2 enfants"
                ></textarea>
              </label>

              <div class="border-y border-stone-200 py-4">
                <div class="flex items-center justify-between text-sm">
                  <span>{{ selectedVehicle.name }} x {{ rentalDays }} jour(s)</span>
                  <strong>{{ formatCurrency(selectedVehicle.rate * rentalDays) }}</strong>
                </div>
                <div
                  v-for="extra in selectedExtras"
                  :key="extra.label"
                  class="mt-2 flex items-center justify-between text-sm text-stone-600"
                >
                  <span>{{ extra.label }}</span>
                  <span>{{ formatCurrency(extra.amount) }}</span>
                </div>
                <div
                  v-if="booking.pickup !== booking.dropoff"
                  class="mt-2 flex items-center justify-between text-sm text-stone-600"
                >
                  <span>Retour different</span>
                  <span>{{ formatCurrency(80000) }}</span>
                </div>
                <div class="mt-4 flex items-end justify-between">
                  <span class="text-sm font-semibold text-stone-600">Total estime</span>
                  <strong class="text-2xl">{{ formatCurrency(bookingTotal) }}</strong>
                </div>
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
                  Demande prete : {{ confirmation.reference }}
                </div>
                <p class="mt-1">
                  {{ confirmation.vehicle }} - {{ formatCurrency(confirmation.amount) }}
                </p>
              </div>

              <div class="grid gap-3 sm:grid-cols-3">
                <button
                  type="submit"
                  class="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-canopy px-4 py-3 font-bold text-white hover:bg-[#184f3d] sm:col-span-1"
                >
                  <CheckCircle2 class="h-5 w-5" aria-hidden="true" />
                  Valider
                </button>
                <a
                  :href="whatsappUrl"
                  target="_blank"
                  rel="noreferrer"
                  class="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-lagoon px-4 py-3 font-bold text-lagoon hover:bg-lagoon/10"
                >
                  <MessageCircle class="h-5 w-5" aria-hidden="true" />
                  WhatsApp
                </a>
                <a
                  :href="mailUrl"
                  class="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-stone-300 px-4 py-3 font-bold hover:bg-stone-100"
                >
                  <Mail class="h-5 w-5" aria-hidden="true" />
                  Email
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section class="border-b border-stone-200 bg-white py-5">
        <div class="section-shell grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div class="flex items-center gap-3">
            <Route class="h-5 w-5 text-clay" aria-hidden="true" />
            4 grands circuits routiers
          </div>
          <div class="flex items-center gap-3">
            <CarFront class="h-5 w-5 text-canopy" aria-hidden="true" />
            SUV, 4x4, van, minibus
          </div>
          <div class="flex items-center gap-3">
            <ShieldCheck class="h-5 w-5 text-lagoon" aria-hidden="true" />
            Chauffeur-guide disponible
          </div>
          <div class="flex items-center gap-3">
            <Phone class="h-5 w-5 text-ember" aria-hidden="true" />
            Booking WhatsApp ou email
          </div>
        </div>
      </section>

      <section id="provinces" class="py-16">
        <div class="section-shell">
          <div class="mb-8 max-w-3xl">
            <p class="text-sm font-bold uppercase text-clay">Provinces</p>
            <h2 class="mt-2 text-3xl font-black sm:text-4xl">Les zones que l agence couvre</h2>
          </div>

          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <article
              v-for="province in provinces"
              :key="province.name"
              class="rounded-lg border border-stone-200 bg-white p-5 shadow-sm"
            >
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h3 class="text-xl font-black">{{ province.name }}</h3>
                  <p class="mt-1 text-sm font-semibold text-clay">{{ province.tone }}</p>
                </div>
                <span class="rounded bg-canopy/10 px-2 py-1 text-xs font-bold text-canopy">
                  {{ province.access }}
                </span>
              </div>
              <p class="mt-4 text-sm leading-6 text-stone-700">{{ province.pitch }}</p>
              <p class="mt-4 text-sm font-semibold">{{ province.anchor }}</p>
            </article>
          </div>
        </div>
      </section>

      <section id="destinations" class="bg-white py-16">
        <div class="section-shell">
          <div class="mb-8 grid gap-6 lg:grid-cols-[1fr_420px]">
            <div>
              <p class="text-sm font-bold uppercase text-lagoon">Sites touristiques praticables</p>
              <h2 class="mt-2 text-3xl font-black sm:text-4xl">
                Destinations accessibles par voiture
              </h2>
              <p class="mt-4 max-w-3xl leading-7 text-stone-700">
                La praticabilite varie avec la saison, les pluies, les travaux et les bacs. Les
                pistes Ouest et certains parcs doivent etre confirmes avant depart.
              </p>
            </div>

            <div class="rounded-lg border border-stone-200 bg-stone-50 p-4">
              <div class="mb-3 flex items-center gap-2 text-sm font-bold">
                <SlidersHorizontal class="h-4 w-4 text-clay" aria-hidden="true" />
                Filtres
              </div>
              <div class="grid gap-3 sm:grid-cols-2">
                <label>
                  <span class="label">Province</span>
                  <select v-model="selectedProvince" class="field">
                    <option v-for="province in provinceFilters" :key="province">
                      {{ province }}
                    </option>
                  </select>
                </label>
                <label>
                  <span class="label">Acces</span>
                  <select v-model="selectedAccess" class="field">
                    <option v-for="access in accessFilters" :key="access">
                      {{ access }}
                    </option>
                  </select>
                </label>
              </div>
              <label class="mt-3 block">
                <span class="label">Recherche</span>
                <span class="relative block">
                  <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
                  <input
                    v-model="destinationSearch"
                    class="field pl-9"
                    placeholder="baobabs, RN7, foret, nord..."
                  />
                </span>
              </label>
            </div>
          </div>

          <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <article
              v-for="destination in filteredDestinations"
              :key="destination.name"
              class="overflow-hidden rounded-lg border border-stone-200 bg-[#fbfaf6] shadow-sm"
            >
              <img
                :src="destination.image"
                :alt="destination.name"
                class="h-52 w-full object-cover"
                loading="lazy"
              />
              <div class="p-5">
                <div class="flex flex-wrap gap-2">
                  <span class="rounded bg-clay/10 px-2 py-1 text-xs font-bold text-clay">
                    {{ destination.province }}
                  </span>
                  <span class="rounded bg-lagoon/10 px-2 py-1 text-xs font-bold text-lagoon">
                    {{ destination.vehicle }}
                  </span>
                </div>
                <h3 class="mt-4 text-xl font-black">{{ destination.name }}</h3>
                <p class="mt-1 text-sm font-semibold text-stone-600">{{ destination.region }}</p>
                <dl class="mt-4 space-y-3 text-sm text-stone-700">
                  <div class="flex gap-3">
                    <MapPin class="mt-0.5 h-4 w-4 shrink-0 text-clay" aria-hidden="true" />
                    <dd>{{ destination.distance }}</dd>
                  </div>
                  <div class="flex gap-3">
                    <Route class="mt-0.5 h-4 w-4 shrink-0 text-canopy" aria-hidden="true" />
                    <dd>{{ destination.access }}</dd>
                  </div>
                  <div class="flex gap-3">
                    <CalendarDays class="mt-0.5 h-4 w-4 shrink-0 text-ember" aria-hidden="true" />
                    <dd>{{ destination.season }}</dd>
                  </div>
                </dl>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="offres" class="py-16">
        <div class="section-shell">
          <div class="mb-8 max-w-3xl">
            <p class="text-sm font-bold uppercase text-canopy">Offres</p>
            <h2 class="mt-2 text-3xl font-black sm:text-4xl">Tout type de location possible</h2>
          </div>

          <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <article
              v-for="offer in offers"
              :key="offer.title"
              class="rounded-lg border border-stone-200 bg-white p-5 shadow-sm"
            >
              <component :is="offer.icon" class="h-8 w-8 text-clay" aria-hidden="true" />
              <h3 class="mt-4 text-xl font-black">{{ offer.title }}</h3>
              <p class="mt-3 text-sm leading-6 text-stone-700">{{ offer.detail }}</p>
              <p class="mt-4 rounded bg-stone-100 px-3 py-2 text-sm font-bold text-stone-700">
                {{ offer.bestFor }}
              </p>
            </article>
          </div>

          <div class="mt-10 grid gap-4 lg:grid-cols-4">
            <article
              v-for="circuit in circuits"
              :key="circuit.key"
              class="rounded-lg border border-stone-200 bg-ink p-5 text-white shadow-sm"
            >
              <p class="text-sm font-bold text-ember">{{ circuit.days }}</p>
              <h3 class="mt-2 text-xl font-black">{{ circuit.title }}</h3>
              <p class="mt-3 text-sm leading-6 text-stone-200">{{ circuit.route }}</p>
              <p class="mt-4 rounded bg-white/10 px-3 py-2 text-sm font-bold">
                {{ circuit.vehicle }}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="voitures" class="bg-white py-16">
        <div class="section-shell">
          <div class="mb-8 grid gap-6 lg:grid-cols-[1fr_360px]">
            <div>
              <p class="text-sm font-bold uppercase text-clay">Flotte disponible</p>
              <h2 class="mt-2 text-3xl font-black sm:text-4xl">Voitures pretes pour vos trajets</h2>
            </div>
            <label>
              <span class="label">Type vehicule</span>
              <select v-model="selectedCarType" class="field">
                <option v-for="type in vehicleTypes" :key="type">{{ type }}</option>
              </select>
            </label>
          </div>

          <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <article
              v-for="vehicle in filteredVehicles"
              :key="vehicle.id"
              class="overflow-hidden rounded-lg border border-stone-200 bg-[#fbfaf6] shadow-sm"
            >
              <img
                :src="vehicle.image"
                :alt="vehicle.name"
                class="h-48 w-full object-cover"
                loading="lazy"
              />
              <div class="p-5">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <h3 class="text-xl font-black">{{ vehicle.name }}</h3>
                    <p class="mt-1 text-sm font-semibold text-clay">{{ vehicle.type }}</p>
                  </div>
                  <span class="rounded bg-canopy/10 px-2 py-1 text-xs font-bold text-canopy">
                    {{ vehicle.available }} dispo
                  </span>
                </div>
                <dl class="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div class="flex items-center gap-2">
                    <Users class="h-4 w-4 text-stone-500" aria-hidden="true" />
                    {{ vehicle.seats }} places
                  </div>
                  <div class="flex items-center gap-2">
                    <Luggage class="h-4 w-4 text-stone-500" aria-hidden="true" />
                    {{ vehicle.bags }} bagages
                  </div>
                  <div class="flex items-center gap-2">
                    <Fuel class="h-4 w-4 text-stone-500" aria-hidden="true" />
                    {{ vehicle.fuel }}
                  </div>
                  <div class="flex items-center gap-2">
                    <Route class="h-4 w-4 text-stone-500" aria-hidden="true" />
                    {{ vehicle.terrain }}
                  </div>
                </dl>
                <div class="mt-5 flex items-center justify-between gap-4 border-t border-stone-200 pt-4">
                  <div>
                    <p class="text-xs font-semibold uppercase text-stone-500">A partir de</p>
                    <p class="text-xl font-black">{{ formatCurrency(vehicle.rate) }}/j</p>
                  </div>
                  <button
                    type="button"
                    class="focus-ring inline-flex items-center gap-2 rounded-md bg-ink px-4 py-3 text-sm font-bold text-white hover:bg-stone-800"
                    @click="chooseVehicle(vehicle.id)"
                  >
                    <CalendarDays class="h-4 w-4" aria-hidden="true" />
                    Booker
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="bg-[#efe8dc] py-16">
        <div class="section-shell grid gap-8 lg:grid-cols-[1fr_420px]">
          <div>
            <p class="text-sm font-bold uppercase text-canopy">Contact agence</p>
            <h2 class="mt-2 text-3xl font-black sm:text-4xl">Finalisez votre trajet avec l equipe</h2>
            <p class="mt-4 max-w-2xl leading-7 text-stone-700">
              Le booking genere une demande claire avec dates, vehicule, trajet et budget estime.
              Pour une vraie production, il faudra connecter cette interface a un backend de
              paiement, disponibilite et gestion client.
            </p>
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
              :href="whatsappUrl"
              target="_blank"
              rel="noreferrer"
              class="focus-ring mt-3 flex items-center gap-3 rounded-md border border-lagoon px-4 py-3 font-bold text-lagoon hover:bg-lagoon/10"
            >
              <MessageCircle class="h-5 w-5" aria-hidden="true" />
              Envoyer la demande WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>

    <footer class="bg-ink py-8 text-sm text-stone-300">
      <div class="section-shell flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p>© 2026 Nature en Voyage.</p>
        <p>
          Sources destinations :
          <a class="underline hover:text-white" href="https://madagascar-tourisme.com/" target="_blank" rel="noreferrer">
            Madagascar Tourisme
          </a>
          ·
          <a class="underline hover:text-white" href="https://parcs-madagascar.com/" target="_blank" rel="noreferrer">
            Madagascar National Parks
          </a>
          .
        </p>
      </div>
    </footer>
  </div>
</template>
