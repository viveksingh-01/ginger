import { motion } from 'framer-motion';
import { ORDER_STEPS } from '../../../constants/order-steps';

const Timeline = ({ currentStep }: { currentStep: number }) => {
  const progress = (currentStep / 3) * 100;

  return (
    <div className="relative mt-2">
      <div className="absolute top-8 left-0 w-full h-[2px] bg-gray-200 rounded-full" />
      <motion.div
        className="absolute top-8 left-0 h-[2px] bg-green-600 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.6 }}
      />

      <div className="flex justify-between items-start relative z-10">
        {ORDER_STEPS.map((step, index) => {
          const active = index == currentStep;
          return (
            <div key={step.label} className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`w-16 h-16 flex items-center justify-center rounded-full text-3xl bg-white border-2
                  ${index < currentStep ? 'bg-white border-green-600' : 'border-gray-200'}
                  ${active && 'border-ginger'}
                `}
              >
                <img src={step.icon} alt={step.label} className="w-10 object-contain" />
              </motion.div>
              <p
                className={`max-w-[56px] text-[10px] mt-1 text-center text-wrap leading-tight ${active ? 'text-ginger' : 'text-gray-400'}`}
              >
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
