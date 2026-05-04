import type { IBillDetails } from '@/features/checkout/models/cart-response';
import type { IOrderItem } from '@/features/order/models/order';

type ItemsSummaryProps = {
  restaurant: string;
  items: IOrderItem[];
  billDetails: IBillDetails;
};

const ItemsSummary: React.FC<ItemsSummaryProps> = ({ restaurant, items, billDetails }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <h2 className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">Order Summary</h2>
      <div className="space-y-6">
        <div className="p-5 border border-dashed border-gray-300 rounded-xl">
          <h3 className="font-medium text-gray-800 mb-4">{restaurant}</h3>
          {/* ITEMS */}
          <div className="space-y-3 text-sm">
            {items?.map(item => (
              <div key={item.menuItemId} className="flex justify-between">
                <span className="text-gray-700">
                  {item.name} × {item.quantity}
                </span>
                <span className="font-medium text-gray-900">₹{(item.total || 0) / 100}</span>
              </div>
            ))}
          </div>
          {/* DIVIDER */}
          <div className="border-t border-dashed border-gray-300 my-5" />
          {/* BREAKDOWN */}
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{(billDetails?.subtotal ?? 0) / 100}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes (5%)</span>
              <span>₹{(billDetails?.gst ?? 0) / 100}</span>
            </div>
            <div className="border-t border-dashed border-gray-300 my-3" />
            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span className="text-ginger">₹{(billDetails?.finalAmount ?? 0) / 100}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsSummary;
