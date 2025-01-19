import { motion } from "framer-motion";

interface MotionDiv<T> {
  className?: string;
  func?: (param: T) => T;
  children: React.ReactNode;
}

export const MotionDiv = ({ className, func, children }: MotionDiv<void>) => {
  if (func) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        className={`cursor-pointer ${className}`}
        onClick={() => func()}
      >
        {children}
      </motion.div>
    );
  } else {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        className={`cursor-pointer ${className}`}
      >
        {children}
      </motion.div>
    );
  }
};
