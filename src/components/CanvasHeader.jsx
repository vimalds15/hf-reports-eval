import { useEffect, useState } from "react";
import CanvasHeaderTitle from "./CanvasHeaderTitle";
import EditModeToggleButton from "./EditModeToggleButton";
import { DateRangePicker } from "./ui";

const CanvasHeader = ({
  newReport,
  newMetric,
  canvasTitle,
  dateRange,
  setDateRange,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const startDate =
    dateRange && dateRange.length > 0 ? dateRange[0].startDate : "";
  const endDate = dateRange && dateRange.length > 0 ? dateRange[0].endDate : "";

  useEffect(() => {
    if (showDatePicker) {
      const listener = document.addEventListener("click", () => {
        setShowDatePicker(false);
      });

      return () => document.removeEventListener("click", listener);
    }
  }, [showDatePicker]);

  return (
    <div className="relative flex items-center justify-between">
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

      {showDatePicker && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute z-20 right-20 top-4 shadow-md shadow-gray-300"
        >
          <DateRangePicker state={dateRange} setState={setDateRange} />
        </div>
      )}

      <div className="flex-1 flex justify-end items-center mb-2 -mt-8">
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowDatePicker((prev) => !prev);
          }}
          className="flex justify-end items-center mr-10 text-sm font-semibold gap-2 border rounded border-gray-200 px-4 py-1 cursor-pointer"
        >
          <p>{startDate?.toLocaleDateString()}</p>
          <p> - </p>
          <p>{endDate?.toLocaleDateString()}</p>
        </div>
        <EditModeToggleButton newReport={newReport} newMetric={newMetric} />
      </div>
    </div>
  );
};

export default CanvasHeader;
