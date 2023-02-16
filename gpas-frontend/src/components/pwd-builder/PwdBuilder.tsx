import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import uuid from "react-uuid";
import { GridContainer } from "../grid-container/GridContainer";
import { PwdContainer } from "../pwd-container/PwdContainer";

type Props = {};
export type Images = {
  imageSrc: string;
  imageAlt: string;
  id: string;
};
const gridImagesArray = [
  {
    id: uuid(),
    imageSrc: "https://picsum.photos/200/300",
    imageAlt: uuid(),
  },
  {
    id: uuid(),
    imageSrc: "https://picsum.photos/200/300",
    imageAlt: uuid(),
  },
  {
    id: uuid(),
    imageSrc: "https://picsum.photos/200/300",
    imageAlt: uuid(),
  },
  {
    id: uuid(),
    imageSrc: "https://picsum.photos/200/300",
    imageAlt: uuid(),
  },
  {
    id: uuid(),
    imageSrc: "https://picsum.photos/200/300",
    imageAlt: uuid(),
  },
  {
    id: uuid(),
    imageSrc: "https://picsum.photos/200/300",
    imageAlt: uuid(),
  },
  {
    id: uuid(),
    imageSrc: "https://picsum.photos/200/300",
    imageAlt: uuid(),
  },
  {
    id: uuid(),
    imageSrc: "https://picsum.photos/200/300",
    imageAlt: uuid(),
  },
  {
    id: uuid(),
    imageSrc: "https://picsum.photos/200/300",
    imageAlt: uuid(),
  },
  {
    id: uuid(),
    imageSrc: "https://picsum.photos/200/300",
    imageAlt: uuid(),
  },
  {
    id: uuid(),
    imageSrc: "https://picsum.photos/200/300",
    imageAlt: uuid(),
  },
];
const pwdImagesArray = [
  {
    id: uuid(),
  },
  { id: uuid() },
  { id: uuid() },
  {
    id: uuid(),
  },
  { id: uuid() },
  { id: uuid() },
  { id: uuid() },
  { id: uuid() },
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
    } else if (
      result.destination.droppableId == result.source.droppableId &&
      result.source.droppableId === "gridContainer"
    ) {
      let activeImage = gridImages[result.source.index];
      let newGridImages = [...gridImages];
      newGridImages.splice(result.source.index, 1);
      newGridImages.splice(result.destination.index, 0, activeImage);
      setGridImages(newGridImages);
    } else if (
      result.destination.droppableId !== result.source.droppableId &&
      result.source.droppableId === "gridContainer"
    ) {
      let activeImage = gridImages[result.source.index];
      let newGridImages = [...gridImages];

      setGridImages(newGridImages);
      let newPwdImages = [...pwdImages];
      newPwdImages.splice(result.destination.index, 1);
      newPwdImages.splice(result.destination.index, 0, activeImage);
      setPwdImages(newPwdImages);
    } else if (
      result.source.droppableId === "pwdContainer" &&
      result.destination.droppableId !== "gridContainer"
    ) {
      let activeImage = pwdImages[result.source.index];
      let newPwdImages = [...pwdImages];
      newPwdImages.splice(result.source.index, 1);
      newPwdImages.splice(result.source.index, 0, {
        ...activeImage,
        imageSrc: "",
        imageAlt: "",
      });
      setPwdImages(newPwdImages);
      console.log(pwdImages);
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
