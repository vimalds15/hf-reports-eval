import CanvasHeaderTitle from "./CanvasHeaderTitle";
import EditModeToggleButton from "./EditModeToggleButton";

const CanvasHeader = ({ newReport, newMetric, canvasTitle }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1" />
      <CanvasHeaderTitle
        title={
          newReport
            ? "Create a New Report"
            : newMetric
            ? "Create a New Metric"
            : canvasTitle
        }
      />

      <EditModeToggleButton newReport={newReport} newMetric={newMetric} />
    </div>
  );
};

export default CanvasHeader;
