import deliveryManIcon from '../assets/icons/delivery-man.png';
import outForDeliveryIcon from '../assets/icons/delivery.png';
import foodIcon from '../assets/icons/food.png';
import orderIcon from '../assets/icons/order.png';

export const ORDER_STEPS = [
  {
    key: 'CONFIRMED',
    label: 'Order Confirmed',
    message: 'Locked in! Your order is confirmed.',
    messageAlt: 'All set! Your order is in.',
    icon: orderIcon,
  },
  {
    key: 'PREPARING',
    label: 'Preparing Your Food',
    message: 'Crafting your meal, fresh and full of flavor.',
    messageAlt: `Good things cooking. Your meal's underway.`,
    icon: foodIcon,
  },
  {
    key: 'ON_THE_WAY',
    label: 'On the Way',
    message: 'On the move, bringing goodness your way.',
    messageAlt: 'Zooming over with your tasty order.',
    icon: outForDeliveryIcon,
  },
  {
    key: 'ARRIVED',
    label: 'Order has arrived',
    message: 'Knock knock! Your food has arrived.',
    messageAlt: 'Yay! Your meal is at your door.',
    icon: deliveryManIcon,
  },
];
