import { useState } from "react";
import {
  usePropertyItemContext,
  useMetricsContext,
  useReportsContext,
  useCanvasDetailsContext,
  useActiveItemContext,
} from "../services/context";
import {
  createMetric,
  createReport,
  deleteMetric,
  deleteReport,
  updateMetric,
  updateReport,
} from "../mock/api";

const ProperitesPane = ({ newMetric, newReport }) => {
  const [isChatSelected, setIsChatSelected] = useState(true);

  const { propertyItem } = usePropertyItemContext();
  const { metrics, setMetrics } = useMetricsContext();
  const { reports, setReports } = useReportsContext();
  const { canvasTitle, canvasDescription, canvasMetrics, canvasChat } =
    useCanvasDetailsContext();

  const { setActiveItem } = useActiveItemContext();

  const isMetric = !propertyItem?.components;

  const saveItemHandler = async (type) => {
    let payload = {
      title: canvasTitle,
      description: canvasDescription,
      conversation: canvasChat,
    };
    if (newReport || newMetric) {
      if (type === "metric") {
        payload = {
          ...canvasMetrics[0],
          ...payload,
          id: Math.floor(Math.random() * 10000),
        };
        await createMetric(payload);
        setMetrics((prev) => [...prev, payload]);
      } else {
        payload = {
          components: canvasMetrics,
          ...payload,
          id: Math.floor(Math.random() * 10000),
        };
        await createReport(payload);
        setReports((prev) => [...prev, payload]);
      }
    } else if (isMetric) {
      payload = {
        ...canvasMetrics[0],
        ...payload,
      };

      await updateMetric(propertyItem.id, payload);
    } else {
      payload = { ...payload, components: canvasMetrics };
      await updateReport(propertyItem.id, payload);
    }
  };

  const deleteItemHandler = async (type) => {
    if (type === "metric") {
      await deleteMetric(propertyItem.id);
      let updatedMetrics = metrics.filter((item) => item.id != propertyItem.id);
      setMetrics(updatedMetrics);
      setActiveItem({});
    } else {
      await deleteReport(propertyItem.id);
      let updatedReports = reports.filter((item) => item.id != propertyItem.id);
      setMetrics(updatedReports);
      setActiveItem({});
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen w-fit p-4 shadow-lg min-w-80 max-w-80">
      <div>
        <div className="font-semibold text-center mb-4">Properties</div>

        <div className="flex items-stretch justify-stretch w-full">
          <div
            onClick={() => setIsChatSelected(true)}
            className={`flex-1 min-w-32 text-center text-sm px-6 py-1 cursor-pointer ${
              isChatSelected ? "bg-black text-white rounded" : ""
            }`}
          >
            Chat
          </div>
          <div
            onClick={() => setIsChatSelected(false)}
            className={`flex-1 min-w-32 text-center text-sm px-6 py-1 cursor-pointer ${
              !isChatSelected ? "bg-black text-white rounded" : ""
            }`}
          >
            Customize
          </div>
        </div>

        <div className="h-0.5 w-full bg-gray-200 my-2" />

        {isChatSelected ? (
          <div className="flex flex-col gap-3 w-full mt-4 h-[70vh] overflow-scroll">
            {!propertyItem?.conversation && (
              <p className="text-center text-gray-500 font-semibold">
                Select a Report or Metric to Display
              </p>
            )}
            {propertyItem?.conversation?.map((item, index) => (
              <div
                key={index}
                className={`${
                  item?.type === "user" && "ml-auto"
                } bg-gray-100 max-w-[80%] w-fit px-4 py-1.5 rounded-md`}
              >
                <p>{item?.message}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center">Coming Soon...</div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="bg-black text-center text-white px-4 py-2 rounded-md cursor-pointer border-2 border-black">
          Export
        </div>
        <div className="flex gap-2">
          <div
            onClick={() => {
              if (newReport || !isMetric) {
                saveItemHandler("report");
              } else if (isMetric || newMetric) {
                saveItemHandler("metric");
              }
            }}
            className="flex-1 text-center border-2 border-black font-semibold px-4 py-2 rounded-md cursor-pointer hover:bg-black hover:text-white transition-all"
          >
            Save
          </div>
          {(!newReport || !newMetric) && (
            <div
              onClick={() => {
                if (isMetric) {
                  deleteItemHandler("metric");
                } else {
                  deleteItemHandler("report");
                }
              }}
              className="flex-1 text-center border-2 border-red-500 font-semibold  text-red-500 px-4 py-2 rounded-md cursor-pointer hover:bg-red-700 hover:border-red-700 hover:text-white transition-all"
            >
              Delete
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProperitesPane;
