import React from "react";
import Pictures from "./Pictures";
import { useState } from "react";
import { useDrop } from "react-dnd";

const PictureList = [
  {
    id: 1,
    url: "https://res.cloudinary.com/dtcbqzynj/image/upload/v1663049622/Shoe%20Palace/men-nike-2_wgkgnl.webp",
  },
  {
    id: 2,
    url: "https://res.cloudinary.com/dtcbqzynj/image/upload/v1663047933/Shoe%20Palace/men-jordan-1_qnfjjw.webp",
  },
  {
    id: 3,
    url: "https://res.cloudinary.com/dtcbqzynj/image/upload/v1663049605/Shoe%20Palace/men-nike-1_byyiv3.webp",
  },
];

function Password() {
  const [board, setBoard] = useState([]);
  console.log(board);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = (id) => {
    const pictureList = PictureList.filter((image) => id === image.id);
    setBoard((board) => [...board, pictureList[0]]);
  };
  return (
    <>
      <div className="grid grid-cols-3 h-[7.3rem] gap-2 w-96 border-2 border-gray-500">
        {PictureList.map((picture) => {
          return <Pictures id={picture.id} url={picture.url} />;
        })}
      </div>

      <div
        className="flex h-[7.5rem] gap-2 w-96 border-2 border-gray-500 mt-5"
        ref={drop}
      >
        {board.map((picture) => {
          return <Pictures id={picture.id} url={picture.url} />;
        })}
      </div>
    </>
  );
}

export default Password;
