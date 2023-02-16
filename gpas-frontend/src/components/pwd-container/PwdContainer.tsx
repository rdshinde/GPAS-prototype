import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { ImageContainer } from "../image-container/ImageContainer";
import { ImgCollector } from "../img-collector/ImgCollector";
import { Images } from "../pwd-builder/PwdBuilder";
type Props = {
  pwdImages: Images[] | any;
};

export const PwdContainer = (props: Props) => {
  const { pwdImages } = props;
  return (
    <section className="w-full border border-gray-300 sm:p-1 md:p-2 xl:p-3 sm:my-1 md:my-2 xl:my-3 rounded-lg flex gap-7 items-center justify-center">
      <Droppable droppableId="pwdContainer" direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="w-full flex gap-7 items-center justify-center"
            // style={getListStyle(snapshot.isDraggingOver)}
          >
            {pwdImages.map((img: Images, i: number) => {
              return (
                <Draggable
                  key={img.id}
                  draggableId={img.id.toString()}
                  index={i}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                      }}
                    >
                      {img.imageSrc ? (
                        <ImageContainer
                          imageSrc={img.imageSrc}
                          imageAlt={img.imageAlt}
                          snapshot={snapshot}
                        />
                      ) : (
                        <ImgCollector snapshot={snapshot} />
                      )}
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </section>
  );
};
