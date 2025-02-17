import { MdFullscreen } from "react-icons/md";
import MetricItem from "./MetricItem";
import { useActiveItemContext, useEditModeContext } from "../services/context";
import { useEffect, useState } from "react";
import { getLayout, mapLayoutToComponents } from "../utils/helper";

const CanvasMetrics = ({
  isMetric,
  newMetric,
  selectedMetric,
  metricSelectionHandler,
  setViewFullScreenMetric,
}) => {
  const [layout, setLayout] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [isItemDragging, setIsItemDragging] = useState(false);

  const { isEditEnabled } = useEditModeContext();
  const { activeItem } = useActiveItemContext();

  useEffect(() => {
    const response = getLayout(activeItem);
    setLayout(response);
  }, []);

  useEffect(() => {
    const components = mapLayoutToComponents(layout, activeItem);
    setMetrics(components);
  }, [layout]);

  const handleGroupReorder = (dragIndex, dropIndex) => {
    if (!isItemDragging) {
      const updatedLayout = [...layout];
      const draggedGroup = updatedLayout.splice(dragIndex, 1)[0];
      updatedLayout.splice(dropIndex, 0, draggedGroup);
      setLayout(updatedLayout);
    }
  };

  const handleGroupDragStart = (e, groupIndex) => {
    if (!isItemDragging) {
      e.preventDefault();
      e.dataTransfer.setData("groupIndex", groupIndex);
    }
  };

  const handleGroupDrop = (e, dropIndex) => {
    if (!isItemDragging) {
      const dragIndex = parseInt(e.dataTransfer.getData("groupIndex"), 10);
      if (dragIndex !== dropIndex) {
        handleGroupReorder(dragIndex, dropIndex);
      }
    } else {
      const dragGroupIdx = parseInt(e.dataTransfer.getData("groupIndex"), 10);
      const dragItemIdx = parseInt(e.dataTransfer.getData("itemIndex"), 10);
      if (dragGroupIdx !== dropIndex) {
        handleReorder(dragGroupIdx, dragItemIdx, dropIndex, null);
      }
    }
  };

  const handleReorder = (
    dragGroupIdx,
    dragItemIdx,
    dropGroupIdx,
    dropItemIdx
  ) => {
    const updatedLayout = [...layout];

    console.log(dragGroupIdx, dragItemIdx, dropGroupIdx, dropItemIdx);

    if (dragGroupIdx === dropGroupIdx) {
      // const group = [...updatedLayout[dragGroupIdx]];
      // [group[dragItemIdx], group[dropItemIdx]] = [
      //   group[dropItemIdx],
      //   group[dragItemIdx],
      // ];
      // updatedLayout[dragGroupIdx] = [group[1]];
    } else {
      const dragItem = updatedLayout[dragGroupIdx].splice(dragItemIdx, 1)[0];
      updatedLayout[dropGroupIdx].splice(dropItemIdx, 0, dragItem);
    }
    setLayout(updatedLayout);
  };

  const handleItemDragStart = (e, groupIndex, itemIndex) => {
    e.stopPropagation();
    setIsItemDragging(true);
    e.dataTransfer.setData("groupIndex", groupIndex);
    e.dataTransfer.setData("itemIndex", itemIndex);
    console.log("item dragging");
  };

  const handleItemDrop = (e, dropGroupIdx, dropItemIdx) => {
    // const dragGroupIdx = parseInt(e.dataTransfer.getData("groupIndex"), 10);
    // const dragItemIdx = parseInt(e.dataTransfer.getData("itemIndex"), 10);
    // if (dragGroupIdx !== dropGroupIdx) {
    //   handleReorder(dragGroupIdx, dragItemIdx, dropGroupIdx, dropItemIdx);
    // }
    // setIsItemDragging(false);
  };

  return (
    <div className="w-full">
      {metrics?.map((metric, groupIndex) => (
        <div
          key={groupIndex}
          className="p-4 bg-red-500 my-4 grid grid-cols-2 gap-6"
          onDragStart={(e) => handleGroupDragStart(e, groupIndex)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleGroupDrop(e, groupIndex)}
        >
          {metric.map((item, index) => (
            <div
              key={item?.id}
              data-test={item?.id}
              onDragStart={(e) => handleItemDragStart(e, groupIndex, index)}
              onDragOver={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              onDrop={(e) => handleItemDrop(e, groupIndex, index)}
              className="relative flex flex-col my-2 bg-white rounded-2xl"
              draggable
            >
              <div
                className="absolute top-3 right-3 cursor-pointer"
                onClick={() => setViewFullScreenMetric(index)}
              >
                <MdFullscreen size={20} />
              </div>
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
          ))}
        </div>
      ))}
    </div>
  );
};

export default CanvasMetrics;
