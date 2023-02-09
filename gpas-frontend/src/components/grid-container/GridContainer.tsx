import React from "react";
import { ImageContainer } from "../image-container/ImageContainer";

type Props = {
  children?: React.ReactNode;
  styles?: React.CSSProperties;
  data?: {};
  className?: string;
};

export const GridContainer = (props: Props) => {
  const { children, styles, data, className } = props;
  return (
    <div
      className={`${className} w-full border rounded-lg border-gray-300 flex flex-wrap items-center justify-center gap-1 md:my-1 md:p-2 sm:p-1`}
      style={{ ...styles }}
    >
      {children}
      {/* Return this component 32 times  */}
      <ImageContainer
        imageSrc="https://picsum.photos/100/100"
        imageAlt="test"
      />
      <ImageContainer
        imageSrc="https://picsum.photos/100/100"
        imageAlt="test"
      />
      <ImageContainer
        imageSrc="https://picsum.photos/100/100"
        imageAlt="test"
      />
      <ImageContainer
        imageSrc="https://picsum.photos/100/100"
        imageAlt="test"
      />
      <ImageContainer
        imageSrc="https://picsum.photos/100/100"
        imageAlt="test"
      />
      <ImageContainer
        imageSrc="https://picsum.photos/100/100"
        imageAlt="test"
      />
      <ImageContainer
        imageSrc="https://picsum.photos/100/100"
        imageAlt="test"
      />
      <ImageContainer
        imageSrc="https://picsum.photos/100/100"
        imageAlt="test"
      />
      <ImageContainer
        imageSrc="https://picsum.photos/100/100"
        imageAlt="test"
      />
      <ImageContainer
        imageSrc="https://picsum.photos/100/100"
        imageAlt="test"
      />
      <ImageContainer
        imageSrc="https://picsum.photos/100/100"
        imageAlt="test"
      />
      <ImageContainer
        imageSrc="https://picsum.photos/100/100"
        imageAlt="test"
      />
      <ImageContainer
        imageSrc="https://picsum.photos/100/100"
        imageAlt="test"
      />
      <ImageContainer
        imageSrc="https://picsum.photos/100/100"
        imageAlt="test"
      />
      <ImageContainer
        imageSrc="https://picsum.photos/100/100"
        imageAlt="test"
      />
      <ImageContainer
        imageSrc="https://picsum.photos/100/100"
        imageAlt="test"
      />
      <ImageContainer
        imageSrc="https://picsum.photos/100/100"
        imageAlt="test"
      />
      <ImageContainer
        imageSrc="https://picsum.photos/100/100"
        imageAlt="test"
      />
      <ImageContainer
        imageSrc="https://picsum.photos/100/100"
        imageAlt="test"
      />
      <ImageContainer
        imageSrc="https://picsum.photos/100/100"
        imageAlt="test"
      />
      <ImageContainer
        imageSrc="https://picsum.photos/100/100"
        imageAlt="test"
      />
      <ImageContainer
        imageSrc="https://picsum.photos/100/100"
        imageAlt="test"
      />
      <ImageContainer
        imageSrc="https://picsum.photos/100/100"
        imageAlt="test"
      />
      <ImageContainer
        imageSrc="https://picsum.photos/100/100"
        imageAlt="test"
      />
      <ImageContainer
        imageSrc="https://picsum.photos/100/100"
        imageAlt="test"
      />
      <ImageContainer
        imageSrc="https://picsum.photos/100/100"
        imageAlt="test"
      />
      <ImageContainer
        imageSrc="https://picsum.photos/100/100"
        imageAlt="test"
      />
      <ImageContainer
        imageSrc="https://picsum.photos/100/100"
        imageAlt="test"
      />
      <ImageContainer
        imageSrc="https://picsum.photos/100/100"
        imageAlt="test"
      />
      <ImageContainer
        imageSrc="https://picsum.photos/100/100"
        imageAlt="test"
      />
    </div>
  );
};
