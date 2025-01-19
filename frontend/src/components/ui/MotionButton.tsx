import { MotionButtonProps } from "@/interfaces/interfaces";
import { motion } from "framer-motion";

export const MotionButton = ({
  label,
  type,
  rightIcon,
  className,
  func,
  Icon,
}: MotionButtonProps<void>) => {
  return (
    <motion.button
      className={` px-4 py-2 rounded-2xl text-base-content shadow-lg ${className} `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
      type={type}
      onClick={() => func()}
    >
      {rightIcon ? (
        <>
          {Icon ? (
            <div className="flex items-center justify-center gap-2">
              <p className="truncate">{label}</p>
              <Icon className="w-4 h-4" />
            </div>
          ) : (
            <p className="truncate">{label}</p>
          )}
        </>
      ) : (
        <>
          {Icon ? (
            <div className="flex items-center justify-center gap-2">
              <Icon className="w-4 h-4" />
              <p className="truncate">{label}</p>
            </div>
          ) : (
            <p className="truncate">{label}</p>
          )}
        </>
      )}
    </motion.button>
  );
};
