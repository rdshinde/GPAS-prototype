import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { ImgCollector } from "../img-collector/ImgCollector";

type Props = {
  imageSrc: string;
  imageAlt: string;
  snapshot: any;
  pwdVisibility: boolean;
};

export const ImageContainer = ({
  imageSrc,
  imageAlt,
  snapshot,
  pwdVisibility,
}: Props) => {
  return (
    <>
      <div
        className={`relative rounded-lg hover:cursor-move ${
          pwdVisibility ? "opacity-100" : "opacity-5"
        } transition-all duration-200 ease-in-out`}
        style={{
          top: `${snapshot.isDragging ? "-50%" : "auto"}`,
          left: `${snapshot.isDragging ? "-250%" : "auto"}`,
        }}
      >
        <img
          className="object-cover rounded-lg p-0 md:w-[100px] md:h-[100px] sm:w-[60px] sm:h-[60px] hover:scale-105 transition-all duration-200 ease-in-out"
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
        />
      </div>
    </>
  );
};
