import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';


function Motion({ children }) {
  const router = useRouter();


  return (
    <AnimatePresence>
      <motion.div
        key={router.route}
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default Motion;
