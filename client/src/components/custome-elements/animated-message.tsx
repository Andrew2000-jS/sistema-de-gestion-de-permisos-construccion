import { motion, AnimatePresence } from "framer-motion";

const AnimatedMessage = ({
  message,
  color,
  isVisible,
  position = [],
}: {
  message: string | null;
  color: string;
  isVisible: boolean;
  position: string[];
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`${position.join(" ")}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div>
            <p className={`text-center ${color}`}>{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedMessage;
