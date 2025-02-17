import { MdFullscreen } from "react-icons/md";
import MetricItem from "./MetricItem";
import {
  useCanvasDetailsContext,
  useEditModeContext,
} from "../services/context";

const CanvasMetrics = ({
  isMetric,
  newMetric,
  selectedMetric,
  metricSelectionHandler,
  setViewFullScreenMetric,
}) => {
  const { canvasMetrics } = useCanvasDetailsContext();
  const { isEditEnabled } = useEditModeContext();

  return (
    <div className="w-full">
      {canvasMetrics?.map((item, index) => (
        <div
          key={item.id}
          data-test={item.id}
          className="relative flex flex-col my-2 bg-white rounded-2xl"
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
  );
};

export default CanvasMetrics;
