import type { IMenuItem } from './menu';
import type IRestaurant from './restaurant';

export default interface IRestaurantWithMenu {
  details: IRestaurant;
  menu: IMenuItem[];
}
