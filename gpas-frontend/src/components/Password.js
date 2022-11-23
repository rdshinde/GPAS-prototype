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
  {
    id: 4,
    url: "https://res.cloudinary.com/dtcbqzynj/image/upload/v1663049622/Shoe%20Palace/men-nike-2_wgkgnl.webp",
  },
  {
    id: 5,
    url: "https://res.cloudinary.com/dtcbqzynj/image/upload/v1663047933/Shoe%20Palace/men-jordan-1_qnfjjw.webp",
  },
  {
    id: 6,
    url: "https://res.cloudinary.com/dtcbqzynj/image/upload/v1663049605/Shoe%20Palace/men-nike-1_byyiv3.webp",
  },
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
  {
    id: 4,
    url: "https://res.cloudinary.com/dtcbqzynj/image/upload/v1663049622/Shoe%20Palace/men-nike-2_wgkgnl.webp",
  },
  {
    id: 5,
    url: "https://res.cloudinary.com/dtcbqzynj/image/upload/v1663047933/Shoe%20Palace/men-jordan-1_qnfjjw.webp",
  },
  {
    id: 6,
    url: "https://res.cloudinary.com/dtcbqzynj/image/upload/v1663049605/Shoe%20Palace/men-nike-1_byyiv3.webp",
  },
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
  {
    id: 4,
    url: "https://res.cloudinary.com/dtcbqzynj/image/upload/v1663049622/Shoe%20Palace/men-nike-2_wgkgnl.webp",
  },
  {
    id: 5,
    url: "https://res.cloudinary.com/dtcbqzynj/image/upload/v1663047933/Shoe%20Palace/men-jordan-1_qnfjjw.webp",
  },
  {
    id: 6,
    url: "https://res.cloudinary.com/dtcbqzynj/image/upload/v1663049605/Shoe%20Palace/men-nike-1_byyiv3.webp",
  },
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
  {
    id: 4,
    url: "https://res.cloudinary.com/dtcbqzynj/image/upload/v1663049622/Shoe%20Palace/men-nike-2_wgkgnl.webp",
  },
  {
    id: 5,
    url: "https://res.cloudinary.com/dtcbqzynj/image/upload/v1663047933/Shoe%20Palace/men-jordan-1_qnfjjw.webp",
  },
  {
    id: 6,
    url: "https://res.cloudinary.com/dtcbqzynj/image/upload/v1663049605/Shoe%20Palace/men-nike-1_byyiv3.webp",
  },
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
  {
    id: 4,
    url: "https://res.cloudinary.com/dtcbqzynj/image/upload/v1663049622/Shoe%20Palace/men-nike-2_wgkgnl.webp",
  },
  {
    id: 5,
    url: "https://res.cloudinary.com/dtcbqzynj/image/upload/v1663047933/Shoe%20Palace/men-jordan-1_qnfjjw.webp",
  },
  {
    id: 6,
    url: "https://res.cloudinary.com/dtcbqzynj/image/upload/v1663049605/Shoe%20Palace/men-nike-1_byyiv3.webp",
  },
  {
    id: 1,
    url: "https://res.cloudinary.com/dtcbqzynj/image/upload/v1663049622/Shoe%20Palace/men-nike-2_wgkgnl.webp",
  },
  {
    id: 2,
    url: "https://res.cloudinary.com/dtcbqzynj/image/upload/v1663047933/Shoe%20Palace/men-jordan-1_qnfjjw.webp",
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
      <div className="h-full">
        <h2 className="text-3xl my-5">Select Your Password</h2>
        <div className="grid grid-cols-8 gap-1 w-3/5 border-2 border-gray-500 mx-auto p-[4px] mt-[2rem]">
          {PictureList.map((picture) => {
            return <Pictures id={picture.id} url={picture.url} />;
          })}
        </div>

        <div
          className="grid grid-cols-8 gap-2 h-[4.8rem] w-3/5 border-2 border-gray-500 mt-[3rem] mx-auto p-[4px]"
          ref={drop}
        >
          {board.map((picture) => {
            return <Pictures id={picture.id} url={picture.url} />;
          })}
        </div>
      </div>
      <h2 className="text-xl my-5">Drag any 6 images from above grid</h2>
      <button className="mt-2 px-5 py-1 rounded-md bg-gray-400">SUBMIT</button>
    </>
  );
}

export default Password;
