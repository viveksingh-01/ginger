import { AnimatePresence, motion } from 'framer-motion';

const CountdownTimer = ({ eta }: { eta: number }) => {
  return (
    <div className="mt-2 text-lg">
      <h5>
        <span className="opacity-80">Arriving in </span>

        <span className="relative inline-block h-[1.5em] w-[2.5ch] overflow-hidden align-middle">
          <AnimatePresence initial={false}>
            <motion.span
              key={eta}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute left-0 right-0 bottom-1 text-center text-xl font-semibold leading-tight"
            >
              {eta}
            </motion.span>
          </AnimatePresence>
        </span>

        <span> mins</span>
      </h5>
    </div>
  );
};

export default CountdownTimer;
