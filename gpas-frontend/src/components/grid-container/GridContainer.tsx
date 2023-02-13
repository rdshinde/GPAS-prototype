import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { ImageContainer } from "../image-container/ImageContainer";
import { Images } from "../pwd-builder/PwdBuilder";
type Props = {
  children?: React.ReactNode;
  styles?: React.CSSProperties;
  data?: {};
  className?: string;
  gridImages: Images[];
};

export const GridContainer = (props: Props) => {
  const { children, styles, data, className, gridImages } = props;
  return (
    <div
      className={`${className} w-full border rounded-lg border-gray-300 flex flex-wrap items-center justify-center gap-7 md:my-1 md:p-2 sm:p-1 max-h-[40%]`}
      style={{ ...styles }}
    >
      {children}
      {gridImages.map((img, index) => {
        return (
          <ImageContainer
            imageSrc={img.imageSrc}
            imageAlt={img.imageAlt}
            snapshot={1}
          />
        );
      })}
    </div>
  );
};
