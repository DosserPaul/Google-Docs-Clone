import React from "react";
import Marker from "@/components/editor/marker";
import {useMutation, useStorage} from "@liveblocks/react";
import {LEFT_MARGIN, RIGHT_MARGIN} from "@/constants/margins";

const markers = Array.from({length: 83}, (_, i) => i);

const Ruler = () => {
  const leftMargin = useStorage(root => root.leftMargin) ?? LEFT_MARGIN;
  const setLeftMargin = useMutation(({storage}, position: number) => {
    storage.set("leftMargin", position);
  }, []);

  const rightMargin = useStorage(root => root.rightMargin) ?? RIGHT_MARGIN;
  const setRightMargin = useMutation(({storage}, position: number) => {
    storage.set("rightMargin", position);
  }, []);

  const [isDraggingLeft, setIsDraggingLeft] = React.useState(false);
  const [isDraggingRight, setIsDraggingRight] = React.useState(false);
  const rulerRef = React.useRef<HTMLDivElement>(null);

  const handleLeftMouseDown = () => {
    setIsDraggingLeft(true);
  }

  const handleRightMouseDown = () => {
    setIsDraggingRight(true);
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const PAGE_WIDTH = 816;
    const MIN_SPACING = 100;

    if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
      const container = rulerRef.current.querySelector("#ruler-container");
      if (container) {
        const rect = container.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const rawPosition = Math.max(0, Math.min(PAGE_WIDTH, offsetX));

        if (isDraggingLeft) {
          const maxLeftMargin = PAGE_WIDTH - rightMargin - MIN_SPACING;
          const newLeftMargin = Math.min(rawPosition, maxLeftMargin);
          setLeftMargin(newLeftMargin);
        } else if (isDraggingRight) {
          const maxRightMargin = PAGE_WIDTH - leftMargin + MIN_SPACING;
          const newRightMargin = Math.max(PAGE_WIDTH - rawPosition, 0);
          const constainedRightMargin = Math.min(newRightMargin, maxRightMargin);
          setRightMargin(constainedRightMargin);
        }
      }
    }
  }

  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  }

  const handleLeftDoubleClick = () => {
    setLeftMargin(56);
  }

  const handleRightDoubleClick = () => {
    setRightMargin(56);
  }

  return (
    <div
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="w-[816px] mx-auto h-6 border-b border-gray-300 flex flex-end relative select-none print:hidden">
      <div
        id="ruler-container"
        className="w-full h-full relative"
      >
        <Marker
          position={leftMargin}
          isLeft
          isDragging={isDraggingLeft}
          onMouseDown={handleLeftMouseDown}
          onDoubleClick={handleLeftDoubleClick}
        />
        <Marker
          position={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight}
          onMouseDown={handleRightMouseDown}
          onDoubleClick={handleRightDoubleClick}
        />
        <div className="absolute inset-x-0 bottom-0 h-full">
          <div className="relative h-full w-[816px]">
            {markers.map((marker) => {
              const position = (marker * 816) / 82;

              return (
                <div
                  key={marker}
                  className="absolute bottom-0"
                  style={{
                    left: `${position}px`,
                  }}
                >
                  {marker % 10 === 0 && (
                    <>
                      <div className="absolute bottom-0 w-px h-2 bg-neutral-500"/>
                      <span className="absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2">
                        {marker / 10 + 1}
                      </span>
                    </>
                  )}
                  {marker % 5 === 0 && marker % 10 !== 0 && (
                    <div className="absolute bottom-0 w-px h-1.5 bg-neutral-300"/>
                  )}
                  {marker % 5 !== 0 && (
                    <div className="absolute bottom-0 w-px h-1 bg-neutral-200"/>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ruler;
