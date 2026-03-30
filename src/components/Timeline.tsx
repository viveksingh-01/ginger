import { motion } from 'framer-motion';

const steps = [
  { label: 'Placed', icon: '🧾' },
  { label: 'Preparing', icon: '👨‍🍳' },
  { label: 'On the way', icon: '🛵' },
  { label: 'Delivered', icon: '📦' },
];

const Timeline = ({ currentStep }: { currentStep: number }) => {
  const progress = (currentStep / 3) * 100;

  return (
    <div className="relative mt-2">
      <div className="absolute top-6 left-0 w-full h-[2px] bg-gray-200 rounded-full" />
      <motion.div
        className="absolute top-4 left-0 h-[2px] bg-ginger rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.6 }}
      />

      <div className="flex justify-between items-start relative z-10">
        {steps.map((step, index) => {
          const active = index <= currentStep;
          return (
            <div key={step.label} className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`w-12 h-12 flex items-center justify-center rounded-full text-2xl
                  ${active ? 'bg-ginger text-white' : 'bg-gray-200 text-gray-500'}
                `}
              >
                {step.icon}
              </motion.div>
              <p className={`text-[10px] mt-1 text-center leading-tight ${active ? 'text-ginger' : 'text-gray-400'}`}>
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
