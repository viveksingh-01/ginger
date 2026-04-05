import type { IMenuItem } from '../../menu/models/menu';

export default interface ICartItem extends IMenuItem {
  count?: number;
  totalPrice?: number;
}
