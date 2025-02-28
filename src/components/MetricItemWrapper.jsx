import MetricItem from "./MetricItem";
import { MdFullscreen } from "react-icons/md";
import { useEditModeContext } from "../services/context";

const MetricItemWrapper = ({
  handleGroupDrop,
  groupIndex,
  index,
  handleItemDragStart,
  setViewFullScreenMetric,
  item,
  isMetric,
  newMetric,
  selectedMetric,
  metricSelectionHandler,
  metric,
  showRearrangePlaceholder,
  setShowRearrangePlaceholder,
}) => {
  const { isEditEnabled } = useEditModeContext();

  return (
    <>
      {showRearrangePlaceholder && (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleGroupDrop(e, groupIndex, index)}
          className="flex bg-[#ff7a00]/20 my-4 p-4 rounded-md w-8 cursor-pointer"
        />
      )}
      <div
        key={item?.id}
        data-test={item?.id}
        onDragStart={(e) => handleItemDragStart(e, groupIndex, index)}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={(e) => {
          e.preventDefault();
          setShowRearrangePlaceholder(false);
        }}
        draggable
        className="relative flex flex-col my-2 bg-white rounded-2xl cursor-pointer"
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
      {showRearrangePlaceholder && index === metric.length - 1 && (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleGroupDrop(e, groupIndex, metric.length)}
          className="flex bg-[#ff7a00]/20 my-4 p-4 rounded-md w-8 cursor-pointer"
        />
      )}
    </>
  );
};

export default MetricItemWrapper;
