import { useEffect, useState } from "react";
import ConversationBar from "./ConversationBar";
import { useMetricSelection, useReportDetailsWithChat } from "../hooks";
import CanvasHeader from "./CanvasHeader";
import EditableText from "./EditableText";
import MetricItem from "./MetricItem";
import ToggleConversationBarButton from "./ToggleConversationBarButton";
import {
  useActiveItemContext,
  usePropertyItemContext,
  useCanvasDetailsContext,
} from "../services/context";
import useResetOnNewCanvas from "../hooks/useResetOnNewCanvas";
import ImportMetricsModal from "./ImportMetricsModal";
import { MdAddCircleOutline } from "react-icons/md";
import FullScreenWidget from "./FullScreenWidget";

const ReportCanvasPane = ({ newMetric = false, newReport = false }) => {
  const [showImportModal, setShowImportModal] = useState(false);
  const [viewFullScreenMetric, setViewFullScreenMetric] = useState(false);

  const { activeItem } = useActiveItemContext();
  const { setPropertyItem } = usePropertyItemContext();

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
    setCanvasChat
  );

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
                {canvasMetrics?.map((item, index) => (
                  <div key={item.id} className="my-2">
                    <p onClick={() => setViewFullScreenMetric(index)}>
                      Show Full Screen
                    </p>
                    <MetricItem
                      item={item}
                      selectedMetric={selectedMetric}
                      metricSelectionHandler={metricSelectionHandler}
                      isMetric={isMetric}
                      newMetric={newMetric}
                    />
                  </div>
                ))}
              </div>

              {!isMetric && (
                <div
                  onClick={() => setShowImportModal(true)}
                  className="flex flex-col items-center gap-1 justify-center bg-[#ff7a00]/20 my-4 p-4 rounded-lg cursor-pointer text-sm"
                >
                  <MdAddCircleOutline size={24} />
                  <p>Import Components</p>
                </div>
              )}

              {typeof viewFullScreenMetric === "number" && (
                <FullScreenWidget
                  metrics={canvasMetrics}
                  setIsOpen={setViewFullScreenMetric}
                  initialIndex={viewFullScreenMetric}
                />
              )}

              {showImportModal && (
                <ImportMetricsModal
                  showImportModal={showImportModal}
                  setShowImportModal={setShowImportModal}
                />
              )}
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
