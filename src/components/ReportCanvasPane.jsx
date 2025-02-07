import { useEffect, useRef, useState } from "react";
import ComponentMapper from "../utils/ComponentMapper";
import SparkleIcon from "../assets/sparkler.png";
import { createMetric, getRandomMetric } from "../mock/api";
import ConversationBar from "./ConversationBar";

const ReportCanvasPane = ({
  activeItem,
  propertyItem,
  setPropertyItem,
  newMetric = false,
  newReport = false,
  reportMetrics,
  setReportMetrics,
  title,
  description,
  setTitle,
  setDescription,
}) => {
  const [showConversationBar, setShowConversationBar] = useState();

  const [selectedMetric, setSelectedMetric] = useState("");

  const titleRef = useRef(null);

  const handleInput = () => {
    setTitle(titleRef.current.innerText);
  };
  const descriptionRef = useRef(null);

  const handleDescriptionInput = () => {
    setTitle(descriptionRef.current.innerText);
  };

  const isMetric = !activeItem?.components;

  const metricSelectionHandler = (e, id) => {
    e.stopPropagation();
    const response = activeItem.components.find((item) => item.id === id);
    setPropertyItem(response);
    setSelectedMetric(id);
  };

  const removeSelectionHandler = () => {
    if (!newMetric && !newReport) {
      setSelectedMetric("");
      setPropertyItem(activeItem);
    }
  };

  const chatSubmitHandler = (e) => {
    e.preventDefault();

    const inputValue = e.target.elements["chat-message"].value.trim();
    if (!inputValue) return;

    const payload = {
      conversation: [
        ...(propertyItem.conversation || []),
        {
          type: "user",
          message: inputValue,
        },
        {
          type: "assistant",
          message: "Sure, here it is",
        },
      ],
    };

    const response = getRandomMetric(payload);

    if (newMetric || isMetric) {
      setReportMetrics([response]);
    } else {
      setReportMetrics((prev) => [...prev, response]);
    }
    setPropertyItem(response);
    e.target.reset();
  };

  useEffect(() => {
    setSelectedMetric("");
    setTitle(activeItem?.title || "Untitled");
    setDescription(activeItem?.description || "Untitled Description");
    if (activeItem) {
      if (!isMetric) {
        console.log(activeItem?.components.length);
        setReportMetrics(activeItem?.components);
      } else {
        setReportMetrics([activeItem]);
      }
    }
  }, [activeItem?.id]);

  useEffect(() => {
    if (newMetric || newReport) {
      setReportMetrics([]);
      setPropertyItem([]);
    }
  }, [newMetric, newReport]);

  return (
    <div
      key={activeItem.id}
      onClick={removeSelectionHandler}
      className="flex-1 h-screen relative overflow-scroll"
    >
      <div className="h-full w-full p-10">
        {newMetric && (
          <p className="text-lg font-semibold text-center mb-2">
            Create a New Metric
          </p>
        )}
        {newReport && (
          <p className="text-lg font-semibold text-center mb-2">
            Create a New Report
          </p>
        )}
        {activeItem.id || newMetric || newReport ? (
          <>
            <div className="h-full shadow-md bg-gray-100 p-6 rounded-lg overflow-scroll no-scrollbar">
              <div className="flex">
                <p
                  className="outline-none font-semibold text-lg bg-transparent w-fit"
                  onInput={(e) => {
                    setTitle(e.target.innerText);
                  }}
                  suppressContentEditableWarning
                  contentEditable
                >
                  {title}
                </p>

                {title !== activeItem?.title ? "*" : ""}
              </div>
              <div className="flex mb-4">
                <p
                  className="outline-none font-semibold text-sm"
                  onInput={(e) => setDescription(e.target.innerText)}
                  suppressContentEditableWarning
                  contentEditable
                >
                  {description}
                </p>
                {description !== activeItem.description ? "*" : ""}
              </div>

              <div className="w-full">
                {reportMetrics?.map((item) => (
                  <div
                    key={item.id}
                    onClick={(e) => {
                      if (!newMetric && !isMetric) {
                        metricSelectionHandler(e, item.id);
                      }
                    }}
                    className={`w-full border-2  transition-all ${
                      selectedMetric === item.id
                        ? "border-red-500"
                        : "border-transparent"
                    }`}
                  >
                    <ComponentMapper
                      componentId={item.component_type}
                      {...item}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div
              onClick={() => setShowConversationBar((prev) => !prev)}
              className="absolute bottom-6 right-6 bg-gradient-primary rounded-full overflow-hidden p-2 cursor-pointer"
            >
              <img
                src={SparkleIcon}
                className={`invert h-6 w-6 transition-all ${
                  showConversationBar && "rotate-180"
                }`}
              />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg font-semibold text-gray-500">
              Select a Report or Metric to Display
            </p>
          </div>
        )}

        {showConversationBar && (
          <ConversationBar submitHandler={chatSubmitHandler} />
        )}
      </div>
    </div>
  );
};

export default ReportCanvasPane;
