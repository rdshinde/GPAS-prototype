import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  styles?: React.CSSProperties;
  className?: string;
};

export const ModalContainer = (props: Props) => {
  const [isMounted, setIsMounted] = useState<Boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  const { children, styles, className } = props;
  const variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: 0.5,
        duration: 0.5,
      },
    },
    hidden: {
      opacity: 0,
      y: 50,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.5,
        delay: 0.5,
      },
    },
  };
  return (
    <AnimatePresence>
      <motion.div
        initial={isMounted ? "hidden" : "visible"}
        animate={isMounted ? "visible" : "hidden"}
        variants={variants}
        style={{ ...styles }}
        className={`${className} fixed top-[5%] left-[20%] min-w-[60%] transform md:translate-y-[5%] md:translate-x-[18.5%] md:p-5 sm:p-3 xl:p-7 bg-[#fff] m-5 md:h-auto mx-auto rounded-md flex flex-col justify-center items-center duration-900 border-[1px] border-gray-100 shadow-lg shadow-gray-400`}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
// md:w-[70%] sm:w-[95%]
