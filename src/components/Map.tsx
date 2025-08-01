import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { LatLngTuple, Icon, DivIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Route, Facility } from '@/data/routes';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LocateFixed } from 'lucide-react';
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

// Fix Leaflet default markers
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom facility icons
const createFacilityIcon = (type: string) => {
  const colors = {
    equipment: '#10b981',
    repair: '#f59e0b', 
    club: '#8b5cf6'
  };
  
  return new DivIcon({
    html: `<div style="background-color: ${colors[type]}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>`,
    className: 'custom-facility-marker',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

// User location marker
const userLocationIcon = new DivIcon({
  html: '<div style="background-color: #ef4444; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
  className: 'user-location-marker',
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});

function MapController({ selectedRoute }: { selectedRoute: Route | null }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedRoute && map) {
      const coordinates = selectedRoute.coordinates.map(coord => [coord[1], coord[0]] as LatLngTuple);
      if (coordinates.length > 0) {
        const bounds = L.latLngBounds(coordinates);
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [selectedRoute, map]);

  return null;
}

export function Map({ selectedRoute, facilities, facilityVisibility }: MapProps) {
  const [userLocation, setUserLocation] = useState<LatLngTuple | null>(null);
  const { toast } = useToast();

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
        const coords: LatLngTuple = [position.coords.latitude, position.coords.longitude];
        setUserLocation(coords);
        
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

  const filteredFacilities = facilities.filter(facility => facilityVisibility[facility.type]);
  
  // Convert route coordinates from [lng, lat] to [lat, lng] for Leaflet
  const routeCoordinates = selectedRoute 
    ? selectedRoute.coordinates.map(coord => [coord[1], coord[0]] as LatLngTuple)
    : [];

  return (
    <div className="relative h-full">
      <MapContainer
        center={[50.8476, 4.9041]} // Center of Europe
        zoom={5}
        className="w-full h-full rounded-lg"
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Route polyline */}
        {selectedRoute && routeCoordinates.length > 0 && (
          <Polyline
            positions={routeCoordinates}
            color="#2563eb"
            weight={4}
            opacity={0.8}
          />
        )}

        {/* Facility markers */}
        {filteredFacilities.map(facility => (
          <Marker
            key={facility.id}
            position={[facility.coordinates[1], facility.coordinates[0]]}
            icon={createFacilityIcon(facility.type)}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-sm">{facility.name}</h3>
                <p className="text-xs text-muted-foreground mb-1">{facility.address}</p>
                <p className="text-xs">{facility.description}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs">Rating: {facility.rating}/5</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* User location marker */}
        {userLocation && (
          <Marker position={userLocation} icon={userLocationIcon}>
            <Popup>Your current location</Popup>
          </Marker>
        )}

        <MapController selectedRoute={selectedRoute} />
      </MapContainer>
      
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