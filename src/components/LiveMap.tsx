import type { LatLngTuple } from 'leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Polyline, TileLayer } from 'react-leaflet';

import scooterIcon from '../assets/icons/delivery-scooter.png';
import destinationIcon from '../assets/icons/destination-pin.png';

const containerStyle = { width: '100%', height: '280px' };

const destination: LatLngTuple = [12.84655, 77.6695];

const simulatedPath: LatLngTuple[] = [
  [12.84122, 77.66402],
  [12.84132, 77.66415],
  [12.84145, 77.6643],
  [12.84158, 77.66445],
  [12.84172, 77.6646],
  [12.84188, 77.66478],
  [12.84205, 77.66495],
  [12.84222, 77.66515],
  [12.8424, 77.66535],
  [12.84258, 77.66555],
  [12.84278, 77.66578],
  [12.84298, 77.666],
  [12.8432, 77.66625],
  [12.84342, 77.6665],
  [12.84365, 77.66675],
  [12.84388, 77.667],
  [12.84412, 77.66725],
  [12.84438, 77.6675],
  [12.84463, 77.66775],
  [12.84488, 77.668],
  [12.84515, 77.66825],
  [12.84542, 77.6685],
  [12.8457, 77.66875],
  [12.84598, 77.669],
  [12.84626, 77.66925],
  [12.84655, 77.6695],
];

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

export default function LiveMap() {
  const [markerIndex, setMarkerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMarkerIndex(prev => (prev < simulatedPath.length - 1 ? prev + 1 : prev));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const markerPos: LatLngTuple = simulatedPath[markerIndex];

  return (
    <MapContainer center={markerPos} zoom={15} style={containerStyle} scrollWheelZoom={false}>
      {/* Light styled tiles (similar to Google style) */}
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

      {/* Route */}
      <Polyline positions={simulatedPath} pathOptions={{ color: '#f97316', weight: 4 }} />

      {/* Moving scooter */}
      <Marker position={markerPos} icon={scooter} />

      {/* Destination */}
      <Marker position={destination} icon={destinationMarker} />
    </MapContainer>
  );
}
