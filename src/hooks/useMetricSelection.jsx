import { useState } from "react";

const useMetricSelection = (
  newMetric,
  newReport,
  activeItem,
  setPropertyItem
) => {
  const [selectedMetric, setSelectedMetric] = useState("");

  const metricSelectionHandler = (e, id) => {
    e.stopPropagation();
    const response = activeItem.components.find((item) => item.id === id);
    setPropertyItem(response);
    setSelectedMetric(id);
  };

  const removeSelectionHandler = () => {
    if (!newMetric && !newReport) {
      setSelectedMetric(null);
      setPropertyItem(activeItem);
    }
  };

  return {
    selectedMetric,
    setSelectedMetric,
    metricSelectionHandler,
    removeSelectionHandler,
  };
};

export default useMetricSelection;
