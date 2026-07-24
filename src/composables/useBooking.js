import { computed, reactive, ref } from 'vue'
import { useVehiclesData } from './useVehiclesData.js'
import { useSitesData } from './useSitesData.js'
import { useCurrency } from './useI18n.js'

const { vehiclesData } = useVehiclesData()
const { axesData } = useSitesData()

const { formatMGA } = useCurrency()

const today = new Date().toISOString().slice(0, 10)

const booking = reactive({
  pickup: 'Ivato Aeroport',
  dropoff: 'Ivato Aeroport',
  startDate: today,
  endDate: today,
  axis: 'rn7',
  vehicleId: 'starex-4x4',
  driver: true,
  protection: true,
  childSeat: false,
  roofRack: false,
  name: '',
  phone: '',
  email: '',
  notes: '',
})

const confirmation = ref(null)
const bookingError = ref('')

const selectedVehicle = computed(
  () => vehiclesData.value.find((vehicle) => vehicle.id === booking.vehicleId) || vehiclesData.value[0],
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
  if (booking.driver) extras.push({ key: 'driver', amount: 120000 * rentalDays.value })
  if (booking.protection) extras.push({ key: 'protection', amount: 45000 * rentalDays.value })
  if (booking.childSeat) extras.push({ key: 'childSeat', amount: 25000 })
  if (booking.roofRack) extras.push({ key: 'roofRack', amount: 35000 * rentalDays.value })
  return extras
})

const bookingTotal = computed(() => {
  const base = selectedVehicle.value.rate * rentalDays.value
  const extras = selectedExtras.value.reduce((sum, item) => sum + item.amount, 0)
  const oneWay = booking.pickup !== booking.dropoff ? 80000 : 0
  return base + extras + oneWay
})

const buildBookingMessage = (t, pick) => {
  const axisLabel = pick(axesData.value.find((axis) => axis.key === booking.axis)?.title) || booking.axis

  const lines = [
    'Nature en Voyage',
    `${t('bookingForm.vehicle')}: ${selectedVehicle.value.name}`,
    `${t('bookingForm.startDate')} -> ${t('bookingForm.endDate')}: ${booking.startDate} -> ${booking.endDate} (${rentalDays.value} ${t('bookingForm.days')})`,
    `${t('bookingForm.pickup')} -> ${t('bookingForm.dropoff')}: ${booking.pickup} -> ${booking.dropoff}`,
    `${t('bookingForm.axis')}: ${axisLabel}`,
    `${t('bookingForm.total')}: ${formatMGA(bookingTotal.value)}`,
    `${t('bookingForm.name')}: ${booking.name || '-'}`,
    `${t('bookingForm.phone')}: ${booking.phone || '-'}`,
    `${t('bookingForm.email')}: ${booking.email || '-'}`,
    `${t('bookingForm.notes')}: ${booking.notes || '-'}`,
  ]

  return lines.join('\n')
}

const chooseVehicle = (vehicleId) => {
  booking.vehicleId = vehicleId
  document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })
}

const submitBooking = (t) => {
  bookingError.value = ''

  if (!booking.name.trim() || !booking.phone.trim()) {
    bookingError.value = t('bookingForm.error')
    return
  }

  const reference = `NEV-${Date.now().toString().slice(-6)}`
  confirmation.value = {
    reference,
    vehicle: selectedVehicle.value.name,
    amount: bookingTotal.value,
  }
}

export function useBooking() {
  return {
    booking,
    confirmation,
    bookingError,
    selectedVehicle,
    rentalDays,
    selectedExtras,
    bookingTotal,
    chooseVehicle,
    submitBooking,
    buildBookingMessage,
  }
}
