import {
  useActiveItemContext,
  useCanvasDetailsContext,
  useMetricsContext,
  usePropertyItemContext,
  useReportsContext,
} from "../services/context";
import {
  createMetric,
  createReport,
  deleteMetric,
  deleteReport,
  updateMetric,
  updateReport,
} from "../mock/api";

const PropertiesActionButton = ({ newReport, newMetric }) => {
  const { metrics, setMetrics } = useMetricsContext();
  const { reports, setReports } = useReportsContext();
  const { canvasTitle, canvasDescription, canvasMetrics, canvasChat } =
    useCanvasDetailsContext();
  const { propertyItem } = usePropertyItemContext();
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
      setReports(updatedReports);
      setActiveItem({});
    }
  };
  return (
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
        {!(newReport || newMetric) && (
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
  );
};

export default PropertiesActionButton;
