export const axes = [
  {
    key: 'tana',
    road: { fr: 'Ville & environs', en: 'City & surroundings' },
    title: { fr: 'Antananarivo & environs', en: 'Antananarivo & surroundings' },
    pitch: {
      fr: 'Avant de prendre la route, la capitale et ses environs offrent deja un concentre de culture malgache et de nature protegee, a moins d une heure du centre-ville.',
      en: 'Before hitting the road, the capital and its surroundings already pack in Malagasy culture and protected nature, all within an hour of downtown.',
    },
    vehicleHint: { fr: 'Berline ou SUV', en: 'Sedan or SUV' },
    accent: 'clay',
    sites: [
      {
        name: 'Palais de la Reine (Rova)',
        imgKey: 'rova',
        badge: { fr: 'Patrimoine royal', en: 'Royal heritage' },
        description: {
          fr: 'Ancienne residence fortifiee des souverains merina, perchee sur la colline d Analamanga avec une vue panoramique sur toute la capitale.',
          en: 'Former fortified residence of the Merina sovereigns, perched on Analamanga hill with a panoramic view over the whole capital.',
        },
        tags: ['culture', 'panorama'],
      },
      {
        name: 'Village d art malgache d Ambohitrimanjaka',
        imgKey: 'ambohitrimanjaka',
        badge: { fr: 'Artisanat', en: 'Craft village' },
        description: {
          fr: 'Village lacustre entoure de rizieres, reconnu pour ses ateliers de peinture et d artisanat malgache traditionnel.',
          en: 'A village surrounded by rice paddies, known for its Malagasy painting and traditional craft workshops.',
        },
        tags: ['artisanat', 'culture'],
      },
      {
        name: 'Lemurs Park',
        imgKey: 'lemursPark',
        badge: { fr: 'Lemuriens', en: 'Lemurs' },
        description: {
          fr: 'Parc botanique prive le long de la riviere Katsaoka, ou plusieurs especes de lemuriens evoluent en semi-liberte au milieu d une foret replantee.',
          en: 'Private botanical park along the Katsaoka river, where several lemur species roam semi-free in a replanted forest.',
        },
        tags: ['lemuriens', 'famille'],
      },
      {
        name: 'Katsaoka & Imeritsiatosika',
        imgKey: 'imeritsiatosika',
        badge: { fr: 'Hautes terres', en: 'Highlands' },
        description: {
          fr: 'Commune des hautes terres traversee par la riviere Katsaoka, entre rizieres en terrasses et collines cultivees : une pause nature facile depuis Tana.',
          en: 'A highland town crossed by the Katsaoka river, between terraced rice paddies and farmed hills — an easy nature break from Tana.',
        },
        tags: ['nature', 'rizieres'],
      },
    ],
  },
  {
    key: 'rn2',
    road: { fr: 'RN2 - vers l Est', en: 'RN2 - towards the East' },
    title: { fr: 'RN2 : forets orientales et ocean', en: 'RN2: eastern rainforest and ocean' },
    pitch: {
      fr: 'De Tana a Toamasina, la RN2 traverse les hautes terres puis plonge dans la foret humide de l Est, jusqu aux plages et au canal des Pangalanes.',
      en: 'From Tana to Toamasina, the RN2 crosses the highlands then dives into the eastern rainforest, all the way to the beaches and the Pangalanes canal.',
    },
    vehicleHint: { fr: 'SUV conseille', en: 'SUV recommended' },
    accent: 'canopy',
    sites: [
      {
        name: 'Lac Mantasoa',
        imgKey: 'mantasoa',
        badge: { fr: 'Lac & foret', en: 'Lake & forest' },
        description: {
          fr: 'Vaste lac artificiel entoure de pins et d eucalyptus, prise pour la voile, la peche et les balades en foret a 1h30 de Tana.',
          en: 'A large artificial lake surrounded by pine and eucalyptus forest, popular for sailing, fishing and forest walks 1.5h from Tana.',
        },
        tags: ['lac', 'detente'],
      },
      {
        name: 'Nosy Soa Park',
        imgKey: 'nosySoa',
        badge: { fr: 'Reserve privee', en: 'Private reserve' },
        description: {
          fr: 'Petite reserve privee sur l axe de Moramanga, dediee a la decouverte de la faune et de la flore locales dans un cadre preserve.',
          en: 'A small private reserve on the Moramanga road, dedicated to discovering local wildlife and flora in a protected setting.',
        },
        tags: ['nature', 'faune'],
      },
      {
        name: 'Reserve Peyrieras Exotic Park (Mandraka)',
        imgKey: 'peyrieras',
        badge: { fr: 'Reptiles & insectes', en: 'Reptiles & insects' },
        description: {
          fr: 'Parc prive de Mandraka specialise dans les cameleons, geckos, grenouilles et insectes de Madagascar, tres photogenique et pedagogique.',
          en: 'Private park in Mandraka specialised in Madagascar chameleons, geckos, frogs and insects — highly photogenic and educational.',
        },
        tags: ['reptiles', 'photo'],
      },
      {
        name: 'Parc National Andasibe-Mantadia',
        imgKey: 'andasibe',
        badge: { fr: 'Indri indri', en: 'Indri lemur' },
        description: {
          fr: 'Le chant du lemurien indri indri resonne dans cette foret primaire, l un des sites les plus visites de Madagascar, a 3-4h de Tana.',
          en: 'The call of the indri lemur echoes through this primary forest, one of Madagascar most visited sites, 3-4h from Tana.',
        },
        tags: ['foret', 'lemuriens'],
      },
      {
        name: 'Palmarium (Manambato)',
        imgKey: 'palmarium',
        badge: { fr: 'Reserve privee', en: 'Private reserve' },
        description: {
          fr: 'Reserve privee au bord du lac Ampitabe, sur le canal des Pangalanes, accessible en pirogue depuis Manambato, connue pour ses lemuriens tres proches et son jardin botanique.',
          en: 'Private reserve on Lake Ampitabe, on the Pangalanes canal, reached by canoe from Manambato, known for very close lemur encounters and its botanical garden.',
        },
        tags: ['lemuriens', 'lac'],
      },
      {
        name: 'Toamasina (Tamatave)',
        imgKey: 'toamasina',
        badge: { fr: 'Port & Pangalanes', en: 'Port & Pangalanes' },
        description: {
          fr: 'Premier port de Madagascar, porte d entree du canal des Pangalanes, avec ses avenues bordees de flamboyants et ses marches animes.',
          en: 'Madagascar largest port, gateway to the Pangalanes canal, with avenues lined with flame trees and lively markets.',
        },
        tags: ['ville', 'cote'],
      },
      {
        name: 'Ile Sainte Marie',
        imgKey: 'sainteMarie',
        badge: { fr: 'Ile & baleines', en: 'Island & whales' },
        description: {
          fr: 'Ile paradisiaque au large de Toamasina, celebre pour ses plages, ses fonds coralliens et l observation des baleines a bosse entre juillet et septembre.',
          en: 'A paradise island off Toamasina, famous for its beaches, coral reefs and humpback whale watching between July and September.',
        },
        tags: ['ile', 'plage', 'baleines'],
      },
    ],
  },
  {
    key: 'rn7',
    road: { fr: 'RN7 - vers le Sud', en: 'RN7 - towards the South' },
    title: { fr: 'RN7 : la grande traversee du Sud', en: 'RN7: the great southern crossing' },
    pitch: {
      fr: 'La route la plus mythique de Madagascar : artisanat des hautes terres, forets tropicales, canyons de gres et immensites du Sud jusqu a Toliara.',
      en: 'Madagascar most legendary road: highland craftsmanship, tropical rainforest, sandstone canyons and the vast southern landscapes down to Toliara.',
    },
    vehicleHint: { fr: 'SUV ou van', en: 'SUV or van' },
    accent: 'ember',
    sites: [
      {
        name: 'Forgerons d Ambatolampy',
        imgKey: 'ambatolampy',
        badge: { fr: 'Artisanat', en: 'Craft' },
        description: {
          fr: 'Ville reputee pour ses fonderies artisanales d aluminium recycle, ou marmites et objets sont coules a la main devant les visiteurs.',
          en: 'A town known for its artisanal recycled-aluminium foundries, where pots and tools are hand-cast in front of visitors.',
        },
        tags: ['artisanat', 'culture'],
      },
      {
        name: 'Fabrication de miniatures a Antsirabe',
        imgKey: 'antsirabe',
        badge: { fr: 'Artisanat', en: 'Craft' },
        description: {
          fr: 'Capitale thermale des hautes terres, celebre pour ses pousse-pousse decores et ses ateliers de voitures miniatures en boites de conserve recyclees.',
          en: 'The highlands thermal capital, famous for its decorated rickshaws and workshops making miniature cars from recycled tin cans.',
        },
        tags: ['artisanat', 'ville'],
      },
      {
        name: 'Sculpture d Ambositra et village des Zafimaniry',
        imgKey: 'zafimaniry',
        badge: { fr: 'Patrimoine UNESCO', en: 'UNESCO heritage' },
        description: {
          fr: 'Capitale malgache du bois sculpte, porte d entree vers les villages Zafimaniry dont le savoir-faire de marqueterie est classe par l UNESCO.',
          en: 'Madagascar wood-carving capital, gateway to the Zafimaniry villages whose marquetry craftsmanship is UNESCO-listed.',
        },
        tags: ['artisanat', 'unesco'],
      },
      {
        name: 'Parc National de Ranomafana',
        imgKey: 'ranomafana',
        badge: { fr: 'Foret tropicale', en: 'Rainforest' },
        description: {
          fr: 'Foret tropicale humide abritant le lemurien aux bambous dore, des sources thermales et un reseau de sentiers entre cascades et riviere.',
          en: 'Humid rainforest home to the golden bamboo lemur, hot springs and a trail network winding past waterfalls and the river.',
        },
        tags: ['foret', 'lemuriens', 'sources chaudes'],
      },
      {
        name: 'Sahambavy',
        imgKey: 'sahambavy',
        badge: { fr: 'Plantation de the', en: 'Tea plantation' },
        description: {
          fr: 'Seule plantation de the de Madagascar, nichee dans des collines verdoyantes pres de Fianarantsoa, avec visite des jardins et de l usine.',
          en: 'Madagascar only tea plantation, set in green hills near Fianarantsoa, with tours of the gardens and the factory.',
        },
        tags: ['agriculture', 'panorama'],
      },
      {
        name: 'Parc National Andringitra (Fianarantsoa)',
        imgKey: 'andringitra',
        badge: { fr: 'Montagnes', en: 'Mountains' },
        description: {
          fr: 'Massif granitique abritant le Pic Boby, deuxieme sommet de Madagascar, avec des paysages de haute montagne et une biodiversite exceptionnelle.',
          en: 'A granite massif home to Pic Boby, Madagascar second-highest peak, with high-mountain scenery and exceptional biodiversity.',
        },
        tags: ['randonnee', 'montagne'],
      },
      {
        name: 'Reserve communautaire Anja (Ambalavao)',
        imgKey: 'anja',
        badge: { fr: 'Makis catta', en: 'Ring-tailed lemurs' },
        description: {
          fr: 'Reserve geree par la communaute locale, connue pour ses colonies de makis catta evoluant librement au milieu des blocs de granite.',
          en: 'A community-managed reserve famous for its ring-tailed lemur colonies roaming freely among granite boulders.',
        },
        tags: ['lemuriens', 'communautaire'],
      },
      {
        name: 'Parc National de l Isalo',
        imgKey: 'isalo',
        badge: { fr: 'Canyons de gres', en: 'Sandstone canyons' },
        description: {
          fr: 'Massif de gres sculpte par l erosion : piscines naturelles, canyon des Singes, canyon des Rats et couchers de soleil sur la Fenetre de l Isalo.',
          en: 'A sandstone massif carved by erosion: natural pools, Monkey Canyon, Rat Canyon and sunsets at the Isalo Window rock formation.',
        },
        tags: ['canyons', 'randonnee', 'iconique'],
      },
      {
        name: 'Toliara (Tulear) et ses sites',
        imgKey: 'toliara',
        badge: { fr: 'Sud & lagon', en: 'South & lagoon' },
        description: {
          fr: 'Ville du bout de la RN7, tremplin vers Ifaty, les recifs coralliens, les baobabs du Sud et l arboretum d Antsokay.',
          en: 'The town at the end of the RN7, springboard to Ifaty, coral reefs, southern baobabs and the Antsokay arboretum.',
        },
        tags: ['plage', 'baobabs', 'lagon'],
      },
    ],
  },
  {
    key: 'rn34',
    road: { fr: 'RN34 - vers Morondava', en: 'RN34 - towards Morondava' },
    title: { fr: 'RN34 : baobabs et tsingy de l Ouest', en: 'RN34: baobabs and western tsingy' },
    pitch: {
      fr: 'Route mythique vers Morondava, la foret seche, l allee des baobabs et les tsingy de Bemaraha, en 4x4 pour la partie non revetue.',
      en: 'The legendary road to Morondava, dry forest, the Avenue of the Baobabs and the Bemaraha tsingy, by 4x4 on the unpaved stretch.',
    },
    vehicleHint: { fr: '4x4 obligatoire', en: '4x4 required' },
    accent: 'clay',
    sites: [
      {
        name: 'Allee des Baobabs (Morondava)',
        imgKey: 'baobabs',
        badge: { fr: 'Site iconique', en: 'Iconic site' },
        description: {
          fr: 'Alignement spectaculaire de baobabs geants vieux de 800 ans, incontournable au coucher du soleil, a 20 minutes de Morondava.',
          en: 'A spectacular row of 800-year-old giant baobabs, unmissable at sunset, 20 minutes from Morondava.',
        },
        tags: ['baobabs', 'photo', 'iconique'],
      },
      {
        name: 'Tsingy de Bemaraha (Grand et Petit Tsingy)',
        imgKey: 'bemaraha',
        badge: { fr: 'UNESCO', en: 'UNESCO' },
        description: {
          fr: 'Labyrinthe de pinacles calcaires classe au patrimoine mondial, explore via des parcours cables suspendus entre les aiguilles de pierre.',
          en: 'A labyrinth of limestone pinnacles listed as a World Heritage site, explored via via-ferrata style routes among the stone spires.',
        },
        tags: ['4x4', 'unesco', 'aventure'],
      },
      {
        name: 'Grotte et gorges de la Manambolo',
        imgKey: 'manambolo',
        badge: { fr: 'Grotte & riviere', en: 'Cave & river' },
        description: {
          fr: 'Descente en pirogue des gorges de la Manambolo, ponctuee par la visite d une grotte sacree et de falaises calcaires abruptes.',
          en: 'A canoe trip through the Manambolo gorges, punctuated by a visit to a sacred cave and steep limestone cliffs.',
        },
        tags: ['riviere', 'grotte'],
      },
      {
        name: 'Foret de Kirindy',
        imgKey: 'kirindy',
        badge: { fr: 'Foret seche', en: 'Dry forest' },
        description: {
          fr: 'Foret seche protegee abritant le fossa, plus grand predateur de Madagascar, et plusieurs especes de lemuriens nocturnes.',
          en: 'A protected dry forest home to the fossa, Madagascar largest predator, and several nocturnal lemur species.',
        },
        tags: ['foret', 'faune nocturne'],
      },
      {
        name: 'Akiba Lodge',
        imgKey: 'akiba',
        badge: { fr: 'Etape nature', en: 'Nature stopover' },
        description: {
          fr: 'Etape lodge au calme entre foret et rizieres sur la route de Bekopaka, ideale pour couper la longue piste vers les tsingy.',
          en: 'A quiet lodge stopover between forest and rice paddies on the road to Bekopaka, ideal for breaking up the long track to the tsingy.',
        },
        tags: ['hebergement', 'detente'],
      },
      {
        name: 'Village des pecheurs de Betania',
        imgKey: 'betania',
        badge: { fr: 'Vie locale', en: 'Local life' },
        description: {
          fr: 'Village de pecheurs traditionnels aux portes de Morondava, pirogues a balancier et scenes de vie cotiere authentiques.',
          en: 'A traditional fishing village on the edge of Morondava, outrigger canoes and authentic coastal life.',
        },
        tags: ['culture', 'cote'],
      },
      {
        name: 'Parc Zazamalala',
        imgKey: 'zazamalala',
        badge: { fr: 'Reserve privee', en: 'Private reserve' },
        description: {
          fr: 'Reserve privee de foret seche pres de Belo-sur-Tsiribihina, dediee a la conservation de la faune locale et a l ecotourisme.',
          en: 'A private dry-forest reserve near Belo-sur-Tsiribihina, dedicated to conserving local wildlife and ecotourism.',
        },
        tags: ['nature', 'conservation'],
      },
      {
        name: 'Descente de la Tsiribihina',
        imgKey: 'tsiribihina',
        badge: { fr: 'Aventure fluviale', en: 'River adventure' },
        description: {
          fr: 'Descente en pirogue ou en bateau du fleuve Tsiribihina sur plusieurs jours, entre villages riverains, bivouacs sur plage et faune sauvage.',
          en: 'A multi-day canoe or boat descent of the Tsiribihina river, between riverside villages, beach camps and wildlife.',
        },
        tags: ['riviere', 'aventure'],
      },
    ],
  },
  {
    key: 'rn4',
    road: { fr: 'RN4 - vers le Nord-Ouest', en: 'RN4 - towards the North-West' },
    title: { fr: 'RN4 : vers Mahajanga', en: 'RN4: towards Mahajanga' },
    pitch: {
      fr: 'De Tana a Mahajanga, la RN4 traverse une foret seche protegee puis rejoint la cote au climat chaud et aux falaises de laterite rouge.',
      en: 'From Tana to Mahajanga, the RN4 crosses a protected dry forest before reaching a warm coast lined with red laterite cliffs.',
    },
    vehicleHint: { fr: 'Berline ou SUV', en: 'Sedan or SUV' },
    accent: 'canopy',
    sites: [
      {
        name: 'Parc National Ankarafantsika',
        imgKey: 'ankarafantsika',
        badge: { fr: 'Foret seche', en: 'Dry forest' },
        description: {
          fr: 'Grande foret seche traversee directement par la RN4, refuge de baobabs, de sifakas et d une riche avifaune autour du lac Ravelobe.',
          en: 'A large dry forest crossed directly by the RN4, home to baobabs, sifaka lemurs and rich birdlife around Lake Ravelobe.',
        },
        tags: ['foret seche', 'oiseaux'],
      },
      {
        name: 'Circuit Rouge (Mahajanga)',
        imgKey: 'circuitRouge',
        badge: { fr: 'Falaises de laterite', en: 'Laterite cliffs' },
        description: {
          fr: 'Falaises et canyons de laterite rouge aux formes sculptees par l erosion, aux portes de Mahajanga, spectaculaires au coucher du soleil.',
          en: 'Red laterite cliffs and canyons carved by erosion at the edge of Mahajanga, spectacular at sunset.',
        },
        tags: ['laterite', 'photo'],
      },
      {
        name: 'Grotte de Belobaka',
        imgKey: 'belobaka',
        badge: { fr: 'Grotte sacree', en: 'Sacred cave' },
        description: {
          fr: 'Reseau de grottes calcaires sacrees pres de Mahajanga, avec stalactites, chauve-souris et un lieu de culte traditionnel toujours actif.',
          en: 'A sacred limestone cave network near Mahajanga, with stalactites, bats and a still-active traditional place of worship.',
        },
        tags: ['grotte', 'culture'],
      },
    ],
  },
  {
    key: 'rn6',
    road: { fr: 'RN6 - Grand Nord', en: 'RN6 - Far North' },
    title: { fr: 'RN6 : Diego Suarez et Nosy Be', en: 'RN6: Diego Suarez and Nosy Be' },
    pitch: {
      fr: 'L extreme Nord malgache : baies decoupees, montagnes couvertes de foret, formations de laterite et les plages tropicales de Nosy Be.',
      en: 'The far north of Madagascar: jagged bays, forested mountains, red laterite formations and the tropical beaches of Nosy Be.',
    },
    vehicleHint: { fr: 'SUV ou 4x4', en: 'SUV or 4x4' },
    accent: 'lagoon',
    sites: [
      {
        name: 'Tsingy Rouge',
        imgKey: 'tsingyRouge',
        badge: { fr: 'Formation unique', en: 'Unique formation' },
        description: {
          fr: 'Pinacles de laterite rouge et blanche sculptes par l erosion, un decor lunaire spectaculaire a moins d une heure de Diego Suarez.',
          en: 'Red and white laterite pinnacles carved by erosion, a spectacular moon-like landscape under an hour from Diego Suarez.',
        },
        tags: ['laterite', 'photo'],
      },
      {
        name: 'Baie de Sakalava',
        imgKey: 'sakalava',
        badge: { fr: 'Kitesurf', en: 'Kitesurfing' },
        description: {
          fr: 'Grande baie ventee prisee des amateurs de kitesurf, avec eaux turquoise et dunes de sable a proximite de Diego Suarez.',
          en: 'A large windy bay popular with kitesurfers, with turquoise waters and sand dunes near Diego Suarez.',
        },
        tags: ['plage', 'sport'],
      },
      {
        name: 'Lac sacre Antanavo (Anivorano)',
        imgKey: 'antanavo',
        badge: { fr: 'Lac aux crocodiles', en: 'Crocodile lake' },
        description: {
          fr: 'Lac sacre pres d Anivorano-Nord, reconnu pour ses crocodiles consideres comme sacres par les communautes locales.',
          en: 'A sacred lake near Anivorano-Nord, known for crocodiles regarded as sacred by local communities.',
        },
        tags: ['lac', 'culture'],
      },
      {
        name: 'Plage de Ramena',
        imgKey: 'ramena',
        badge: { fr: 'Plage', en: 'Beach' },
        description: {
          fr: 'Village de pecheurs et plage de sable blanc pres de Diego Suarez, point de depart des excursions vers les trois baies et Nosy Lonjo.',
          en: 'A fishing village and white sand beach near Diego Suarez, starting point for trips to the three bays and Nosy Lonjo.',
        },
        tags: ['plage', 'famille'],
      },
      {
        name: 'Cap d Ambre',
        imgKey: 'capAmbre',
        badge: { fr: 'Extreme Nord', en: 'Northern tip' },
        description: {
          fr: 'Point le plus septentrional de Madagascar, phare isole battu par les vents entre ocean Indien et canal du Mozambique.',
          en: 'Madagascar northernmost point, an isolated wind-swept lighthouse between the Indian Ocean and the Mozambique Channel.',
        },
        tags: ['aventure', 'panorama'],
      },
      {
        name: 'Montagne des Francais',
        imgKey: 'montagneFrancais',
        badge: { fr: 'Randonnee', en: 'Hiking' },
        description: {
          fr: 'Massif rocheux surplombant la baie de Diego Suarez, entre foret seche, grottes et vestiges militaires, avec vue panoramique.',
          en: 'A rocky massif overlooking Diego Suarez bay, mixing dry forest, caves and military ruins, with panoramic views.',
        },
        tags: ['randonnee', 'panorama'],
      },
      {
        name: 'Parc National Montagne d Ambre',
        imgKey: 'montagneAmbre',
        badge: { fr: 'Foret d altitude', en: 'Montane forest' },
        description: {
          fr: 'Foret humide d altitude aux cascades et lacs de cratere, refuge de plusieurs especes de cameleons et de lemuriens endemiques.',
          en: 'A humid montane forest with waterfalls and crater lakes, home to several endemic chameleon and lemur species.',
        },
        tags: ['foret', 'cascades'],
      },
      {
        name: 'Nosy Be, Hell-Ville et ses sites',
        imgKey: 'nosyBe',
        badge: { fr: 'Ile aux parfums', en: 'Perfume island' },
        description: {
          fr: 'Ile principale de l archipel, entre marche animes de Hell-Ville, plantations d ylang-ylang, Mont Passot et plages d Andilana ou Nosy Komba.',
          en: 'The main island of the archipelago, from the lively markets of Hell-Ville to ylang-ylang plantations, Mont Passot and the beaches of Andilana or Nosy Komba.',
        },
        tags: ['ile', 'plage', 'nature'],
      },
    ],
  },
]
