import deliveryManIcon from '../assets/icons/delivery-man.png';
import outForDeliveryIcon from '../assets/icons/delivery.png';
import foodIcon from '../assets/icons/food.png';
import orderIcon from '../assets/icons/order.png';

export const ORDER_STEPS = [
  {
    key: 'CONFIRMED',
    label: 'Order Confirmed',
    icon: orderIcon,
  },
  {
    key: 'PREPARING',
    label: 'Preparing Your Food',
    icon: foodIcon,
  },
  {
    key: 'ON_THE_WAY',
    label: 'On the Way',
    icon: outForDeliveryIcon,
  },
  {
    key: 'ARRIVED',
    label: 'Order has arrived',
    icon: deliveryManIcon,
  },
];
