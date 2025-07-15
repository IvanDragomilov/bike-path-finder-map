export interface Route {
  id: string;
  name: string;
  country: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  distance: number;
  elevation: number;
  duration: string;
  description: string;
  coordinates: [number, number][];
  image: string;
  features: string[];
}

export interface Facility {
  id: string;
  name: string;
  type: 'equipment' | 'repair' | 'club';
  coordinates: [number, number];
  address: string;
  rating: number;
  description: string;
}

export const routes: Route[] = [
  {
    id: '1',
    name: 'Alpine Adventure Trail',
    country: 'Switzerland',
    difficulty: 'Hard',
    distance: 85,
    elevation: 2400,
    duration: '6-8 hours',
    description: 'Challenging mountain route through the Swiss Alps with breathtaking views.',
    coordinates: [
      [8.2275, 46.8182], [8.2455, 46.8234], [8.2634, 46.8165], 
      [8.2813, 46.8097], [8.2992, 46.8029]
    ],
    image: '/api/placeholder/300/200',
    features: ['Mountain Views', 'Technical Climbs', 'Alpine Lakes']
  },
  {
    id: '2',
    name: 'Coastal Cruiser',
    country: 'Portugal',
    difficulty: 'Easy',
    distance: 42,
    elevation: 320,
    duration: '3-4 hours',
    description: 'Relaxing coastal ride along the beautiful Portuguese coastline.',
    coordinates: [
      [-9.1393, 38.7223], [-9.1572, 38.7155], [-9.1751, 38.7087], 
      [-9.1930, 38.7019], [-9.2109, 38.6951]
    ],
    image: '/api/placeholder/300/200',
    features: ['Ocean Views', 'Beaches', 'Flat Terrain']
  },
  {
    id: '3',
    name: 'Forest Explorer',
    country: 'Germany',
    difficulty: 'Moderate',
    distance: 58,
    elevation: 890,
    duration: '4-5 hours',
    description: 'Scenic forest trails through the Black Forest region.',
    coordinates: [
      [8.2041, 48.5734], [8.2220, 48.5666], [8.2399, 48.5598], 
      [8.2578, 48.5530], [8.2757, 48.5462]
    ],
    image: '/api/placeholder/300/200',
    features: ['Forest Trails', 'Wildlife', 'Historic Villages']
  },
  {
    id: '4',
    name: 'Mediterranean Explorer',
    country: 'Spain',
    difficulty: 'Moderate',
    distance: 67,
    elevation: 1200,
    duration: '5-6 hours',
    description: 'Discover hidden coves and ancient villages along the Spanish coast.',
    coordinates: [
      [2.1734, 41.3851], [2.1913, 41.3783], [2.2092, 41.3715], 
      [2.2271, 41.3647], [2.2450, 41.3579]
    ],
    image: '/api/placeholder/300/200',
    features: ['Coastal Views', 'Historic Sites', 'Local Culture']
  },
  {
    id: '5',
    name: 'Valley Challenge',
    country: 'France',
    difficulty: 'Hard',
    distance: 95,
    elevation: 3200,
    duration: '7-9 hours',
    description: 'Epic climb through the French Alps with challenging ascents.',
    coordinates: [
      [6.8649, 45.8326], [6.8828, 45.8258], [6.9007, 45.8190], 
      [6.9186, 45.8122], [6.9365, 45.8054]
    ],
    image: '/api/placeholder/300/200',
    features: ['Mountain Passes', 'Glacial Views', 'Col du Galibier']
  },
  {
    id: '6',
    name: 'Countryside Ramble',
    country: 'Netherlands',
    difficulty: 'Easy',
    distance: 35,
    elevation: 50,
    duration: '2-3 hours',
    description: 'Peaceful ride through Dutch countryside with windmills and canals.',
    coordinates: [
      [4.9041, 52.3676], [4.9220, 52.3608], [4.9399, 52.3540], 
      [4.9578, 52.3472], [4.9757, 52.3404]
    ],
    image: '/api/placeholder/300/200',
    features: ['Windmills', 'Canals', 'Tulip Fields']
  }
];

export const facilities: Facility[] = [
  {
    id: 'f1',
    name: 'Alpine Bikes Pro',
    type: 'equipment',
    coordinates: [8.2275, 46.8182],
    address: 'Bahnhofstrasse 15, Interlaken',
    rating: 4.8,
    description: 'Premium cycling equipment and mountain bike rentals.'
  },
  {
    id: 'f2',
    name: 'Quick Fix Repairs',
    type: 'repair',
    coordinates: [-9.1393, 38.7223],
    address: 'Rua da Praia 42, Cascais',
    rating: 4.5,
    description: 'Professional bike repair service with same-day fixes.'
  },
  {
    id: 'f3',
    name: 'Black Forest Cycling Club',
    type: 'club',
    coordinates: [8.2041, 48.5734],
    address: 'Waldweg 8, Baden-Baden',
    rating: 4.7,
    description: 'Join local cyclists for group rides and events.'
  },
  {
    id: 'f4',
    name: 'Barcelona Bike Center',
    type: 'equipment',
    coordinates: [2.1734, 41.3851],
    address: 'Carrer de la Marina 156, Barcelona',
    rating: 4.6,
    description: 'Complete cycling store with expert advice.'
  },
  {
    id: 'f5',
    name: 'Alpine Repair Station',
    type: 'repair',
    coordinates: [6.8649, 45.8326],
    address: 'Route des Alpes 23, Chamonix',
    rating: 4.9,
    description: 'Specialized in mountain bike maintenance and emergency repairs.'
  },
  {
    id: 'f6',
    name: 'Amsterdam Cycling Community',
    type: 'club',
    coordinates: [4.9041, 52.3676],
    address: 'Vondelpark 1, Amsterdam',
    rating: 4.4,
    description: 'Friendly cycling community for all skill levels.'
  }
];