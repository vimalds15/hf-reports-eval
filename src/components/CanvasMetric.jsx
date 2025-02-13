import { useState } from "react";
import {
  BsLayoutSidebarInset,
  BsLayoutSidebarInsetReverse,
} from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdFullscreen } from "react-icons/md";
import MetricItem from "./MetricItem";
import { useEditModeContext } from "../services/context";
import { useDragAndResize } from "../hooks";

const CanvasMetric = ({
  item,
  selectedMetric,
  metricSelectionHandler,
  index,
  isMetric,
  newMetric,
  setViewFullScreenMetric,
}) => {
  const [showMetricLayout, setShowMetricLayout] = useState(false);

  const { isEditEnabled } = useEditModeContext();

  const {
    parentRef,
    childRef,
    col,
    colStart,
    position,
    placeHolderHighlight,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    setColStart,
    setCols,
    reset
  } = useDragAndResize({ xThreshold: 250 });

  return (
    <div
      key={item.id}
      data-test={item.id}
      ref={parentRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      className="grid my-2 relative rounded-2xl select-none"
      style={{
        gridTemplateColumns: `repeat(${col},minmax(0,1fr))`,
      }}
    >
      <div
        className="relative flex flex-col"
        ref={childRef}
        style={{
          gridColumnStart: colStart,
          transform: `translateX(${position}px)`,
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute flex items-center gap-2 top-3 right-3 cursor-pointer"
        >
          {isEditEnabled && (
            <div className="relative">
              <LuLayoutDashboard
                size={14}
                onClick={() => setShowMetricLayout((prev) => !prev)}
              />
              {showMetricLayout && (
                <div className="absolute flex right-0 gap-3 p-2 top-5 bg-gray-200 z-10 rounded-md">
                  <BsLayoutSidebarInset
                    onClick={() => {
                      setCols(2);
                      setColStart(1);
                    }}
                  />
                  <BsLayoutSidebarInsetReverse
                    onClick={() => {
                      setCols(2);
                      setColStart(2);
                    }}
                  />
                  <div
                    className="border border-black rounded-sm "
                    onClick={() => {
                      setCols(1);
                      setColStart(1);
                    }}
                  >
                    <div className="h-2.5 w-2.5 m-0.5 bg-black rounded-sm"></div>
                  </div>
                </div>
              )}
            </div>
          )}
          <MdFullscreen
            size={20}
            onClick={() => setViewFullScreenMetric(index)}
          />
        </div>
        <div className="grid">
          <div>
            <MetricItem
              item={item}
              selectedMetric={selectedMetric}
              metricSelectionHandler={
                isEditEnabled ? metricSelectionHandler : () => {}
              }
              isMetric={isMetric}
              newMetric={newMetric}
            />
          </div>
        </div>
      </div>
      <div
        className={`${
          placeHolderHighlight === "left" ? "block" : "hidden"
        } absolute h-full w-[50%] bg-black/10 border-2 border-[#ff7a00] rounded-xl`}
      />
      <div
        className={`${
          placeHolderHighlight === "right" ? "block" : "hidden"
        } absolute h-full w-[50%] right-0 bg-black/10 border-2 border-[#ff7a00] rounded-xl`}
      />
      <div
        className={`${
          placeHolderHighlight === "full" ? "block" : "hidden"
        } absolute h-full w-full right-0 bg-black/10 border-2 border-[#ff7a00] rounded-xl`}
      />
    </div>
  );
};

export default CanvasMetric;
