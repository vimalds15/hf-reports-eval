import { useState } from "react";
import EditableText from "./EditableText";
import {
  useActiveItemContext,
  useCanvasDetailsContext,
  useEditModeContext,
} from "../services/context";

import ToggleConversationBarButton from "./ToggleConversationBarButton";
import ImportMetricButton from "./ImportMetricButton";
import ImportMetricsModal from "./ImportMetricsModal";
import FullScreenWidget from "./FullScreenWidget";
import CanvasMetrics from "./CanvasMetrics";

const CanvasContent = ({
  newReport,
  newMetric,
  selectedMetric,
  metricSelectionHandler,
  showConversationBar,
  setShowConversationBar,
}) => {
  const [showImportModal, setShowImportModal] = useState(false);
  const [viewFullScreenMetric, setViewFullScreenMetric] = useState(false);

  const { activeItem } = useActiveItemContext();
  const { isEditEnabled } = useEditModeContext();

  const {
    canvasTitle,
    canvasDescription,
    setCanvasTitle,
    setCanvasDescription,
    canvasMetrics,
  } = useCanvasDetailsContext();

  const isMetric = !newReport && !activeItem?.components;

  return (
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

        <CanvasMetrics
          isMetric={isMetric}
          newMetric={newMetric}
          selectedMetric={selectedMetric}
          metricSelectionHandler={metricSelectionHandler}
          setViewFullScreenMetric={setViewFullScreenMetric}
        />

        {isEditEnabled && !isMetric && (
          <ImportMetricButton setShowImportModal={setShowImportModal} />
        )}

        {typeof viewFullScreenMetric === "number" && (
          <FullScreenWidget
            reportTitle={canvasTitle}
            metrics={canvasMetrics}
            setIsOpen={setViewFullScreenMetric}
            initialIndex={viewFullScreenMetric}
          />
        )}

        {isEditEnabled && showImportModal && (
          <ImportMetricsModal
            showImportModal={showImportModal}
            setShowImportModal={setShowImportModal}
          />
        )}
      </div>

      {isEditEnabled && (
        <ToggleConversationBarButton
          showConversationBar={showConversationBar}
          setShowConversationBar={setShowConversationBar}
        />
      )}
    </>
  );
};

export default CanvasContent;
