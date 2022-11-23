import React from "react";
import { useDrag } from "react-dnd";
const Pictures = ({ id, url }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })); //
  return (
    <img
      className={`aspect-square w-[7rem] h-[4rem] border-${isDragging ? 4 : 0}`}
      src={url}
      key={id}
      ref={drag}
      alt="shoe"
    />
  );
};

export default Pictures;
