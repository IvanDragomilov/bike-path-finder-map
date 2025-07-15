import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Route, Facility } from '@/data/routes';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LocateFixed, Navigation } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MapProps {
  selectedRoute: Route | null;
  facilities: Facility[];
  facilityVisibility: {
    equipment: boolean;
    repair: boolean;
    club: boolean;
  };
}

const MAPBOX_TOKEN = 'pk.example'; // User needs to provide their token

export function Map({ selectedRoute, facilities, facilityVisibility }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const { toast } = useToast();

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [4.9041, 50.8476], // Center of Europe
      zoom: 4.5,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add geolocate control
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
      showUserHeading: true
    });
    
    map.current.addControl(geolocate, 'top-right');

    geolocate.on('geolocate', (e: any) => {
      setUserLocation([e.coords.longitude, e.coords.latitude]);
    });

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  // Update route on map
  useEffect(() => {
    if (!map.current || !selectedRoute) return;

    // Remove existing route layers
    if (map.current.getLayer('route-line')) {
      map.current.removeLayer('route-line');
    }
    if (map.current.getSource('route')) {
      map.current.removeSource('route');
    }

    // Add route line
    map.current.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: selectedRoute.coordinates
        }
      }
    });

    map.current.addLayer({
      id: 'route-line',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#2563eb',
        'line-width': 4,
        'line-opacity': 0.8
      }
    });

    // Fit map to route bounds
    const bounds = new mapboxgl.LngLatBounds();
    selectedRoute.coordinates.forEach(coord => bounds.extend(coord));
    map.current.fitBounds(bounds, { padding: 50 });

  }, [selectedRoute]);

  // Update facilities on map
  useEffect(() => {
    if (!map.current) return;

    // Remove existing facility markers
    const existingMarkers = document.querySelectorAll('.facility-marker');
    existingMarkers.forEach(marker => marker.remove());

    // Add facility markers
    facilities.forEach(facility => {
      if (!facilityVisibility[facility.type]) return;

      const el = document.createElement('div');
      el.className = 'facility-marker';
      el.style.width = '20px';
      el.style.height = '20px';
      el.style.borderRadius = '50%';
      el.style.cursor = 'pointer';
      
      const colors = {
        equipment: '#10b981', // green
        repair: '#f59e0b',    // orange
        club: '#8b5cf6'       // purple
      };
      
      el.style.backgroundColor = colors[facility.type];
      el.style.border = '2px solid white';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-2">
          <h3 class="font-semibold text-sm">${facility.name}</h3>
          <p class="text-xs text-gray-600 mb-1">${facility.address}</p>
          <p class="text-xs">${facility.description}</p>
          <div class="flex items-center mt-1">
            <span class="text-xs">Rating: ${facility.rating}/5</span>
          </div>
        </div>
      `);

      new mapboxgl.Marker(el)
        .setLngLat(facility.coordinates)
        .setPopup(popup)
        .addTo(map.current!);
    });
  }, [facilities, facilityVisibility]);

  const locateUser = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support geolocation.",
        variant: "destructive"
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: [number, number] = [position.coords.longitude, position.coords.latitude];
        setUserLocation(coords);
        
        if (map.current) {
          map.current.flyTo({ center: coords, zoom: 15 });
          
          // Add user marker
          new mapboxgl.Marker({ color: '#ef4444' })
            .setLngLat(coords)
            .addTo(map.current);
        }
        
        toast({
          title: "Location found",
          description: "Your location has been updated on the map."
        });
      },
      (error) => {
        toast({
          title: "Location error",
          description: "Unable to retrieve your location. Please enable location services.",
          variant: "destructive"
        });
      }
    );
  };

  if (!mapboxToken) {
    return (
      <Card className="p-6 text-center">
        <h3 className="text-lg font-semibold mb-4">Map Configuration Required</h3>
        <p className="text-muted-foreground mb-4">
          To use the map, please enter your Mapbox public token. 
          Get one for free at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a>
        </p>
        <div className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Enter your Mapbox token"
            className="w-full p-2 border rounded-md mb-4"
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
          />
          <Button onClick={() => setMapboxToken(mapboxToken)} disabled={!mapboxToken}>
            Load Map
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="relative h-full">
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
      
      {/* Location controls */}
      <div className="absolute top-4 left-4 space-y-2">
        <Button
          variant="secondary"
          size="icon"
          onClick={locateUser}
          className="shadow-lg"
        >
          <LocateFixed className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Route info overlay */}
      {selectedRoute && (
        <Card className="absolute bottom-4 left-4 p-4 bg-card/95 backdrop-blur">
          <h3 className="font-semibold text-sm mb-1">{selectedRoute.name}</h3>
          <p className="text-xs text-muted-foreground">
            {selectedRoute.distance}km • {selectedRoute.difficulty} • {selectedRoute.duration}
          </p>
        </Card>
      )}
    </div>
  );
}