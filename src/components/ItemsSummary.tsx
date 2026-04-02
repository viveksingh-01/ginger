import { useSelector } from 'react-redux';
import useCartDetails from '../hooks/useCartDetails';
import type store from '../store/store';

const ItemsSummary = () => {
  const items = useSelector((state: ReturnType<typeof store.getState>) => state.cart.items);
  const { cartItems, cartTotal, taxes, total } = useCartDetails(items);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <h2 className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">Order Summary</h2>
      <div className="space-y-6">
        <div className="p-5 border border-dashed border-gray-300 rounded-xl">
          <h3 className="font-medium text-gray-800 mb-4">BeyondBurg Inc.</h3>
          {/* ITEMS */}
          <div className="space-y-3 text-sm">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between">
                <span className="text-gray-700">
                  {item.name} × {item.count}
                </span>
                <span className="font-medium text-gray-900">₹{(item.totalPrice || 0) / 100}</span>
              </div>
            ))}
          </div>
          {/* DIVIDER */}
          <div className="border-t border-dashed border-gray-300 my-5" />
          {/* BREAKDOWN */}
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{cartTotal / 100}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes (5%)</span>
              <span>₹{taxes / 100}</span>
            </div>
            <div className="border-t border-dashed border-gray-300 my-3" />
            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span className="text-ginger">₹{total / 100}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsSummary;
