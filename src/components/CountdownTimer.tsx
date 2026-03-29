import { AnimatePresence, motion } from 'framer-motion';

const CountdownTimer = ({ eta }: { eta: number }) => {
  return (
    <div className="mt-2 text-lg">
      <h5>
        <span className="opacity-80">Arriving in </span>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={eta}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-xl font-semibold leading-tight"
          >
            {eta}
          </motion.span>
        </AnimatePresence>
        <span> mins</span>
      </h5>
    </div>
  );
};

export default CountdownTimer;
