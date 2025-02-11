import { useEffect, useRef, useState } from "react";
import MetricItem from "./MetricItem";
import { Modal } from "./ui";
import { MdOutlineFullscreenExit } from "react-icons/md";

const FullScreenWidget = ({
  reportTitle,
  metrics,
  setIsOpen,
  initialIndex = 0,
}) => {
  const [selectedMetric, setSelectedMetric] = useState(0);
  const selectedRef = useRef(null);
  const containerRef = useRef(null);

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

  useEffect(() => {
    if (selectedRef.current && containerRef.current) {
      const offset = 50; // Extra scroll offset
      const container = containerRef.current;
      const element = selectedRef.current;
      const elementTop = element.offsetTop - offset;
      container.scrollTo({ top: elementTop, behavior: "smooth" });
    }
  }, [selectedMetric]);

  return (
    <Modal isOpen={true} fullScreen={true}>
      <div className="flex">
        <div
          ref={containerRef}
          className="flex flex-col bg-[#f5f5f7] max-w-80 p-6 h-screen overflow-scroll no-scrollbar"
        >
          {metrics?.map((item, index) => (
            <div
              key={item.id}
              ref={selectedMetric === index ? selectedRef : null}
              className="my-2"
              onClick={() => setSelectedMetric(index)}
            >
              <div className="flex flex-col h-44 rounded-lg w-full  overflow-hidden">
                <MetricItem
                  item={item}
                  previewActive={selectedMetric === index}
                  preview
                />
              </div>
              <p className="font-semibold text-center text-sm mt-1.5">
                {item?.data?.title}
              </p>
            </div>
          ))}
        </div>

        <div className="flex-1 flex flex-col h-screen">
          <div className="flex items-center justify-between p-4">
            <div />
            <p className="text-2xl font-semibold text-center ">{reportTitle}</p>
            <MdOutlineFullscreenExit
              size={24}
              className="cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div className="flex-1">
            <MetricItem
              isMetric={true}
              item={metrics[selectedMetric]}
              fullScreen
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FullScreenWidget;
