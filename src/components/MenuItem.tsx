import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { IMAGE_URL } from '../constants';
import type { IMenuItem } from '../models/menu';
import { addItem } from '../store/cartSlice';

type MenuItemProps = {
  item: IMenuItem;
};

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const { id, name, description, price, finalPrice, itemPriceStrikeOff, imageId, ratings } = item;
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  const addItemToCart = (item: IMenuItem) => {
    setCount(prevCount => prevCount + 1);
    dispatch(addItem(item));
  };

  return (
    <>
      <li key={id} className="flex justify-between items-start">
        <div className="pr-4">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{name}</h3>
          <p className="dark:text-gray-400 mt-1">
            {itemPriceStrikeOff && <span className="text-gray-400 line-through">₹{price / 100}</span>} ₹
            {finalPrice / 100}
          </p>
          <div className="mt-2 flex items-center gap-0.5 text-sm">
            <FaStar className="text-green-700" />
            <span className="font-bold text-green-700">{ratings.rating}</span>({ratings.ratingCountV2})
          </div>
          <p className="mt-2 text-gray-600 text-sm">{description}</p>
        </div>
        <div className="relative w-40 h-36 shrink-0">
          {imageId && <img src={IMAGE_URL + imageId} alt={name} className="w-full h-full object-cover rounded-xl" />}
          <button
            onClick={() => addItemToCart(item)}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-8 py-1 bg-white text-green-600 font-bold rounded-lg shadow-md border border-gray-200 cursor-pointer hover:bg-gray-200 transition"
          >
            ADD
          </button>
        </div>
      </li>
      <hr className="text-gray-300" />
    </>
  );
};

export default MenuItem;
