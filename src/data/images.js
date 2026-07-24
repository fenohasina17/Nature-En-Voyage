const commonsImage = (file, width = 1200) =>
  `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}?width=${width}`

// Verified real Wikimedia Commons filenames (hotlinkable via Special:Redirect).
// A missing key falls back to a styled placeholder in the UI instead of a broken/misleading image.
const files = {
  // Antananarivo & environs
  rova: "Manjakamiadana - Rova of Antananarivo - Queen's Palace.jpg",
  // ambohitrimanjaka: no verified Commons photo of the village itself — falls back to placeholder
  lemursPark: "Ring Tailed Lemur in Lemur's Park.jpg",
  // imeritsiatosika: no verified Commons photo of the commune itself — falls back to placeholder

  // RN2
  mantasoa: 'Mantasoa lakeside.jpg',
  nosySoa: 'Maki catta en quête de la prochaine banane-Nosy Soa Park Mantasoa-Mars 2024.jpg',
  peyrieras: 'Common Tenrec 1.JPG',
  andasibe: 'Indri Andasibe.JPG',
  palmarium: 'Plage de sable blanc de Palmarium Reserve, Manambato, Atsinanana region, Madagascar.jpg',
  toamasina: 'Port Toamasina Madagascar.jpg',
  sainteMarie: 'Beache of La Crique Sainte Marie.jpg',

  // RN7
  ambatolampy: 'Artisans ( cuillères en aluminium ).jpg',
  antsirabe: 'Antsirabe miniature bicycle maker.jpg',
  zafimaniry: 'Zafimaniry house.JPG',
  ranomafana: 'Namorona River in Ranomafana National Park 2013 1.jpg',
  sahambavy: 'Plantation de thé à Sahambavy.JPG',
  andringitra: 'Andringitra, Madagascar by Effervescing Elephant-01.jpg',
  anja: 'Ring-Tailed Lemur Calling, Anja Reserve (3953855032).jpg',
  isalo: 'Isalo - Namaza - piscine naturelle.jpg',
  toliara: 'City Centre Toliara 2007.jpg',

  // RN34
  baobabs: 'Allée des Baobabs near Morondava, Madagascar.jpg',
  bemaraha: 'Grand Tsingy 01.JPG',
  manambolo: 'Gorges du Manambolo, Morondava, Madagascar.jpg',
  kirindy: 'Baobab Kirindy Forest Madagascar - panoramio.jpg',
  // akiba: no verified Commons photo of the lodge — falls back to placeholder
  betania: "Fisherman's Village in Morondava, Madagascar - panoramio.jpg",
  // zazamalala: no verified Commons photo of the reserve — falls back to placeholder
  tsiribihina: 'Pirogue Madagascar.jpg',

  // RN4
  ankarafantsika: 'Western Dry Deciduous Forest, Ankarafantsika National Park, Madagascar (4026813379).jpg',
  circuitRouge: 'Le Cirque Rouge de Mahajanga.jpg',
  belobaka: 'La Grotte Belobaka.jpg',

  // RN6
  tsingyRouge: 'Tsingy rouge de Diego 01.jpg',
  sakalava: 'Baie de Sakalava 01.jpg',
  antanavo: 'Lieu de culte au lac sacré Antagnavo.jpg',
  ramena: 'La plage Ramena Antsiranana Madagascar.jpg',
  // capAmbre: no verified Commons photo of the cape/lighthouse itself — falls back to placeholder
  montagneFrancais: 'Montagne des Francais Antsiranana Madagascar - panoramio.jpg',
  montagneAmbre: "Cascade sacré de la montagne d'ambre.jpg",
  nosyBe: 'Mont Passot.jpg',

  // Vehicles
  kiaPride: '1993 Kia Pride LX (14594988361).jpg',
  starex4x4: 'Hyundai H1 HSV 2.4 4x4 2001 (15604806109).jpg',
  grandStarex: 'Hyundai Grand Starex VIP rear.jpg',
  galloper: 'Hyundai Galloper II 2.5d Turbo Wagon 1999 (52715690242).jpg',
  terracan: 'Hyundai Terracan GL 2.9 CRDi 2006 (34579712326).jpg',
  mazdaMinibus: 'Mazda Bongo Wagon 302.JPG',
  pickup: 'Toyota Hilux Double Cab 3.0 D-4D front.jpg',
}

export const getImage = (key, width = 1200) => (files[key] ? commonsImage(files[key], width) : '')

export const setImages = (map) => Object.assign(files, map)
