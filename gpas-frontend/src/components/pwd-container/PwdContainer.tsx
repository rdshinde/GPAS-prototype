import React from "react";
import { ImageContainer } from "../image-container/ImageContainer";
type Props = {};

export const PwdContainer = (props: Props) => {
  return (
    <section className="w-full border border-gray-300 sm:p-1 md:p-2 xl:p-3 sm:m-1 md:m-2 xl:m-3 rounded-lg flex gap-5 items-center justify-center">
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
    </section>
  );
};
