import { IMAGE_URL } from "../constants";
import type IRestaurant from "../models/restaurant";

const RestaurantCard = ({ restaurant }: { restaurant: IRestaurant }) => {
  return (
    <div
      className="
          group cursor-pointer
          bg-white dark:bg-gray-900
          rounded-2xl
          overflow-hidden
          transition-all duration-200 ease-out
          hover:-translate-y-[2px]
          hover:shadow-xl
        "
    >
      {/* Image */}
      <div className="relative">
        <img
          src={IMAGE_URL + restaurant.info.cloudinaryImageId}
          alt={restaurant.info.name}
          className="
              w-full h-44 object-cover
              transition-transform duration-300
              group-hover:scale-[1.04]
            "
        />

        {/* Rating badge */}
        <div
          className="
              absolute bottom-3 left-3
              bg-white/90 backdrop-blur
              text-sm font-semibold
              px-2 py-1 rounded-lg
              flex items-center gap-1
            "
        >
          ⭐ {restaurant.info.avgRatingString}
        </div>
      </div>
      <div className="p-4 space-y-1">
        <h3 className="font-semibold text-gray-900 dark:text-white truncate">{restaurant.info.name}</h3>
        <p className="text-sm text-gray-500 truncate">{restaurant.info.cuisines.join(", ")}</p>
        <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
          <span>{restaurant.info.sla.slaString}</span>
          <span>{restaurant.info.costForTwo}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
