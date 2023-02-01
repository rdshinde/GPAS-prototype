import React from "react";

type Props = {
  imageSrc: string;
  imageAlt: string;
};

export const ImageContainer = ({ imageSrc, imageAlt }: Props) => {
  return (
    <div className={`relative p-6 bg-gray-50 rounded-lg`}>
      <img
        className="w-full h-full object-cover rounded-lg max-w-sm"
        src={imageSrc}
        alt={imageAlt}
        loading="lazy"
      />
    </div>
  );
};
