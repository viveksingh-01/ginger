import type { IMenuItem } from '../../menu/models/menu';

type RequiredCartFields = Pick<IMenuItem, 'id' | 'name' | 'price' | 'finalPrice'>;
type OptionalMenuFields = Partial<Omit<IMenuItem, keyof RequiredCartFields>>;

export default interface ICartItem extends RequiredCartFields, OptionalMenuFields {
  count?: number;
  totalPrice?: number;
}
