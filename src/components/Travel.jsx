import { useState } from 'react'
import TravelModal from './TravelModal'
import './Travel.css'

const PAGE_SIZE = 6

const destinations = [
  {
    name: 'Malaysia',
    tag: 'Rainforests & City Lights',
    desc: 'From the buzzing streets of Kuala Lumpur to ancient rainforests — a country of stunning contrasts and overwhelming warmth.',
    emoji: '🌴',
    accent: '#00d4aa',
    mapCenter: [4.2105, 101.9758],
    mapZoom: 6,
    coords: '4.2105° N, 101.9758° E',
    year: '2024',
    pins: [
      { name: 'Kuala Lumpur', lat: 3.1390, lng: 101.6869 },
      { name: 'Penang', lat: 5.4141, lng: 100.3288 },
      { name: 'Batu Caves', lat: 3.2379, lng: 101.6840 },
      { name: 'Malacca', lat: 2.1896, lng: 102.2501 },
    ],
    images: [
      '/malaysia/twintower.PNG',
      '/malaysia/twintowernight.png',
      '/malaysia/twintowerrain.png',
      '/malaysia/mosque.png',
      '/malaysia/temple.png',
      '/malaysia/chinesetemple.png',
      '/malaysia/chinesetempletower.png',
      '/malaysia/blueparrot.png',
      '/malaysia/redblueparrot.png',
      '/malaysia/fish.png',
      '/malaysia/swan.png',
      '/malaysia/murgi.png',
      '/malaysia/drink.png',
    ],
    itinerary: [
      {
        day: 1, title: 'Kuala Lumpur',
        activities: [
          { time: 'Morning',   icon: '✈️', place: 'KLIA Arrival',          desc: 'Land at Kuala Lumpur International Airport, check in.' },
          { time: 'Afternoon', icon: '🗼', place: 'Petronas Twin Towers',   desc: 'Iconic skyline view from the sky bridge on level 41.' },
          { time: 'Evening',   icon: '🍜', place: 'Jalan Alor',             desc: 'Street food heaven — char kway teow, satay & more.' },
        ],
      },
      {
        day: 2, title: 'Batu Caves & City',
        activities: [
          { time: 'Morning',   icon: '🕌', place: 'Batu Caves',             desc: '272 rainbow steps up to the sacred Hindu shrine.' },
          { time: 'Afternoon', icon: '🛍️', place: 'Bukit Bintang',          desc: 'Shopping and café-hopping in KL\'s trendiest district.' },
          { time: 'Evening',   icon: '🌃', place: 'KL Tower Observation',   desc: 'Panoramic night view of the glittering city below.' },
        ],
      },
      {
        day: 3, title: 'Malacca Day Trip',
        activities: [
          { time: 'Morning',   icon: '🚌', place: 'Journey to Malacca',     desc: '2-hour bus ride through palm oil plantations.' },
          { time: 'Afternoon', icon: '🏯', place: 'A Famosa Fort',           desc: 'Portuguese colonial ruins and Stadthuys red square.' },
          { time: 'Evening',   icon: '🛶', place: 'Malacca River Cruise',   desc: 'Lit-up murals and old shophouses from the water.' },
        ],
      },
      {
        day: 4, title: 'Penang',
        activities: [
          { time: 'Morning',   icon: '✈️', place: 'Fly to Penang',          desc: 'Short domestic flight to the Pearl of the Orient.' },
          { time: 'Afternoon', icon: '🎨', place: 'Georgetown Street Art',  desc: 'Hunt down Ernest Zacharevic\'s famous murals.' },
          { time: 'Evening',   icon: '🍛', place: 'Penang Hawker Centre',   desc: 'Best assam laksa and cendol in the country.' },
        ],
      },
    ],
  },
  {
    name: 'Singapore',
    tag: 'Architecture & Food',
    desc: 'A gleaming city-state where futuristic gardens, hawker centres, and the richness of diverse cultures collide into one unforgettable place.',
    emoji: '🦁',
    accent: '#38bdf8',
    mapCenter: [1.3521, 103.8198],
    mapZoom: 12,
    coords: '1.3521° N, 103.8198° E',
    year: '2024',
    pins: [
      { name: 'Marina Bay Sands', lat: 1.2834, lng: 103.8607 },
      { name: 'Gardens by the Bay', lat: 1.2816, lng: 103.8636 },
      { name: 'Orchard Road', lat: 1.3048, lng: 103.8318 },
      { name: 'Sentosa Island', lat: 1.2494, lng: 103.8303 },
    ],
    images: [
      'https://picsum.photos/seed/sgmbs1/420/320',
      'https://picsum.photos/seed/sggb2/320/420',
      'https://picsum.photos/seed/sgor3/360/280',
      'https://picsum.photos/seed/sgst4/290/330',
    ],
    itinerary: [
      {
        day: 1, title: 'Marina Bay',
        activities: [
          { time: 'Morning',   icon: '🏙️', place: 'Marina Bay Sands',       desc: 'Infinity pool views and the iconic hotel silhouette.' },
          { time: 'Afternoon', icon: '🌿', place: 'Gardens by the Bay',     desc: 'Supertrees, Cloud Forest dome and Flower Dome.' },
          { time: 'Evening',   icon: '💡', place: 'Light & Water Show',     desc: 'Spectra show at the waterfront promenade.' },
        ],
      },
      {
        day: 2, title: 'Culture & Food',
        activities: [
          { time: 'Morning',   icon: '🛍️', place: 'Orchard Road',           desc: 'World-class malls and flagship stores.' },
          { time: 'Afternoon', icon: '🏮', place: 'Chinatown & Hawkers',    desc: 'Maxwell Food Centre — chicken rice, laksa, kaya toast.' },
          { time: 'Evening',   icon: '🌉', place: 'Clarke Quay',            desc: 'Riverside bars and neon-lit night energy.' },
        ],
      },
      {
        day: 3, title: 'Sentosa Island',
        activities: [
          { time: 'Morning',   icon: '🎢', place: 'Universal Studios',      desc: 'Rides, shows and Hollywood-themed zones.' },
          { time: 'Afternoon', icon: '🏖️', place: 'Siloso Beach',           desc: 'White sand, cable ski and beach bars.' },
          { time: 'Evening',   icon: '✈️', place: 'Departure',              desc: 'Head to Changi — best airport in the world.' },
        ],
      },
    ],
  },
  {
    name: 'Indonesia',
    tag: 'Islands & Culture',
    desc: 'Thousands of islands, volcanic peaks, terraced rice fields, and a warmth in the people that stays long after you leave.',
    emoji: '🌋',
    accent: '#f59e0b',
    mapCenter: [-2.5489, 118.0149],
    mapZoom: 5,
    coords: '2.5489° S, 118.0149° E',
    year: '2024',
    pins: [
      { name: 'Bali', lat: -8.4095, lng: 115.1889 },
      { name: 'Jakarta', lat: -6.2088, lng: 106.8456 },
      { name: 'Yogyakarta', lat: -7.7956, lng: 110.3695 },
      { name: 'Komodo Island', lat: -8.5500, lng: 119.4926 },
    ],
    images: [
      'https://picsum.photos/seed/idbali1/420/320',
      'https://picsum.photos/seed/idjkt2/320/420',
      'https://picsum.photos/seed/idyog3/360/280',
      'https://picsum.photos/seed/idkom4/290/330',
    ],
    itinerary: [
      {
        day: 1, title: 'Jakarta',
        activities: [
          { time: 'Morning',   icon: '✈️', place: 'Jakarta Arrival',        desc: 'Land at Soekarno–Hatta, explore old Batavia district.' },
          { time: 'Afternoon', icon: '🏛️', place: 'National Monument',      desc: 'Monas tower and the surrounding history museum.' },
          { time: 'Evening',   icon: '🍢', place: 'Street Food Night',      desc: 'Sate, gado-gado and martabak from roadside stalls.' },
        ],
      },
      {
        day: 2, title: 'Yogyakarta',
        activities: [
          { time: 'Morning',   icon: '🌄', place: 'Borobudur Sunrise',      desc: 'Watch dawn break over the world\'s largest Buddhist temple.' },
          { time: 'Afternoon', icon: '🏯', place: 'Prambanan Temple',       desc: 'Towering Hindu shrines in a lush jungle setting.' },
          { time: 'Evening',   icon: '🎭', place: 'Ramayana Ballet',        desc: 'Open-air Ramayana performance with Merapi as backdrop.' },
        ],
      },
      {
        day: 3, title: 'Bali Arrival',
        activities: [
          { time: 'Morning',   icon: '✈️', place: 'Fly to Bali',            desc: 'Short flight from Yogyakarta to Ngurah Rai.' },
          { time: 'Afternoon', icon: '🌾', place: 'Tegallalang Rice Fields', desc: 'Iconic terraced paddies and swings over the valley.' },
          { time: 'Evening',   icon: '🌊', place: 'Tanah Lot Sunset',       desc: 'Sea temple silhouette against a fiery sunset.' },
        ],
      },
      {
        day: 4, title: 'Ubud & Culture',
        activities: [
          { time: 'Morning',   icon: '🐒', place: 'Monkey Forest',          desc: 'Ancient temple sanctuary with hundreds of macaques.' },
          { time: 'Afternoon', icon: '🎨', place: 'Ubud Art Market',        desc: 'Batik, woodcarving and silver jewellery.' },
          { time: 'Evening',   icon: '🍃', place: 'Spa & Wellness',         desc: 'Traditional Balinese massage with jungle soundtrack.' },
        ],
      },
    ],
  },
  {
    name: 'Thailand',
    tag: 'Temples & Street Food',
    desc: 'Golden temples, turquoise beaches, and street food that makes every meal an adventure — Thailand is pure sensory bliss.',
    emoji: '🐘',
    accent: '#818cf8',
    mapCenter: [15.8700, 100.9925],
    mapZoom: 6,
    coords: '15.8700° N, 100.9925° E',
    year: '2024',
    pins: [
      { name: 'Bangkok', lat: 13.7563, lng: 100.5018 },
      { name: 'Chiang Mai', lat: 18.7883, lng: 98.9853 },
      { name: 'Phuket', lat: 7.8804, lng: 98.3923 },
      { name: 'Phi Phi Islands', lat: 7.7407, lng: 98.7784 },
    ],
    images: [
      'https://picsum.photos/seed/thbkk1/420/320',
      'https://picsum.photos/seed/thcnx2/320/420',
      'https://picsum.photos/seed/thpkt3/360/280',
      'https://picsum.photos/seed/thphi4/290/330',
    ],
    itinerary: [
      {
        day: 1, title: 'Bangkok Temples',
        activities: [
          { time: 'Morning',   icon: '⛩️', place: 'Wat Phra Kaew',          desc: 'The Grand Palace and the sacred Emerald Buddha.' },
          { time: 'Afternoon', icon: '🛶', place: 'Chao Phraya',            desc: 'Longtail boat through floating markets and canals.' },
          { time: 'Evening',   icon: '🌃', place: 'Khao San Road',          desc: 'Buzzing backpacker strip — pad thai & mango sticky rice.' },
        ],
      },
      {
        day: 2, title: 'Chiang Mai',
        activities: [
          { time: 'Morning',   icon: '✈️', place: 'Fly to Chiang Mai',      desc: 'Short flight north to the cultural capital of Thailand.' },
          { time: 'Afternoon', icon: '🐘', place: 'Elephant Sanctuary',     desc: 'Ethical interaction with rescued elephants in the forest.' },
          { time: 'Evening',   icon: '🏮', place: 'Night Bazaar',           desc: 'Handcrafted goods, lanterns and northern Thai cuisine.' },
        ],
      },
      {
        day: 3, title: 'Phuket & Islands',
        activities: [
          { time: 'Morning',   icon: '✈️', place: 'Fly to Phuket',          desc: 'Head south to Thailand\'s most famous island.' },
          { time: 'Afternoon', icon: '🏝️', place: 'Phi Phi Islands',        desc: 'Speedboat tour — Maya Bay, emerald lagoons, snorkeling.' },
          { time: 'Evening',   icon: '🌅', place: 'Promthep Cape',          desc: 'Phuket\'s best sunset viewpoint over the Andaman Sea.' },
        ],
      },
    ],
  },
  {
    name: 'Langkawi, Malaysia',
    tag: 'Beaches & Mangroves',
    desc: 'Duty-free island paradise with powder-white beaches, emerald mangroves, dramatic sunsets, and a sky cable car that takes your breath away.',
    emoji: '🏝️',
    accent: '#ff6b6b',
    mapCenter: [6.3500, 99.8000],
    mapZoom: 11,
    coords: '6.3500° N, 99.8000° E',
    year: '2024',
    pins: [
      { name: 'Langkawi Sky Bridge', lat: 6.3718, lng: 99.6663 },
      { name: 'Eagle Square', lat: 6.3244, lng: 99.8542 },
      { name: 'Pantai Cenang', lat: 6.2894, lng: 99.7190 },
      { name: 'Kilim Geoforest', lat: 6.4300, lng: 100.0800 },
    ],
    images: [
      'https://picsum.photos/seed/lgsb1/420/320',
      'https://picsum.photos/seed/lgeq2/320/420',
      'https://picsum.photos/seed/lgpc3/360/280',
      'https://picsum.photos/seed/lgkg4/290/330',
    ],
    itinerary: [
      {
        day: 1, title: 'Arrival & Cable Car',
        activities: [
          { time: 'Morning',   icon: '✈️', place: 'Langkawi Airport',       desc: 'Arrive at the island, check into a beachfront resort.' },
          { time: 'Afternoon', icon: '🚡', place: 'Sky Cable Car',          desc: 'Steep gondola ride to the mountain peak and sky bridge.' },
          { time: 'Evening',   icon: '🦅', place: 'Eagle Square',           desc: 'Giant eagle statue and waterfront promenade at dusk.' },
        ],
      },
      {
        day: 2, title: 'Island Hopping',
        activities: [
          { time: 'Morning',   icon: '🚤', place: 'Island Hopping Tour',    desc: 'Pulau Dayang Bunting lake, Pulau Singa Besar wildlife.' },
          { time: 'Afternoon', icon: '🤿', place: 'Coral Snorkeling',       desc: 'Crystal-clear waters and vibrant reef fish.' },
          { time: 'Evening',   icon: '🍹', place: 'Pantai Cenang Sunset',   desc: 'Beach bar golden hour with duty-free cocktails.' },
        ],
      },
      {
        day: 3, title: 'Mangroves & Departure',
        activities: [
          { time: 'Morning',   icon: '🌿', place: 'Kilim Geoforest',        desc: 'Boat through ancient mangroves, spot eagles and bats.' },
          { time: 'Afternoon', icon: '🛍️', place: 'Duty-Free Shopping',    desc: 'Chocolates, spirits and local crafts at Kuah town.' },
          { time: 'Evening',   icon: '✈️', place: 'Departure',              desc: 'Fly out with a sunset view of the Andaman archipelago.' },
        ],
      },
    ],
  },
  {
    name: 'Hong Kong',
    tag: 'Skyline & Dim Sum',
    desc: 'A city of dazzling contrasts — neon-lit night markets, towering skyscrapers, misty mountains, and the best dim sum you\'ll ever taste.',
    emoji: '🏙️',
    accent: '#f472b6',
    mapCenter: [22.3193, 114.1694],
    mapZoom: 11,
    coords: '22.3193° N, 114.1694° E',
    year: '2024',
    pins: [
      { name: 'Victoria Peak', lat: 22.2759, lng: 114.1455 },
      { name: 'Tsim Sha Tsui', lat: 22.2988, lng: 114.1722 },
      { name: 'Mong Kok', lat: 22.3193, lng: 114.1694 },
      { name: 'Lantau Island', lat: 22.2580, lng: 113.9450 },
    ],
    images: [
      'https://picsum.photos/seed/hkvp1/420/320',
      'https://picsum.photos/seed/hktst2/320/420',
      'https://picsum.photos/seed/hkmk3/360/280',
      'https://picsum.photos/seed/hkli4/290/330',
    ],
    itinerary: [
      {
        day: 1, title: 'Kowloon & Harbour',
        activities: [
          { time: 'Morning',   icon: '🥟', place: 'Dim Sum Breakfast',      desc: 'Traditional yum cha at a classic teahouse in Mong Kok.' },
          { time: 'Afternoon', icon: '🛍️', place: 'Tsim Sha Tsui',          desc: 'Harbour promenade, Avenue of Stars and city views.' },
          { time: 'Evening',   icon: '✨', place: 'Symphony of Lights',     desc: 'Iconic laser & light show across Victoria Harbour.' },
        ],
      },
      {
        day: 2, title: 'Victoria Peak & Island',
        activities: [
          { time: 'Morning',   icon: '🚋', place: 'Peak Tram',              desc: 'Historic funicular up to Victoria Peak for panoramic views.' },
          { time: 'Afternoon', icon: '🏮', place: 'Hollywood Road',         desc: 'Antique shops, Man Mo Temple and PMQ creative hub.' },
          { time: 'Evening',   icon: '🦐', place: 'Seafood at Lei Yue Mun', desc: 'Choose your catch fresh from the tanks, cooked to order.' },
        ],
      },
      {
        day: 3, title: 'Lantau Island',
        activities: [
          { time: 'Morning',   icon: '🚡', place: 'Ngong Ping Cable Car',   desc: 'Scenic gondola ride over lush mountain and coastline.' },
          { time: 'Afternoon', icon: '🗿', place: 'Tian Tan Big Buddha',    desc: '34-metre bronze Buddha atop Lantau mountain.' },
          { time: 'Evening',   icon: '🌃', place: 'Night Markets',          desc: 'Temple Street night market — jade, street food, fortune tellers.' },
        ],
      },
    ],
  },
  {
    name: 'India',
    tag: 'Heritage & Colours',
    desc: 'A sensory explosion of spice, colour, and history — from Mughal palaces and Rajasthan forts to Goan beaches and the spiritual banks of the Ganges.',
    emoji: '🇮🇳',
    accent: '#f97316',
    mapCenter: [20.5937, 78.9629],
    mapZoom: 5,
    coords: '20.5937° N, 78.9629° E',
    year: '2023',
    pins: [
      { name: 'New Delhi', lat: 28.6139, lng: 77.2090 },
      { name: 'Agra (Taj Mahal)', lat: 27.1751, lng: 78.0421 },
      { name: 'Jaipur', lat: 26.9124, lng: 75.7873 },
      { name: 'Goa', lat: 15.2993, lng: 74.1240 },
    ],
    images: [
      'https://picsum.photos/seed/indel1/420/320',
      'https://picsum.photos/seed/intaj2/320/420',
      'https://picsum.photos/seed/injpr3/360/280',
      'https://picsum.photos/seed/ingoa4/290/330',
    ],
    itinerary: [
      {
        day: 1, title: 'New Delhi',
        activities: [
          { time: 'Morning',   icon: '✈️', place: 'Delhi Arrival',           desc: 'Land at IGI Airport, check in and head to Old Delhi.' },
          { time: 'Afternoon', icon: '🕌', place: 'Jama Masjid & Chandni',   desc: 'India\'s largest mosque and the chaotic spice bazaar lanes.' },
          { time: 'Evening',   icon: '🏛️', place: 'India Gate at Dusk',      desc: 'Walk the Rajpath, watch the memorial light up at twilight.' },
        ],
      },
      {
        day: 2, title: 'Agra & Taj Mahal',
        activities: [
          { time: 'Morning',   icon: '🌅', place: 'Taj Mahal Sunrise',        desc: 'Watch the marble dome blush pink in the first light of day.' },
          { time: 'Afternoon', icon: '🏯', place: 'Agra Fort',                desc: 'Mughal red sandstone fortress with views of the Taj.' },
          { time: 'Evening',   icon: '🚂', place: 'Train to Jaipur',          desc: 'Scenic train ride through Rajasthan\'s landscape.' },
        ],
      },
      {
        day: 3, title: 'Jaipur — Pink City',
        activities: [
          { time: 'Morning',   icon: '🐘', place: 'Amber Fort',               desc: 'Hilltop Rajput fort with ornate mirror halls and elephant paths.' },
          { time: 'Afternoon', icon: '🏰', place: 'City Palace & Hawa Mahal', desc: 'Palace museums and the iconic five-story "Palace of Winds."' },
          { time: 'Evening',   icon: '🛍️', place: 'Johari Bazaar',            desc: 'Gemstones, block-print fabrics and Rajasthani jewellery.' },
        ],
      },
      {
        day: 4, title: 'Goa',
        activities: [
          { time: 'Morning',   icon: '✈️', place: 'Fly to Goa',               desc: 'Short flight to India\'s beach capital on the Arabian Sea.' },
          { time: 'Afternoon', icon: '⛪', place: 'Old Goa Churches',          desc: 'UNESCO Basilica of Bom Jesus and Se Cathedral in the jungle.' },
          { time: 'Evening',   icon: '🌊', place: 'Anjuna Beach Sunset',       desc: 'Barefoot on white sand, cocktail in hand, as the sun drops.' },
        ],
      },
    ],
  },
]

export default function Travel() {
  const [selected, setSelected] = useState(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const visibleDestinations = destinations.slice(0, visibleCount)
  const hasMore = visibleCount < destinations.length

  return (
    <section id="travel" className="travel">
      <div className="section-label">Travel</div>

      <div className="travel__header">
        <h2 className="travel__heading">
          Places that <span className="gradient-text">shaped me</span>
        </h2>
        <p className="travel__sub">
          Travel is how I grow — it brings me closer to a newer version of myself, gives me space to breathe, reset, and lose myself in breathtaking landscapes, golden sunsets, and the vivid colours the world has to offer.
        </p>
      </div>

      <div className="travel__grid">
        {visibleDestinations.map((d) => (
          <div
            key={d.name}
            className="glass-card travel__card"
            onClick={() => setSelected(d)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setSelected(d)}
          >
            <div className="travel__card-emoji" style={{ '--card-accent': d.accent }}>
              {d.emoji}
            </div>
            <div className="travel__card-tag" style={{ color: d.accent }}>
              {d.tag}
            </div>
            <h3 className="travel__card-name">{d.name}</h3>
            <p className="travel__card-desc">{d.desc}</p>
            <span className="travel__card-cta" style={{ color: d.accent }}>
              Explore →
            </span>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="travel__more">
          <button
            className="btn btn--ghost"
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
          >
            Know More
          </button>
        </div>
      )}

      {selected && (
        <TravelModal destination={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}
