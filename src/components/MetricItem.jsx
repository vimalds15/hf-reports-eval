import ComponentMapper from "./ComponentMapper";

const MetricItem = ({
  item,
  selectedMetric,
  metricSelectionHandler,
  isMetric,
  newMetric,
}) => (
  <div
    key={item.id}
    onClick={(e) => {
      if (!newMetric && !isMetric) {
        metricSelectionHandler(e, item.id);
      }
    }}
    className={`w-full border-2 transition-all cursor-pointer ${
      selectedMetric === item.id ? "border-red-500" : "border-transparent"
    }`}
  >
    <ComponentMapper componentId={item.component_type} {...item} />
  </div>
);

export default MetricItem;
