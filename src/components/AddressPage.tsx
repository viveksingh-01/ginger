import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addressList } from '../data/address';
import type IAddress from '../models/address';
import { setAddress } from '../store/checkoutSlice';
import type store from '../store/store';

const AddressPage = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const storedAddress = useSelector((state: ReturnType<typeof store.getState>) => state.checkout.address);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Select and display stored address by default
  useEffect(() => {
    if (storedAddress) {
      setSelectedId(storedAddress.id);
    }
  }, [storedAddress]);

  const handleClick = () => {
    if (!selectedId) return;

    const selectedAddress: IAddress | undefined = addressList.find(a => a.id === selectedId);
    if (!selectedAddress) return;

    dispatch(setAddress(selectedAddress));
    navigate('/checkout');
  };

  return (
    <main className="max-w-md mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">Select Address</h1>

      <div className="space-y-3">
        {addressList.map(({ id, annotation, house, area, city, state, pincode }) => (
          <div
            key={id}
            onClick={() => setSelectedId(id)}
            className={`p-4 border cursor-pointer transition
              ${selectedId === id ? 'border-ginger' : 'border-gray-200'}`}
          >
            <p className="font-medium">{annotation}</p>
            <p className="text-sm text-gray-500">
              {house}, {area} {city}, {state} - {pincode}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={handleClick}
        className={`mt-6 w-full py-3 text-white font-medium transition
          ${selectedId ? 'bg-green-600 hover:bg-green-700 shadow-sm cursor-pointer' : 'bg-gray-300 cursor-not-allowed'}`}
        disabled={!selectedId}
      >
        Continue
      </button>
    </main>
  );
};

export default AddressPage;
