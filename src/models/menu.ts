export interface IMenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  imageId: string;
  inStock: number;
  isBestseller: boolean;
  isVeg: boolean;
  price: number;
  finalPrice: number;
  itemPriceStrikeOff: boolean;
  offerTags: {
    title: string;
    subTitle: string;
  };
  portionSize: string;
  ratings: {
    rating: number;
    ratingCount: string;
    ratingCountV2: number;
  };
}

export default interface IMenu {
  restaurantId: string;
  items: IMenuItem[];
}
