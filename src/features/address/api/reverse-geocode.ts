export async function reverseGeocode(lat: number, lng: number) {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
    const data = await res.json();
    return {
      displayName: data.display_name,
      address: data.address,
    };
  } catch (err) {
    console.error('Geocoding error:', err);
    return null;
  }
}
