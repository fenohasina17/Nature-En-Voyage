// GPS coordinates (WGS84, decimal degrees) verified against Wikipedia, OpenStreetMap/Nominatim
// or direct OSM node lookups. Approximate values (commune/park-level rather than a precise pin)
// are flagged inline.
export const coordinates = {
  // Antananarivo & environs
  rova: { lat: -18.92365, lng: 47.53202 },
  ambohitrimanjaka: { lat: -18.8675, lng: 47.4538 }, // approx, commune-level
  lemursPark: { lat: -18.9524028, lng: 47.3575361 },
  imeritsiatosika: { lat: -18.983, lng: 47.317 }, // approx, commune-level

  // RN2
  mantasoa: { lat: -19.0208, lng: 47.8599 },
  nosySoa: { lat: -18.9913, lng: 47.8855 }, // approx
  peyrieras: { lat: -18.931306, lng: 47.949972 },
  andasibe: { lat: -18.93611, lng: 48.42833 },
  palmarium: { lat: -18.6060183, lng: 49.2106766 },
  toamasina: { lat: -18.155, lng: 49.41 },
  sainteMarie: { lat: -16.96667, lng: 49.86667 }, // approx, island-level

  // RN7
  ambatolampy: { lat: -19.38611, lng: 47.42917 },
  antsirabe: { lat: -19.86611, lng: 47.03306 },
  zafimaniry: { lat: -20.51667, lng: 47.25 },
  ranomafana: { lat: -21.21667, lng: 47.41667 }, // approx, park-level
  sahambavy: { lat: -21.43333, lng: 47.28333 }, // approx, village-level
  andringitra: { lat: -22.11278, lng: 46.92306 }, // approx, park-level
  anja: { lat: -21.85203, lng: 46.84278 },
  isalo: { lat: -22.43333, lng: 45.35 }, // approx, Ranohira entrance
  toliara: { lat: -23.35, lng: 43.66667 }, // approx, city-level

  // RN34
  baobabs: { lat: -20.2503, lng: 44.4193 },
  bemaraha: { lat: -18.9135, lng: 44.7944 }, // approx, Bekopaka access area
  manambolo: { lat: -19.1353, lng: 44.8463 },
  kirindy: { lat: -20.0675, lng: 44.5957 }, // approx
  akiba: { lat: -20.1334, lng: 44.5483 }, // approx, Marofandilia village
  betania: { lat: -20.30874, lng: 44.26488 },
  zazamalala: { lat: -20.3391, lng: 44.5736 }, // approx
  tsiribihina: { lat: -19.5556, lng: 45.4508 }, // approx, Miandrivazo departure point

  // RN4
  ankarafantsika: { lat: -16.3157, lng: 46.8066 }, // approx, park area
  circuitRouge: { lat: -15.6346426, lng: 46.3530648 },
  belobaka: { lat: -15.6986249, lng: 46.4038925 },

  // RN6
  tsingyRouge: { lat: -12.63889, lng: 49.49722 },
  sakalava: { lat: -12.26667, lng: 49.4 }, // approx, bay-level
  antanavo: { lat: -12.75, lng: 49.25 },
  ramena: { lat: -12.2333, lng: 49.35 }, // approx
  capAmbre: { lat: -11.95639, lng: 49.2725 },
  montagneFrancais: { lat: -12.34111, lng: 49.34528 },
  montagneAmbre: { lat: -12.595, lng: 49.155 },
  nosyBe: { lat: -13.4, lng: 48.26667 }, // Hell-Ville (Andoany) town centre

  // Reference points used for pickup / drop-off in the booking form
  ivatoAirport: { lat: -18.7969, lng: 47.4788 },
  antsirabeCity: { lat: -19.867, lng: 47.033 },
  morondavaCity: { lat: -20.2887, lng: 44.3178 },
  diegoSuarezCity: { lat: -12.3, lng: 49.2833 },
  toamasinaCity: { lat: -18.155, lng: 49.41 },
  toliaraCity: { lat: -23.35, lng: 43.667 },
}

export const googleMapsUrl = (key) => {
  const point = coordinates[key]
  if (!point) return ''
  return `https://www.google.com/maps/search/?api=1&query=${point.lat},${point.lng}`
}
