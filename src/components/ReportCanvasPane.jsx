import { useEffect } from "react";
import ConversationBar from "./ConversationBar";
import { useMetricSelection, useReportDetailsWithChat } from "../hooks";
import CanvasHeader from "./CanvasHeader";
import EditableText from "./EditableText";
import MetricItem from "./MetricItem";
import ToggleConversationBarButton from "./ToggleConversationBarButton";
import { useActiveItem } from "../services/context/ActiveItemContext";
import { usePropertyItem } from "../services/context/PropertyItemContext";
import { useCanvasDetails } from "../services/context/CanvasDetailsContext";
import useResetOnNewCanvas from "../hooks/useResetOnNewCanvas";

const ReportCanvasPane = ({
  newMetric = false,
  newReport = false,
  reportChat,
  setReportChat,
}) => {
  const { activeItem } = useActiveItem();

  const isMetric = !newReport && !activeItem?.components;

  const { setPropertyItem } = usePropertyItem();
  const {
    canvasTitle,
    canvasDescription,
    setCanvasTitle,
    setCanvasDescription,
    canvasMetrics,
    setCanvasMetrics,
  } = useCanvasDetails();

  const {
    selectedMetric,
    setSelectedMetric,
    metricSelectionHandler,
    removeSelectionHandler,
  } = useMetricSelection(
    newMetric,
    newReport,
    activeItem,
    setPropertyItem,
    isMetric
  );

  const { showConversationBar, setShowConversationBar, chatSubmitHandler } =
    useReportDetailsWithChat(
      canvasTitle,
      setCanvasTitle,
      canvasDescription,
      setCanvasDescription,
      newMetric,
      newReport,
      reportChat,
      setCanvasMetrics,
      setReportChat,
      activeItem,
      setPropertyItem
    );

  useEffect(() => {
    setSelectedMetric("");
    setCanvasTitle(activeItem?.title || "Untitled");
    setCanvasDescription(activeItem?.description || "Untitled Description");
    if (activeItem) {
      if (!isMetric) {
        setCanvasMetrics(activeItem?.components);
      } else {
        setCanvasMetrics([activeItem]);
      }
    }
  }, [activeItem?.id]);

  useResetOnNewCanvas(newMetric, newReport, setCanvasMetrics, setPropertyItem);

  return (
    <div
      key={activeItem.id}
      onClick={removeSelectionHandler}
      className="flex-1 h-screen relative overflow-scroll"
    >
      <div className="h-full w-full p-10">
        <CanvasHeader
          title={
            newReport
              ? "Create a New Report"
              : newMetric
              ? "Create a New Metric"
              : null
          }
        />

        {activeItem.id || newMetric || newReport ? (
          <>
            <div className="h-full shadow-md bg-gray-100 p-6 rounded-lg overflow-scroll no-scrollbar">
              <div className="flex flex-col gap-1 mb-4">
                <EditableText text={canvasTitle} setText={setCanvasTitle} />
                <EditableText
                  text={canvasDescription}
                  setText={setCanvasDescription}
                  size={"sm"}
                />
              </div>

              <div className="w-full">
                {canvasMetrics?.map((item) => (
                  <MetricItem
                    item={item}
                    selectedMetric={selectedMetric}
                    metricSelectionHandler={metricSelectionHandler}
                    isMetric={isMetric}
                    newMetric={newMetric}
                  />
                ))}
              </div>
            </div>

            <ToggleConversationBarButton
              showConversationBar={showConversationBar}
              setShowConversationBar={setShowConversationBar}
            />
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg font-semibold text-gray-500">
              Select a Report or Metric to Display
            </p>
          </div>
        )}

        {showConversationBar && (
          <ConversationBar submitHandler={chatSubmitHandler} />
        )}
      </div>
    </div>
  );
};

export default ReportCanvasPane;
