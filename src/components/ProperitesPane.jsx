import { useState } from "react";
import { usePropertyItem } from "../services/context/PropertyItemContext";
import { useMetrics } from "../services/context/MetricsContext";
import { useReports } from "../services/context/ReportsContext";
import { useCanvasDetails } from "../services/context/CanvasDetailsContext";
import { createMetric, createReport } from "../mock/api";

const ProperitesPane = ({reportChat}) => {
  const [isChatSelected, setIsChatSelected] = useState(true);

  const { propertyItem } = usePropertyItem();
  const { setMetrics } = useMetrics();
  const { setReports } = useReports();
  const { canvasTitle, canvasDescription, canvasMetrics } = useCanvasDetails();

  const isMetric = !propertyItem?.components;

  const saveNewItemHandler = async (type) => {
    let payload = {
      id: Math.floor(Math.random() * 10000),
      title: canvasTitle,
      description: canvasDescription,
      conversation: reportChat,
    };
    if (type === "metric") {
      payload = { ...canvasMetrics[0], ...payload };
      await createMetric(payload);
      setMetrics((prev) => [...prev, payload]);
    } else {
      payload = { components: canvasMetrics, ...payload };
      await createReport(payload);
      setReports((prev) => [...prev, payload]);
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
              if (isMetric) {
                saveNewItemHandler("metric");
              } else {
                saveNewItemHandler("report");
              }
            }}
            className="flex-1 text-center border-2 border-black font-semibold px-4 py-2 rounded-md cursor-pointer hover:bg-black hover:text-white transition-all"
          >
            Save
          </div>
          <div className="flex-1 text-center border-2 border-red-500 font-semibold  text-red-500 px-4 py-2 rounded-md cursor-pointer hover:bg-red-700 hover:border-red-700 hover:text-white transition-all">
            Delete
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProperitesPane;
