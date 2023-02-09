import React from "react";

type Props = {
  imageSrc: string;
  imageAlt: string;
};

export const ImageContainer = ({ imageSrc, imageAlt }: Props) => {
  return (
    <div className={`relative rounded-lg`}>
      <img
        className="object-cover rounded-lg p-0 w-[100px] h-[100px]"
        src={imageSrc}
        alt={imageAlt}
        loading="lazy"
      />
    </div>
  );
};
