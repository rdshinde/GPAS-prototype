import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { ImageContainer } from "../image-container/ImageContainer";
import { Images } from "../pwd-builder/PwdBuilder";
type Props = {
  children?: React.ReactNode;
  styles?: React.CSSProperties;
  data?: {};
  className?: string;
  gridImages: Images[];
};

export const GridContainer = (props: Props) => {
  function getStyle(style: any, snapshot: any) {
    if (!snapshot.isDropAnimating) {
      return {
        ...style,
      };
    }
    return {
      ...style,
      transitionDuration: `0.0001s`,
    };
  }
  const { children, styles, data, className, gridImages } = props;
  return (
    <Droppable droppableId="gridContainer" direction="horizontal">
      {(provided, snapshot) => (
        <div
          className={`${className} w-full border rounded-lg border-gray-300 flex flex-wrap items-center justify-center gap-7 md:my-1 md:p-2 sm:p-1 max-h-[40%]`}
          style={{
            ...styles,
            transform: snapshot.isDraggingOver ? "none" : "none",
          }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {children}
          {gridImages.map((img, index) => {
            return (
              <Draggable
                key={img.id}
                draggableId={img.id.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getStyle(provided.draggableProps.style, snapshot)}
                  >
                    <div
                      className={`relative rounded-lg hover:cursor-move `}
                      style={{
                        top: `${snapshot.isDragging ? "-50%" : "auto"}`,
                        left: `${snapshot.isDragging ? "-250%" : "auto"}`,
                      }}
                    >
                      <img
                        className="object-cover rounded-lg p-0 md:w-[100px] md:h-[100px] sm:w-[60px] sm:h-[60px] hover:scale-105 transition-all duration-200 ease-in-out"
                        src={img.imageSrc}
                        alt={img.imageAlt}
                        loading="lazy"
                        style={snapshot.isDragging ? { opacity: "5%" } : {}}
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
