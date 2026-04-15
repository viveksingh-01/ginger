import type ICartItem from '../models/cart-item';

type Props = {
  cartItems: ICartItem[];
  cartTotal: number;
  taxes: number;
  total: number;
  onRemoveItem: (item: ICartItem) => void;
  onAddItem: (item: ICartItem) => void;
};

const Cart = ({ cartItems, cartTotal, taxes, total, onRemoveItem, onAddItem }: Props) => {
  return (
    <section className="lg:col-span-2">
      <div className="bg-white shadow-sm p-6 mb-4">
        <h2 className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">YOUR CART</h2>
        <div className="divide-y divide-gray-100">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center justify-between py-4">
              <div className="flex-1 pr-3 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                <p className="text-sm text-gray-600 mt-1">₹{item.price / 100}</p>
              </div>

              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden shrink-0">
                <button
                  onClick={() => onRemoveItem(item)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 active:scale-95 transition"
                >
                  -
                </button>
                <span className="px-3 text-ginger font-medium min-w-[24px] text-center">{item.count}</span>
                <button
                  onClick={() => onAddItem(item)}
                  className="px-3 py-1 text-ginger hover:bg-gray-100 active:scale-95 transition"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-dashed border-gray-300 my-3" />
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>₹{cartTotal / 100}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>GST (5%)</span>
            <span>₹{taxes / 100}</span>
          </div>
          <div className="border-t border-dashed border-gray-300 my-3" />
          <div className="flex justify-between text-base font-semibold text-gray-900">
            <span>Total</span>
            <span className="text-ginger">₹{total / 100}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
