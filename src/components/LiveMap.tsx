import type { LatLngTuple } from 'leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Polyline, TileLayer, useMap } from 'react-leaflet';

import scooterIcon from '../assets/icons/delivery-scooter.png';
import destinationIcon from '../assets/icons/destination-pin.png';

const containerStyle = { width: '100%', height: '220px' };

const start: LatLngTuple = [12.84122, 77.66402];
const destination: LatLngTuple = [12.84655, 77.6695];

const scooter = new L.Icon({
  iconUrl: scooterIcon,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const destinationMarker = new L.Icon({
  iconUrl: destinationIcon,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

function FitBounds({ route }: { route: LatLngTuple[] }) {
  const map = useMap();

  useEffect(() => {
    if (route.length) {
      map.fitBounds(route, { padding: [20, 20] });
    }
  }, [route, map]);

  return null;
}

// Accept duration in seconds
export default function LiveMap({ duration = 48 }: { duration: number }) {
  const [route, setRoute] = useState<LatLngTuple[]>([]);
  const [markerIndex, setMarkerIndex] = useState(0);

  // Fetch route
  useEffect(() => {
    const fetchRoute = async () => {
      const res = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${destination[1]},${destination[0]}?overview=full&geometries=geojson`
      );
      const data = await res.json();
      const coords = data.routes[0].geometry.coordinates;
      const formatted: LatLngTuple[] = coords.map((c: [number, number]) => [c[1], c[0]]);
      setRoute(formatted);
    };

    fetchRoute();
  }, []);

  // Dynamic animation based on duration
  useEffect(() => {
    if (route.length === 0) return;

    const totalPoints = route.length;

    // time per step
    const intervalTime = (duration * 1000) / totalPoints;

    const interval = setInterval(() => {
      setMarkerIndex(prev => (prev < totalPoints - 1 ? prev + 1 : prev));
    }, intervalTime);

    return () => clearInterval(interval);
  }, [route, duration]);

  const markerPos: LatLngTuple = route[markerIndex] || start;

  return (
    <MapContainer center={start} zoom={15} style={containerStyle} scrollWheelZoom={false}>
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

      <FitBounds route={route} />

      {route.length > 0 && <Polyline positions={route} pathOptions={{ color: '#f97316', weight: 4 }} />}

      <Marker position={markerPos} icon={scooter} />

      <Marker position={destination} icon={destinationMarker} />
    </MapContainer>
  );
}
