import cookingIcon from '../assets/icons/cooking.png';
import deliveryIcon from '../assets/icons/delivery.png';
import foodIcon from '../assets/icons/food.png';
import orderIcon from '../assets/icons/order.png';

export const ORDER_STEPS = [
  { key: 'PLACED', label: 'Order Placed', icon: orderIcon },
  { key: 'PREPARING', label: 'Preparing your food', icon: cookingIcon },
  { key: 'OUT_FOR_DELIVERY', label: 'Out for delivery', icon: deliveryIcon },
  { key: 'DELIVERED', label: 'Delivered', icon: foodIcon },
];
