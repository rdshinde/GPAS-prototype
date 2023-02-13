import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import { GridContainer } from "../grid-container/GridContainer";
import { PwdContainer } from "../pwd-container/PwdContainer";

type Props = {};
export type Images = {
  imageSrc: string;
  imageAlt: string;
  id: number;
};
const gridImagesArray = [
  { id: 1, imageSrc: "https://picsum.photos/200/300", imageAlt: "Image 1" },
  {
    id: 2,
    imageSrc: "https://picsum.photos/200/300",
    imageAlt: "Image 2",
  },
  { id: 3, imageSrc: "https://picsum.photos/200/300", imageAlt: "Image 3" },
  { id: 4, imageSrc: "https://picsum.photos/200/300", imageAlt: "Image 4" },
  { id: 5, imageSrc: "https://picsum.photos/200/300", imageAlt: "Image 5" },
  { id: 6, imageSrc: "https://picsum.photos/200/300", imageAlt: "Image 6" },
  { id: 7, imageSrc: "https://picsum.photos/200/300", imageAlt: "Image 7" },
  { id: 8, imageSrc: "https://picsum.photos/200/300", imageAlt: "Image 8" },
];
const pwdImagesArray = [
  { id: 1, imageSrc: "https://picsum.photos/200/300", imageAlt: "Image 1" },
  { id: 2 },
  { id: 3 },
  { id: 4, imageSrc: "https://picsum.photos/200/300", imageAlt: "Image 2" },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
];
export const PwdBuilder = (props: Props) => {
  const [gridImages, setGridImages] = React.useState<Images[]>([
    ...gridImagesArray,
  ]);
  const [pwdImages, setPwdImages] = React.useState<Images[] | any>([
    ...pwdImagesArray,
  ]);

  const dragEndHandler = (result: DropResult) => {
    console.log(result);
    if (!result.destination) return;
    else if (result.destination.index === result.source.index) return;
    else if (result.destination.index === 0) return;
    else if (
      result.destination.droppableId == result.source.droppableId &&
      result.source.droppableId === "pwdContainer"
    ) {
      let activeImage = pwdImages[result.source.index];
      let newPwdImages = [...pwdImages];
      newPwdImages.splice(result.source.index, 1);
      newPwdImages.splice(result.destination.index, 0, activeImage);
      setPwdImages(newPwdImages);
    }
  };
  return (
    <DragDropContext onDragEnd={dragEndHandler}>
      <section className="mb-3">
        <div className="text-start py-3 my-2">
          <h2 className="text-2xl font-extrabold text-gray-500">
            Create your password.
          </h2>
          <span className="font-bold text-md text-bluelight">
            You need to drag and drop{" "}
            <span className="text-red-400">any six</span> images from the given
            grid of images to drop zone given below.
          </span>
        </div>
        <GridContainer gridImages={gridImages} />
        <PwdContainer pwdImages={pwdImages} />
      </section>
    </DragDropContext>
  );
};
