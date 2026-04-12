import Input from '@/shared/components/Input';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { saveAddress } from '../api/address';
import { reverseGeocode } from '../api/reverse-geocode';
import AnnotationPicker from '../components/AnnotationPicker';
import MapPicker from '../components/MapPicker';
import { useDebounce } from '../hooks/useDebounce';
import type { IAddressResponse, ISaveAddressPayload } from '../models/address';

export default function SaveAddressPage() {
  const [position, setPosition] = useState({
    lat: 12.84529,
    lng: 77.64422,
  });

  const debouncedPosition = useDebounce(position, 700);
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [form, setForm] = useState<ISaveAddressPayload>({
    name: '',
    phone: '',
    address: '',
    house: '',
    area: '',
    city: '',
    landmark: '',
    annotation: 'Home',
    lat: position.lat,
    lng: position.lng,
  });

  // Fetch address when position changes (debounced)
  useEffect(() => {
    const fetchAddress = async () => {
      setLoadingAddress(true);
      const data = await reverseGeocode(debouncedPosition.lat, debouncedPosition.lng);

      if (data) {
        setForm(prev => ({
          ...prev,
          address: data.displayName,
        }));
      }
      setLoadingAddress(false);
    };

    fetchAddress();
  }, [debouncedPosition]);

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const isDisabled = !form.address || !form.house;

  const submitForm = async () => {
    try {
      const { data }: IAddressResponse = await saveAddress(form);
      console.log(data);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <main className="min-h-screen">
      <section className="max-w-5xl mx-auto px-6 py-6 flex flex-col">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <ArrowLeft className="w-5 h-5 cursor-pointer" />
          <h1 className="text-lg font-semibold">Add Address</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* ================= LEFT SIDE ================= */}
          <section className="lg:col-span-3">
            {/* Map */}
            <div className="relative">
              <MapPicker position={position} onChange={setPosition} />
              <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-sm px-3 py-1 rounded">
                Drag map
              </div>
            </div>

            <section className="border border-gray-300 border-b-0 bg-white text-sm">
              {/* Address */}
              <Input
                label="Address"
                value={loadingAddress ? 'Fetching location...' : form.address}
                onChange={() => {}}
              />
            </section>
          </section>

          {/* ================= RIGHT SIDE ================= */}
          <section className="lg:col-span-2">
            <section className="border border-gray-300 bg-white text-sm">
              {/* Name */}
              <Input label="Name" value={form.name} onChange={v => handleChange('name', v)} />

              {/* Phone */}
              <Input label="Phone" value={form.phone} onChange={v => handleChange('phone', v)} />

              {/* House */}
              <Input label="House / Flat No." value={form.house} onChange={v => handleChange('house', v)} />

              {/* Landmark */}
              <Input label="Landmark" value={form.landmark} onChange={v => handleChange('landmark', v)} />

              {/* Annotation */}
              <AnnotationPicker annotation={form.annotation} onChange={handleChange} />
            </section>

            {/* CTA */}
            <section className="py-4">
              <button
                onClick={() => submitForm()}
                disabled={isDisabled}
                className="w-full py-4 text-sm font-semibold text-white bg-ginger hover:bg-ginger-dark cursor-pointer"
              >
                SAVE ADDRESS
              </button>
            </section>
          </section>
        </div>
      </section>
    </main>
  );
}
