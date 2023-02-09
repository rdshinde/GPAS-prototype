import React from "react";

type Props = {
  imageSrc: string;
  imageAlt: string;
};

export const ImageContainer = ({ imageSrc, imageAlt }: Props) => {
  return (
    <div className={`relative rounded-lg`}>
      <img
        className="object-cover rounded-lg p-0 md:w-[100px] md:h-[100px] sm:w-[60%] sm:h-[60%]"
        src={imageSrc}
        alt={imageAlt}
        loading="lazy"
      />
    </div>
  );
};
