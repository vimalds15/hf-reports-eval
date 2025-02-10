import { useEffect } from "react";

const useResetOnNewCanvas = (
  newMetric,
  newReport,
  setCanvasMetrics,
  setPropertyItem,
  setCanvasChat
) => {
  useEffect(() => {
    if (newMetric || newReport) {
      setCanvasMetrics([]);
      setPropertyItem([]);
      setCanvasChat([]);
    }
  }, [newMetric, newReport, setCanvasMetrics, setPropertyItem]);
};

export default useResetOnNewCanvas;
