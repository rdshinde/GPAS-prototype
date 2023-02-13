import React from "react";
import { ImageContainer } from "../image-container/ImageContainer";
import { ImgCollector } from "../img-collector/ImgCollector";
type Props = {};

export const PwdContainer = (props: Props) => {
  const pwdImages = [
    {
      imageSrc: "https://picsum.photos/200/300",
      imageAlt: "Image 1",
    },
    {
      imageSrc: "https://picsum.photos/200/300",
      imageAlt: "Image 1",
    },
    {
      imageSrc: "",
      imageAlt: "Image 1",
    },
    {
      imageSrc: "https://picsum.photos/200/300",
      imageAlt: "Image 1",
    },
    {
      imageSrc: "https://picsum.photos/200/300",
      imageAlt: "Image 2",
    },
    {
      imageSrc: "https://picsum.photos/200/300",
      imageAlt: "Image 2",
    },
    {
      imageSrc: "https://picsum.photos/200/300",
      imageAlt: "Image 2",
    },
    {
      imageSrc: "",
      imageAlt: "Image 3",
    },
  ];
  return (
    <section className="w-full border border-gray-300 sm:p-1 md:p-2 xl:p-3 sm:my-1 md:my-2 xl:my-3 rounded-lg flex gap-7 items-center justify-center">
      {pwdImages.map((img) => {
        if (img.imageSrc) {
          return (
            <ImageContainer imageSrc={img.imageSrc} imageAlt={img.imageAlt} />
          );
        } else {
          return <ImgCollector />;
        }
      })}
    </section>
  );
};
