import { GoogleMap, Marker, Polyline, useLoadScript } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import scooterIcon from '../assets/icons/delivery-scooter.png';
import destinationIcon from '../assets/icons/destination-pin.png';

const MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const containerStyle = { width: '100%', height: '220px' };
const destination = { lat: 12.84655, lng: 77.6695 };

// Pre-defined “road-like” path (simulated)
const simulatedPath = [
  { lat: 12.84122, lng: 77.66402 },
  { lat: 12.84132, lng: 77.66415 },
  { lat: 12.84145, lng: 77.6643 },
  { lat: 12.84158, lng: 77.66445 },
  { lat: 12.84172, lng: 77.6646 },
  { lat: 12.84188, lng: 77.66478 },
  { lat: 12.84205, lng: 77.66495 },
  { lat: 12.84222, lng: 77.66515 },
  { lat: 12.8424, lng: 77.66535 },
  { lat: 12.84258, lng: 77.66555 },
  { lat: 12.84278, lng: 77.66578 },
  { lat: 12.84298, lng: 77.666 },
  { lat: 12.8432, lng: 77.66625 },
  { lat: 12.84342, lng: 77.6665 },
  { lat: 12.84365, lng: 77.66675 },
  { lat: 12.84388, lng: 77.667 },
  { lat: 12.84412, lng: 77.66725 },
  { lat: 12.84438, lng: 77.6675 },
  { lat: 12.84463, lng: 77.66775 },
  { lat: 12.84488, lng: 77.668 },
  { lat: 12.84515, lng: 77.66825 },
  { lat: 12.84542, lng: 77.6685 },
  { lat: 12.8457, lng: 77.66875 },
  { lat: 12.84598, lng: 77.669 },
  { lat: 12.84626, lng: 77.66925 },
  { lat: 12.84655, lng: 77.6695 },
];

const styledMap = [
  { elementType: 'geometry', stylers: [{ color: '#f5f5f5' }] },
  { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f5f5' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#ffffff' }] },
  { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#eeeeee' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#c9c9c9' }] },
];

export default function LiveMap() {
  const { isLoaded } = useLoadScript({ googleMapsApiKey: MAPS_API_KEY });
  const [markerIndex, setMarkerIndex] = useState(0);

  // Animate marker along simulated path
  useEffect(() => {
    const interval = setInterval(() => {
      setMarkerIndex(prev => (prev < simulatedPath.length - 1 ? prev + 1 : prev));
    }, 3000); // adjust speed
    return () => clearInterval(interval);
  }, []);

  if (!isLoaded) return <div>Loading map...</div>;

  const markerPos = simulatedPath[markerIndex];

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={markerPos}
      zoom={15}
      options={{ disableDefaultUI: true, zoomControl: false, styles: styledMap, mapTypeId: 'roadmap' }}
    >
      <Polyline path={simulatedPath} options={{ strokeColor: '#f97316', strokeWeight: 4 }} />

      <Marker
        position={markerPos}
        icon={{
          url: new URL(scooterIcon, import.meta.url).href,
          scaledSize: new google.maps.Size(40, 40),
          anchor: new google.maps.Point(20, 20),
        }}
      />

      <Marker
        position={destination}
        icon={{
          url: new URL(destinationIcon, import.meta.url).href,
          scaledSize: new google.maps.Size(30, 30),
          anchor: new google.maps.Point(15, 30),
        }}
      />
    </GoogleMap>
  );
}
