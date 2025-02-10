import { useEffect } from "react";

const useResetOnNewCanvas = (
  newMetric,
  newReport,
  setCanvasMetrics,
  setPropertyItem
) => {
  useEffect(() => {
    if (newMetric || newReport) {
      setCanvasMetrics([]);
      setPropertyItem([]);
    }
  }, [newMetric, newReport, setCanvasMetrics, setPropertyItem]);
};

export default useResetOnNewCanvas;
