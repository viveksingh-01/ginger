import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { IMAGE_URL } from '../constants';
import type ICartItem from '../models/cart-item';
import type { IMenuItem } from '../models/menu';
import { addItem, removeItem } from '../store/cartSlice';
import type store from '../store/store';

type MenuItemProps = {
  item: IMenuItem;
};

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const { id, name, description, price, finalPrice, itemPriceStrikeOff, imageId, ratings } = item;
  const [count, setCount] = useState(0);

  const cartItems = useSelector((state: ReturnType<typeof store.getState>) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const itemCount = cartItems.filter(item => item.id === id).length;
    setCount(itemCount);
  });

  const addItemToCart = (item: ICartItem) => {
    setCount(prevCount => prevCount + 1);
    dispatch(addItem(item));
  };

  const removeItemFromCart = (item: ICartItem) => {
    setCount(prevCount => prevCount - 1);
    dispatch(removeItem(item));
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
          {count == 0 && (
            <button
              onClick={() => addItemToCart(item)}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-8 py-1 bg-white text-green-600 font-bold rounded-lg shadow-md border border-gray-200 cursor-pointer hover:bg-gray-200 transition"
            >
              ADD
            </button>
          )}
          {count > 0 && (
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[96px] px-2 flex justify-between items-center rounded-md bg-green-500 text-white shadow-md text-lg font-semibold">
              <span className="p-1 -mt-1 text-xl hover:cursor-pointer" onClick={() => removeItemFromCart(item)}>
                -
              </span>
              <span className="p-1">{count}</span>
              <span className="p-1 -mt-1 text-xl hover:cursor-pointer" onClick={() => addItemToCart(item)}>
                +
              </span>
            </div>
          )}
        </div>
      </li>
      <hr className="text-gray-300" />
    </>
  );
};

export default MenuItem;
