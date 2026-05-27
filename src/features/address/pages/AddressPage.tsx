import { useEffect, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setAddress } from '../../../store/checkoutSlice';
import type store from '../../../store/store';
import { deleteAddress } from '../api/address';
import { useAddress } from '../hooks/useAddress';
import type IAddress from '../models/address';

const AddressPage = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<IAddress | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const storedAddress = useSelector((state: ReturnType<typeof store.getState>) => state.checkout.address);
  const { data: addressResponse } = useAddress();
  const addressList: IAddress[] = addressResponse?.data ?? [];

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

    const selectedAddress = addressList.find(a => a.id === selectedId);
    if (!selectedAddress) return;

    dispatch(setAddress(selectedAddress));
    localStorage.setItem('address', JSON.stringify(selectedAddress));
    navigate('/checkout');
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      await deleteAddress(deleteTarget.id);

      // remove selected state if deleted
      if (selectedId === deleteTarget.id) {
        setSelectedId(null);
      }

      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
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
          {addressList?.map((address: IAddress) => (
            <div
              key={address.id}
              onClick={() => setSelectedId(address.id)}
              className={`
                relative group overflow-hidden p-4 border cursor-pointer transition rounded-lg bg-white dark:bg-zinc-900
                ${selectedId === address.id ? 'border-ginger' : 'border-gray-200 dark:border-zinc-700'}
              `}
            >
              <div className="pr-4">
                <p className="font-medium text-black dark:text-white">{address.annotation}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {address.house}, {address.area} {address.city}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{address.address}</p>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-start gap-3 pr-4 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={e => {
                    e.stopPropagation();
                    setDeleteTarget(address);
                  }}
                  className="text-gray-500 hover:text-red-600 transition cursor-pointer"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleClick}
          className={`mt-6 w-full py-3 text-white font-medium transition
            ${selectedId ? 'bg-green-600 hover:bg-green-700 shadow-sm cursor-pointer' : 'bg-gray-300 cursor-not-allowed'}
          `}
          disabled={!selectedId}
        >
          Continue
        </button>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-sm rounded-xl p-6 shadow-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700">
            <h2 className="text-lg font-semibold text-black dark:text-white">Delete Address</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Are you sure you want to delete <span className="font-medium">{deleteTarget.annotation}</span>?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 dark:text-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddressPage;
