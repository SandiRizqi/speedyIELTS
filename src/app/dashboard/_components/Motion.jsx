import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';


function Motion({ children }) {
  const router = useRouter();


  return (
    <AnimatePresence>
    <motion.div
      key={router.route}
      initial={{ opacity: 0 }} // Start with opacity 0 (fully transparent)
      animate={{ opacity: 1 }} // Animate to opacity 1 (fully visible)
      exit={{ opacity: 0 }} // Exit with opacity 0 (fade out)
      transition={{ duration: 0.5 }} // Adjust the duration for the fading effect
    >
      {children}
    </motion.div>
  </AnimatePresence>
  


  );
}

export default Motion;
