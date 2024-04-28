"use client";

import { motion, AnimatePresence } from "framer-motion";

const AnimatedMessage = ({
  isVisible,
  position = [],
  children,
}: {
  isVisible: boolean;
  position: string[];
  children: React.ReactNode;
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
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedMessage;
