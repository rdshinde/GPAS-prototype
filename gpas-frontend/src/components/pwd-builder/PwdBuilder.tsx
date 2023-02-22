import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import uuid from "react-uuid";
import { GridContainer } from "../grid-container/GridContainer";
import { PwdContainer } from "../pwd-container/PwdContainer";
import { HidePwdEye } from "../pwd-eye-icon/HidePwdEye";
import { ShowPwdEye } from "../pwd-eye-icon/ShowPwdEye";

type Props = {};
export type Images = {
  imageSrc: string;
  imageAlt: string;
  id: string;
};
const gridImagesArray = [
  {
    id: uuid(),
    imageSrc: "https://picsum.photos/id/1/200/300",
    imageAlt: uuid(),
  },
  {
    id: uuid(),
    imageSrc: "https://picsum.photos/id/12/200/300",
    imageAlt: uuid(),
  },
  {
    id: uuid(),
    imageSrc: "https://picsum.photos/id/13/200/300",
    imageAlt: uuid(),
  },
  {
    id: uuid(),
    imageSrc: "https://picsum.photos/id/14/200/300",
    imageAlt: uuid(),
  },
  {
    id: uuid(),
    imageSrc: "https://picsum.photos/id/15/200/300",
    imageAlt: uuid(),
  },
  {
    id: uuid(),
    imageSrc: "https://picsum.photos/id/16/200/300",
    imageAlt: uuid(),
  },
  {
    id: uuid(),
    imageSrc: "https://picsum.photos/id/17/200/300",
    imageAlt: uuid(),
  },
  {
    id: uuid(),
    imageSrc: "https://picsum.photos/id/18/200/300",
    imageAlt: uuid(),
  },
  {
    id: uuid(),
    imageSrc: "https://picsum.photos/id/19/200/300",
    imageAlt: uuid(),
  },
  {
    id: uuid(),
    imageSrc: "https://picsum.photos/id/20/200/300",
    imageAlt: uuid(),
  },
  {
    id: uuid(),
    imageSrc: "https://picsum.photos/id/91/200/300",
    imageAlt: uuid(),
  },
  {
    id: uuid(),
    imageSrc: "https://picsum.photos/id/81/200/300",
    imageAlt: uuid(),
  },
  {
    id: uuid(),
    imageSrc: "https://picsum.photos/id/71/200/300",
    imageAlt: uuid(),
  },
  {
    id: uuid(),
    imageSrc: "https://picsum.photos/id/61/200/300",
    imageAlt: uuid(),
  },
  {
    id: uuid(),
    imageSrc: "https://picsum.photos/id/51/200/300",
    imageAlt: uuid(),
  },
  {
    id: uuid(),
    imageSrc: "https://picsum.photos/id/41/200/300",
    imageAlt: uuid(),
  },
  {
    id: uuid(),
    imageSrc: "https://picsum.photos/id/31/200/300",
    imageAlt: uuid(),
  },
  {
    id: uuid(),
    imageSrc: "https://picsum.photos/id/21/200/300",
    imageAlt: uuid(),
  },
];
const pwdImagesArray = [
  { id: uuid() },
  { id: uuid() },
  { id: uuid() },
  { id: uuid() },
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
  const [pwdVisible, setPwdVisible] = React.useState<boolean>(false);

  const [dragSource, setDragSource] = React.useState<string>("");

  const [dragDestination, setDragDestination] = React.useState<string>("");
  const onDragStartHandler = (result: any) => {
    console.log("result", result);
    setDragSource(result.source.droppableId);
  };

  const onDragUpdateHandler = (result: any) => {
    setDragDestination(result.destination?.droppableId);
  };

  function isPwdEmpty(objects: Images[]): boolean {
    return objects.some((obj) => Boolean(obj.imageSrc));
  }
  const dragEndHandler = (result: DropResult) => {
    if (pwdImages.length > 8) {
      return;
    }
    if (!result.destination) {
      return;
    } else if (result.destination.index === result.source.index) return;
    else if (
      result.destination.droppableId === result.source.droppableId &&
      result.source.droppableId === "pwdContainer"
    ) {
      let activeImage = pwdImages[result.source.index];
      let newPwdImages = [...pwdImages];
      newPwdImages.splice(result.source.index, 1);
      newPwdImages.splice(result.destination.index, 0, activeImage);
      setPwdImages(newPwdImages);
    } else if (
      result.destination.droppableId === result.source.droppableId &&
      result.source.droppableId === "gridContainer"
    ) {
      let activeImage = gridImages[result.source.index];
      let newGridImages = [...gridImages];
      newGridImages.splice(result.source.index, 1);
      newGridImages.splice(result.destination.index, 0, activeImage);
      setGridImages(newGridImages);
    } else if (
      result.destination.droppableId === "pwdContainer" &&
      result.source.droppableId === "gridContainer"
    ) {
      let activeImage = gridImages[result.source.index];
      let newGridImages = [...gridImages];
      newGridImages.splice(result.source.index, 1);
      newGridImages.splice(result.source.index, 0, {
        ...activeImage,
        id: uuid(),
      });
      setGridImages(newGridImages);
      let newPwdImages = [...pwdImages];
      newPwdImages.splice(result.destination.index, 1);
      newPwdImages.splice(result.destination.index, 0, activeImage);
      setPwdImages(newPwdImages);
    } else {
      let newPwdImages = [...pwdImages];
      newPwdImages.splice(result.source.index, 1);
      newPwdImages.splice(result.source.index, 0, {
        id: uuid(),
      });
      setPwdImages(newPwdImages);
    }
  };

  return (
    <DragDropContext
      onDragEnd={dragEndHandler}
      onDragStart={onDragStartHandler}
      onDragUpdate={onDragUpdateHandler}
    >
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
        <section className="flex justify-between items-center my-3">
          <h3 className="text-xl font-extrabold text-gray-500 text-start">
            Your Password.
          </h3>
          {isPwdEmpty(pwdImages) ? (
            <div className="flex items-center gap-5">
              <button
                className="text-bluelighter ont-semibold"
                onClick={() => setPwdImages([...pwdImagesArray])}
              >
                Reset Password
              </button>
              <button
                className="text-bluelighter flex items-center gap-2 font-semibold"
                onClick={() => setPwdVisible((prev) => !prev)}
              >
                {pwdVisible ? "Hide Password" : "Show Password"}
                <span>{pwdVisible ? <HidePwdEye /> : <ShowPwdEye />}</span>
              </button>
            </div>
          ) : (
            ""
          )}
        </section>
        <PwdContainer
          pwdImages={pwdImages}
          pwdVisibility={pwdVisible}
          dragSource={dragSource}
          dragDestination={dragDestination}
        />
      </section>
    </DragDropContext>
  );
};
