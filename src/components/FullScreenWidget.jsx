import { useEffect, useState } from "react";
import MetricItem from "./MetricItem";
import { Modal } from "./ui";

const FullScreenWidget = ({ metrics, setIsOpen, initialIndex = 0 }) => {
  const [selectedMetric, setSelectedMetric] = useState(0);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "ArrowUp") {
        setSelectedMetric((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (event.key === "ArrowDown") {
        setSelectedMetric((prev) =>
          prev < metrics.length - 1 ? prev + 1 : prev
        );
      } else if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  useEffect(() => {
    setSelectedMetric(initialIndex);
  }, [initialIndex]);

  return (
    <Modal isOpen={true} fullScreen={true}>
      <div className="flex">
        <div className="flex flex-col bg-[#f5f5f7] min-w-80 p-6">
          {metrics?.map((item, index) => (
            <div
              key={item.id}
              className="my-2"
              onClick={() => setSelectedMetric(index)}
            >
              <div className="flex flex-col h-44 rounded-lg w-full  overflow-hidden">
                <MetricItem item={item} preview />
              </div>
              <p className="font-semibold text-center text-sm mt-1.5">
                {item?.data?.title}
              </p>
            </div>
          ))}
        </div>

        <MetricItem isMetric={true} item={metrics[selectedMetric]} fullScreen />
      </div>
    </Modal>
  );
};

export default FullScreenWidget;
