import { useState } from "react";
import {
  useCanvasDetailsContext,
  useMetricsContext,
} from "../services/context";
import Modal from "./ui/Modal";

const ImportMetricsModal = ({ showImportModal, setShowImportModal }) => {
  const [selectedMetric, setSelectedMetric] = useState(null);

  const { setCanvasMetrics } = useCanvasDetailsContext();
  const { metrics } = useMetricsContext();

  const importMetricHandler = () => {
    setCanvasMetrics((prev) => {
      if (prev.length > 0) {
        return [...prev, selectedMetric];
      } else {
        return [selectedMetric];
      }
    });
    setShowImportModal(false);
  };

  return (
    <Modal isOpen={showImportModal} setIsOpen={setShowImportModal}>
      <p className="font-semibold text-center p-4">Import Metrics</p>
      <div className="flex flex-col gap-1">
        <div className="overflow-y-scroll p-4 max-h-[60vh]">
          {metrics?.map((metric) => (
            <div key={metric.id}>
              <div
                key={metric.id}
                onClick={() => setSelectedMetric(metric)}
                className={`px-4 py-4 min-h-8 rounded truncate hover:bg-gray-300 cursor-pointer ${
                  selectedMetric?.id === metric?.id
                    ? "bg-gray-400 hover:bg-gray-400"
                    : ""
                }`}
              >
                {metric?.title}
              </div>
            </div>
          ))}
        </div>

        <button
          disabled={!selectedMetric || selectedMetric === ""}
          onClick={importMetricHandler}
          className="text-center font-semibold w-fit mx-auto text-white bg-black px-4 py-2 my-4 rounded cursor-pointer"
        >
          Import
        </button>
      </div>
    </Modal>
  );
};

export default ImportMetricsModal;
