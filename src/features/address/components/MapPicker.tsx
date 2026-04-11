import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';

type Props = {
  position: { lat: number; lng: number };
  onChange: (pos: { lat: number; lng: number }) => void;
};

function MapClickHandler({ onChange }: Props) {
  useMapEvents({
    click: e => {
      onChange({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });

  return null;
}

const MapPicker: React.FC<Props> = ({ position, onChange }) => {
  return (
    <MapContainer center={position} zoom={16} className="h-[328px] w-full">
      <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Click handler */}
      <MapClickHandler onChange={onChange} position={position} />

      {/* Moving Marker */}
      <Marker position={position} />
    </MapContainer>
  );
};

export default MapPicker;
