export default interface IRestaurant {
  id: string;
  name: string;
  cloudinaryImageId: string;
  locality: string;
  areaName: string;
  costForTwo: string;
  cuisines: string[];
  avgRating: number;
  avgRatingString: string;
  totalRatingsString: string;
  veg: boolean;
  sla: {
    deliveryTime: number;
    lastMileTravel: number;
    slaString: string;
  };
  aggregatedDiscountInfoV3: {
    header: string;
    subHeader: string;
  };
}
