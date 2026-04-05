import type { IMenuItem } from '../../menu/models/menu';
import type IRestaurant from './restaurant';

export default interface IRestaurantWithMenu {
  details: IRestaurant;
  menu: IMenuItem[];
}
