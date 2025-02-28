import { useEffect, useRef, useState } from "react";
import { MdFullscreen } from "react-icons/md";
import MetricItem from "./MetricItem";
import { useActiveItemContext, useEditModeContext } from "../services/context";
import { getLayout, mapLayoutToComponents } from "../utils/helper";
import CanvasMetricItem from "./CanvasMetricItem";

const CanvasMetricsList = ({
  isMetric,
  newMetric,
  selectedMetric,
  metricSelectionHandler,
  setViewFullScreenMetric,
}) => {
  const [layout, setLayout] = useState([]);
  const [metrics, setMetrics] = useState([]);

  const { activeItem } = useActiveItemContext();

  useEffect(() => {
    const response = getLayout(activeItem);
    setLayout(response);
  }, []);

  useEffect(() => {
    const components = mapLayoutToComponents(layout, activeItem);
    setMetrics(components);
  }, [layout]);

  return (
    <div className="w-full">
      {metrics?.map((metric, groupIndex) => (
        <CanvasMetricItem
          key={metric?.id}
          metric={metric}
          groupIndex={groupIndex}
          isMetric={isMetric}
          newMetric={newMetric}
          selectedMetric={selectedMetric}
          metricSelectionHandler={metricSelectionHandler}
          setViewFullScreenMetric={setViewFullScreenMetric}
          layout={layout}
          setLayout={setLayout}
        />
      ))}
    </div>
  );
};

export default CanvasMetricsList;
