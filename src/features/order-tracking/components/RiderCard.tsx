import { motion } from 'framer-motion';

import { DELIVERY_PARTNER } from '../../../data/delivery-partner';
import type { IDeliveryPartner } from '../models/delivery-partner';

const RiderCard = () => {
  const { name, phone, vehicle }: IDeliveryPartner = DELIVERY_PARTNER;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl"
    >
      <div className="w-10 h-10 rounded-full bg-gray-100 text-ginger text-lg flex items-center justify-center">
        {name[0]}
      </div>
      <div className="flex-1 leading-tight">
        <p className="text-[14px] font-medium text-gray-900">{name}</p>
        <p className="text-[12px] text-gray-500">{vehicle}</p>
      </div>
      <a
        href={`tel:${phone}`}
        className="px-4 py-2 text-sm border border-ginger text-ginger rounded-md hover:bg-ginger transition"
      >
        Call
      </a>
    </motion.div>
  );
};

export default RiderCard;
