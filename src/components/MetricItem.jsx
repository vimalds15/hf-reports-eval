import ComponentMapper from "./ComponentMapper";

const MetricItem = ({
  item,
  selectedMetric,
  isMetric,
  newMetric,
  fullScreen,
  preview,
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
      selectedMetric === item?.id ? "border-red-500" : "border-transparent"
    }`}
  >
    <div
      className={`p-4 bg-white shadow-lg rounded-xl ${
        fullScreen ? "min-h-screen" : "h-full"
      }`}
    >
      <div className={`${preview && "scale-50 -mt-5"}`}>
        <ComponentMapper
          componentId={item.component_type}
          preview={preview}
          fullScreen={fullScreen}
          {...item}
        />
      </div>
    </div>
  </div>
);

export default MetricItem;
