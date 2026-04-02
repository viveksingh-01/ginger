import type { LatLngTuple } from 'leaflet';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import fetchGeocode from '../api/geocode';
import type store from '../store/store';

const useLatLong = (): LatLngTuple | null => {
  const [geocode, setGeocode] = useState<LatLngTuple | null>(null);
  const storeAddress = useSelector((state: ReturnType<typeof store.getState>) => state.checkout.address);
  const storedRaw = localStorage.getItem('address');

  const storedAddress = storedRaw ? JSON.parse(storedRaw) : null;
  const address = storeAddress ?? storedAddress;
  if (!address) return null;

  const { area, city, state } = address ?? JSON.parse(localStorage.getItem('address')!);
  const addressString = `${area}, ${city}, ${state}`;

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const data = await fetchGeocode(addressString);
        if (!data || !isMounted) return;
        setGeocode([data.lat, data.lng]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [addressString]);

  return geocode;
};

export default useLatLong;
