import { useEffect, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setAddress } from '../../../store/checkoutSlice';
import type store from '../../../store/store';
import { getAddresses } from '../api/address';
import type IAddress from '../models/address';

const AddressPage = () => {
  const [addressList, setAddressList] = useState<IAddress[]>([]);
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

  useEffect(() => {
    fetchAddress();
  }, []);

  const fetchAddress = async () => {
    const { data } = await getAddresses();
    if (data) {
      setAddressList(data);
    }
  };

  const handleClick = () => {
    if (!selectedId) return;

    const selectedAddress: IAddress | undefined = addressList?.find(a => a.id === selectedId);
    if (!selectedAddress) return;

    dispatch(setAddress(selectedAddress));
    localStorage.setItem('address', JSON.stringify(selectedAddress));
    navigate('/checkout');
  };

  return (
    <main className="max-w-md mx-auto px-4 py-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold mb-4">Select Address</h1>
        <span
          onClick={() => navigate('add')}
          className="p-2 mb-2 text-sm font-bold text-ginger uppercase cursor-pointer"
        >
          ADD
        </span>
      </div>

      <div className="space-y-3">
        {addressList?.map(({ id, annotation, house, area, city, address }) => (
          <div
            key={id}
            onClick={() => setSelectedId(id)}
            className={`
              relative group overflow-hidden
              p-4 border cursor-pointer transition rounded-lg
              ${selectedId === id ? 'border-ginger' : 'border-gray-200'}
            `}
          >
            <div className="pr-4">
              <p className="font-medium">{annotation}</p>
              <p className="text-sm text-gray-500">
                {house}, {area} {city}
              </p>
              <p className="text-sm text-gray-500">{address}</p>
            </div>

            <div
              className="
                absolute inset-y-0 right-0
                flex items-start gap-3 pr-4 pt-4
                opacity-0 group-hover:opacity-100
                transition-opacity duration-300
              "
            >
              <button className="text-gray-500 hover:text-red-600 transition cursor-pointer">
                <FiTrash2 size={18} />
              </button>
            </div>
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
