import React, { useState } from "react";
import MetricItem from "./MetricItem";
import { useEditModeContext } from "../services/context";
import { MdFullscreen } from "react-icons/md";
import MetricItemWrapper from "./MetricItemWrapper";

const CanvasMetricItem = ({
  isMetric,
  newMetric,
  selectedMetric,
  metricSelectionHandler,
  setViewFullScreenMetric,
  metric,
  groupIndex,
  layout,
  setLayout,
  index,
}) => {
  const [showRearrangePlaceholder, setShowRearrangePlaceholder] =
    useState(false);
  const { isEditEnabled } = useEditModeContext();

  const handleGroupDrop = (e, groupIndex, itemIndex) => {
    const dragGroupIndex = parseInt(e.dataTransfer.getData("groupIndex"), 10);
    const dragItemIndex = parseInt(e.dataTransfer.getData("itemIndex"), 10);

    if (dragGroupIndex !== groupIndex || dragItemIndex - itemIndex !== -1) {
      const newLayout = [...layout];
      const [draggedItem] = newLayout[dragGroupIndex].splice(dragItemIndex, 1);
      newLayout[groupIndex].splice(itemIndex, 0, draggedItem);
      setLayout(newLayout);
    }
    setShowRearrangePlaceholder(false);
  };

  const handleItemDragStart = (e, groupIndex, itemIndex) => {
    e.dataTransfer.setData("groupIndex", groupIndex);
    e.dataTransfer.setData("itemIndex", itemIndex);
  };

  const handleGroupRearrangeDrop = (e, dropGroupIndex) => {
    e.preventDefault();
    const dragGroupIndex = parseInt(e.dataTransfer.getData("groupIndex"), 10);
    const newLayout = [...layout];
    const [draggedGroup] = newLayout.splice(dragGroupIndex, 1);
    newLayout.splice(dropGroupIndex, 0, draggedGroup);
    setLayout(newLayout);
    setShowRearrangePlaceholder(false);
  };

  if (metric.length <= 0) return;

  return (
    <div
      className="p-4 my-4 flex flex-col"
      onDragOver={(e) => {
        e.preventDefault();
        setShowRearrangePlaceholder(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setShowRearrangePlaceholder(false);
      }}
    >
      {showRearrangePlaceholder && (
        <div
          className="w-[90%] bg-[#ff7a00]/20 my-4 p-4 mx-auto rounded-md cursor-pointer"
          onDrop={(e) => handleGroupRearrangeDrop(e, groupIndex)}
        />
      )}
      <div className="flex flex-nowrap gap-6">
        {metric?.map((item, index) => (
          <MetricItemWrapper
            key={item?.id}
            index={index}
            item={item}
            metric={metric}
            handleGroupDrop={handleGroupDrop}
            handleItemDragStart={handleItemDragStart}
            groupIndex={groupIndex}
            setViewFullScreenMetric={setViewFullScreenMetric}
            isMetric={isMetric}
            newMetric={newMetric}
            selectedMetric={selectedMetric}
            metricSelectionHandler={metricSelectionHandler}
            showRearrangePlaceholder={showRearrangePlaceholder}
            setShowRearrangePlaceholder={setShowRearrangePlaceholder}
          />
        ))}
      </div>
      {showRearrangePlaceholder && (
        <div
          className="w-[90%] bg-[#ff7a00]/20 my-4 p-4 mx-auto rounded-md cursor-pointer"
          onDrop={(e) => handleGroupRearrangeDrop(e, groupIndex)}
        />
      )}
    </div>
  );
};

export default CanvasMetricItem;
