import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import { GridContainer } from "../grid-container/GridContainer";

type Props = {};

export const PwdBuilder = (props: Props) => {
  const dragEndHandler = (result: DropResult) => {
    console.log(result);
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
        <GridContainer />
      </section>
    </DragDropContext>
  );
};
