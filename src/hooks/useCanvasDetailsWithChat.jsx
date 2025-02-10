import { useEffect, useState } from "react";
import { getRandomMetric } from "../mock/api";
import { createConversationPayload } from "../utils/helper";

const useReportDetailsWithChat = (
  canvasTitle,
  setCanvasTitle,
  canvasDescription,
  setCanvasDescription,
  newMetric,
  newReport,
  canvasChat,
  canvasMetrics,
  setCanvasMetrics,
  setCanvasChat,
  activeItem,
  setPropertyItem,
  isMetric,
  selectedMetric
) => {
  const [showConversationBar, setShowConversationBar] = useState(false);

  useEffect(() => {
    if (activeItem) {
      setCanvasTitle(activeItem?.title || "Untitled");
      setCanvasDescription(activeItem?.description || "Untitled Description");
      if (!newMetric && !newReport) {
        setCanvasMetrics(activeItem?.components || []);
      }
    }
  }, [
    activeItem,
    newMetric,
    newReport,
    setCanvasDescription,
    setCanvasMetrics,
    setCanvasTitle,
  ]);

  const chatSubmitHandler = async (e) => {
    e.preventDefault();
    const inputValue = e.target.elements["chat-message"].value.trim();
    if (!inputValue) return;

    const payload = createConversationPayload(inputValue);

    let response = await getRandomMetric(payload);

    setCanvasChat((prev) => [...prev, ...payload.conversation]);

    if (newMetric || isMetric) {
      setCanvasMetrics([response]);
    } else if (selectedMetric) {
      response = {
        ...response,
        id: selectedMetric,
        conversation: payload.conversation,
      };
      const newMetrics = canvasMetrics.map((item) => {
        if (item.id === selectedMetric) {
          return response;
        }
        return item;
      });
      setCanvasMetrics(newMetrics);
    } else {
      setCanvasMetrics((prev) => [...prev, response]);
    }

    let propertyItem = {
      ...response,
      id: activeItem.id,
      conversation: [...canvasChat, ...payload.conversation],
    };

    setPropertyItem(propertyItem);

    e.target.reset();
  };

  return {
    canvasTitle,
    setCanvasTitle,
    canvasDescription,
    setCanvasDescription,
    showConversationBar,
    setShowConversationBar,
    chatSubmitHandler,
  };
};

export default useReportDetailsWithChat;
