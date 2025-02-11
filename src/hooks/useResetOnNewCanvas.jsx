import { useEffect } from "react";

const useResetOnNewCanvas = (
  newMetric,
  newReport,
  setCanvasMetrics,
  setPropertyItem,
  setCanvasChat,
  setIsEditEnabled
) => {
  useEffect(() => {
    if (newMetric || newReport) {
      setCanvasMetrics([]);
      setPropertyItem([]);
      setCanvasChat([]);
    } else {
      setIsEditEnabled(false);
    }
  }, [
    newMetric,
    newReport,
    setCanvasMetrics,
    setPropertyItem,
    setIsEditEnabled,
    setCanvasChat,
  ]);
};

export default useResetOnNewCanvas;
