import type { IMenuItem } from './menu';

export default interface ICartItem extends IMenuItem {
  count?: number;
  totalPrice?: number;
}
