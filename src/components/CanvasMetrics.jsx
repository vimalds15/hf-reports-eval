import { useEffect, useRef, useState } from "react";
import { MdFullscreen } from "react-icons/md";
import MetricItem from "./MetricItem";
import { useActiveItemContext, useEditModeContext } from "../services/context";
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
  const [draggingItem, setDraggingItem] = useState(null);
  const [draggingGroup, setDraggingGroup] = useState(null);
  const [initialPosition, setInitialPosition] = useState(null);

  const { isEditEnabled } = useEditModeContext();
  const { activeItem } = useActiveItemContext();

  const groupRef = useRef(null);
  const itemRefs = useRef({});

  useEffect(() => {
    const response = getLayout(activeItem);
    setLayout(response);
  }, []);

  useEffect(() => {
    const components = mapLayoutToComponents(layout, activeItem);
    setMetrics(components);
  }, [layout]);

  // Handle Item Drag Start
  const handleItemMouseDown = (e, groupIndex, itemIndex) => {
    e.preventDefault();
    setDraggingItem({ groupIndex, itemIndex });
    setInitialPosition({ x: e.clientX, y: e.clientY });
  };

  // Handle Item Drop
  const handleItemMouseUp = (
    e,
    dropGroupIdx,
    dropItemIdx,
  ) => {
    if (draggingItem) {
      const itemKey = `${dropGroupIdx}-${dropItemIdx}`;
      const itemElement = itemRefs?.current[itemKey];

      if (itemElement) {
        itemElement.style.transform = `translate(0px,0px)`;
      }
      handleReorder(
        draggingItem.groupIndex,
        draggingItem.itemIndex,
        dropGroupIdx,
        dropItemIdx
      );
    }
    setDraggingItem(null);
  };

  // Handle Group Drag Start
  const handleGroupMouseDown = (e, groupIndex) => {
    if (!draggingItem) {
      setDraggingGroup(groupIndex);
    }
  };

  // Handle Group Drop
  const handleGroupMouseUp = (e, dropGroupIdx) => {
    if (draggingGroup !== null && draggingGroup !== dropGroupIdx) {
      handleGroupReorder(draggingGroup, dropGroupIdx);
    }
    setDraggingGroup(null);
  };

  // Reorder groups
  const handleGroupReorder = (dragIndex, dropIndex) => {
    const updatedLayout = [...layout];
    const draggedGroup = updatedLayout.splice(dragIndex, 1)[0];
    updatedLayout.splice(dropIndex, 0, draggedGroup);
    setLayout(updatedLayout);
  };

  // Reorder items
  const handleReorder = (
    dragGroupIdx,
    dragItemIdx,
    dropGroupIdx,
    dropItemIdx
  ) => {
    const updatedLayout = [...layout];
    const dragItem = updatedLayout[dragGroupIdx].splice(dragItemIdx, 1)[0];

    if (dropItemIdx !== null) {
      updatedLayout[dropGroupIdx].splice(dropItemIdx, 0, dragItem);
    } else {
      updatedLayout[dropGroupIdx].push(dragItem);
    }
    setLayout(updatedLayout);
  };

  const handleItemMouseMove = (e, groupIndex, index) => {
    e.preventDefault();
    if (draggingItem) {
      const itemKey = `${groupIndex}-${index}`;
      const itemElement = itemRefs?.current[itemKey];

      if (itemElement) {
        const newX = e.clientX - initialPosition.x;
        const newY = e.clientY - initialPosition.y;
        itemElement.style.transform = `translate(${newX}px,${newY}px)`;
      }
    }
  };

  return (
    <div className="w-full">
      {metrics?.map((metric, groupIndex) => (
        <div
          key={groupIndex}
          className="p-4 bg-red-500 my-4 grid grid-cols-2 gap-6"
          onMouseDown={(e) => handleGroupMouseDown(e, groupIndex)}
          onMouseUp={(e) => handleGroupMouseUp(e, groupIndex)}
          ref={groupRef}
        >
          {metric.map((item, index) => (
            <div
              key={item?.id}
              data-test={item?.id}
              onMouseDown={(e) => handleItemMouseDown(e, groupIndex, index)}
              onMouseUp={(e) => handleItemMouseUp(e, groupIndex, index)}
              onMouseMove={(e) => handleItemMouseMove(e, groupIndex, index)}
              className="relative flex flex-col my-2 bg-white rounded-2xl cursor-pointer"
              ref={(el) => (itemRefs.current[`${groupIndex}-${index}`] = el)}
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
