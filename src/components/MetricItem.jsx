import ComponentMapper from "./ComponentMapper";
import SparkleIcon from "../assets/glitter.svg";

const MetricItem = ({
  item,
  selectedMetric,
  isMetric,
  newMetric,
  fullScreen,
  preview,
  previewActive = false,
  metricSelectionHandler = () => {},
}) => (
  <div
    key={item.id}
    onClick={(e) => {
      if (!newMetric && !isMetric) {
        metricSelectionHandler(e, item.id);
      }
    }}
    className={`w-full h-full border-2 transition-all cursor-pointer ${
      selectedMetric === item?.id ? "border-[#FF7A00]" : "border-transparent"
    }`}
  >
    <div
      className={`p-4 bg-white border-2 rounded-xl ${
        fullScreen ? "min-h-screen" : "h-full"
      } ${preview ? "shadow-lg shadow-gray-200" : "shadow-lg"} ${
        previewActive ? "border-[#FF7A00]" : "border-transparent"
      }`}
    >
      <div className={`${preview && "scale-50 -mt-20"}`}>
        <ComponentMapper
          componentId={item.component_type}
          preview={preview}
          fullScreen={fullScreen}
          {...item}
        />
      </div>

      <div className="flex items-center gap-4 bg-blue-300/20 text-sm px-4 py-4 mt-2 rounded-xl">
        <img
          src={SparkleIcon}
          className="h-6 w-6 transition-all fill-blue-600"
        />
        {item?.data?.insight}
      </div>
    </div>
  </div>
);

export default MetricItem;
