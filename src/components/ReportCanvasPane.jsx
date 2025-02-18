import { useEffect, useState } from "react";
import ConversationBar from "./ConversationBar";
import { useMetricSelection, useReportDetailsWithChat } from "../hooks";
import CanvasHeader from "./CanvasHeader";
import {
  useActiveItemContext,
  usePropertyItemContext,
  useCanvasDetailsContext,
  useEditModeContext,
} from "../services/context";
import useResetOnNewCanvas from "../hooks/useResetOnNewCanvas";
import CanvasDefaultText from "./CanvasDefaultText";
import CanvasContent from "./CanvasContent";

const ReportCanvasPane = ({ newMetric = false, newReport = false }) => {
  const { activeItem } = useActiveItemContext();
  const { setPropertyItem } = usePropertyItemContext();
  const { isEditEnabled, setIsEditEnabled } = useEditModeContext();

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const {
    canvasTitle,
    canvasDescription,
    setCanvasTitle,
    setCanvasDescription,
    canvasMetrics,
    setCanvasMetrics,
    canvasChat,
    setCanvasChat,
  } = useCanvasDetailsContext();

  const isMetric = !newReport && !activeItem?.components;

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
      canvasChat,
      canvasMetrics,
      setCanvasMetrics,
      setCanvasChat,
      activeItem,
      setPropertyItem,
      isMetric,
      selectedMetric,
      setSelectedMetric
    );

  useEffect(() => {
    setSelectedMetric(null);
    setCanvasTitle(activeItem?.title || "Untitled");
    setCanvasDescription(activeItem?.description || "Untitled Description");
    if (activeItem) {
      if (!isMetric) {
        setCanvasMetrics(activeItem?.components);
      } else {
        setCanvasMetrics([activeItem]);
      }
    }
  }, [
    activeItem,
    activeItem.id,
    isMetric,
    setCanvasDescription,
    setCanvasMetrics,
    setCanvasTitle,
    setSelectedMetric,
  ]);

  useResetOnNewCanvas(
    newMetric,
    newReport,
    setCanvasMetrics,
    setPropertyItem,
    setCanvasChat,
    setIsEditEnabled
  );

  return (
    <div
      key={activeItem.id}
      onClick={isEditEnabled ? removeSelectionHandler : null}
      className="flex-1 h-screen relative overflow-scroll"
    >
      <div className="h-full w-full p-10">
        {(activeItem.id || newMetric || newReport) && (
          <CanvasHeader
            newReport={newReport}
            newMetric={newMetric}
            canvasTitle={canvasTitle}
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
        )}

        {activeItem.id || newMetric || newReport ? (
          <CanvasContent
            metricSelectionHandler={metricSelectionHandler}
            newReport={newReport}
            newMetric={newMetric}
            selectedMetric={selectedMetric}
            showConversationBar={showConversationBar}
            setShowConversationBar={setShowConversationBar}
          />
        ) : (
          <CanvasDefaultText />
        )}

        {isEditEnabled && showConversationBar && (
          <ConversationBar submitHandler={chatSubmitHandler} />
        )}
      </div>
    </div>
  );
};

export default ReportCanvasPane;
