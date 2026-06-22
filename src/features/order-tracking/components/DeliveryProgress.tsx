import { motion } from 'framer-motion';

type DeliveryProgressProps = {
  step: number;
  totalSteps: number;
};

const DeliveryProgress: React.FC<DeliveryProgressProps> = ({ step, totalSteps }) => {
  const progress = (step / totalSteps) * 100;

  return (
    <div className="w-full mt-2 bg-green-700 h-2 rounded-full overflow-hidden shadow-sm">
      <motion.div
        className="bg-green-300 h-2"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1 }}
      />
    </div>
  );
};

export default DeliveryProgress;
