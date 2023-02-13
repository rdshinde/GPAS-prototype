import React from "react";

type Props = {
  imageSrc: string;
  imageAlt: string;
};

export const ImageContainer = ({ imageSrc, imageAlt }: Props) => {
  return (
    <div className={`relative rounded-lg hover:cursor-move`}>
      <img
        className="object-cover rounded-lg p-0 md:w-[100px] md:h-[100px] sm:w-[60px] sm:h-[60px] hover:scale-105 transition-all duration-200 ease-in-out"
        src={imageSrc}
        alt={imageAlt}
        loading="lazy"
      />
    </div>
  );
};
