async function fetchGeocode(address: string): Promise<{ lat: number; lng: number } | null> {
  const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`, {
    headers: {
      'User-Agent': 'ginger',
    },
  });

  const data = await res.json();

  if (!data.length) return null;

  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
  };
}

export default fetchGeocode;
