import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  styles?: React.CSSProperties;
  className?: string;
};

export const ModalContainer = (props: Props) => {
  const { children, styles, className } = props;
  return (
    <motion.div
      layout
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring" }}
      style={{ ...styles }}
      className={`${className} fixed top-[0%] left-[20%] min-w-[60%] w-[60%] transform md:translate-y-[5%] md:translate-x-[18.5%] md:p-5 sm:p-3 xl:p-7 bg-[#fff] m-5 md:h-auto mx-auto rounded-md flex flex-col justify-center items-center duration-900 border-[1px] border-gray-100 shadow-lg shadow-gray-400`}
    >
      {children}
    </motion.div>
  );
};
